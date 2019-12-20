import React, { Component } from "react";
import MatchCard from "./components/MatchCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import matches from "./matchcards.json";
import "./App.css";

const heroku = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"

let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Click on a video game picture to gain points, but make sure you don't click the same one twice!";

class App extends Component {
    
    // Setting this.state.matches to the matches json array
    state = {
        matches,
        correctGuesses,
        bestScore,
        clickMessage
    };

    setClicked = id => {

        // Make a copy of the state matches array to work with
        const matches = this.state.matches;

        // This will filter for the clicked match.
        const clickedMatch = matches.filter(match => match.id === id);


        //If the image has a value of 'true' and has been clicked already
        //it will start the game over status
        if (clickedMatch[0].clicked){

            console.log ("Correct Guesses: " + correctGuesses);
            console.log ("Best Score: " + bestScore);

            correctGuesses = 0;
            clickMessage = "Oops, you already guessed that one. Try again!"

            for (let i = 0 ; i < matches.length ; i++){
                matches[i].clicked = false;
            }

            this.setState({clickMessage});
            this.setState({ correctGuesses });
            this.setState({matches});

        // If clicked = false, and the player hasn't finished
        } else if (correctGuesses < 11) {

            // This will set it's value to ture
            clickedMatch[0].clicked = true;

            // Will increase the counter if correct.
            correctGuesses++;
            
            clickMessage = "That's Correct! Keep Going!";

            if (correctGuesses > bestScore){
                bestScore = correctGuesses;
                this.setState({ bestScore });
            }

            // Will shuffle array and put it into a random order.
            matches.sort(function(a, b){return 0.5 - Math.random()});

            // This will set this.state.matches to equal the new matches array
            this.setState({ matches });
            this.setState({correctGuesses});
            this.setState({clickMessage});
        } else {

            // Sets value to true
            clickedMatch[0].clicked = true;

            // This will reset the guess counter
            correctGuesses = 0;

            // Continue game message
            clickMessage = "Congratulations, you guessed them all correctly! Try again!";
            bestScore = 12;
            this.setState({ bestScore });
            
            for (let i = 0 ; i < matches.length ; i++){
                matches[i].clicked = false;
            }

            // This will shuffle the array to be rendered in a new random order
            matches.sort(function(a, b){return 0.5 - Math.random()});

            // This will set this.state.matches equal to the new matches array
            this.setState({ matches });
            this.setState({correctGuesses});
            this.setState({clickMessage});

        }
    };

    render() {
        return (
          
            <Wrapper>
                <Title>Video Game Image Click Game</Title>
        
                <h3 className="scoreSummary">
                    {this.state.clickMessage}
                </h3>
                
                <h3 className="scoreSummary card-header">
                    Correct Guesses: {this.state.correctGuesses} 
                    <br />
                    Best Score: {this.state.bestScore} 
                </h3>
                <div className="container">
                <div className="row">
                {this.state.matches.map(match => (
                    <MatchCard
                        setClicked={this.setClicked}
                        id={match.id}
                        key={match.id}
                        image={match.image}
                    />
                ))}
                </div>
                </div>

            </Wrapper>
        );
    }
}

export default App;