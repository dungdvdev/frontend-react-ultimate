import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdOutlineCloudUpload } from "react-icons/md";
import { toast } from 'react-toastify';
import { putUpdateNewUser } from '../../services/apiService';
import _ from 'lodash';

function ModalUpdateUser({ show, setShowModalUpdateUser, fetchListAllUsers, dataUpdate, restUpdateData }) {
    const handleClose = () => {
        setShowModalUpdateUser(false);
        setEmail('');
        setUsername('');
        setPassword('')
        setRole('USER');
        setImage('');
        setPreviewImage('');
        restUpdateData();
    };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);
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

    const handleSubmitUpdateUser = async () => {
        //validate

        if (!username) {
            toast.error('Invalid Username');
            return;
        }

        let data = await putUpdateNewUser(dataUpdate.id, username, role, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await fetchListAllUsers();
        }
        if (data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} size='xl' backdrop="static" className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Modal Update a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select
                                className="form-select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value='USER'>USER</option>
                                <option value='ADMIN'>ADMIN</option>
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
                    <Button variant="primary" onClick={() => handleSubmitUpdateUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;