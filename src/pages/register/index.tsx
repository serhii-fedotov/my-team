import { useState } from 'react';
import { validateConfirmPassword, validateEmail, validatePassword } from '../../utils/validation';
import { useAuth } from '../../components/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/input';
import { Banner } from '../../components/banner';
import { LOGIN_PAGE } from '../../constants/routes';
import { Button } from '../../components/button';
import styles from '../login/index.module.css';

interface RegistrationFormState {
    email: string;
    password: string;
    confirmPassword: string;
}

export const RegisterPage: React.FC = () => {
    const [values, setValues] = useState<RegistrationFormState>({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [validation, setValidation] = useState<RegistrationFormState>({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const emailError = validateEmail(values.email);
        const passwordError = validatePassword(values.password);
        const confirmPasswordError = validateConfirmPassword(values.confirmPassword, values.password);

        if (emailError || passwordError || confirmPasswordError) {
            setValidation({
                email: emailError,
                password: passwordError,
                confirmPassword: confirmPasswordError,
            });
        } else {
            setError('');
            auth.register({ email: values.email, password: values.password })
                .then(() => {
                    navigate('/', { replace: true });
                })
                .catch((e) => setError(e.toString()));
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Welcome to MyTeam</h2>
            <p>Please enter an email and a password to create new account</p>
            {error && <Banner type="error" text={error} />}
            <Input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={validation.email}
                placeholder="Email"
            />
            <Input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                error={validation.password}
                placeholder="Password"
            />
            <Input
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                error={validation.confirmPassword}
                placeholder="Confirm password"
            />
            <Button type="submit">Sign up</Button>
            <p>
                Already have an account? <Link to={LOGIN_PAGE}>Log in</Link>
            </p>
        </form>
    );
};
