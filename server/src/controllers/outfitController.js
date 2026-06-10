import { query, getClient } from '../db/index.js';

export const saveOutfit = async (req, res, next) => {
  const client = await getClient();
  try {
    const { top_id, bottom_id, outer_id = null, shoes_id = null, accessory_id = null } = req.body;
    const { userId } = req.user;

    await client.query('BEGIN');

    // 필수 아이템 + 선택 아이템 유효성 검사 병렬 실행
    const checks = await Promise.all([
      client.query('SELECT id FROM items WHERE id=$1 AND user_id=$2 AND category=$3', [top_id,      userId, 'top']),
      client.query('SELECT id FROM items WHERE id=$1 AND user_id=$2 AND category=$3', [bottom_id,   userId, 'bottom']),
      outer_id     ? client.query('SELECT id FROM items WHERE id=$1 AND user_id=$2 AND category=$3', [outer_id,     userId, 'outer'])     : Promise.resolve({ rowCount: 1 }),
      shoes_id     ? client.query('SELECT id FROM items WHERE id=$1 AND user_id=$2 AND category=$3', [shoes_id,     userId, 'shoes'])     : Promise.resolve({ rowCount: 1 }),
      accessory_id ? client.query('SELECT id FROM items WHERE id=$1 AND user_id=$2 AND category=$3', [accessory_id, userId, 'accessory']) : Promise.resolve({ rowCount: 1 }),
    ]);

    const labels = ['top', 'bottom', 'outer', 'shoes', 'accessory'];
    const ids    = [top_id, bottom_id, outer_id, shoes_id, accessory_id];
    for (let i = 0; i < checks.length; i++) {
      if (ids[i] && checks[i].rowCount === 0) {
        await client.query('ROLLBACK');
        return res.status(400).json({ error: `Invalid ${labels[i]} item` });
      }
    }

    const { rows } = await client.query(
      `INSERT INTO outfits (user_id, top_id, bottom_id, outer_id, shoes_id, accessory_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, top_id, bottom_id, outer_id, shoes_id, accessory_id, created_at`,
      [userId, top_id, bottom_id, outer_id, shoes_id, accessory_id]
    );

    await client.query('COMMIT');
    res.status(201).json({ outfit: rows[0] });
  } catch (err) {
    await client.query('ROLLBACK');
    if (err.code === '23505') {
      return res.status(409).json({ error: 'This outfit is already saved' });
    }
    next(err);
  } finally {
    client.release();
  }
};

export const getOutfits = async (req, res, next) => {
  try {
    const { rows } = await query(
      `SELECT
         o.id,
         o.created_at,
         json_build_object('id', t.id,  'image_url', t.image_url,  'category', t.category)  AS top,
         json_build_object('id', b.id,  'image_url', b.image_url,  'category', b.category)  AS bottom,
         CASE WHEN o.outer_id     IS NOT NULL
              THEN json_build_object('id', ot.id, 'image_url', ot.image_url, 'category', ot.category)
              ELSE NULL END AS outer,
         CASE WHEN o.shoes_id     IS NOT NULL
              THEN json_build_object('id', sh.id, 'image_url', sh.image_url, 'category', sh.category)
              ELSE NULL END AS shoes,
         CASE WHEN o.accessory_id IS NOT NULL
              THEN json_build_object('id', ac.id, 'image_url', ac.image_url, 'category', ac.category)
              ELSE NULL END AS accessory
       FROM outfits o
       JOIN  items t  ON o.top_id        = t.id
       JOIN  items b  ON o.bottom_id     = b.id
       LEFT JOIN items ot ON o.outer_id      = ot.id
       LEFT JOIN items sh ON o.shoes_id      = sh.id
       LEFT JOIN items ac ON o.accessory_id  = ac.id
       WHERE o.user_id = $1
       ORDER BY o.created_at DESC`,
      [req.user.userId]
    );

    res.json({ outfits: rows });
  } catch (err) {
    next(err);
  }
};

export const deleteOutfit = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { rowCount } = await query(
      'DELETE FROM outfits WHERE id = $1 AND user_id = $2',
      [id, req.user.userId]
    );

    if (rowCount === 0) {
      return res.status(404).json({ error: 'Outfit not found' });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
