import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { getQuizDataById, postSubmitQuiz } from '../../services/apiService';
import './DetailQuiz.scss';
import Question from './Question';
import ModalQuizResult from './ModalQuizResult';

function DetailQuiz() {
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();
    const quizTitle = location?.state?.quizTitle;
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [dataModal, setDataModal] = useState({});



    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1);
    }

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1) {
            setIndex(index + 1);
        }
    }

    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId);

        if (question && question.answers) {
            let data = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item
            });
            question.answers = data;
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId);
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    }

    const handleFinishQuiz = async () => {
        let payload = {
            quizId: +quizId,
            answers: []
        };
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId;
                let userAnswerId = [];

                question.answers.forEach(a => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id)
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })

            })
            payload.answers = answers;
            //submit api
            let res = await postSubmitQuiz(payload);
            if (res && res.EC === 0) {
                setShowModal(true);
                setDataModal(res.DT);
            } else {
                alert('somthing wrong...')
            }
        }
    }

    useEffect(() => {
        const fetchQuetions = async () => {
            const res = await getQuizDataById(quizId);
            // console.log(res);
            if (res && res.EC === 0) {
                let raw = res.DT;
                let data = _.chain(raw)
                    .groupBy("id")
                    .map((value, key) => {
                        let answers = [];
                        let questionDescription, image = null;
                        value.forEach((item, index) => {
                            if (index === 0) {
                                questionDescription = item.description;
                                image = item.image;
                            }
                            item.answers.isSelected = false;
                            answers.push(item.answers);
                        })
                        return { questionId: key, answers, questionDescription, image }
                    })
                    .value();
                setDataQuiz(data);
            }
        }

        fetchQuetions();
    }, [quizId]);

    return (
        <>
            <div className='detail-quiz-container container'>
                <div className='left-content'>
                    <div className='quiz-title'>
                        <h2>Quiz {quizId}: {quizTitle}</h2>
                    </div>
                    <hr />
                    <div className='quiz-content'>
                        <Question
                            handleCheckbox={handleCheckbox}
                            data={dataQuiz && dataQuiz.length > 0 && dataQuiz[index]} index={index} />
                        <div className='quiz-actions'>
                            <button
                                disabled={index - 1 < 0}
                                className='btn btn-secondary'
                                onClick={() => { handlePrev() }}>Prev</button>
                            <button
                                disabled={dataQuiz.length === index + 1}
                                className='btn btn-primary'
                                onClick={() => { handleNext() }}>Next</button>
                            {dataQuiz.length === index + 1 &&
                                <button
                                    className='btn btn-warning'
                                    onClick={() => { handleFinishQuiz() }}>Finish</button>
                            }
                        </div>
                    </div>
                    {showModal &&
                        <ModalQuizResult show={showModal} setShow={setShowModal} dataModal={dataModal} />
                    }

                </div>
                <div className='right-content'>Count down</div>
            </div >
        </>
    );
}

export default DetailQuiz;