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
import Language from './Language';
import { useTranslation } from 'react-i18next';
import ModalManageUser from '../User/ModalManageUser';
import { useState } from 'react';

function Header() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const isAuthenicated = useSelector(state => state.user.isAuthenicated);
    const account = useSelector(state => state.user.account);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

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

    const handleProfile = () => {
        setShowModal(true);
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">iQuizz</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to='/' className='nav-link'>{t('navlinkhome')}</NavLink>
                            <NavLink to='/users' className='nav-link'>{t('navlinkusers')}</NavLink>
                            <NavLink to='/admins' className='nav-link'>{t('navlinkadmin')}</NavLink>
                        </Nav>
                        <Nav>
                            <Language />
                            {isAuthenicated === false ?
                                <>
                                    <button onClick={() => handleLogin()} className='btn-login'>{t('textlogin')}</button>
                                    <button onClick={() => handleRegister()} className='btn-signup'>{t('textsignin')}</button>
                                </>
                                :
                                <NavDropdown title={t('textsettings')} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={() => handleProfile()}>{t('textprofile')}</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={() => handleLogOut()}>
                                        {t('textlogout')}
                                    </NavDropdown.Item>
                                </NavDropdown>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {showModal &&
                <ModalManageUser
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            }
        </>

    );
}

export default Header;