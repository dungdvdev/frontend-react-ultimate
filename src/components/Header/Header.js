import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.scss';


function Header() {
    const navigate = useNavigate();
    const isAuthenicated = useSelector(state => state.user.isAuthenicated);
    const account = useSelector(state => state.user.account);
    console.log(isAuthenicated);

    const handleLogin = () => {
        navigate("/login");
    }

    const handleRegister = () => {
        navigate("/signup");
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Dungdv</Navbar.Brand>
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
                                <NavDropdown.Item href="#action/3.4">
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