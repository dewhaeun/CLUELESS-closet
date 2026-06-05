import { query, getClient } from '../db/index.js';

export const saveOutfit = async (req, res, next) => {
  const client = await getClient();
  try {
    const { top_id, bottom_id } = req.body;
    const { userId } = req.user;

    await client.query('BEGIN');

    // top_id / bottom_id 유효성 확인 + 본인 소유 확인을 트랜잭션 안에서 처리
    const [topResult, bottomResult] = await Promise.all([
      client.query(
        'SELECT id FROM items WHERE id = $1 AND user_id = $2 AND category = $3',
        [top_id, userId, 'top']
      ),
      client.query(
        'SELECT id FROM items WHERE id = $1 AND user_id = $2 AND category = $3',
        [bottom_id, userId, 'bottom']
      ),
    ]);

    if (topResult.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Invalid top item' });
    }
    if (bottomResult.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Invalid bottom item' });
    }

    const { rows } = await client.query(
      `INSERT INTO outfits (user_id, top_id, bottom_id)
       VALUES ($1, $2, $3)
       RETURNING id, top_id, bottom_id, created_at`,
      [userId, top_id, bottom_id]
    );

    await client.query('COMMIT');

    res.status(201).json({ outfit: rows[0] });
  } catch (err) {
    await client.query('ROLLBACK');
    // 중복 조합 저장 시도 (UNIQUE 제약)
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
    // 코디 목록 + 상의/하의 이미지 URL을 JOIN으로 한 번에 조회
    const { rows } = await query(
      `SELECT
         o.id,
         o.created_at,
         json_build_object(
           'id',        t.id,
           'image_url', t.image_url,
           'category',  t.category
         ) AS top,
         json_build_object(
           'id',        b.id,
           'image_url', b.image_url,
           'category',  b.category
         ) AS bottom
       FROM outfits o
       JOIN items t ON o.top_id    = t.id
       JOIN items b ON o.bottom_id = b.id
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
