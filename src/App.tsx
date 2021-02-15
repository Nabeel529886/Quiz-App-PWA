import React, { useEffect, useRef, useState} from 'react';
import './App.css';
import Question from './components/Question'
import { fetchData } from './data/fetchData';
import {TimelineLite} from 'gsap'
import quiz from './assets/quiz.svg'
import quizresult from './assets/quizresult.svg'


export interface questiontype {
  questNumber: number | null,
  question: string,
  answers: string,
  correct_answers: string,
  id: number
}


const App: React.FC = () => {
  const [questions, setQuestions] = useState<questiontype[]>([])
  const [loading, setLoading] = useState(false)
  const [questNumber, setQuestNumber] = useState<number | null>(null)
  const [gameOver, setGameOver] = useState(false)
  const [endQuiz, setEndQuiz] = useState(false)
  const [score, setScore] = useState(0)
  const [select, setSelect] = useState(false)

  let quizdiv: any = useRef(null)
  let quizheading: any = useRef(null)
  let quizlogo: any = useRef(null)
  let quizheadingspan: any = useRef(null)
  let endnextbtn: any = useRef(null)
  let scorediv: any = useRef(null)
  let resultlogo: any = useRef(null)
  let scorecard: any = useRef(null)
  let scorenum: any = useRef(null)
  let tryagainbtn: any = useRef(null)


  const handleStartQuiz = () => {
    setEndQuiz(false)
    setGameOver(false)
    setQuestNumber(0)
    setScore(0)
  }

  useEffect(() => {
    const tl_score = new TimelineLite({ paused: true })

    if (endQuiz){
      tl_score.from(scorediv, 1, {opacity: 0, ease: "power3.in"})
    .from (resultlogo, 1, {scale: 0, ease: "elastic"}, "-=1")
    .from(scorecard, 1, {opacity: 0, ease: "power4.Out"})
    .fromTo(scorenum, 1.5,  {scale: 0,  ease: "elastic"}, {scale: 1.5, ease: "elastic"})
    .from(tryagainbtn, 0.7, {fontSize: 0, scale: 0, ease: "power2.in"})
    }
    

    tl_score.play()
  }, [endQuiz])

 


  useEffect(() => {
    const tl1 = new TimelineLite({ paused: true })

    if (questNumber === null){
      tl1.from(quizdiv, 1.5, {opacity: 0, ease: "power2.inOut"})
      .from (quizlogo, 1, {scale: 0, ease: "elastic"}, "-=1")
      .from(quizheading, 1, {opacity: 0, ease: "power4.Out"})
      .fromTo(quizheadingspan, 1,  {x: 1000,  ease: "elastic"}, {x: 0, ease: "bounce"})
      .to(quizheading, 1, {x: -85, ease: "elastic"}, "-=0.8")
      .from(".app__startquizbtn", 1, {fontSize: 0, scale: 0, ease: "power2.in"})  
    }else{
      if (gameOver){
        tl1.to(endnextbtn, 1, {opacity: 1, fontSize: 16, ease: "power2.in"})
      }else if (!gameOver && questNumber === 0){
        tl1.to(endnextbtn, 1, {opacity: 1, fontSize: 16, ease: "power2.in"})
      }else{
        tl1.to(endnextbtn, 2, {opacity: 1, fontSize: 16, ease: "power2.in"})
      }
    }

    tl1.play()


  }, [questNumber, gameOver])
 

  const nextButton = () => {
    if (questNumber !== null && questNumber !== questions.length-1){
      setQuestNumber(questNumber + 1)
      setSelect(false)
    } else{
      setGameOver(true)
    }
  }

  const handleEndQuiz = () => {
    setEndQuiz(true)
    setSelect(false)
  }




  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const data = await fetchData()
      setQuestions(data)
      setLoading(false)
    }

    getData()
  }, [])




  return (
    <div className="app">
      {
        endQuiz ? 
        <div className="app__scorediv" ref={el => scorediv = el}>
          <img src={quizresult} alt="Quiz Result" className="app__quizresultlogo" ref={el => resultlogo = el}/>
          <h1 className="app__scorehead" ref={el => scorecard = el}>Your Score is <span className="app__scorehead__score" ref={el => scorenum = el}>{score}</span></h1>
          <button onClick={handleStartQuiz} className="app__tryagainbtn" disabled={loading? true: false} ref={el => tryagainbtn = el}>Try Again</button>
        </div>
        :
        <div className={questNumber === null? "": "app__mainquizdivSmall"}>
          {
          questNumber === null ?
          <div className="app__mainquizdiv" ref={el=> quizdiv = el}>
            <img src={quiz} alt="quiz-logo" className="app__quizlogo" ref={el => quizlogo = el}/>
            <h1 className="app__headinglarge" ref={el => quizheading = el}>Techno<span className="app__heading__span" ref={el => quizheadingspan = el}>Quiz</span></h1>
            <button disabled={loading? true: false} onClick={handleStartQuiz} className="app__startquizbtn">Start Quiz</button>
          </div>
          :
          <div className="app__questiondiv">
            <h1 className="app__headingsmall" ref={el => quizheading = el}>Techno<span className="app__heading__span" ref={el => quizheadingspan = el}>Quiz</span></h1>
            <Question 
            question={questions[questNumber]}
            setScore={setScore}
            score={score}
            select={select}
            setSelect={setSelect}
            questNumber={questNumber}
            />

            {
              gameOver ? 
              <button className="app__endbtn" onClick={handleEndQuiz} disabled={select? false: true} ref={el => endnextbtn = el}>End Quiz</button>
              :
              <button className="app__nextbtn" onClick={nextButton} disabled={select? false: true} ref={el => endnextbtn = el}>Next Question</button>
            }
          </div>
        }
        </div>
      }  
    </div>
  );
}

export default App;
