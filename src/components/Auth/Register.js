import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Register.scss';
import { postRegister } from "../../services/apiService";
import { toast } from 'react-toastify';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState('form-input-eyeicon-hide')

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleToggle = () => {
        if (type === 'password') {
            setType('text');
            setIcon('form-input-eyeicon-show');
        } else {
            setType('password');
            setIcon('form-input-eyeicon-hide');
        }
    }

    const handleLogin = async () => {
        //validate
        const isValidateEmail = validateEmail(email);
        if (!isValidateEmail) {
            toast.error('Invalid Email');
            return;
        }

        if (!password) {
            toast.error('Invalid Password');
            return;
        }

        //Submit
        let data = await postRegister(email, password, username);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/login');
        }
        if (data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    return (
        <>
            <div className="register-container">
                <div className="header">
                    <span className="signup-link">Already have an account?</span>
                    <button onClick={() => { navigate('/login') }}>Login</button>
                </div>
                <div className="register-content col-4 mx-auto pt-4">
                    <div className="title py-2 text-center">Register</div>
                    <div className="wellcome py-2 text-center">Get better data with conversational forms, surveys, quizzes & more.</div>
                    <div className="register-form">
                        <div className="form-group py-2">
                            <label htmlFor="inputEmail">Email *</label>
                            <input type="email" className="form-control" id="inputEmail" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter email" />
                        </div>
                        <div className="form-group py-2">
                            <label htmlFor="inputPassword">Password *</label>
                            <div className="form-input-password">
                                <input type={type} className="form-control" id="inputPassword" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" />
                                <button className="form-input-password-toggle" onClick={() => { handleToggle() }}>
                                    <span className={`form-input-eyeicon ${icon}`}></span>
                                </button>
                            </div>
                        </div>
                        <div className="form-group py-2">
                            <label htmlFor="inputUsername">User Name</label>
                            <input type="text" className="form-control" id="inputUsername" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter username" />
                        </div>
                        <button className="btn btn-primary btn-submit mt-3" onClick={() => handleLogin()}>Create account</button>
                        <div className="back text-center mt-3">
                            <span onClick={() => { navigate('/') }}>&#60;&#60; Go to homepage</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;