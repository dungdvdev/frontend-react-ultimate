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
import { useNavigate } from 'react-router-dom';
import sidebarBg from '../../asset/bg2.jpg';
import 'react-pro-sidebar/dist/scss/styles.scss';
import { useTranslation } from 'react-i18next';

function Sidebar({ image, collapsed, handleToggleSidebar }) {
    const navigation = useNavigate();
    const { t } = useTranslation();

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
                            letterSpacing: '3px',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigation('/')}
                    >
                        <DiReact size={'3em'} color={'00bfff'} />

                        <span style={{ paddingLeft: '10px' }}>iQuizz </span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard />}
                        >
                            {t('textsidebardashboard')}
                            <Link to='/admins' />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            title={t('textsidebarFeature')}
                            icon={<FaGem />}
                        >
                            <MenuItem>{t('textsidebarManagerUsers')} <Link to='/admins/manage-users' /></MenuItem>
                            <MenuItem>{t('textsidebarManagerQuiz')} <Link to='/admins/manage-quiz' /></MenuItem>
                            <MenuItem>{t('textsidebarManagerQuestions')} <Link to='/admins/manage-questions' /></MenuItem>
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