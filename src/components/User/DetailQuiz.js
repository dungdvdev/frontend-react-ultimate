import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { getQuizDataById, postSubmitQuiz } from '../../services/apiService';
import './DetailQuiz.scss';
import Question from './Question';
import ModalQuizResult from './ModalQuizResult';
import RightContent from './RightContent';

function DetailQuiz() {
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();
    const quizTitle = location?.state?.quizTitle;
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [dataModal, setDataModal] = useState({});
    const [isSubmitQuiz, setIsSubmitQuiz] = useState(false);
    const [isShowAnswer, setIsShowAnswer] = useState(false);
    const [count, setCount] = useState(300);

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
                console.log(res.DT);
                setIsSubmitQuiz(true);
                setDataModal(res.DT);
                setShowModal(true);
                setCount(0);

                //update DataQuiz with correct answer
                if (res.DT && res.DT.quizData) {
                    let dataQuizClone = _.cloneDeep(dataQuiz);
                    let a = res.DT.quizData;
                    for (let q of a) {
                        for (let i = 0; i < dataQuizClone.length; i++) {
                            if (+q.questionId === +dataQuizClone[i].questionId) {
                                //update answer
                                let newAnswers = [];
                                for (let j = 0; j < dataQuizClone[i].answers.length; j++) {
                                    let s = q.systemAnswers.find(item => +item.id === +dataQuizClone[i].answers[j].id)
                                    if (s) {
                                        dataQuizClone[i].answers[j].isCorrect = true;
                                    } else {
                                        dataQuizClone[i].answers[j].isCorrect = false;
                                    }
                                    newAnswers.push(dataQuizClone[i].answers[j]);
                                }
                                dataQuizClone[i].answers = newAnswers;
                            }
                        }
                    }
                    setDataQuiz(dataQuizClone);
                }
            } else {
                alert('somthing wrongs....')
            }
        }
    }

    useEffect(() => {
        const fetchQuetions = async () => {
            const res = await getQuizDataById(quizId);
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
                        answers = _.orderBy(answers, ['id'], ['asc']);
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
                            data={dataQuiz && dataQuiz.length > 0 && dataQuiz[index]}
                            index={index}
                            isShowAnswer={isShowAnswer}
                        />
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
                                    onClick={() => { handleFinishQuiz() }}
                                    disabled={isSubmitQuiz}
                                >Finish</button>
                            }
                        </div>
                    </div>
                    {showModal &&
                        <ModalQuizResult
                            show={showModal}
                            setShow={setShowModal}
                            dataModal={dataModal}
                            setIsShowAnswer={setIsShowAnswer}
                        />
                    }

                </div>
                <div className='right-content'>
                    <RightContent
                        data={dataQuiz}
                        setIndex={setIndex}
                        setIsShowAnswer={setIsShowAnswer}
                        handleFinishQuiz={handleFinishQuiz}
                        count={count}
                        setCount={setCount}
                    />
                </div>
            </div>
        </>
    );
}

export default DetailQuiz;