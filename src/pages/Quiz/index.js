import { useEffect, useState } from "react";
import "./style.scss";
import { getCookie } from "../../helper/cookie";
import { addNewAnswers } from "../../Services/answerService";
import { useNavigate, useParams } from "react-router-dom";

function Quiz() {
    const topicId = window.location.pathname.split('/')[2];
    // Another way to get topicId by useParams
    const topicIdByParams = useParams();
    // console.log(topicIdByParams.id);
    const [questionList, setQuestionList] = useState([]);
    const [topicName, setTopicName] = useState(''); 
    const navigate = useNavigate();

    useEffect(()=> {
        fetch(`http://localhost:3002/topics/${topicId}`)
        .then(response=>response.json())
        .then(data => {
            setTopicName(data.name);
        });

        fetch(`http://localhost:3002/questions?topicId=${topicId}`)
        .then(response=>response.json())
        .then(data => {
            setQuestionList(data);
        })
    },[]);

    const createObjectArrayAnswerAPI = () => {
        let answers = [];

        for (let i = 0; i < questionList.length; i++) {
            answers.push({
                questionId: parseInt(questionList[i].id),
                answerFromUser:null
            })
        }
        return {
            userId:parseInt(getCookie("id")),
            topicId:parseInt(topicId),
            answers
        };
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const answerListAPI = createObjectArrayAnswerAPI();
        console.log(answerListAPI);
        for (let i = 0; i < e.target.length - 1; i++) {
            if (e.target[i].checked === true) {
                const questionId = parseInt(e.target[i].getAttribute('name'));
                const answerFromUser = e.target[i].getAttribute('value');
                const answer = answerListAPI.answers.find(element => element.questionId === questionId);
   
                answer.answerFromUser = parseInt(answerFromUser);      
            }
        }
        const response = await addNewAnswers(answerListAPI);
        navigate(`/result/${response.id}`)
    }
  
    return (
        <>
        {
            questionList.length === 0 ? <div>Đang tải câu hỏi</div>
            :
            <form className="questionList" onSubmit={handleSubmit}>
                <h2 className="questionList__title">{topicName}</h2>
                <ul className="questionList__list">
                {
                    questionList.map((element, index)=>
                        <li className="questionList__question" key={index}>
                            <div className="questionList__question--query">Câu {index + 1}: {element.question}</div>
                            <div className="questionList__question--answers">
                                {
                                    element.answers.map((ans, index) =>
                                        <div className="questionList__question--answer" key={index}>
                                            <input type="radio" name={element.id} id={`quiz-`+element.id+'-'+index} correct={element.correctAnswer} value={index}></input>
                                            <label htmlFor={`quiz-`+element.id+'-'+index}>{ans}</label>
                                            <br></br>
                                        </div>
                                    )
                                }
                            </div>
                        </li>
                    )
                }
                </ul>
                <div className="questionList__support">
                    <button className="questionList__support--submit">Submit</button>
                </div>
            </form>
        }
        </>
    );
}

export default Quiz;