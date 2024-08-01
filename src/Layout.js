import {
    Routes,
    Route,
} from "react-router-dom";
import App from './App';
import Admin from './components/Admin/Admin';
import Homepage from './components/Home/Homepage';
import Dashboard from './components/Admin/Content/Dashboard';
import ManageUser from './components/Admin/Content/ManageUser';
import Login from './components/Auth/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";

function Layout() {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Homepage />} />
                    <Route path="users" element={<ListQuiz />} />
                </Route>
                <Route path="admins" element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Register />} />
            </Routes>

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
        </>
    );
}

export default Layout;