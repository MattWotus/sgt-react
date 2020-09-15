import React from 'react';

function Header(props) {
  return (
    <div className="mt-3 mb-3 d-flex justify-content-between ">
      <h2>{props.text}</h2>
      <h3 className="d-flex align-items-center">Average: <span className="badge badge-secondary ml-2">{props.average}</span></h3>
    </div>
  );
}

export default Header;
