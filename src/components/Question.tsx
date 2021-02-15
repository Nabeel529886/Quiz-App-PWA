import React, { useEffect, useRef, useState } from 'react'
import { questiontype } from '../App'
import {TimelineLite, TweenLite} from 'gsap'


const Question = ({question, setScore, score, select, setSelect, questNumber}: 
    {
        question: questiontype, 
        setScore: React.Dispatch<React.SetStateAction<number>>,
        score: number,
        select: boolean,
        setSelect: React.Dispatch<React.SetStateAction<boolean>>,
        questNumber: number
    }) => {

    const [selectedID, setSelectedID] = useState("")
    const [correctAns, setCorrectAns] = useState(false)

    let questiondiv: any = useRef(null)
    let ansdiv: any = useRef(null)
    
    const answers =  Object.entries(question.answers).filter(([key, value]) => value !== null)
    const correct_answers = Object.entries(question.correct_answers).filter(([key, value]) => value === "true")


    useEffect(() => {
        const tl_question = new TimelineLite({ paused: true })
        tl_question.from(questiondiv, 0.5, {x: -1200, ease: "power3.in"})
        tl_question.play()

    }, [])


    useEffect(() => {
        TweenLite.from(ansdiv, 0.6, {scale: 0, ease: "power4.in"})
    }, [questNumber])

    const handleAnswerClick = (option: string) => {
        if (`${option}_correct` === correct_answers[0][0]){
            setScore(score+1)
            setCorrectAns(true)
        }else{
            setCorrectAns(false)
        }
        setSelectedID(option)
        setSelect(true)
    }

    return (
        <div className="question" ref={el => questiondiv = el}>
            
            <h6 className="question__quest"><span className="question__questNumber">Q.No # {questNumber + 1}</span><br />{question.question}</h6>
            <div className="question__ansdiv" ref={el => ansdiv = el}>
                {
                    answers.map(([key, value])=> (
                        <button 
                        key={key} 
                        onClick={() => handleAnswerClick(key)} 
                        disabled={select? true: false} 
                        className={key === selectedID && correctAns && select ? "question__ans_correct": key === selectedID && !correctAns && select ? "question__ans_incorrect": "question__ans_unselect"}
                        >{value}</button>
                    ))
                }
            </div>
        </div>
    )
}

export default Question
