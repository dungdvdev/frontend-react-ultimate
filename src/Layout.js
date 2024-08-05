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
import DetailQuiz from "./components/User/DetailQuiz";
import { useNavigate } from "react-router-dom";
import ManagerQuiz from "./components/Admin/Content/Quiz/ManageQuiz";

const NotFound = () => {
    const navigation = useNavigate();
    return (
        <section className="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="text-center">
                            <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">
                                <span className="display-1 fw-bold">404</span>
                            </h2>
                            <h3 className="h2 mb-2">Oops! You're lost.</h3>
                            <p className="mb-5">The page you are looking for was not found.</p>
                            <button className="btn bsb-btn-5xl btn-dark rounded-pill px-5 fs-6 m-0" onClick={() => { navigation('/') }}>Back to Home</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
function Layout() {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Homepage />} />
                    <Route path="users" element={<ListQuiz />} />
                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz />} />
                <Route path="admins" element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                    <Route path="manage-quiz" element={<ManagerQuiz />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Register />} />
                <Route path='*' exact={true} element={<NotFound />} />
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