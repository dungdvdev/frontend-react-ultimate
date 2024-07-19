import { useState } from "react";
import { FaBars } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Admin.scss';
import Sidebar from "./Sidebar";


function Admin() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <>
            <div className="admin-container">
                <div className="admin-sidebar">
                    <Sidebar collapsed={collapsed} />
                </div>
                <div className="admin-content">
                    <div className="admin-header">
                        <FaBars size={'1.5rem'} onClick={() => setCollapsed(!collapsed)} />
                    </div>
                    <div className="admin-main">
                        <Outlet />
                    </div>

                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                {/* Same as */}
                <ToastContainer />
            </div>
        </>
    );
}

export default Admin;