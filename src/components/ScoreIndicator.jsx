import React from 'react';
import './ScoreIndicator.css';

/**
 * <ScoreIndicator percentage={…} segments={…} />
 *
 * Props:
 * - percentage: number (0–100) of population you're ahead
 * - segments: number of slices (optional; default 20)
 */
export function ScoreIndicator({ percentage, segments = 4 }) {
  // Total filled as a fraction of segments
  const total = (percentage / 100) * segments;
  const fullSegments = Math.floor(total);
  const partialFill = total - fullSegments;  // between 0 and 1

  // Build segment indexes [0…segments-1]
  const slices = Array.from({ length: segments }, (_, i) => {
    // Determine fill for this segment:
    //   - fully filled if i < fullSegments
    //   - partially if i === fullSegments, else empty
    let fillWidth = 0;
    if (i < fullSegments) fillWidth = 100;
    else if (i === fullSegments) fillWidth = partialFill * 100;

    // Compute background offset so gradient lines up globally
    const offsetX = (i / segments) * 100;
    const gradientSize = segments * 100;

    return (
      <div key={i} className="score-indicator__slice">
        <div
          className="score-indicator__fill"
          style={{
            width: `${fillWidth}%`,
            backgroundSize: `${gradientSize}% 100%`,
            backgroundPosition: `${offsetX}% 0%`,
          }}
        />
      </div>
    );
  });

  return (
    <div
      className="score-indicator"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(percentage)}
    >
      
      {slices}
    </div>
  );
}
