import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progreso, color = '#3b82f6', showLabel = true, height = '8px' }) => {
  const getProgressColor = (progreso) => {
    if (progreso === 100) return '#10b981'; // verde
    if (progreso >= 60) return '#3b82f6'; // azul
    if (progreso >= 30) return '#f59e0b'; // naranja
    return '#ef4444'; // rojo
  };

  const finalColor = color || getProgressColor(progreso);

  return (
    <div className="progress-bar-container">
      {showLabel && (
        <div className="progress-bar-label">
          <span className="progress-bar-text">Progreso</span>
          <span className="progress-bar-percentage">{progreso}%</span>
        </div>
      )}
      <div className="progress-bar-track" style={{ height }}>
        <div
          className="progress-bar-fill"
          style={{
            width: `${progreso}%`,
            backgroundColor: finalColor
          }}
        >
          {progreso > 10 && (
            <span className="progress-bar-inner-text">{progreso}%</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
