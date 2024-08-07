import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllQuizData, getAllUsers, postAssignQuizUser } from '../../../../services/apiService';
import { toast } from 'react-toastify';

function AssignQuiz() {
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [listQuiz, setListQuiz] = useState({});

    const [selectedUser, setSelectedUser] = useState({});
    const [listUser, setListUser] = useState({});

    useEffect(() => {
        fetchListAllQuiz();
        fetchAllUser();
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

    const fetchAllUser = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            const newListUser = res.DT.map((item) => {
                return (
                    {
                        value: item.id,
                        label: `${item.id} - ${item.username} - ${item.email}`
                    }
                )
            })
            setListUser(newListUser);
        }
    }

    const handleClick = async () => {
        const res = await postAssignQuizUser(selectedUser.value, selectedQuiz.value);
        if (res && res.EC === 0) {
            toast.success(res.EM);
        } else {
            toast.error(res.EM);
        }
    }
    return (
        <div className="assign-quiz-container" >
            <div className='group-select row align-items-center'>
                <div className='form-group col-5 '>
                    <label className='mb-2'>Select Quiz:</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className='col-2 text-center'>To</div>
                <div className='form-group col-5 group-select'>
                    <label className='mb-2'>Select User:</label>
                    <Select
                        defaultValue={selectedUser}
                        onChange={setSelectedUser}
                        options={listUser}
                    />
                </div>
            </div>
            <div className='group-action mt-3'>
                <button
                    onClick={() => handleClick()}
                    className='btn btn-warning'>Assign</button>
            </div>
        </div>
    );
}

export default AssignQuiz;