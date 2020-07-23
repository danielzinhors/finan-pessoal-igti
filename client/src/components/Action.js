import React from 'react';

export default function Action({ type, onActionClick, titulo }) {
  const handleIconClick = () => {
    onActionClick(type);
  };

  return (
    <span
      className="material-icons"
      onClick={handleIconClick}
      style={{ cursor: 'pointer', fontSize: '1.2rem', marginRight: '10px' }}
      title={titulo}
    >
      {type}
    </span>
  );
}
