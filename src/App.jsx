import React from 'react'
import Settings from './Settings'
import QuestionPage from './QuestionPage'
import FinalScreen from './FinalScreen'



function App() {
  const [gameInfo,setGameInfo]= React.useState([]);
  const [gameQuestionsIndex,setGameQuestionsIndex]= React.useState(0);
  const [gamePoints,setGamePoints]=React.useState(0);
  


  const [apiUrl, setApiUrl] = React.useState('https://opentdb.com/api.php?amount=10');


  function updateGameInfo(newQuestions){
    setGameInfo(newQuestions);
  }

  function updateGameQuestionsIndex(newQuestionsIndex){
    setGameQuestionsIndex(newQuestionsIndex);
  }

  function updateGamePoints(points){
    setGamePoints(points);
  }

  

  let component
  
  if (gameInfo.length && gameQuestionsIndex<10) {
    component = <QuestionPage gameInfo={gameInfo}
                              gameQuestionsIndex={gameQuestionsIndex} 
                              gamePoints={gamePoints}
                              updateGamePoints={updateGamePoints}
                              updateGameQuestionsIndex={updateGameQuestionsIndex}

                              />
  }  else if (!gameInfo.length){
    component = <Settings updateGameQuestions={updateGameInfo}
                          apiUrl={apiUrl} 
                          setApiUrl={setApiUrl} 
                  />
  }
  else{
    component=<FinalScreen   gamePoints={gamePoints}
                             updateGameQuestionsIndex={updateGameQuestionsIndex}
                             updateGameInfo={updateGameInfo}
                             updateGamePoints={updateGamePoints}
                             setApiUrl={setApiUrl}

    />
  }

  return (
    <div>
      <h1 className='logo'>Quizzify</h1>
    <div className="app-container">{component}</div>
    </div>
  )
}

export default App
