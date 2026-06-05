export default function ItemCarousel({ items, index, onPrev, onNext, label }) {
  const current = items[index];
  const isEmpty = items.length === 0;

  return (
    <div className="carousel">
      <div className="carousel-label">{label}</div>
      <div className="carousel-frame">
        {current ? (
          <img src={current.image_url} alt={label} />
        ) : (
          <div className="carousel-empty">
            No {label.toLowerCase()}<br />uploaded yet
          </div>
        )}
      </div>
      <div className="carousel-nav">
        <button className="carousel-btn" onClick={onPrev} disabled={isEmpty}>◀</button>
        <span className="carousel-count">
          {isEmpty ? '—' : `${index + 1} / ${items.length}`}
        </span>
        <button className="carousel-btn" onClick={onNext} disabled={isEmpty}>▶</button>
      </div>
    </div>
  );
}
