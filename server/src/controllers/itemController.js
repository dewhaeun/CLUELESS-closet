import { query } from '../db/index.js';
import { cloudinary } from '../config/cloudinary.js';

const VALID_CATEGORIES = ['top', 'bottom', 'outer', 'shoes', 'accessory'];

export const uploadItem = async (req, res, next) => {
  try {
    const { category } = req.body;

    if (!VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({ error: `category must be one of: ${VALID_CATEGORIES.join(', ')}` });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const image_url = req.file.path; // Cloudinary가 반환한 URL

    const { rows } = await query(
      `INSERT INTO items (user_id, image_url, category)
       VALUES ($1, $2, $3)
       RETURNING id, image_url, category, created_at`,
      [req.user.userId, image_url, category]
    );

    res.status(201).json({ item: rows[0] });
  } catch (err) {
    next(err);
  }
};

export const getItems = async (req, res, next) => {
  try {
    const { category } = req.query;

    // category 쿼리 파라미터 유무에 따라 필터 분기
    const { rows } = category
      ? await query(
          `SELECT id, image_url, category, created_at
           FROM items
           WHERE user_id = $1 AND category = $2
           ORDER BY created_at DESC`,
          [req.user.userId, category]
        )
      : await query(
          `SELECT id, image_url, category, created_at
           FROM items
           WHERE user_id = $1
           ORDER BY created_at DESC`,
          [req.user.userId]
        );

    res.json({ items: rows });
  } catch (err) {
    next(err);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    // 본인 아이템인지 확인하면서 image_url도 가져오기
    const { rows } = await query(
      'SELECT id, image_url FROM items WHERE id = $1 AND user_id = $2',
      [id, req.user.userId]
    );

    if (!rows[0]) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Cloudinary에서도 삭제 (URL에서 public_id 추출)
    const publicId = rows[0].image_url
      .split('/')
      .slice(-2)           // ['clueless-closet', 'filename.jpg']
      .join('/')
      .replace(/\.[^.]+$/, ''); // 확장자 제거

    await Promise.all([
      cloudinary.uploader.destroy(publicId),
      query('DELETE FROM items WHERE id = $1', [id]),
    ]);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
