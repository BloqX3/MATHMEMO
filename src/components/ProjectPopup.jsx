import React from 'react';
import './ProjectPopup.css';

export default function ProjectPopup({ title, children, setIsOpen }) {

  return (
   <div className="popup-overlay" onClick={() => setIsOpen(false)}>
          <div
            className="popup-content"
            onClick={e => e.stopPropagation()}
          >
            <header className="popup-header">
              <h2>{title}</h2>
              <button
                className="popup-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </header>
            <div className="popup-body">{children}</div>
          </div>
        </div>
  );
}
