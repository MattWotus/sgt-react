import React from 'react';

function Header(props) {
  return (
    <div className='row d-flex align-items-center'>
      <div className="col-lg-12 col-xl-9 mt-3 text-center text-xl-left title">
        <h2 className='mb-0'>{props.text}</h2>
      </div>
      <div className="col-lg-12 col-xl-3 mt-3 mb-3 average">
        <h3 className="d-flex align-items-center mb-0">Average: <span className="badge badge-secondary ml-2">{props.average}</span></h3>
      </div>
    </div>
  );
}

export default Header;
