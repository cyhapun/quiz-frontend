import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTopicList } from "../../Services/topicServices";
import "./style.scss"

function TopicQuestion() {
    const navigate = useNavigate();
    let topicList = useRef([]);
    const [loading, setLoading] = useState(true);
    const getTopicListAPI = async () => {
        topicList.current = await getTopicList();
        setLoading(false);
    }
    const handleClick = (e) => {
        navigate(`/quiz/${e.target.getAttribute("topic")}`);
    }

    useEffect(() => {
        getTopicListAPI();
    }, [])
   
    return (
        <>
           {
            loading ? 
            <div></div>
            :
            <div className="topicQuestions">
                <h2 className="topicQuestions__title">Danh sách chủ đề ôn luyện</h2>
                <table className="topicQuestions__table">
                    <thead>       
                        <tr>
                            <th>ID</th>
                            <th>Tên chủ đề</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>    
                        {
                            topicList.current.map((element) => {
                                return (
                                    <tr key={element.id}>
                                        <td>{element.id}</td>
                                        <td>{element.name}</td>
                                        <td>
                                            <button topic={element.id} onClick={handleClick}>Làm bài</button>
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

export default TopicQuestion;