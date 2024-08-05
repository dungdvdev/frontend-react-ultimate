import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdOutlineCloudUpload } from "react-icons/md";
import { toast } from 'react-toastify';
import { putUpdateQuiz } from '../../../../services/apiService';
import _ from 'lodash';

function ModalUpdateQuiz({ show, setShowModal, dataUpdate, restUpdateData }) {
    const handleClose = () => {
        setShowModal(false);
        setName('');
        setDescription('');
        setDifficulty('')
        setImage('');
        setPreviewImage('');
        restUpdateData();
    };
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name);
            setDescription(dataUpdate.description);
            setDifficulty(dataUpdate.difficulty);
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
            }

        }

    }, [dataUpdate])

    const handleChangeImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        }
    }

    const handleSubmitUpdateQuiz = async () => {
        //validate

        if (!name) {
            toast.error('Invalid Username');
            return;
        }

        let data = await putUpdateQuiz(dataUpdate.id, description, name, difficulty, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
        }
        if (data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} size='xl' backdrop="static" className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Modal Update a Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Type</label>
                            <select
                                className="form-select"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                            >
                                <option value='EASY'>EASY</option>
                                <option value='MEDIUM'>MEDIUM</option>
                                <option value='HARD'>HARD</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <label className='form-label label-upload-file' htmlFor='uploadImage'><MdOutlineCloudUpload color='green' /> Upload file image</label>
                            <input type='file' hidden id='uploadImage' onChange={(e) => handleChangeImage(e)} />
                        </div>
                        <div className='col-12 image-preview'>
                            {
                                previewImage ?
                                    <img src={previewImage} alt='preview' />
                                    :
                                    <span>Preview image</span>
                            }

                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateQuiz;