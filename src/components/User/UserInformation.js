import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { MdOutlineCloudUpload } from "react-icons/md";
import { toast } from 'react-toastify';
import { postUpdateProfile } from '../../services/apiService';
import './UserInformation.scss';


function UserInformation() {
    const account = useSelector(state => state.user.account);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        if (!_.isEmpty(account)) {
            setEmail(account.email);
            setUsername(account.username);
            setRole(account.role);
            if (account.image) {
                setPreviewImage(`data:image/jpeg;base64,${account.image}`);
            }

        }

    }, [account])

    const handleChangeImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        }
    }

    const handleSubmitUpdateUser = async () => {

        if (!username) {
            toast.error('Invalid Username');
            return;
        }

        let data = await postUpdateProfile(username, image);
        console.log(data);
        if (data && data.EC === 0) {
            toast.success(data.EM);
        }
        if (data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    return (
        <>
            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        disabled
                        onChange={(e) => setEmail(e.target.value)} />
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
                        disabled
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
                <div className='col-12'>
                    <button className='btn btn-warning' onClick={() => handleSubmitUpdateUser()}>Update</button>
                </div>
            </div>
        </>
    );
}

export default UserInformation;