import React from 'react';
import { Jumbotron } from 'reactstrap';

const Header = () => {
  return (
    <div>
      <Jumbotron>
        <h1 className="Header display-3">Witchionary </h1>
      </Jumbotron>
      <div className="p-3 my-2 rounded bg-docs-transparent-grid">
      </div>
    </div>
  );
};

export default Header;