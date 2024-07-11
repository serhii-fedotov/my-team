import { UserModel } from '../types/user';

export const getAllUsers = (queryParams: string = ''): Promise<any> => {
    return fetch(`https://reqres.in/api/users${queryParams && `?${queryParams}`}`).then((res) => {
        if (!res.ok) {
            return res.json().then((data) => {
                throw new Error(data.error);
            });
        }

        return res.json();
    });
};

export const getUserProfile = (id: string): Promise<any> => {
    return fetch(`https://reqres.in/api/users/${id}`).then((res) => {
        if (!res.ok) {
            return res.json().then((data) => {
                throw new Error(data.error);
            });
        }

        return res.json();
    });
};

export const updateUser = (id: string, values: Partial<UserModel>): Promise<any> => {
    return fetch(`https://reqres.in/api/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
    }).then((res) => {
        if (!res.ok) {
            return res.json().then((data) => {
                throw new Error(data.error);
            });
        }
    });
};

export const deleteUser = (id: string): Promise<any> => {
    return fetch(`https://reqres.in/api/users/${id}`, {
        method: 'DELETE',
    }).then((res) => {
        if (!res.ok) {
            return res.json().then((data) => {
                throw new Error(data.error);
            });
        }
    });
};