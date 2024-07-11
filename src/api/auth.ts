import { defaultErrorHandler } from './index';
import { Credentials, LoginResponseModel, RegistrationResponseModel } from '../types/auth';

export const login = (credentials: Credentials): Promise<LoginResponseModel> => {
    return fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    }).then((res) => {
        if (!res.ok) {
            return defaultErrorHandler(res);
        } else {
            return res.json();
        }
    });
};

export const register = (credentials: Credentials): Promise<RegistrationResponseModel> => {
    return fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    }).then((res) => {
        if (!res.ok) {
            return defaultErrorHandler(res);
        } else {
            return res.json();
        }
    });
};

export const logout = (): Promise<void> => {
    return fetch('https://reqres.in/api/logout', {
        method: 'POST',
    }).then((res) => {
        if (!res.ok) {
            return defaultErrorHandler(res);
        }
    });
};
