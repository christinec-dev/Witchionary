import React from "react";
import { Col, Row } from "reactstrap";
import Generator from "./components/Generator";
import Randomizer from "./components/Randomizer";

import Header from "./layout/Header";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App container-fluid">
      <Row className="Header">
        <Header/>
      </Row>
      <Row className="Dictionary">
        <Col className="Generator col-9">
          <h2>✨Search the Ancient Knowledge Index✨</h2>
          <Generator/>
        </Col>
        <Col className="Randomizer col-3">
          <div className="scroll"></div>
          <Randomizer />
        </Col>  
      </Row>
     
    </div>
  );
}
 
export default App;