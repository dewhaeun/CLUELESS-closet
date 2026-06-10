import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import WindowFrame from '../components/WindowFrame';
import UploadModal from '../components/UploadModal';
import { getItems } from '../api/items';
import { saveOutfit } from '../api/outfits';

// 왼쪽 프레임 (TOP, BOTTOM)
const L_W = 305, L_H = 215;
// 왼쪽 SHOES 프레임 (더 낮게)
const S_H = 150;
// 오른쪽 프레임 (OUTER, ACCESSORY)
const R_W = 230, R_H = 215;

/* ─── 공용 ItemRow 컴포넌트 ───────────────────── */
function ItemRow({ label, items, index, onPrev, onNext, frameW, frameH, optional = false, active, onToggle }) {
  const current = items[index];
  const isEmpty  = items.length === 0;
  const grayed   = optional && !active;

  return (
    <div style={{ opacity: grayed ? 0.42 : 1, transition: 'opacity 0.2s' }}>
      {/* 헤더 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '3px 2px',
        borderBottom: '1px solid var(--shadow)',
        marginBottom: 3,
      }}>
        <span style={{ fontSize: 10, fontWeight: 'bold', letterSpacing: 2 }}>{label}</span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {/* 선택 아이템 토글 */}
          {optional && (
            <button
              className={`win-btn ${active ? 'win-btn-primary' : ''}`}
              onClick={onToggle}
              style={{ fontSize: 9, padding: '1px 6px', minWidth: 'unset' }}
            >
              {active ? '✓ 포함' : '— 제외'}
            </button>
          )}
          <button className="carousel-btn" onClick={onPrev} disabled={isEmpty || grayed}>◀</button>
          <span style={{ fontSize: 9, color: 'var(--shadow)', minWidth: 28, textAlign: 'center' }}>
            {isEmpty ? '—' : `${index + 1}/${items.length}`}
          </span>
          <button className="carousel-btn" onClick={onNext} disabled={isEmpty || grayed}>▶</button>
        </div>
      </div>

      {/* 이미지 프레임 */}
      <div style={{
        width: frameW,
        height: frameH,
        background: 'var(--silver)',
        border: '2px solid',
        borderColor: 'var(--dark-shadow) var(--highlight) var(--highlight) var(--dark-shadow)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {grayed ? (
          <span style={{ fontSize: 10, color: 'var(--shadow)' }}>— 포함 안 함</span>
        ) : current ? (
          <img
            src={current.image_url}
            alt={label}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span style={{ fontSize: 10, color: 'var(--shadow)', textAlign: 'center', padding: '0 8px' }}>
            아직 없어요
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── ClosetPage ──────────────────────────────── */
export default function ClosetPage() {
  // 필수
  const [tops,    setTops]    = useState([]);
  const [bottoms, setBottoms] = useState([]);
  const [topIdx,    setTopIdx]    = useState(0);
  const [bottomIdx, setBottomIdx] = useState(0);

  // 선택
  const [outers,      setOuters]      = useState([]);
  const [shoesItems,  setShoesItems]  = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [outerIdx,  setOuterIdx]  = useState(0);
  const [shoesIdx,  setShoesIdx]  = useState(0);
  const [accIdx,    setAccIdx]    = useState(0);

  // 선택 아이템 포함 여부
  const [includeOuter, setIncludeOuter] = useState(false);
  const [includeShoes, setIncludeShoes] = useState(false);
  const [includeAcc,   setIncludeAcc]   = useState(false);

  const [showUpload, setShowUpload] = useState(false);
  const [msg,        setMsg]        = useState(null);
  const [matching,   setMatching]   = useState(false);

  useEffect(() => {
    Promise.all([
      getItems('top'), getItems('bottom'),
      getItems('outer'), getItems('shoes'), getItems('accessory'),
    ]).then(([t, b, o, sh, ac]) => {
      setTops(t);    setBottoms(b);
      setOuters(o);  setShoesItems(sh);  setAccessories(ac);
      // 아이템이 있으면 기본 포함
      if (o.length  > 0) setIncludeOuter(true);
      if (sh.length > 0) setIncludeShoes(true);
      if (ac.length > 0) setIncludeAcc(true);
    });
  }, []);

  const flash = (text, type = 'error') => {
    setMsg({ text, type });
    setTimeout(() => setMsg(null), 2500);
  };

  const handleSave = async () => {
    const top    = tops[topIdx];
    const bottom = bottoms[bottomIdx];
    if (!top || !bottom) return;

    const outerId = (includeOuter && outers[outerIdx])      ? outers[outerIdx].id      : null;
    const shoesId = (includeShoes && shoesItems[shoesIdx])  ? shoesItems[shoesIdx].id  : null;
    const accId   = (includeAcc   && accessories[accIdx])   ? accessories[accIdx].id   : null;

    try {
      await saveOutfit(top.id, bottom.id, outerId, shoesId, accId);
      setMatching(true);
      setTimeout(() => setMatching(false), 2000);
    } catch (err) {
      if (err.response?.status === 409) flash('이미 저장된 코디예요!', 'info');
      else flash('저장에 실패했어요.', 'error');
    }
  };

  const handleUploaded = (item) => {
    switch (item.category) {
      case 'top':       setTops(p      => [item, ...p]); setTopIdx(0);    break;
      case 'bottom':    setBottoms(p   => [item, ...p]); setBottomIdx(0); break;
      case 'outer':     setOuters(p    => [item, ...p]); setOuterIdx(0);  setIncludeOuter(true); break;
      case 'shoes':     setShoesItems(p=> [item, ...p]); setShoesIdx(0);  setIncludeShoes(true); break;
      case 'accessory': setAccessories(p=>[item, ...p]); setAccIdx(0);    setIncludeAcc(true);   break;
    }
  };

  const wrap = (len, fn) => (i) => (i + len) % len;

  const msgColor = { error: '#cc0000', info: 'var(--blue)' };

  return (
    <div className="page">
      <Navbar />

      {/* 매칭 오버레이 */}
      {matching && (
        <div className="matching-overlay">
          <div className="matching-box">
            <div className="matching-text">매칭!</div>
            <div className="matching-sub">★ outfit saved ★</div>
          </div>
        </div>
      )}

      <div className="page-content">
        <WindowFrame title="★ My Closet" width={L_W + R_W + 56}>

          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>

            {/* ── 왼쪽: TOP + BOTTOM + SHOES ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <ItemRow
                label="TOP"
                items={tops} index={topIdx}
                onPrev={() => setTopIdx(wrap(tops.length, i => i - 1)(topIdx))}
                onNext={() => setTopIdx(wrap(tops.length, i => i + 1)(topIdx))}
                frameW={L_W} frameH={L_H}
              />
              <ItemRow
                label="BOTTOM"
                items={bottoms} index={bottomIdx}
                onPrev={() => setBottomIdx(wrap(bottoms.length, i => i - 1)(bottomIdx))}
                onNext={() => setBottomIdx(wrap(bottoms.length, i => i + 1)(bottomIdx))}
                frameW={L_W} frameH={L_H}
              />
              <ItemRow
                label="SHOES"
                items={shoesItems} index={shoesIdx}
                onPrev={() => setShoesIdx(wrap(shoesItems.length, i => i - 1)(shoesIdx))}
                onNext={() => setShoesIdx(wrap(shoesItems.length, i => i + 1)(shoesIdx))}
                frameW={L_W} frameH={S_H}
                optional active={includeShoes}
                onToggle={() => setIncludeShoes(v => !v)}
              />
            </div>

            {/* 세로 구분선 */}
            <div style={{ width: 1, background: 'var(--shadow)', alignSelf: 'stretch', margin: '4px 0' }} />

            {/* ── 오른쪽: OUTER + ACCESSORY ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontSize: 9, color: 'var(--shadow)', letterSpacing: 1, marginBottom: 2 }}>
                OPTIONAL
              </div>
              <ItemRow
                label="OUTER"
                items={outers} index={outerIdx}
                onPrev={() => setOuterIdx(wrap(outers.length, i => i - 1)(outerIdx))}
                onNext={() => setOuterIdx(wrap(outers.length, i => i + 1)(outerIdx))}
                frameW={R_W} frameH={R_H}
                optional active={includeOuter}
                onToggle={() => setIncludeOuter(v => !v)}
              />
              <ItemRow
                label="ACCESSORY"
                items={accessories} index={accIdx}
                onPrev={() => setAccIdx(wrap(accessories.length, i => i - 1)(accIdx))}
                onNext={() => setAccIdx(wrap(accessories.length, i => i + 1)(accIdx))}
                frameW={R_W} frameH={R_H}
                optional active={includeAcc}
                onToggle={() => setIncludeAcc(v => !v)}
              />
            </div>
          </div>

          {/* 하단 버튼 영역 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginTop: 16 }}>
            {msg && (
              <p style={{ fontSize: 11, fontWeight: 'bold', color: msgColor[msg.type] }}>
                {msg.text}
              </p>
            )}
            <button
              className="win-btn win-btn-primary"
              onClick={handleSave}
              disabled={!tops[topIdx] || !bottoms[bottomIdx]}
              style={{ minWidth: 220 }}
            >
              ★ SAVE THIS OUTFIT
            </button>
            <button className="win-btn" onClick={() => setShowUpload(true)} style={{ fontSize: 11 }}>
              + Upload New Item
            </button>
          </div>

        </WindowFrame>
      </div>

      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onUploaded={handleUploaded}
        />
      )}
    </div>
  );
}
