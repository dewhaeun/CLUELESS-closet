import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import WindowFrame from '../components/WindowFrame';
import UploadModal from '../components/UploadModal';
import { getItems } from '../api/items';
import { saveOutfit } from '../api/outfits';

const FRAME_W = 300;
const FRAME_H = 220;

function ItemRow({ label, items, index, onPrev, onNext }) {
  const current = items[index];
  const isEmpty = items.length === 0;

  return (
    <div>
      {/* 레이블 + 내비게이션 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '4px 2px',
        borderBottom: '1px solid var(--shadow)',
      }}>
        <span style={{ fontSize: 10, fontWeight: 'bold', letterSpacing: 3 }}>{label}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button className="carousel-btn" onClick={onPrev} disabled={isEmpty}>◀</button>
          <span style={{ fontSize: 10, color: 'var(--shadow)', minWidth: 36, textAlign: 'center' }}>
            {isEmpty ? '—' : `${index + 1} / ${items.length}`}
          </span>
          <button className="carousel-btn" onClick={onNext} disabled={isEmpty}>▶</button>
        </div>
      </div>

      {/* 이미지 프레임 */}
      <div style={{
        width: FRAME_W,
        height: FRAME_H,
        background: 'var(--silver)',
        border: '2px solid',
        borderColor: 'var(--dark-shadow) var(--highlight) var(--highlight) var(--dark-shadow)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {current
          ? <img src={current.image_url} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ fontSize: 11, color: 'var(--shadow)' }}>No {label.toLowerCase()} uploaded yet</span>
        }
      </div>
    </div>
  );
}

export default function ClosetPage() {
  const [tops, setTops] = useState([]);
  const [bottoms, setBottoms] = useState([]);
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [showUpload, setShowUpload] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    Promise.all([getItems('top'), getItems('bottom')]).then(([t, b]) => {
      setTops(t);
      setBottoms(b);
    });
  }, []);

  const flash = (text, type = 'success') => {
    setMsg({ text, type });
    setTimeout(() => setMsg(null), 2500);
  };

  const handleSave = async () => {
    const top = tops[topIndex];
    const bottom = bottoms[bottomIndex];
    if (!top || !bottom) return;
    try {
      await saveOutfit(top.id, bottom.id);
      flash('★ Outfit saved!');
    } catch (err) {
      if (err.response?.status === 409) flash('Already saved!', 'info');
      else flash('Failed to save', 'error');
    }
  };

  const handleUploaded = (item) => {
    if (item.category === 'top') {
      setTops(prev => [item, ...prev]);
      setTopIndex(0);
    } else if (item.category === 'bottom') {
      setBottoms(prev => [item, ...prev]);
      setBottomIndex(0);
    }
  };

  const msgColor = { success: '#006600', error: '#cc0000', info: 'var(--blue)' };

  return (
    <div className="page">
      <Navbar />

      <div className="page-content">
        <WindowFrame title="★ My Closet" width={FRAME_W + 40}>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>

            {/* 상의 */}
            <ItemRow
              label="TOP"
              items={tops}
              index={topIndex}
              onPrev={() => setTopIndex(i => (i - 1 + tops.length) % tops.length)}
              onNext={() => setTopIndex(i => (i + 1) % tops.length)}
            />

            {/* 하의 */}
            <ItemRow
              label="BOTTOM"
              items={bottoms}
              index={bottomIndex}
              onPrev={() => setBottomIndex(i => (i - 1 + bottoms.length) % bottoms.length)}
              onNext={() => setBottomIndex(i => (i + 1) % bottoms.length)}
            />

            {msg && (
              <p style={{ fontSize: 11, fontWeight: 'bold', color: msgColor[msg.type] }}>
                {msg.text}
              </p>
            )}

            <button
              className="win-btn win-btn-primary"
              onClick={handleSave}
              disabled={!tops[topIndex] || !bottoms[bottomIndex]}
              style={{ minWidth: 200 }}
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
