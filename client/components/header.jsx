import React from 'react';

function Header(props) {
  return (
    <div className="mt-3 mb-3 d-flex justify-content-between align-items-center">
      <h1>{props.text}</h1>
      <h2>Average: <span className="badge badge-secondary">{props.average}</span></h2>
    </div>
  );
}

export default Header;
