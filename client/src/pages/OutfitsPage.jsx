import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import WindowFrame from '../components/WindowFrame';
import { getOutfits, deleteOutfit } from '../api/outfits';

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

  return (
    <div className="page">
      <Navbar />

      <div className="page-content">
        <WindowFrame title="★ Saved Outfits" width={640}>
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
              {outfits.map(outfit => (
                <div key={outfit.id} className="outfit-card">
                  <img
                    src={outfit.top.image_url}
                    alt="Top"
                    style={{ width: '100%', height: 110, objectFit: 'cover' }}
                  />
                  <div style={{
                    width: '100%',
                    height: 1,
                    background: 'var(--shadow)',
                    margin: '2px 0',
                  }} />
                  <img
                    src={outfit.bottom.image_url}
                    alt="Bottom"
                    style={{ width: '100%', height: 110, objectFit: 'cover' }}
                  />
                  <button
                    className="win-btn"
                    onClick={() => handleDelete(outfit.id)}
                    style={{ marginTop: 6, fontSize: 10, padding: '2px 8px', minWidth: 'unset' }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </WindowFrame>
      </div>
    </div>
  );
}
