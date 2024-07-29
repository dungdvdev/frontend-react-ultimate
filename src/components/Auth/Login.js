import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.scss';
import { postLogin } from "../../components/services/apiService";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner6 } from "react-icons/im";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

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
        setIsLoading(true);
        //Submit api
        let data = await postLogin(email, password);
        if (data && data.EC === 0) {
            dispatch(doLogin(data));
            toast.success(data.EM);
            setIsLoading(false);
            // navigate('/');
        }
        if (data.EC !== 0) {
            toast.error(data.EM);
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="login-container">
                <div className="header">
                    <span className="signup-link">Don't have an account yet?</span>
                    <button onClick={() => { navigate('/signup') }}>Sign up</button>
                </div>
                <div className="login-content col-4 mx-auto pt-4">
                    <div className="title py-2 text-center">Login</div>
                    <div className="wellcome py-2 text-center">Hello, who’s this?</div>
                    <div className="login-form">
                        <div className="form-group py-2">
                            <label htmlFor="inputEmail">Email address</label>
                            <input type="email" className="form-control" id="inputEmail" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter email" />
                        </div>
                        <div className="form-group py-2">
                            <label htmlFor="inputPassword">Password</label>
                            <input type="password" className="form-control" id="inputPassword" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
                        </div>
                        <div className="form-forgot">
                            <a href={'/login/password/request'}>Forgot password?</a>
                        </div>
                        <button
                            className="btn btn-primary btn-submit mt-3"
                            disabled={isLoading}
                            onClick={() => handleLogin()

                            }>
                            {isLoading && <ImSpinner6 className="loader-icon" />}
                            <span>Login</span>
                        </button>
                        <div className="back text-center mt-3">
                            <span onClick={() => { navigate('/') }}>&#60;&#60; Go to homepage</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;