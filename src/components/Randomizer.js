import { React, useState } from "react";
// Remember useState is a React Hooks component that adds local states to a called function
import { Col, Row, Button} from "reactstrap";
import Axios from "axios";
// We use Axios because we need to to make HTTP requests from the browser & Promise API's

import randomWords from 'random-words'
//randomWords npm package to generate a random word

function Randomizer() {
    // Setting up the default data states using react hook 'useState' 
    const [data, setData] = useState("");
    // We set the searched word's state to equal that of the randomWord generator
    const [ searchWord ] = useState(randomWords());

    // Will fetch the data for the randomized word when button clicked using the Free Dictionary API
    function getRandomWord() {
        Axios.get(
            /*free dictionary api which will take searched word as query param*/
            `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`
        ).then((response) => {
            /*Updates the default state of the data to the searched term*/
            setData(response.data[0]);
            console.log(response)
        });
    }

    // Will play the audio (pronounciation) of the searched word using the Free Dictionary API
    function wordPronounce() {
        let audio = new Audio(data.phonetics[0].audio);
        audio.play();
    }
     
   //Will Return Randomizer as a Functional Component
    return (
        <Row className="Randomize">
            <Row className="randomizeBox"><div className="scroll">
                <Col className="col-12">             
                <h1>Summon Word</h1>
                {/* Will call on (or launch) the function to fetch the data for the searched word*/}
                <Button onClick={() => {getRandomWord();}} className="btn">
                    Abracadabra 🔮
                </Button>          
                </Col>
                </div>
            </Row>
            {/* Conditional expression to return the data(randomWord) and the details about the data(randomWord)*/}
            {data && (
                <div className="word-description">
                    <div>
                        <h2 className="word-title">
                            {/* Sets the updated word state {""}, displays the word and plays the pronounciation */}
                            {data.word}{" "}
                            <Button className="volume" onClick={() => { wordPronounce(); }}>
                                <i className="fas fa-volume-up"></i>
                            </Button>
                        </h2>
                    </div>
                    <div>
                        {/* Shows the word Parts of Speech using API Data */}
                        <p className='word-desc-result-type'>
                           <em>{data.meanings[0].partOfSpeech}</em>
                        </p>
                    </div>
                    <div>
                        {/* Shows the word Definition using API Data */}
                        <h4 className='word-desc-list'>
                            Definition:
                        </h4> 
                        <p className='word-desc-result'>
                            {data.meanings[0].definitions[0].definition}
                        </p>
                    </div>
                    <div>
                        {/* Shows the word usage example using API Data */}
                        <h4 className='word-desc-list'>
                            Example:
                        </h4>  
                        <p className='word-desc-result'>
                            {data.meanings[0].definitions[0].example}.
                        </p>
                    </div>
                </div>
             )}
        </Row>
    );
}

//exports for use in other files
export default Randomizer;