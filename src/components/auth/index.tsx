import React, { useState } from 'react';
import { Credentials, LoginResponseModel, RegistrationResponseModel } from '../../types/auth';
import { LOCAL_STORAGE_TOKEN } from '../../constants/auth';
import * as auth from '../../api/auth';

interface AuthContextType {
    token: string | null;
    login: (credentials: Credentials) => Promise<any>;
    register: (credentials: Credentials) => Promise<any>;
    logout: () => Promise<any>;
}

const AuthContext = React.createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem(LOCAL_STORAGE_TOKEN));

    const updateToken = (token: string) => {
        localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
        setToken(token);
    };

    const clearToken = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        setToken('');
    };

    const login = (credentials: Credentials) => {
        return auth.login(credentials).then((data: LoginResponseModel) => updateToken(data.token));
    };

    const register = (credentials: Credentials) => {
        return auth.register(credentials).then((data: RegistrationResponseModel) => updateToken(data.token));
    };

    const logout = () => {
        return auth.logout().then(() => clearToken());
    };

    const value = {
        token,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return React.useContext(AuthContext);
};
