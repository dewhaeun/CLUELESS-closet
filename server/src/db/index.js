import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // 로컬 개발 시 SSL 끄기, 배포 환경에서는 환경변수로 제어
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false,
});

pool.on('error', (err) => {
  console.error('Unexpected DB client error', err);
  process.exit(1);
});

/**
 * 일반 쿼리 실행
 * @param {string} text  SQL 문
 * @param {any[]}  params 바인딩 파라미터
 */
export const query = (text, params) => pool.query(text, params);

/**
 * 트랜잭션용 클라이언트 체크아웃
 * 사용 후 반드시 client.release() 호출
 */
export const getClient = () => pool.connect();

export default pool;
