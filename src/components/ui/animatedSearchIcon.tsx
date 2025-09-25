import React from 'react';
import './css/AnimatedSearchIcon.css';

const AnimatedSearchIcon = ({ size = 60, color = '#4a90e2', animationSpeed = 2 }) => {
  const containerStyle = {
    width: size,
    height: size,
  };

  const iconStyle = {
    color: color,
    animationDuration: `${3 / animationSpeed}s`,
  };

  const circle1Style = {
    borderColor: color,
    animationDuration: `${2 / animationSpeed}s`,
  };

  const circle2Style = {
    borderColor: color,
    animationDuration: `${1.5 / animationSpeed}s`,
  };

  return (
    <div className="animated-search-container scale-200 pb-7" style={containerStyle}>
      <div className="pulsing-circle circle-1" style={circle1Style}></div>
      <div className="pulsing-circle circle-2" style={circle2Style}></div>
      <div className="search-icon scale-75 translate-x-2.5" style={iconStyle}>
        <svg
          width="60%"
          height="60%"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
    </div>
  );
};

export default AnimatedSearchIcon;