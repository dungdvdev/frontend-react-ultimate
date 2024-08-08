import Select from 'react-select';
import './QuizQuestionAnswer.scss';
import { useState, useEffect } from 'react';
import { BsFillPatchPlusFill, BsPatchMinusFill } from "react-icons/bs";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { Lightbox } from "react-modal-image";
import { getAllQuizData, getQuizQA, postUpsertQuizQA } from '../../../../services/apiService';
import { toast } from 'react-toastify';
// import { toast } from 'react-toastify';

function QuizQuestionAnswer() {
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

    function urltoFile(url, filename, mimeType) {
        if (url.startsWith('data:')) {
            var arr = url.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[arr.length - 1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            var file = new File([u8arr], filename, { type: mime || mimeType });
            return Promise.resolve(file);
        }
        return fetch(url)
            .then(res => res.arrayBuffer())
            .then(buf => new File([buf], filename, { type: mimeType }));
    }

    useEffect(() => {
        fetchListAllQuiz();
    }, []);
    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetchQuizWithQA();
        }
        // eslint-disable-next-line
    }, [selectedQuiz]);

    const fetchQuizWithQA = async () => {
        const res = await getQuizQA(selectedQuiz.value);
        if (res && res.EC === 0) {
            //convert base64 to File Object
            let newQA = [];
            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i];
                if (q.imageFile) {
                    q.imageName = `Question-${q.id}.png`;
                    q.imageFile = await urltoFile(`data:image/png;base64,${q.imageFile}`, `Question-${q.id}.png`, 'image/png');
                }
                newQA.push(q);
            }
            setQuestions(newQA);
        }
    }

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
                id: +id + 1,
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: 1,
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
                id: +answerId + 1,
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

        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });

        //submit question
        let questionClone = _.cloneDeep(questions);
        for (let i = 0; i < questionClone.length; i++) {
            if (questionClone[i].imageFile) {
                questionClone[i].imageFile = await toBase64(questionClone[i].imageFile);
            }
        }
        const res = await postUpsertQuizQA({
            quizId: selectedQuiz.value,
            questions: questionClone
        });

        if (res && res.EC === 0) {
            toast.success(res.EM);
            fetchQuizWithQA();
        } else {
            toast.error(res.EM);
        }

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
                                            <span onClick={() => handleAddRemoveQuestion('ADD', question.id)}>
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

export default QuizQuestionAnswer;