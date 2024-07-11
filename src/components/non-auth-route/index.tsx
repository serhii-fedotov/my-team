import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth';

export const NonAuthRoute = ({ children }: { children: JSX.Element }) => {
    const auth = useAuth();

    if (auth.token) {
        return <Navigate to="/" replace />;
    }

    return children;
};
