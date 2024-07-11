const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRe = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%#^(){}[\/\\\]',."`;:*?&]{8,}$/;
const nameRe = /^[A-Za-z]+$/;

export const validateEmail = (email: string): string => {
    if (!email) {
        return 'Email is required';
    }

    return emailRe.test(email.toLowerCase()) ? '' : 'Invalid email format';
};

export const validatePassword = (password: string): string => {
    if (!password) {
        return 'Password is required';
    }

    return passwordRe.test(password)
        ? ''
        : 'Password must be at least 8 characters, contain at least one letter and one number';
};

export const validateConfirmPassword = (confirmPassword: string, password: string): string => {
    if (!confirmPassword) {
        return 'Confirm password is required';
    }

    return confirmPassword === password ? '' : 'Passwords do not match';
};

export const validateName = (name: string): string => {
    if (!name) {
        return 'This field is required';
    }

    return nameRe.test(name) ? '' : 'Please only use latin letters';
};
