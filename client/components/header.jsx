import React from 'react';

function Header(props) {
  return (
    <div className="mt-3 mb-3 d-flex justify-content-between align-items-center">
      <h2>{props.text}</h2>
      <h3>Average: <span className="badge badge-secondary">{props.average}</span></h3>
    </div>
  );
}

export default Header;
