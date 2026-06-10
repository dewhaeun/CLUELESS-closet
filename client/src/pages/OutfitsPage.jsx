import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import WindowFrame from '../components/WindowFrame';
import { getOutfits, deleteOutfit } from '../api/outfits';

// 선택 아이템 라벨
const OPTIONAL_KEYS = [
  { key: 'outer',     label: 'OUTER' },
  { key: 'shoes',     label: 'SHOES' },
  { key: 'accessory', label: 'ACC'   },
];

export default function OutfitsPage() {
  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOutfits()
      .then(setOutfits)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    await deleteOutfit(id);
    setOutfits(prev => prev.filter(o => o.id !== id));
  };

  // 코디에 포함된 선택 아이템 목록
  const optionals = (outfit) =>
    OPTIONAL_KEYS.filter(({ key }) => outfit[key]?.image_url);

  return (
    <div className="page">
      <Navbar />

      <div className="page-content">
        <WindowFrame title="★ Saved Outfits" width={660}>
          {loading ? (
            <p style={{ fontSize: 11, color: 'var(--shadow)' }}>Loading...</p>
          ) : outfits.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--shadow)' }}>
              <p style={{ fontSize: 32, fontFamily: 'VT323, monospace' }}>no outfits yet!</p>
              <p style={{ fontSize: 11, marginTop: 8 }}>
                Go to My Closet to mix &amp; match your clothes.
              </p>
            </div>
          ) : (
            <div className="outfits-grid">
              {outfits.map(outfit => {
                const extras = optionals(outfit);
                return (
                  <div key={outfit.id} className="outfit-card">
                    {/* 필수: 상의 + 하의 */}
                    <img
                      src={outfit.top.image_url}
                      alt="Top"
                      style={{ width: '100%', height: 100, objectFit: 'cover' }}
                    />
                    <div style={{ width: '100%', height: 1, background: 'var(--shadow)', margin: '2px 0' }} />
                    <img
                      src={outfit.bottom.image_url}
                      alt="Bottom"
                      style={{ width: '100%', height: 100, objectFit: 'cover' }}
                    />

                    {/* 선택: 아우터 / 신발 / 액세서리 */}
                    {extras.length > 0 && (
                      <>
                        <div style={{ width: '100%', height: 1, background: 'var(--shadow)', margin: '2px 0' }} />
                        <div style={{ display: 'flex', gap: 2, width: '100%' }}>
                          {extras.map(({ key, label }) => (
                            <div key={key} style={{ flex: 1, position: 'relative' }}>
                              <img
                                src={outfit[key].image_url}
                                alt={label}
                                style={{ width: '100%', height: 52, objectFit: 'cover' }}
                              />
                              <span style={{
                                position: 'absolute', bottom: 0, left: 0,
                                background: 'rgba(0,0,0,0.45)',
                                color: '#fff', fontSize: 7,
                                padding: '1px 3px', letterSpacing: 0.5,
                              }}>
                                {label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    <button
                      className="win-btn"
                      onClick={() => handleDelete(outfit.id)}
                      style={{ marginTop: 6, fontSize: 10, padding: '2px 8px', minWidth: 'unset' }}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </WindowFrame>
      </div>
    </div>
  );
}
