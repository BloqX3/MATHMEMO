import React, { useEffect, useRef, useState } from 'react';
import './ConstantInput.css';

export default function ConstantInput({
  label,
  value,
  onChange,
  error,          // boolean, driven by parent
}) {
  const textareaRef = useRef();
  const [animationName, setAnimationName] = useState("");
  // We'll use a ref to keep track of the current timeout.
  const timeoutRef = useRef(null);



  useEffect(() => {
    // Start the animation when error changes.
    setAnimationName("flashRed 150ms forwards");

    // If a timeout is already pending, clear it.
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to remove the animation after 100ms.
    timeoutRef.current = setTimeout(() => {
      setAnimationName("");
      timeoutRef.current = null;
    }, 150);

    // Clear timeout if the component unmounts or before re-running effect.
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [error]);

  // Whenever `error` flips true, bump a unique key so we replay animation

  return (
    <div className="constant-input-container">
      <label className="constant-input-label">{label}</label>
      <textarea
        ref={textareaRef}
        className="constant-textarea-field"
        style={{ animation: animationName }}
        value={value}
        onChange={e => onChange(e.target.value)}
        inputMode="numeric"
        autoComplete="off"
        placeholder="Start writing…"
      />
    </div>
  );
}
