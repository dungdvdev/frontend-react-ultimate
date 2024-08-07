import Select from 'react-select';
import './Questions.scss';
import { useState, useEffect } from 'react';
import { BsFillPatchPlusFill, BsPatchMinusFill } from "react-icons/bs";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { Lightbox } from "react-modal-image";
import { getAllQuizData, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion } from '../../../../services/apiService';
import { toast } from 'react-toastify';
// import { toast } from 'react-toastify';

function Questions() {
    const initQuestion = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                }
            ]
        }
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [questions, setQuestions] = useState(initQuestion);
    const [isShowPreviewImage, setIsShowPreviewImage] = useState(false);

    const [dataPreviewImage, setDataPreviewImage] = useState({
        url: '',
        title: ''
    });
    const [listQuiz, setListQuiz] = useState({});

    useEffect(() => {
        fetchListAllQuiz();
    }, [])

    const fetchListAllQuiz = async () => {
        let res = await getAllQuizData();
        if (res.EC === 0) {
            const newListQuiz = res.DT.map((item) => {
                return (
                    {
                        value: item.id,
                        label: `${item.id} - ${item.description}`
                    }
                )
            })
            setListQuiz(newListQuiz);
        }
    }

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestions = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
            setQuestions([...questions, newQuestions]);
        }
        if (type === 'REMOVE') {
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter(item => item.id !== id);
            setQuestions(questionClone);
        }
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions);

        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone);
        }

        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId);
            setQuestions(questionsClone);
        }
    }

    const handleOnChangeQuestion = (questionId, value) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);

        if (index > -1) {
            questionClone[index].description = value;
            setQuestions(questionClone);
        }
    }

    const handleChangeFileQuestion = (questionId, event) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);

        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionClone[index].imageFile = event.target.files[0];
            questionClone[index].imageName = event.target.files[0].name;
            setQuestions(questionClone);
        }
        console.log('>> questions:', questions);
    }

    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            questionClone[index].answers =
                questionClone[index].answers.map(answer => {
                    if (answer.id === answerId) {
                        if (type === 'CHECKBOX') {
                            answer.isCorrect = value;
                        }
                        if (type === 'INPUT') {
                            answer.description = value;
                        }
                    }
                    return answer;
                })
            setQuestions(questionClone);
        }
    }

    const handleSubmitQuestionForQuiz = async () => {
        //validate
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Please choose a Quiz!');
            return;
        }

        //validate answer
        let isValidAnswer = true;
        let indexQ = 0, indexA = 0;
        for (let i = 0; i < questions.length; i++) {

            for (let j = 0; j < questions[i].answers.length; j++) {

                if (!questions[i].answers[j].description) {
                    isValidAnswer = false;
                    indexA = j;
                    break;
                }
            }
            indexQ = i;
            if (isValidAnswer === false) break;
        }

        if (isValidAnswer === false) {
            toast.error(`Not empty Answer ${indexA + 1} at Question ${indexQ + 1}`)
            return;
        }

        // validate question
        let isValidQ = true;
        let indexQ1 = 0;
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQ = false;
                indexQ1 = i;
                break;
            }
        }
        if (isValidQ === false) {
            toast.error(`Not empty Question ${indexQ1 + 1}`);
            return;
        }

        //submit question
        for (const question of questions) {
            const q = await postCreateNewQuestionForQuiz(
                +selectedQuiz.value,
                question.description,
                question.imageFile
            );

            //submit answer
            for (const answer of question.answers) {
                await postCreateNewAnswerForQuestion(
                    answer.description,
                    answer.isCorrect,
                    q.DT.id
                )
            }
        }
        toast.success('Create question and answer success.');
        setQuestions(initQuestion);
        console.log(initQuestion, questions);
    }
    const handlePreviewImage = (questionId) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);

        if (index > -1 && questionClone[index].imageName) {
            setDataPreviewImage({
                url: URL.createObjectURL(questionClone[index].imageFile),
                title: questionClone[index].imageName
            })
            setIsShowPreviewImage(true);
        }
    }
    return (
        <div className="questions-container">
            <div className="title mt-3">
                <h2>Manager Question</h2>
            </div>
            <hr />
            <div className="add-new-questions">
                <div className='row'>
                    <div className='form-group col-6 group-select'>
                        <label className='mb-2'>Select Quiz:</label>
                        <Select
                            defaultValue={selectedQuiz}
                            onChange={setSelectedQuiz}
                            options={listQuiz}
                        />
                    </div>
                    <div className='title mt-3 mb-2'>
                        Add questions:
                    </div>

                    {questions && questions.length > 0 && questions.map((question, index) => {
                        return (
                            <div key={`question-${index}`} className='q-main mb-3'>
                                <div className='questions-content'>
                                    <div className='form-question'>
                                        <div className="form-floating description">
                                            <input
                                                value={question.description}
                                                placeholder=''
                                                type="text"
                                                className="form-control"
                                                onChange={(e) => handleOnChangeQuestion(question.id, e.target.value)}
                                            />
                                            <label>Question's {index + 1} description</label>
                                        </div>
                                        <div className='group-upload'>
                                            <label htmlFor={`${question.id}`} className='label-upload'><RiImageAddFill /></label>
                                            <input
                                                onChange={(event) => handleChangeFileQuestion(question.id, event)}
                                                id={`${question.id}`}
                                                type='file'
                                                hidden />
                                            <span
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handlePreviewImage(question.id)}
                                                className='image-name'
                                            >{question.imageName ? 'View file uploaded' : '0 file is uploaded'} </span>
                                        </div>
                                        <div className='group-actions'>
                                            <span onClick={() => handleAddRemoveQuestion('ADD')}>
                                                <BsFillPatchPlusFill className='icon-add' />
                                            </span>
                                            {questions && questions.length > 1 &&
                                                <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                    <BsPatchMinusFill className='icon-remove' />
                                                </span>
                                            }
                                        </div>
                                    </div>
                                    {question.answers.map((answer, index) => {
                                        return (
                                            <div key={`answer-${index}`} className='answer-content d-flex'>
                                                <input
                                                    type='checkbox'
                                                    className='form-check-input iscorrect'
                                                    checked={answer.isCorrect}
                                                    onChange={(event) => handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)}
                                                />
                                                <div className="form-floating answer-name">
                                                    <input
                                                        value={answer.description}
                                                        placeholder=''
                                                        type="text"
                                                        className="form-control"
                                                        onChange={(e) => handleAnswerQuestion('INPUT', answer.id, question.id, e.target.value)}
                                                    />
                                                    <label>Answer {index + 1}</label>
                                                </div>
                                                <div className='group-actions btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id, answer.id)}>
                                                        <AiFillPlusCircle />
                                                    </span>
                                                    {question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                                                            <AiFillMinusCircle />
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })
                    }
                    {questions && questions.length > 0 &&
                        <div>
                            <button
                                onClick={() => handleSubmitQuestionForQuiz()}
                                className='btn btn-warning'>Save Questions</button>
                        </div>
                    }
                    {
                        isShowPreviewImage && <Lightbox
                            medium={dataPreviewImage.url}
                            alt={dataPreviewImage.title}
                            onClose={() => setIsShowPreviewImage(false)}
                        />
                    }


                </div>

            </div>
        </div>
    );
}

export default Questions;