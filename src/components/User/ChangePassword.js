import { useState } from "react";
import { toast } from 'react-toastify';
import { postChangePassword } from "../../services/apiService";

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmitChangePassword = async () => {

        if (!currentPassword) {
            toast.error('Invalid Current Password');
            return;
        }

        if (!newPassword) {
            toast.error('Invalid New Password');
            return;
        }

        let data = await postChangePassword(currentPassword, newPassword);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            setCurrentPassword('');
            setNewPassword('');
        }
        if (data.EC !== 0) {
            toast.error(data.EM)
        }
    }
    return (
        <>
            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Current Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <div className='col-12'>
                    <button className='btn btn-warning' onClick={() => handleSubmitChangePassword()}>Update</button>
                </div>
            </div>
        </>
    );
}

export default ChangePassword;