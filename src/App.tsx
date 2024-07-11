import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { PrivateRoute } from './components/private-route';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { UsersPage } from './pages/users';
import { ProfilePage } from './pages/profile';
import { AuthProvider } from './components/auth';
import { NonAuthRoute } from './components/non-auth-route';
import { LOGIN_PAGE, PROFILE_PAGE, REGISTER_PAGE, USERS_PAGE } from './constants/routes';
import { AppHeader } from './components/app-header';

export const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppHeader />
            <Routes>
                <Route
                    path={LOGIN_PAGE}
                    element={
                        <NonAuthRoute>
                            <LoginPage />
                        </NonAuthRoute>
                    }
                />
                <Route
                    path={REGISTER_PAGE}
                    element={
                        <NonAuthRoute>
                            <RegisterPage />
                        </NonAuthRoute>
                    }
                />
                <Route
                    path={USERS_PAGE}
                    element={
                        <PrivateRoute>
                            <UsersPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={PROFILE_PAGE}
                    element={
                        <PrivateRoute>
                            <ProfilePage />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Navigate to={USERS_PAGE} replace />} />
            </Routes>
        </AuthProvider>
    );
};
