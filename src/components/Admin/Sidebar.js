import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaGem, FaGithub, FaFacebook } from 'react-icons/fa';
import { DiReact } from 'react-icons/di';
import { MdDashboard } from "react-icons/md";
import { Link } from 'react-router-dom';

import sidebarBg from '../../asset/bg2.jpg';
import 'react-pro-sidebar/dist/scss/styles.scss';

function Sidebar({ image, collapsed, handleToggleSidebar }) {
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            fontWeight: 'bold',
                            fontSize: 14,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            letterSpacing: '3px'
                        }}
                    >
                        <DiReact size={'3em'} color={'00bfff'} />
                        <span style={{ paddingLeft: '10px' }}>iQuizz</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard />}
                        >
                            Dashboard
                            <Link to='/admins' />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            title='Feature'
                            icon={<FaGem />}
                        >
                            <MenuItem>Manager Users <Link to='/admins/manage-users' /></MenuItem>
                            <MenuItem>Manager Quiz</MenuItem>
                            <MenuItem>Manager Questions</MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                            display: 'flex',
                            gap: '10px',
                            justifyContent: 'center'
                        }}
                    >
                        <a
                            href="https://github.com/dungdvdev"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="https://github.com/dungdvdev"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaFacebook />
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    );
}

export default Sidebar;