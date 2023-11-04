import React, { useEffect, useState } from 'react'
import './Home.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function Home() {
  const [result, setResult] = useState(false)
  const [score, setScore] = useState(0)
  const [currentQuestion, setQuestion] = useState(0)
  const[dquestions,setDquestions]=useState([])

  const getQuestions=async()=>{
    const result=await axios.get('/db.json')
    // console.log(result.data.questions);
    // store the data in state
    setDquestions(result.data.questions)
  }
  // console.log(contacts);
  useEffect(()=>{
    getQuestions()
  },[])

  const optionClicked=(isCorrect)=>{
    // console.log(isCorrect);
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < dquestions.length) {
      setQuestion(currentQuestion + 1);
    } else {
      setResult(true);
    }
  }

  const restartQuiz = () => {
    setScore(0);
    setQuestion(0);
    setResult(false);
  };

  return (
    <div className='text-center '>
      <h1 className='py-4'>React Quiz</h1>
      <h2>Current Score: {score}</h2>
      {result ? <div style={{ backgroundColor: '#f76d02', color: 'white', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }} className='py-3 w-50 container'>
        <h2>Final Results</h2>
        <h3>
        {score} out of {dquestions.length} correct -({(score / dquestions.length) * 100}%)

        </h3>
        <Button onClick={() => restartQuiz()} style={{ backgroundColor: 'red', border: '2px solid black' }}>Restart Quiz</Button>
      </div> : <div style={{ backgroundColor: '#f76d02', color: 'white', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }} className='py-3 w-75 container'>
        <h2>Question {currentQuestion + 1} out of {dquestions.length}</h2>
        {dquestions.length>0?<h3 style={{ color: 'black', fontSize: '26px' }}>1. {dquestions[currentQuestion].Q}</h3>: <h1>no questions</h1> }
        <ul style={{ listStyle: 'none', width: '50%' }} className='container'>
          {dquestions.length>0?dquestions[currentQuestion].options.map((option)=>{
            return(
              <li onClick={()=> optionClicked(option.isCorrect)} key={option.id}>{option.text}</li>
         
            )
          }): <h1>no option</h1> }
        </ul>
      </div >}


    </div>
  )
}

export default Home
