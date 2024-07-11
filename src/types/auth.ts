export interface Credentials {
    email: string;
    password: string;
}

export interface LoginResponseModel {
    token: string;
}

export interface RegistrationResponseModel extends LoginResponseModel {
    id: number;
}
