import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.scss';
import { logout } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';

function Header() {
    const navigate = useNavigate();
    const isAuthenicated = useSelector(state => state.user.isAuthenicated);
    const account = useSelector(state => state.user.account);
    const dispatch = useDispatch();
    const handleLogin = () => {
        navigate("/login");
    }

    const handleRegister = () => {
        navigate("/signup");
    }

    const handleLogOut = async () => {
        const res = await logout(account.email, account.refresh_token);
        if (res && res.EC === 0) {
            //clear redux
            dispatch(doLogout());
            handleLogin();
        } else {
            toast.error(res.EM);
        }
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">iQuizz</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/' className='nav-link'>Home</NavLink>
                        <NavLink to='/users' className='nav-link'>Users</NavLink>
                        <NavLink to='/admins' className='nav-link'>Admin</NavLink>
                    </Nav>
                    <Nav>
                        {isAuthenicated === false ?
                            <>
                                <button onClick={() => handleLogin()} className='btn-login'>Log in</button>
                                <button onClick={() => handleRegister()} className='btn-signup'>Sign up</button>
                            </>
                            :
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => handleLogOut()}>
                                    Log out
                                </NavDropdown.Item>
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;