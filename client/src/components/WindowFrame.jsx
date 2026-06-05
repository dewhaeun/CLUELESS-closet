export default function WindowFrame({ title, children, width, onClose }) {
  return (
    <div className="window" style={width ? { width } : {}}>
      <div className="title-bar">
        <span className="title-bar-text">{title}</span>
        <div className="title-bar-controls">
          {onClose && (
            <button className="title-btn" onClick={onClose}>✕</button>
          )}
        </div>
      </div>
      <div className="window-body">{children}</div>
    </div>
  );
}
