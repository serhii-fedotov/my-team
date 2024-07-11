import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth';
import { LOGIN_PAGE } from '../../constants/routes';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const auth = useAuth();

    if (!auth.token) {
        return <Navigate to={LOGIN_PAGE} replace />;
    }

    return children;
};
