const pptxgen = require("/tmp/pptx_tmp/node_modules/pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "CLUELESS CLOSET";

// ── Color palette ──────────────────────────────
const NAVY   = "2C4A8A";   // main accent
const NAVY_L = "3D5A99";   // lighter navy
const NAVY_XL= "EEF1F8";   // very light navy tint (bg accent)
const WHITE  = "FFFFFF";
const DARK   = "1A1A2E";   // near-black for titles
const GRAY   = "6B7280";   // body text
const LGRAY  = "F3F4F6";   // light bg for cards
const CODE_BG= "1E293B";   // dark bg for code blocks
const CODE_FG= "E2E8F0";   // light text for code

const makeShadow = () => ({ type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.10 });

// ══════════════════════════════════════════════════════════
// SLIDE 1 — Title
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  // Left navy panel
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 3.8, h: 5.625,
    fill: { color: NAVY }, line: { color: NAVY }
  });

  // Decorative circles on navy panel
  s.addShape(pres.shapes.OVAL, {
    x: -0.6, y: 3.8, w: 2.5, h: 2.5,
    fill: { color: NAVY_L }, line: { color: NAVY_L }
  });
  s.addShape(pres.shapes.OVAL, {
    x: 1.8, y: -0.6, w: 1.8, h: 1.8,
    fill: { color: NAVY_L }, line: { color: NAVY_L }
  });

  // Left panel label
  s.addText("DATABASE\nPROJECT", {
    x: 0.3, y: 0.4, w: 3.2, h: 0.8,
    fontSize: 9, bold: true, color: "CADCFC",
    charSpacing: 4, align: "left", valign: "top"
  });

  // Main title
  s.addText("CLUELESS", {
    x: 4.1, y: 1.0, w: 5.6, h: 1.1,
    fontSize: 60, bold: true, color: DARK,
    fontFace: "Arial Black", align: "left", margin: 0
  });
  s.addText("CLOSET", {
    x: 4.1, y: 2.0, w: 5.6, h: 1.1,
    fontSize: 60, bold: true, color: NAVY,
    fontFace: "Arial Black", align: "left", margin: 0
  });

  // Divider line
  s.addShape(pres.shapes.RECTANGLE, {
    x: 4.1, y: 3.2, w: 5.4, h: 0.04,
    fill: { color: NAVY_L }, line: { color: NAVY_L }
  });

  // Subtitle
  s.addText("데이터베이스 연동 웹 서비스 프로젝트", {
    x: 4.1, y: 3.4, w: 5.6, h: 0.5,
    fontSize: 15, bold: true, color: DARK, align: "left"
  });
  s.addText("영화 《Clueless》에서 영감을 받은 디지털 옷장 & 코디 매칭 서비스", {
    x: 4.1, y: 3.9, w: 5.6, h: 0.45,
    fontSize: 11, color: GRAY, align: "left"
  });
}

// ══════════════════════════════════════════════════════════
// SLIDE 2 — 프로젝트 개요
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("프로젝트 개요", {
    x: 0.5, y: 0.3, w: 9, h: 0.65,
    fontSize: 28, bold: true, color: DARK, fontFace: "Arial", margin: 0
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.0, w: 0.06, h: 3.8,
    fill: { color: NAVY }, line: { color: NAVY }
  });

  // Left card — 개발 의의
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.75, y: 1.0, w: 4.1, h: 3.8,
    fill: { color: LGRAY }, line: { color: "E5E7EB" }, shadow: makeShadow()
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.75, y: 1.0, w: 4.1, h: 0.5,
    fill: { color: NAVY }, line: { color: NAVY }
  });
  s.addText("💡  개발 의의", {
    x: 0.75, y: 1.0, w: 4.1, h: 0.5,
    fontSize: 13, bold: true, color: WHITE, align: "left",
    margin: [0, 0, 0, 12]
  });
  s.addText([
    { text: "거동이 불편한 사람도", options: { bullet: true, breakLine: true } },
    { text: "손쉽게 옷 매칭을 미리 시뮬레이션", options: { bullet: true, breakLine: true } },
    { text: "매일 아침 \"뭐 입지?\"의 고민을 디지털로 해결", options: { bullet: true, breakLine: true } },
    { text: "1995년 영화 《Clueless》의", options: { bullet: true, breakLine: true } },
    { text: "컴퓨터 옷장 시스템에서 영감", options: { bullet: true, indentLevel: 1, breakLine: true } },
    { text: "기본 기능을 직접 구현해보는 학습 프로젝트", options: { bullet: true } },
  ], {
    x: 0.85, y: 1.6, w: 3.9, h: 3.1,
    fontSize: 12, color: DARK, paraSpaceAfter: 6
  });

  // Right card — 구현 범위
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.15, y: 1.0, w: 4.35, h: 3.8,
    fill: { color: LGRAY }, line: { color: "E5E7EB" }, shadow: makeShadow()
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.15, y: 1.0, w: 4.35, h: 0.5,
    fill: { color: NAVY_L }, line: { color: NAVY_L }
  });
  s.addText("🗂  구현 범위", {
    x: 5.15, y: 1.0, w: 4.35, h: 0.5,
    fontSize: 13, bold: true, color: WHITE, align: "left",
    margin: [0, 0, 0, 12]
  });
  s.addText([
    { text: "회원가입 / 로그인 (JWT 인증)", options: { bullet: true, breakLine: true } },
    { text: "옷 사진 업로드", options: { bullet: true, breakLine: true } },
    { text: "상의·하의·아우터·신발·액세서리", options: { bullet: true, indentLevel: 1, breakLine: true } },
    { text: "Cloudinary 클라우드 저장", options: { bullet: true, indentLevel: 1, breakLine: true } },
    { text: "상의 + 하의 조합 코디 저장", options: { bullet: true, breakLine: true } },
    { text: "저장된 코디 목록 조회", options: { bullet: true, breakLine: true } },
    { text: "코디 삭제", options: { bullet: true } },
  ], {
    x: 5.25, y: 1.6, w: 4.15, h: 3.1,
    fontSize: 12, color: DARK, paraSpaceAfter: 6
  });
}

// ══════════════════════════════════════════════════════════
// SLIDE 3 — 기술 스택 & 시스템 아키텍처
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("기술 스택 & 시스템 아키텍처", {
    x: 0.5, y: 0.25, w: 9, h: 0.6,
    fontSize: 26, bold: true, color: DARK, margin: 0
  });

  // 4 stack cards
  const cards = [
    {
      x: 0.3, label: "Frontend", color: NAVY,
      items: ["React 18 + Vite", "React Router v6", "Axios (HTTP)", "Y2K / Win98 UI"]
    },
    {
      x: 2.75, label: "Backend", color: NAVY_L,
      items: ["Node.js + Express", "JWT 인증", "bcryptjs 해싱", "express-validator"]
    },
    {
      x: 5.2, label: "Database", color: "374151",
      items: ["PostgreSQL", "pg (node-postgres)", "Connection Pool", "SQL Parameterized"]
    },
    {
      x: 7.65, label: "Cloud", color: "4B5563",
      items: ["Cloudinary", "이미지 업로드", "multer 연동", "URL → DB 저장"]
    },
  ];

  cards.forEach(c => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: 1.0, w: 2.2, h: 3.3,
      fill: { color: LGRAY }, line: { color: "E5E7EB" }, shadow: makeShadow()
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: 1.0, w: 2.2, h: 0.45,
      fill: { color: c.color }, line: { color: c.color }
    });
    s.addText(c.label, {
      x: c.x, y: 1.0, w: 2.2, h: 0.45,
      fontSize: 12, bold: true, color: WHITE, align: "center"
    });
    s.addText(c.items.map((t, i) => ({
      text: t, options: { bullet: true, breakLine: i < c.items.length - 1 }
    })), {
      x: c.x + 0.1, y: 1.55, w: 2.0, h: 2.6,
      fontSize: 11, color: DARK, paraSpaceAfter: 5
    });
  });

  // Arrow flow
  const arrowY = 4.55;
  const flowItems = ["Browser", "React", "Axios", "Express API", "PostgreSQL\n/ Cloudinary"];
  const startXs   = [0.28, 1.62, 3.05, 4.48, 6.5];
  const boxW = 1.2;

  flowItems.forEach((label, i) => {
    const bx = startXs[i];
    s.addShape(pres.shapes.RECTANGLE, {
      x: bx, y: arrowY - 0.05, w: boxW, h: 0.55,
      fill: { color: i === 0 ? LGRAY : i === 4 ? NAVY : NAVY_L },
      line: { color: i === 0 ? "D1D5DB" : NAVY }
    });
    s.addText(label, {
      x: bx, y: arrowY - 0.05, w: boxW, h: 0.55,
      fontSize: 9.5, bold: true,
      color: i === 0 ? DARK : WHITE,
      align: "center", valign: "middle"
    });
    if (i < flowItems.length - 1) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: bx + boxW, y: arrowY + 0.22, w: 0.22, h: 0.06,
        fill: { color: NAVY }, line: { color: NAVY }
      });
      s.addText("▶", {
        x: bx + boxW + 0.1, y: arrowY + 0.14, w: 0.15, h: 0.2,
        fontSize: 8, color: NAVY, margin: 0
      });
    }
  });

  s.addText("▶ 요청 흐름", {
    x: 7.85, y: arrowY + 0.1, w: 1.8, h: 0.3,
    fontSize: 9, color: GRAY, italic: true
  });
}

// ══════════════════════════════════════════════════════════
// SLIDE 4 — DB 설계 (릴레이션)
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("데이터베이스 설계 — 릴레이션(Relation) 정의", {
    x: 0.4, y: 0.2, w: 9.2, h: 0.55,
    fontSize: 23, bold: true, color: DARK, margin: 0
  });

  const headerOpts = (txt) => ({
    text: txt,
    options: { fill: { color: NAVY }, color: WHITE, bold: true }
  });
  const rowOpts = (txt, shade) => ({
    text: txt,
    options: { fill: { color: shade ? "F0F3FB" : WHITE }, color: DARK }
  });

  const tblOpts = {
    border: { pt: 0.5, color: "D1D5DB" },
    fontSize: 10,
    align: "left",
    valign: "middle",
  };

  // users
  s.addText("users", { x: 0.4, y: 0.9, w: 2.8, h: 0.3, fontSize: 12, bold: true, color: NAVY, margin: 0 });
  s.addTable([
    [headerOpts("컬럼"), headerOpts("타입"), headerOpts("제약조건")],
    [rowOpts("id", false),             rowOpts("SERIAL", false),          rowOpts("PRIMARY KEY", false)],
    [rowOpts("email", true),           rowOpts("VARCHAR(255)", true),      rowOpts("NOT NULL, UNIQUE", true)],
    [rowOpts("password_hash", false),  rowOpts("VARCHAR(255)", false),     rowOpts("NOT NULL", false)],
    [rowOpts("created_at", true),      rowOpts("TIMESTAMPTZ", true),       rowOpts("DEFAULT NOW()", true)],
  ], { x: 0.4, y: 1.2, w: 4.0, colW: [1.2, 1.3, 1.5], ...tblOpts });

  // items
  s.addText("items", { x: 5.2, y: 0.9, w: 2.8, h: 0.3, fontSize: 12, bold: true, color: NAVY, margin: 0 });
  s.addTable([
    [headerOpts("컬럼"), headerOpts("타입"), headerOpts("제약조건")],
    [rowOpts("id", false),         rowOpts("SERIAL", false),         rowOpts("PRIMARY KEY", false)],
    [rowOpts("user_id", true),     rowOpts("INTEGER", true),          rowOpts("FK → users(id)", true)],
    [rowOpts("image_url", false),  rowOpts("VARCHAR(500)", false),    rowOpts("NOT NULL", false)],
    [rowOpts("category", true),    rowOpts("ENUM", true),             rowOpts("NOT NULL", true)],
    [rowOpts("created_at", false), rowOpts("TIMESTAMPTZ", false),     rowOpts("DEFAULT NOW()", false)],
  ], { x: 5.2, y: 1.2, w: 4.5, colW: [1.2, 1.3, 2.0], ...tblOpts });

  // ENUM note
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 3.15, w: 4.5, h: 0.45,
    fill: { color: NAVY_XL }, line: { color: "C7D3F0" }
  });
  s.addText("ENUM item_category: 'top' | 'bottom' | 'outer' | 'shoes' | 'accessory'", {
    x: 5.3, y: 3.18, w: 4.3, h: 0.38,
    fontSize: 9.5, color: NAVY, italic: true, valign: "middle"
  });

  // outfits
  s.addText("outfits", { x: 0.4, y: 3.6, w: 2.8, h: 0.3, fontSize: 12, bold: true, color: NAVY, margin: 0 });
  s.addTable([
    [headerOpts("컬럼"), headerOpts("타입"), headerOpts("제약조건")],
    [rowOpts("id", false),         rowOpts("SERIAL", false),     rowOpts("PRIMARY KEY", false)],
    [rowOpts("user_id", true),     rowOpts("INTEGER", true),      rowOpts("FK → users(id) CASCADE", true)],
    [rowOpts("top_id", false),     rowOpts("INTEGER", false),     rowOpts("FK → items(id) CASCADE", false)],
    [rowOpts("bottom_id", true),   rowOpts("INTEGER", true),      rowOpts("FK → items(id) CASCADE", true)],
    [rowOpts("created_at", false), rowOpts("TIMESTAMPTZ", false), rowOpts("DEFAULT NOW()", false)],
    [{ text: "—", options: { fill: { color: "FEF9C3" }, color: DARK, bold: true } },
     { text: "UNIQUE", options: { fill: { color: "FEF9C3" }, color: DARK } },
     { text: "(user_id, top_id, bottom_id)", options: { fill: { color: "FEF9C3" }, color: DARK } }],
  ], { x: 0.4, y: 3.9, w: 4.6, colW: [1.2, 1.3, 2.1], ...tblOpts });

  // FK arrows (simple labels)
  s.addText("← ON DELETE CASCADE\n← FK 연결로 데이터 무결성 보장", {
    x: 5.2, y: 3.7, w: 4.5, h: 0.8,
    fontSize: 10, color: GRAY, italic: true
  });
}

// ══════════════════════════════════════════════════════════
// SLIDE 5 — DBMS 연동 구조
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("웹 서비스 ↔ DBMS 연동 구조", {
    x: 0.5, y: 0.2, w: 9, h: 0.6,
    fontSize: 26, bold: true, color: DARK, margin: 0
  });

  // Left: connection info
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 0.95, w: 4.2, h: 1.4,
    fill: { color: LGRAY }, line: { color: "E5E7EB" }, shadow: makeShadow()
  });
  s.addText("연동 방식", {
    x: 0.6, y: 1.0, w: 3.8, h: 0.35,
    fontSize: 13, bold: true, color: NAVY, margin: 0
  });
  s.addText([
    { text: "라이브러리: node-postgres (pg)", options: { bullet: true, breakLine: true } },
    { text: "연결: Connection Pool (pg.Pool)", options: { bullet: true, breakLine: true } },
    { text: "환경변수 DATABASE_URL로 보안 관리", options: { bullet: true } },
  ], {
    x: 0.6, y: 1.38, w: 3.8, h: 0.9,
    fontSize: 11, color: DARK
  });

  // Code block — connection pool
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 2.48, w: 4.2, h: 1.55,
    fill: { color: CODE_BG }, line: { color: CODE_BG }, shadow: makeShadow()
  });
  s.addText([
    { text: "// db/index.js", options: { color: "64748B", breakLine: true } },
    { text: "const pool = ", options: { color: CODE_FG } },
    { text: "new Pool", options: { color: "93C5FD" } },
    { text: "({ connectionString: process.env.DATABASE_URL });", options: { color: CODE_FG, breakLine: true } },
    { text: "export const query = ", options: { color: CODE_FG } },
    { text: "(text, params)", options: { color: "FCA5A5" } },
    { text: " => pool.query(text, params);", options: { color: CODE_FG, breakLine: true } },
    { text: "export const getClient = ", options: { color: CODE_FG } },
    { text: "()", options: { color: "FCA5A5" } },
    { text: " => pool.connect();", options: { color: CODE_FG } },
  ], {
    x: 0.55, y: 2.55, w: 4.0, h: 1.4,
    fontSize: 9.5, fontFace: "Consolas"
  });

  // Right: API flow
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.0, y: 0.95, w: 4.65, h: 4.35,
    fill: { color: LGRAY }, line: { color: "E5E7EB" }, shadow: makeShadow()
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.0, y: 0.95, w: 4.65, h: 0.42,
    fill: { color: NAVY }, line: { color: NAVY }
  });
  s.addText("API 요청 흐름", {
    x: 5.0, y: 0.95, w: 4.65, h: 0.42,
    fontSize: 12, bold: true, color: WHITE, align: "center"
  });

  const steps = [
    { n: "1", t: "클라이언트 HTTP 요청", sub: "React + Axios" },
    { n: "2", t: "Express 라우터 수신", sub: "route 매핑" },
    { n: "3", t: "JWT 인증 미들웨어", sub: "토큰 검증" },
    { n: "4", t: "Controller → query() 호출", sub: "SQL 실행" },
    { n: "5", t: "PostgreSQL 결과 반환", sub: "JSON 응답" },
  ];

  steps.forEach((st, i) => {
    const sy = 1.5 + i * 0.72;
    s.addShape(pres.shapes.OVAL, {
      x: 5.15, y: sy, w: 0.38, h: 0.38,
      fill: { color: NAVY }, line: { color: NAVY }
    });
    s.addText(st.n, {
      x: 5.15, y: sy, w: 0.38, h: 0.38,
      fontSize: 11, bold: true, color: WHITE, align: "center", valign: "middle"
    });
    s.addText(st.t, {
      x: 5.65, y: sy, w: 3.8, h: 0.25,
      fontSize: 11, bold: true, color: DARK, margin: 0
    });
    s.addText(st.sub, {
      x: 5.65, y: sy + 0.24, w: 3.8, h: 0.2,
      fontSize: 9.5, color: GRAY, italic: true, margin: 0
    });
    if (i < steps.length - 1) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 5.3, y: sy + 0.4, w: 0.05, h: 0.28,
        fill: { color: NAVY_L }, line: { color: NAVY_L }
      });
    }
  });
}

// ══════════════════════════════════════════════════════════
// SLIDE 6 — 쿼리 활용
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("쿼리(Query) 활용 사례", {
    x: 0.5, y: 0.2, w: 9, h: 0.55,
    fontSize: 26, bold: true, color: DARK, margin: 0
  });

  const blocks = [
    {
      x: 0.3, y: 0.9, w: 3.0,
      label: "① 카테고리 필터 조회",
      code: "SELECT id, image_url,\n  category, created_at\nFROM items\nWHERE user_id = $1\n  AND category = $2\nORDER BY created_at DESC",
      note: "Parameterized query → SQL Injection 방지\n인덱스(user_id, category) 활용"
    },
    {
      x: 3.55, y: 0.9, w: 3.35,
      label: "② 코디 조회 — 3테이블 JOIN",
      code: "SELECT o.id,\n  json_build_object(\n    'id', t.id,\n    'image_url', t.image_url\n  ) AS top,\n  json_build_object(\n    'id', b.id,\n    'image_url', b.image_url\n  ) AS bottom\nFROM outfits o\nJOIN items t ON o.top_id = t.id\nJOIN items b ON o.bottom_id = b.id\nWHERE o.user_id = $1",
      note: "단일 쿼리로 outfits + items(상의)\n+ items(하의) 동시 조회"
    },
    {
      x: 7.1, y: 0.9, w: 2.6,
      label: "③ 중복 이메일 확인",
      code: "SELECT id\nFROM users\nWHERE email = $1",
      note: "회원가입 시 사전 중복 체크\nUNIQUE 제약과 이중 방어"
    },
  ];

  blocks.forEach(b => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: b.x, y: b.y, w: b.w, h: 4.4,
      fill: { color: LGRAY }, line: { color: "E5E7EB" }, shadow: makeShadow()
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: b.x, y: b.y, w: b.w, h: 0.42,
      fill: { color: NAVY }, line: { color: NAVY }
    });
    s.addText(b.label, {
      x: b.x + 0.1, y: b.y, w: b.w - 0.1, h: 0.42,
      fontSize: 10.5, bold: true, color: WHITE, align: "left", valign: "middle"
    });
    // Code area
    s.addShape(pres.shapes.RECTANGLE, {
      x: b.x + 0.1, y: b.y + 0.52, w: b.w - 0.2, h: 3.0,
      fill: { color: CODE_BG }, line: { color: CODE_BG }
    });
    s.addText(b.code, {
      x: b.x + 0.18, y: b.y + 0.58, w: b.w - 0.36, h: 2.9,
      fontSize: 9, fontFace: "Consolas", color: "93C5FD",
      valign: "top"
    });
    // Note
    s.addText(b.note, {
      x: b.x + 0.1, y: b.y + 3.65, w: b.w - 0.2, h: 0.65,
      fontSize: 9.5, color: GRAY, italic: true, valign: "top"
    });
  });
}

// ══════════════════════════════════════════════════════════
// SLIDE 7 — 트랜잭션
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("트랜잭션(Transaction) 활용 — 코디 저장", {
    x: 0.4, y: 0.2, w: 9.2, h: 0.55,
    fontSize: 23, bold: true, color: DARK, margin: 0
  });

  // Why section
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 0.88, w: 3.0, h: 4.4,
    fill: { color: LGRAY }, line: { color: "E5E7EB" }, shadow: makeShadow()
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 0.88, w: 3.0, h: 0.42,
    fill: { color: NAVY }, line: { color: NAVY }
  });
  s.addText("왜 트랜잭션이 필요한가?", {
    x: 0.5, y: 0.88, w: 2.9, h: 0.42,
    fontSize: 11, bold: true, color: WHITE, align: "left", valign: "middle"
  });
  s.addText([
    { text: "코디 저장 시 3단계가 원자적으로 실행되어야 함", options: { bullet: true, breakLine: true } },
    { text: "", options: { breakLine: true } },
    { text: "① top_id가 해당 유저 소유의 'top' 아이템인지 확인", options: { bullet: { indent: 20 }, breakLine: true } },
    { text: "② bottom_id가 해당 유저 소유의 'bottom' 아이템인지 확인", options: { bullet: { indent: 20 }, breakLine: true } },
    { text: "③ 두 조건 모두 충족 시에만 outfits 테이블에 INSERT", options: { bullet: { indent: 20 }, breakLine: true } },
    { text: "", options: { breakLine: true } },
    { text: "중간에 실패하면 ROLLBACK → 불완전한 데이터 저장 방지", options: { bullet: true } },
  ], {
    x: 0.5, y: 1.38, w: 2.8, h: 3.8,
    fontSize: 10.5, color: DARK, paraSpaceAfter: 3
  });

  // Code block
  s.addShape(pres.shapes.RECTANGLE, {
    x: 3.6, y: 0.88, w: 6.1, h: 3.0,
    fill: { color: CODE_BG }, line: { color: CODE_BG }, shadow: makeShadow()
  });
  s.addText([
    { text: "const client = await getClient(); // Pool에서 전용 클라이언트 획득\n", options: { color: CODE_FG } },
    { text: "await client.query('BEGIN');\n\n", options: { color: "86EFAC" } },
    { text: "// 두 검증 쿼리 병렬 실행\n", options: { color: "64748B" } },
    { text: "const [topResult, bottomResult] = await Promise.all([\n", options: { color: CODE_FG } },
    { text: "  client.query('SELECT id FROM items WHERE id=$1 AND user_id=$2 AND category=$3',\n              [top_id, userId, 'top']),\n", options: { color: "FCA5A5" } },
    { text: "  client.query('SELECT id FROM items WHERE id=$1 AND user_id=$2 AND category=$3',\n              [bottom_id, userId, 'bottom'])\n", options: { color: "FCA5A5" } },
    { text: "]);\n\n", options: { color: CODE_FG } },
    { text: "if (topResult.rowCount === 0) { await client.query('ROLLBACK'); ... }\n", options: { color: "FCD34D" } },
    { text: "if (bottomResult.rowCount === 0) { await client.query('ROLLBACK'); ... }\n\n", options: { color: "FCD34D" } },
    { text: "await client.query('INSERT INTO outfits (user_id, top_id, bottom_id) VALUES ($1,$2,$3)', [...]);\n", options: { color: "93C5FD" } },
    { text: "await client.query('COMMIT');", options: { color: "86EFAC" } },
  ], {
    x: 3.75, y: 0.95, w: 5.85, h: 2.88,
    fontSize: 8.5, fontFace: "Consolas", valign: "top"
  });

  // ACID cards
  const acid = [
    { letter: "A", name: "Atomicity", desc: "검증 실패 시 ROLLBACK\n→ 부분 삽입 없음" },
    { letter: "C", name: "Consistency", desc: "UNIQUE 제약으로\n중복 조합 방지 (23505)" },
    { letter: "I", name: "Isolation", desc: "전용 클라이언트로\n트랜잭션 격리" },
    { letter: "D", name: "Durability", desc: "COMMIT 후\n영속 저장 보장" },
  ];
  acid.forEach((a, i) => {
    const ax = 3.6 + i * 1.52;
    s.addShape(pres.shapes.RECTANGLE, {
      x: ax, y: 4.05, w: 1.45, h: 1.3,
      fill: { color: i % 2 === 0 ? NAVY_XL : LGRAY }, line: { color: "D1D5DB" }, shadow: makeShadow()
    });
    s.addShape(pres.shapes.OVAL, {
      x: ax + 0.5, y: 4.08, w: 0.42, h: 0.42,
      fill: { color: NAVY }, line: { color: NAVY }
    });
    s.addText(a.letter, {
      x: ax + 0.5, y: 4.08, w: 0.42, h: 0.42,
      fontSize: 13, bold: true, color: WHITE, align: "center", valign: "middle"
    });
    s.addText(a.name, {
      x: ax + 0.05, y: 4.55, w: 1.35, h: 0.25,
      fontSize: 10, bold: true, color: NAVY, align: "center", margin: 0
    });
    s.addText(a.desc, {
      x: ax + 0.05, y: 4.8, w: 1.35, h: 0.5,
      fontSize: 8.5, color: DARK, align: "center"
    });
  });
}

// ══════════════════════════════════════════════════════════
// SLIDE 8 — 보안 & 무결성
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("보안 & 데이터 무결성", {
    x: 0.5, y: 0.2, w: 9, h: 0.55,
    fontSize: 26, bold: true, color: DARK, margin: 0
  });

  const panels = [
    {
      x: 0.3, title: "🔐  인증 보안", color: NAVY,
      items: [
        "bcryptjs (rounds=12) — 비밀번호 단방향 해싱",
        "JWT (7일 만료) — Bearer Token 방식",
        "모든 /items, /outfits API는 JWT 검증 후 접근",
        "토큰 만료 / 위변조 시 401 응답",
      ]
    },
    {
      x: 3.55, title: "🛡  데이터 무결성", color: NAVY_L,
      items: [
        "FK ON DELETE CASCADE: 유저 삭제 시 연관 데이터 자동 삭제",
        "UNIQUE(user_id, top_id, bottom_id): 코디 중복 저장 방지",
        "item_category ENUM: DB 레벨에서 잘못된 카테고리 차단",
        "Parameterized Query ($1,$2): SQL Injection 원천 차단",
      ]
    },
    {
      x: 7.05, title: "☁️  이미지 관리", color: "374151",
      items: [
        "Cloudinary에 이미지 저장",
        "DB에는 URL만 보관",
        "아이템 삭제 시 Cloudinary도 동시 삭제",
        "(Promise.all 병렬 처리)",
      ]
    },
  ];

  panels.forEach(p => {
    const pw = p.x === 7.05 ? 2.65 : 3.0;
    s.addShape(pres.shapes.RECTANGLE, {
      x: p.x, y: 0.9, w: pw, h: 4.4,
      fill: { color: LGRAY }, line: { color: "E5E7EB" }, shadow: makeShadow()
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: p.x, y: 0.9, w: pw, h: 0.45,
      fill: { color: p.color }, line: { color: p.color }
    });
    s.addText(p.title, {
      x: p.x + 0.1, y: 0.9, w: pw - 0.1, h: 0.45,
      fontSize: 12, bold: true, color: WHITE, align: "left", valign: "middle"
    });
    s.addText(p.items.map((t, i) => ({
      text: t, options: { bullet: true, breakLine: i < p.items.length - 1 }
    })), {
      x: p.x + 0.15, y: 1.45, w: pw - 0.25, h: 3.75,
      fontSize: 10.5, color: DARK, paraSpaceAfter: 8
    });
  });
}

// ══════════════════════════════════════════════════════════
// SLIDE 9 — API 엔드포인트
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("API 엔드포인트 구조", {
    x: 0.5, y: 0.2, w: 9, h: 0.55,
    fontSize: 26, bold: true, color: DARK, margin: 0
  });

  const H = (t) => ({ text: t, options: { fill: { color: NAVY }, color: WHITE, bold: true, fontSize: 11 } });
  const methodColor = (m) => m === "POST" ? "3B82F6" : m === "GET" ? "10B981" : "EF4444";
  const C = (t, shade, bold=false, color=null) => ({
    text: t,
    options: { fill: { color: shade ? "F0F3FB" : WHITE }, color: color || DARK, bold, fontSize: 10.5 }
  });
  const Cm = (m, shade) => ({
    text: m,
    options: { fill: { color: shade ? "F0F3FB" : WHITE }, color: methodColor(m), bold: true, fontSize: 10.5 }
  });

  const rows = [
    [Cm("POST", false),   C("/api/auth/signup", false), C("회원가입", false), C("✗", false, false, "EF4444")],
    [Cm("POST", true),    C("/api/auth/login", true),   C("로그인 (JWT 발급)", true), C("✗", true, false, "EF4444")],
    [Cm("GET", false),    C("/api/auth/me", false),     C("내 정보 조회", false), C("✓", false, true, "10B981")],
    [Cm("POST", true),    C("/api/items", true),        C("옷 업로드 (이미지+카테고리)", true), C("✓", true, true, "10B981")],
    [Cm("GET", false),    C("/api/items?category=", false), C("아이템 목록 조회", false), C("✓", false, true, "10B981")],
    [Cm("DELETE", true),  C("/api/items/:id", true),    C("아이템 삭제 (Cloudinary 연동)", true), C("✓", true, true, "10B981")],
    [Cm("POST", false),   C("/api/outfits", false),     C("코디 저장 (트랜잭션)", false), C("✓", false, true, "10B981")],
    [Cm("GET", true),     C("/api/outfits", true),      C("저장된 코디 목록 (JOIN)", true), C("✓", true, true, "10B981")],
    [Cm("DELETE", false), C("/api/outfits/:id", false), C("코디 삭제", false), C("✓", false, true, "10B981")],
  ];

  s.addTable(
    [[H("Method"), H("Endpoint"), H("설명"), H("인증")], ...rows],
    {
      x: 0.5, y: 0.9, w: 9.1,
      colW: [1.0, 2.4, 4.3, 1.4],
      border: { pt: 0.5, color: "E5E7EB" },
      align: "left", valign: "middle",
      rowH: 0.42,
    }
  );
}

// ══════════════════════════════════════════════════════════
// SLIDE 10 — 마무리
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  // Navy left panel
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 3.5, h: 5.625,
    fill: { color: NAVY }, line: { color: NAVY }
  });
  s.addShape(pres.shapes.OVAL, {
    x: -0.5, y: 3.5, w: 2.2, h: 2.2,
    fill: { color: NAVY_L }, line: { color: NAVY_L }
  });

  s.addText("정리", {
    x: 0.3, y: 2.1, w: 2.9, h: 0.8,
    fontSize: 42, bold: true, color: WHITE, fontFace: "Arial Black", margin: 0
  });
  s.addText("CLUELESS CLOSET", {
    x: 0.3, y: 2.95, w: 2.9, h: 0.4,
    fontSize: 10, bold: true, color: "CADCFC", charSpacing: 2
  });

  const summaryItems = [
    { icon: "🗄", title: "관계형 DB 설계", desc: "users ↔ items ↔ outfits 3테이블 릴레이션" },
    { icon: "⚡", title: "Connection Pool", desc: "pg.Pool로 효율적인 DB 연결 관리" },
    { icon: "🔍", title: "Parameterized Query", desc: "SQL Injection 방지 + 인덱스 활용" },
    { icon: "🔄", title: "Transaction", desc: "BEGIN/COMMIT/ROLLBACK으로 데이터 일관성" },
    { icon: "🛡", title: "DB 레벨 무결성", desc: "UNIQUE · ENUM · FK CASCADE" },
    { icon: "🔐", title: "인증 & 보안", desc: "JWT + bcrypt + Cloudinary 분리 저장" },
  ];

  summaryItems.forEach((item, i) => {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const ix = 3.75 + col * 3.05;
    const iy = 0.55 + row * 1.58;

    s.addShape(pres.shapes.RECTANGLE, {
      x: ix, y: iy, w: 2.8, h: 1.38,
      fill: { color: i % 2 === 0 ? LGRAY : NAVY_XL }, line: { color: "E5E7EB" }, shadow: makeShadow()
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: ix, y: iy, w: 0.07, h: 1.38,
      fill: { color: NAVY }, line: { color: NAVY }
    });
    s.addText(item.icon + "  " + item.title, {
      x: ix + 0.18, y: iy + 0.15, w: 2.55, h: 0.35,
      fontSize: 12, bold: true, color: NAVY, margin: 0
    });
    s.addText(item.desc, {
      x: ix + 0.18, y: iy + 0.52, w: 2.55, h: 0.7,
      fontSize: 10.5, color: DARK
    });
  });
}

// ── Write file ─────────────────────────────────
pres.writeFile({ fileName: "/Users/haeunkim/clueless_closet/CLUELESS_CLOSET_발표.pptx" })
  .then(() => console.log("✅ PPTX saved!"))
  .catch(e => console.error("❌", e));
