import { useState } from 'react';
import { validateEmail, validateName } from '../../utils/validation';
import { Banner } from '../../components/banner';
import { Input } from '../../components/input';
import { EditFormState } from './index';
import { Button } from '../../components/button';
import styles from './styles.module.css';
import { updateUser } from '../../api/users';

interface FormProps extends EditFormState {
    id: number;
    handleUpdate: (values: EditFormState) => void;
    exitEditMode: () => void;
}

export const EditForm: React.FC<FormProps> = ({ first_name, last_name, email, id, handleUpdate, exitEditMode }) => {
    const [values, setValues] = useState<EditFormState>({
        first_name,
        last_name,
        email,
    });
    const [validation, setValidation] = useState<EditFormState>({
        first_name: '',
        last_name: '',
        email: '',
    });
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const firstNameError = validateName(values.first_name);
        const lastNameError = validateName(values.last_name);
        const emailError = validateEmail(values.email);

        if (firstNameError || lastNameError || emailError) {
            setValidation({
                first_name: firstNameError,
                last_name: lastNameError,
                email: emailError,
            });
        } else {
            setError('');
            setIsFetching(true);

            updateUser(id.toString(), values)
                .then(() => handleUpdate(values))
                .catch((e) => {
                    setIsFetching(false);
                    setError(e.toString());
                });
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.userDetails}>
            {error && <Banner type="error" text={error} />}
            <Input
                type="text"
                name="first_name"
                value={values.first_name}
                onChange={handleChange}
                error={validation.first_name}
                placeholder="First Name"
            />
            <Input
                type="text"
                name="last_name"
                value={values.last_name}
                onChange={handleChange}
                error={validation.last_name}
                placeholder="Last Name"
            />
            <Input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={validation.email}
                placeholder="Email"
            />
            <div>
                <Button type="submit" disabled={isFetching}>
                    Save
                </Button>
                <Button disabled={isFetching} onClick={exitEditMode}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};
