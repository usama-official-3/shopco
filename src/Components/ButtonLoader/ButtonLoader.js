import React from 'react';

const ButtonLoader = () => {
  const loaderStyle = {
    display: 'inline-block',
    width: '80px',
    height: '80px',
    border: '8px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '50%',
    borderTop: '8px solid #007bff', // Change this color for a different effect
    animation: 'spin 1s linear infinite',
  };

  const wrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full-screen loader
  };

  return (
    <div style={wrapperStyle}>
      <div style={loaderStyle}></div>
    </div>
  );
};

export default ButtonLoader;
