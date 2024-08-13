import { useState } from "react";
import { FaBars } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import './Admin.scss';
import Sidebar from "./Sidebar";
import { Scrollbar } from 'react-scrollbars-custom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Language from "../Header/Language";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { doLogout } from "../../redux/action/userAction";
import { useNavigate } from 'react-router-dom';
import { logout } from "../../services/apiService";
import { useTranslation } from 'react-i18next';

function Admin() {
    const { t } = useTranslation();
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/login");
    }
    const dispatch = useDispatch();
    const account = useSelector(state => state.user.account);

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
        <>
            <div className="admin-container">
                <div className="admin-sidebar">
                    <Sidebar collapsed={collapsed} />
                </div>
                <div className="admin-content">
                    <div className="admin-header d-flex align-items-center justify-content-between p-3">
                        <span className="toogle cursor-pointer">
                            <FaBars size={'1.5rem'} onClick={() => setCollapsed(!collapsed)} />

                        </span>
                        <div className="header-right d-flex gap-3">
                            <Language />

                            <NavDropdown title={t('textsettings')} id="basic-nav-dropdown">
                                <NavDropdown.Item >{t('textprofile')}</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => handleLogOut()}>
                                    {t('textlogout')}
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>

                    </div>
                    <Scrollbar className="admin-scroll">
                        <div className="admin-main">
                            <Outlet />
                        </div>
                    </Scrollbar>


                </div>

            </div>
        </>
    );
}

export default Admin;