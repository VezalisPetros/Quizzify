import React, { useState, useEffect } from "react";

export default function QuestionPage(props) {
  let gameQuestion = props.gameInfo[props.gameQuestionsIndex].question;
  gameQuestion = replaceHtmlEntities(gameQuestion);

  let correct_answer = props.gameInfo[props.gameQuestionsIndex].correct_answer;
  let incorrect_answers = props.gameInfo[props.gameQuestionsIndex].incorrect_answers;
  correct_answer = replaceHtmlEntities(correct_answer);
  incorrect_answers = replaceHtmlEntities(incorrect_answers);
  
  let possibleAnswers = [...incorrect_answers, correct_answer];

 


  let points=props.gamePoints;
  let gameQuestionsIndex=props.gameQuestionsIndex;

  const [shuffledPossibleAnswers, setShuffledPossibleAnswers] = useState([]);
  
 const [selectedAnswer, setSelectedAnswer] = useState({
    index:null,
    text:""
 });
  useEffect(() => {
    
    const shuffledAnswers = [...possibleAnswers].sort(function () {
      return Math.random() - 0.5;
    });
    setShuffledPossibleAnswers(shuffledAnswers);

    const answerElements = document.querySelectorAll(".optionalAnswer");
    answerElements.forEach((element) => {
    element.classList.remove("correct", "incorrect","selected");
   });


  }, [gameQuestionsIndex]); 

  

  function handleOptionClick(index) {
    setSelectedAnswer((prevSelectedAnswer) => {
      // Toggle the selected answer. If it's already selected, deselect it; otherwise, select it.
      if (prevSelectedAnswer.index === index) {
        return {
          index: null,
          text: ""
        };
      } else {
        return {
          index: index,
          text: shuffledPossibleAnswers[index]
        };
      }
    });
  }
  
  
  
  function checkAnswer(){
    

    const isCorrect = selectedAnswer.text === correct_answer;
    
    const answerElements = document.querySelectorAll(".optionalAnswer");
    answerElements.forEach((element, index) => {
      if (index === selectedAnswer.index) {
        element.classList.add(isCorrect ? "correct" : "incorrect");
      }
      if(element.textContent ===correct_answer){
        element.classList.add("correct")
      }
    });
    setTimeout(()=>{

      if(isCorrect){
        points++;
        props.updateGamePoints(points)
    }
    //setSelectedAnswer(null);
    setSelectedAnswer({
      index: null,
      text: "",
    });
    gameQuestionsIndex++;
    props.updateGameQuestionsIndex(gameQuestionsIndex);


    },700)
    
  }

// Function to replace HTML entities with their corresponding characters
// Function to replace HTML entities with their corresponding characters
function replaceHtmlEntities(inputStr) {
  // Check if inputStr is a string, and then use the replace method
  if (typeof inputStr === 'string') {
    return inputStr
      .replace(/\\\"/g, '"')   // Replace \" with "
      .replace(/&quot;/g, '"') // Replace &quot; with "
      .replace(/&#039;/g, "'"); // Replace &#039; with '
  }
  
  // If inputStr is not a string (e.g., an array), return it as is
  return inputStr;
}


  





// Example usage:



  return (
    <div className="questionPage">
      <h1 className="questionIdenx">Question {props.gameQuestionsIndex + 1}/10</h1>
      <h2 className="question">{gameQuestion}</h2>

      {shuffledPossibleAnswers.length > 0 && (
        <div className="possibleAnswers">
          {shuffledPossibleAnswers.map((item, index) => (
            <h3
              className={`optionalAnswer vibrate-1 ${selectedAnswer.index === index ? "selected" : ""}`}
              onClick={()=>handleOptionClick(index)}
              key={index}
            >
              {item}
            </h3>
          ))}
        </div>
      )}

      <div className="nextQuestion">
        <button className="checkAnswer-btn submit-btn" onClick={checkAnswer}>Next Question</button>
      </div>
    </div>
  );
}
