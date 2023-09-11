import React from 'react'


function FinalScreen(props){

    let points=props.gamePoints;

    function resetQuiz(){
        props.updateGameQuestionsIndex(0)
        props.updateGamePoints(0)
    }

    function newQuiz(){

        props.setApiUrl('https://opentdb.com/api.php?amount=10')
        props.updateGamePoints(0)
        props.updateGameQuestionsIndex(0)
        props.updateGameInfo([])

    }


    let message;

    if(points<=5){
        message="Keep Trying! You can do better next time."
    }
    else if (points>=5 && points<9)
        message="Good Job! You're getting there."
    else{
        message="Excellent! You're a Quiz Master!"
    }




    return(
        <div>
            <div className="finalScreen">
                <h1 className='pointsGained'>You have collected {points}/10 points</h1>
                <h2  className="message">{message}</h2>

                <div className="finalScreen-Btns">
                    <button className='submit-btn vibrate-1 btnFinal' onClick={resetQuiz}>Ready to try again?</button>
                    <button className='submit-btn vibrate-1 btnFinal' onClick={newQuiz}>Back to Settings</button>
                </div>
                
            </div>
           
        </div>
    )
}

export default FinalScreen