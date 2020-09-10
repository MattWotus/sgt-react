import React from 'react';

function Header(props) {
  return (
    <h1 className="mt-3 mb-3">{ props.text }</h1>
  );
}

export default Header;
