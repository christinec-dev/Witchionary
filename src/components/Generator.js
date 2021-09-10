import { React, useState } from "react";
// Remember useState is a React Hooks component that adds local states to a called function
import Axios from "axios";
// We use Axios because we need to to make HTTP requests from the browser & Promise API's
import { Col, Row, Button, Input, InputGroup } from "reactstrap";

function Generator() {
  // Setting up the default states using react hook 'useState'
  const [data, setData] = useState("");
  const [searchWord, setSearchWord] = useState("");
 
    // Will fetch the data for the searched word when button clicked using the Free Dictionary API
    function getDictionaryWord() {
        Axios.get(
            /*free dictionary api which will take searched word as query param*/
            `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`
        ).then((response) => {
            /*Updates the default state of the data to the searched term*/
            setData(response.data[0]);
        });
    }

  // Will play the audio (pronounciation) of the searched word using the Free Dictionary API
  function wordPronounce() {
    let audio = new Audio(data.phonetics[0].audio);
    audio.play();
  }
  
// Refer to https://u.pgamerx.com/types for types
   //Will Return Generaor as a Functional Component  
   return (
    <Row className="Generator">
        <InputGroup className="searchBox">
            {/* Will allow for user input and update the searchedWord value to be used by the API */}
            <Input 
                type="textarea" 
                name="text" 
                id="exampleText" 
                placeholder="What word do you need from the Ancient Knowledge Index?"
                onChange={(e) => {
                setSearchWord(e.target.value);
            }}
            />
            {/* Will call on (or launch) the function to fetch the data for the searched word*/}
            <Button className="search-btn" onClick={() => { getDictionaryWord(); }}>
            <i className="fas fa-search"></i>
            </Button>
        </InputGroup>
      {/* Conditional expression to return the data(searchWord) and the details about the data(searchWord)*/}
      {data && (
        <Row className="word-description">
            <Col className="col-12">
                <h2 className="word-title">
                    {/* Sets the updated word state {""}, displays the word and plays the pronounciation */}
                    {data.word}{" "}
                    <Button className="volume" onClick={() => { wordPronounce(); }}>
                        <i className="fas fa-volume-up"></i>
                    </Button>
                </h2>
            </Col>
            <Col className="col-12">
                {/* Shows the word Parts of Speech using API Data */}
                <h4 className='word-desc-list'>
                    Part of Speech:
                </h4>
                <p className='word-desc-result'>
                    {data.meanings[0].partOfSpeech}
                </p>
            </Col>
            <Col className="col-12">
                {/* Shows the word Definition using API Data */}
                <h4 className='word-desc-list'>
                    Definition:
                </h4> 
                <p className='word-desc-result'>
                    {data.meanings[0].definitions[0].definition}
                </p>
            </Col>
            <Col className="col-12">
                {/* Shows the word usage example using API Data */}
                <h4 className='word-desc-list'>
                    Usage Example:
                </h4>  
                <p className='word-desc-result'>
                    {data.meanings[0].definitions[0].example}
                </p>
            </Col>
        </Row>
      )}
    </Row>
  );
}
 
//exports for use in other files
export default Generator;