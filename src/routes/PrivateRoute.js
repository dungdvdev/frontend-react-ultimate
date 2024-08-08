import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ children }) {
    const isAuthenicated = useSelector(state => state.user.isAuthenicated);
    if (!isAuthenicated) {
        return (
            <Navigate to={'/login'} />
        )
    }

    return (
        <>{children}</>
    );
}

export default PrivateRoute;