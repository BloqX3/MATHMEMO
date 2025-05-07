import React from 'react';
import './RadioSelector.css';

export default function RadioSelector({ tiny=false,options, name, selectedIndex, onChange, onAdd }) {
  return (
    <div className="radio-group">
      {options.map((opt, i) => (
        <React.Fragment key={opt.value}>
          <input
          
            type="radio"
            id={`${name}-${opt.value}`}
            name={name}
            className="radio-input"
            value={opt.value}
            checked={selectedIndex === i}
            onChange={() => onChange(i)}
          />
          <label
            htmlFor={`${name}-${opt.value}`}
            className="radio-label"
            style={{
              flex: tiny && '1 1 15px'
            }}
          >
            {opt.label}
          </label>
        </React.Fragment>
      ))}
      
    </div>
  );
}
