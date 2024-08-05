import Select from 'react-select';
import './ManageQuiz.scss';
import { postCreateNewQuiz, getAllQuizData } from '../../../../services/apiService';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import ModalDeleteQuiz from './ModalDeleteQuiz';
import ModalUpdateQuiz from './ModalUpdateQuiz';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

function ManageQuiz() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState(null);
    const [image, setImage] = useState(null);
    const [dataUpdate, setDataUpdate] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [listQuiz, setlistQuiz] = useState([]);


    useEffect(() => {
        fetchListAllQuiz();
    }, [showModal])

    const fetchListAllQuiz = async () => {
        let res = await getAllQuizData();
        if (res.EC === 0) {
            setlistQuiz(res.DT);
        }
    }
    const handleChangeFile = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleClickBtnDelete = (quiz) => {
        setShowModal(true);
        setDataUpdate(quiz);
    }

    const handleClickBtnUpdate = (quiz) => {
        setShowModal(true);
        setDataUpdate(quiz);
    }

    const restUpdateData = () => {
        setDataUpdate({});
    }

    const handleSubmit = async () => {
        //validate
        if (!name || !description) {
            toast.error('Invalid Name/Description');
            return;
        }

        if (!type?.value) {
            toast.error('Invalid Quiz Type');
            return;
        }

        let res = await postCreateNewQuiz(description, name, type?.value, image);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setName('');
            setDescription('');
            setType('');
        } else {
            toast.error(res.EM);
        }
    }

    return (
        <div className="manage-quiz-container">
            <h2 className='mt-4'>Manage Quiz</h2>
            <hr />
            <Accordion defaultActiveKey="0">
                <Accordion.Item>
                    <Accordion.Header>Add New Quiz</Accordion.Header>
                    <Accordion.Body>
                        <div className="quiz-form">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto w-auto px-3">Form quiz</legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Your quiz name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <label>Your quiz name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="description"
                                        className="form-control"
                                        placeholder="Description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <label>Your Description</label>
                                </div>
                                <div className="form-type mb-3">
                                    <Select
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder="Quiz type"
                                    />
                                </div>
                                <div className='form-image form-group'>
                                    <div className='mb-2'><label>Upload image</label></div>
                                    <input
                                        type='file'
                                        className='form-control'
                                        onChange={(e) => handleChangeFile(e)}
                                    />
                                </div>
                                <div className='form-action'>
                                    <button className='btn btn-primary btn-submit mt-3' onClick={() => { handleSubmit() }}>Add new quiz</button>
                                </div>
                            </fieldset>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <div className='quiz-table mt-3'>
                <TableQuiz
                    handleClickBtnDelete={handleClickBtnDelete}
                    handleClickBtnUpdate={handleClickBtnUpdate}
                    listQuiz={listQuiz}
                />
                <ModalDeleteQuiz
                    show={showModal}
                    setShowModal={setShowModal}
                    handleClickBtnDelete={handleClickBtnDelete}
                    dataUpdate={dataUpdate}
                />
                <ModalUpdateQuiz
                    show={showModal}
                    setShowModal={setShowModal}
                    dataUpdate={dataUpdate}
                    restUpdateData={restUpdateData}
                />
            </div>
        </div>
    );
}

export default ManageQuiz;