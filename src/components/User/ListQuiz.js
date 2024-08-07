import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuizByUser } from '../../services/apiService';
import './ListQuiz.scss';

function ListQuiz() {
    const [arrQuiz, setArrQuiz] = useState([]);
    const navigation = useNavigate();

    useEffect(() => {
        getQuizData();
    }, []);

    const getQuizData = async () => {
        const res = await getQuizByUser();
        if (res && res.EC === 0) {
            setArrQuiz(res.DT);
        }
    }
    return (
        <>
            <div className="list-quiz-container container">
                {arrQuiz && arrQuiz.length > 0 &&
                    arrQuiz.map((quiz, index) => {
                        return (
                            <div key={`${index}-quiz`} className="card" style={{ width: "18rem" }}>
                                <img src={`data:image/png;base64, ${quiz.image}`} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Quiz {index + 1}</h5>
                                    <p className="card-text">{quiz.description}</p>
                                    <button className="btn btn-primary" onClick={() => { navigation(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } }) }}>Start now</button>
                                </div>
                            </div>
                        )
                    })
                }
                {arrQuiz && arrQuiz.length === 0 &&
                    <p>You don't any quiz now...</p>
                }
            </div>

        </>
    );
}

export default ListQuiz;