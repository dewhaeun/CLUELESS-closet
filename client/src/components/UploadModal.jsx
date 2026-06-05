import { useState } from 'react';
import WindowFrame from './WindowFrame';
import { uploadItem } from '../api/items';

const CATEGORIES = ['top', 'bottom', 'outer', 'shoes', 'accessory'];

export default function UploadModal({ onClose, onUploaded }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [category, setCategory] = useState('top');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('category', category);
      const item = await uploadItem(formData);
      onUploaded(item);
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <WindowFrame title="Upload New Item" onClose={onClose} width={300}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

          <div className="form-group">
            <label>Category</label>
            <select
              className="win-select"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Image <span style={{ fontWeight: 'normal', color: 'var(--shadow)' }}>(max 5MB)</span></label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFile}
              style={{ fontSize: 11 }}
            />
          </div>

          {preview && (
            <div style={{ textAlign: 'center' }}>
              <img
                src={preview}
                alt="preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: 160,
                  objectFit: 'contain',
                  border: '2px solid',
                  borderColor: 'var(--dark-shadow) var(--highlight) var(--highlight) var(--dark-shadow)',
                }}
              />
            </div>
          )}

          {error && <p className="error-msg">{error}</p>}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6, marginTop: 4 }}>
            <button className="win-btn" onClick={onClose}>Cancel</button>
            <button
              className="win-btn win-btn-primary"
              onClick={handleUpload}
              disabled={!file || loading}
            >
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>

        </div>
      </WindowFrame>
    </div>
  );
}
