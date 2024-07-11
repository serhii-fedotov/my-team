import { useState } from 'react';
import { validateEmail, validatePassword } from '../../utils/validation';
import { useAuth } from '../../components/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/input';
import { Banner } from '../../components/banner';
import { REGISTER_PAGE } from '../../constants/routes';
import { Button } from '../../components/button';
import styles from './index.module.css';

interface LoginFormState {
    email: string;
    password: string;
}

export const LoginPage: React.FC = () => {
    const [values, setValues] = useState<LoginFormState>({
        email: '',
        password: '',
    });
    const [validation, setValidation] = useState<LoginFormState>({
        email: '',
        password: '',
    });
    const [isFetching, setIsFetching] = useState(false);
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

        if (emailError || passwordError) {
            setValidation({ email: emailError, password: passwordError });
        } else {
            setError('');
            setIsFetching(true);

            auth.login({ email: values.email, password: values.password })
                .then(() => {
                    navigate('/', { replace: true });
                })
                .catch((e) => {
                    setError(e.toString());
                    setIsFetching(false);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Login</h2>
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
            <Button type="submit" disabled={isFetching}>
                Log in
            </Button>
            <p>
                New user? <Link to={REGISTER_PAGE}>Sign up</Link>
            </p>
        </form>
    );
};
