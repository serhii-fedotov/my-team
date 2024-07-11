import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { UserModel } from '../../types/user';
import { USERS_PAGE } from '../../constants/routes';
import { EditForm } from './edit-form';
import { Banner } from '../../components/banner';
import { Button } from '../../components/button';
import styles from './styles.module.css';
import { Spinner } from '../../components/spinner';
import { deleteUser, getUserProfile } from '../../api/users';

export interface EditFormState {
    first_name: string;
    last_name: string;
    email: string;
}

export const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<UserModel | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [error, setError] = useState('');
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getUserProfile(id)
                .then((data) => setUser(data.data))
                .catch((e) => setError(e.toString()));
        }
    }, [id]);

    const updateUser = (values: EditFormState) => {
        if (user) {
            setUser({ ...user, ...values });
            setIsEditMode(false);
        }
    };

    const handleDelete = () => {
        if (id && confirm('Do you want to delete this user?')) {
            deleteUser(id)
                .then(() => {
                    navigate(USERS_PAGE, { replace: true });
                })
                .catch((e) => setError(e.toString()));
        }
    };

    if (!user) {
        return <Spinner />;
    }

    return (
        <div className={styles.pageWrapper}>
            <Link to={USERS_PAGE} className={styles.back}>
                Back to all users
            </Link>
            {error && <Banner type="error" text={error} />}
            <div className={styles.profile}>
                <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className={styles.avatar} />
                {isEditMode ? (
                    <EditForm
                        {...user}
                        handleUpdate={updateUser}
                        exitEditMode={() => {
                            setIsEditMode(false);
                        }}
                    />
                ) : (
                    <div className={styles.userDetails}>
                        <h2 className={styles.name}>
                            {user.first_name} {user.last_name}
                        </h2>
                        <p>{user.email}</p>
                        <div>
                            <Button onClick={() => setIsEditMode(true)}>Edit</Button>
                            <Button customClass={styles.delete} onClick={handleDelete}>
                                Delete
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
