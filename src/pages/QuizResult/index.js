import "./style.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAnswerListById } from "../../Services/answerService";
import { getQuestionListByTopicId } from "../../Services/questionListService";
import { getTopicById } from "../../Services/topicServices";

function QuizResult() {
    const [answerList, setAnswerList] = useState([]);
    const [topicName, setTopicName] = useState([]);
    const answerId = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchApi= async () => {
            const dataAnswerList = await getAnswerListById(answerId.id);
            const dataQuestionList = await getQuestionListByTopicId(dataAnswerList.topicId);
            const dataTopic = await getTopicById(dataAnswerList.topicId);
            let newList = [];
            // console.log(dataAnswerList);
            for (let i = 0; i < dataAnswerList.answers.length; i++) {
                const answer = dataQuestionList.find(element => element.id === dataAnswerList.answers[i].questionId);
                const result = dataAnswerList.answers[i].answerFromUser === answer.correctAnswer;
                newList.push({
                    ...answer,
                    answerFromUser: dataAnswerList.answers[i].answerFromUser,
                    result: result
                });
            }
            setTopicName(dataTopic[0]);
            setAnswerList(newList);
            // console.log(newList);

        }
        fetchApi();
    }, []);

    const countCorrectAnswer = () => {
        let correctAnswer = 0;

        answerList.forEach(element => {
            if (element.answerFromUser === element.correctAnswer) {
                correctAnswer++;
            }
        });
        return correctAnswer;
    }
    const correctAnswer = countCorrectAnswer();

    return (
        <>
            {
            answerList.length === 0 ? <div>Đang tải...</div>
            :
            <form className="answerList">
                <h2 className="answerList__title">{topicName.name}</h2>
                <div className="answerList__result">
                    <h3>Result:</h3>
                    Correct: <strong>{correctAnswer}</strong> | Wrong: <strong>{answerList.length - correctAnswer}</strong> | Total: <strong>{answerList.length}</strong> | Rate: <strong>{(correctAnswer / answerList.length).toFixed(2) * 100}%</strong>
                </div>
                <ul className="answerList__list">
                {
                    answerList.map((element, index)=>
                        <li className="answerList__question" key={index}>
                            {
                                element.result ? 
                                <div className="answerList__question--query answerList__question--query--correct">Câu {index + 1}: {element.question}</div>
                                :
                                <div className="answerList__question--query answerList__question--query--wrong">Câu {index + 1}: {element.question}</div>
                            }
                            <div className="answerList__question--answers">
                                {
                                    element.answers.map((ans, index) => {
                                        if (index === element.correctAnswer) {
                                            return( 
                                                <div className="answerList__question--answer answerList__question--answer--correct" key={index}>
                                                    {
                                                        index === element.answerFromUser ? 
                                                        <input checked disabled type="radio"></input>
                                                        :
                                                        <input disabled type="radio"></input>
                                                    }
                                                    <label>{ans}</label>
                                                    <br></br>
                                                </div>);
                                        }   
                                        else if (index === element.answerFromUser) {
                                            return( 
                                                <div className="answerList__question--answer answerList__question--answer--wrong" key={index}>
                                                    <input checked disabled type="radio"></input>
                                                    <label>{ans}</label>
                                                    <br></br>
                                                </div>);
                                        }
                                        else {
                                            return( 
                                                <div className="answerList__question--answer" key={index}>
                                                    <input disabled type="radio"></input>
                                                    <label>{ans}</label>
                                                    <br></br>
                                                </div>);
                                        }
                                    })
                                }
                            </div>
                        </li>
                    )
                }
                </ul>
                <div className="answerList__support">
                    <button onClick={() => {navigate(`/quiz/${topicName.id}`)}} className="answerList__support--tryAgain">Try again</button>
                </div>
            </form>
        }
        </>
    );
}

export default QuizResult;