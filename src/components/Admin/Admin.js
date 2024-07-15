import Sidebar from "./Sidebar";
import { FaBars } from 'react-icons/fa';
import './Admin.scss';
import { useState } from "react";

function Admin() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <>
            <div className="admin-container">
                <div className="admin-sidebar">
                    <Sidebar collapsed={collapsed} />
                </div>
                <div className="admin-content"><FaBars size={'1.5rem'} onClick={() => setCollapsed(!collapsed)} /></div>
            </div>
        </>
    );
}

export default Admin;