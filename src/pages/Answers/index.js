import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss"
import { getAnswerListByUserId } from "../../Services/answerService";
import { getInfoUser } from "../../Services/userServices";
import { getCookie } from "../../helper/cookie";
import { getTopicById } from "../../Services/topicServices";

function Answers() {
    const navigate = useNavigate();
    // const [answerList, setAnswerList] = useState([]);
    let answerList = useRef();
    const [loading, setLoading] = useState(true);

    const getAnswerListAPIByUserId = async () => {
        // Return array
        const userInfo = await getInfoUser(getCookie("token"));
        const userId = userInfo[0].id;
        answerList.current = await getAnswerListByUserId(userId);

        // Insert topicName to answer by Id
        for (const answer of answerList.current) {
            const response = await getTopicById(answer.topicId);
            // console.log(response[0].name);
            answer.topicName = response[0].name;
        }
        // forEach not suitable for async/await
        //     answerList.current.forEach(async (answer) => {
        //         const response = await getTopicById(answer.topicId);
        //         answer.topicName = response[0].name;
        //     })

        // Reverse the list so that the newest element is at the head.
        answerList.current = answerList.current.reverse();

        setLoading(false);
    }
    const handleClick = (e) => {
        navigate(`/result/${e.target.getAttribute("answer")}`);
    }

    useEffect(() => {
        getAnswerListAPIByUserId()
    }, [])
   
    return (
        <>
           {
            loading ? 
            <div>Đang tải...</div>
            :
            <div className="Answers">
                <h2 className="Answers__title">List of completed exercises:</h2>
                <table className="Answers__table">
                    <thead>       
                        <tr>
                            <th>ID</th>
                            <th>Tên chủ đề</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>    
                        {
                            answerList.current.map((element) => {
                                return (
                                    <tr key={element.id}>
                                        <td>{element.id}</td>
                                        <td>{element.topicName}</td>
                                        <td>
                                            <button answer={element.id} onClick={handleClick}>Detail</button>
                                        </td>
                                    </tr>
                                ); 
                            })
                        }
                    </tbody>
                </table>
            </div> 
           }
        </>
    );
};

export default Answers;