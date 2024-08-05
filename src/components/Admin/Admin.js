import { useState } from "react";
import { FaBars } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import './Admin.scss';
import Sidebar from "./Sidebar";
import { Scrollbar } from 'react-scrollbars-custom';

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