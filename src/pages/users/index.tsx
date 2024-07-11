import React, { useState, useEffect } from 'react';
import { UserCard } from '../../components/user-card';
import { UserCardModel, UserModel } from '../../types/user';
import { Pagination } from '../../components/pagination';
import { useSearchParams } from 'react-router-dom';
import { Banner } from '../../components/banner';
import styles from './styles.module.css';
import { Spinner } from '../../components/spinner';
import { deleteUser, getAllUsers } from '../../api/users';

export const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<UserCardModel[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPages, setTotalPages] = useState(null);
    const [error, setError] = useState('');

    const updatePage = (page: number) => {
        setSearchParams((params) => {
            params.set('page', page.toString());

            return params;
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Do you want to delete this user?')) {
            setError('');

            deleteUser(id.toString())
                .then(() => {
                    setUsers((users) => {
                        const userToDelete: number = users.findIndex((user) => user.id === id);

                        if (userToDelete > -1) {
                            users.splice(userToDelete, 1);
                        }

                        return [...users];
                    });
                })
                .catch((e) => setError(e.toString()));
        }
    };

    useEffect(() => {
        setError('');

        const queryParams = searchParams.toString();

        getAllUsers(queryParams)
            .then((data) => {
                setTotalPages(data.total_pages);
                const users = data.data.map((user: UserModel) => ({
                    id: user.id,
                    avatar: user.avatar,
                    fullName: `${user.first_name} ${user.last_name}`,
                }));
                setUsers(users);
            })
            .catch((error) => setError(error.toString()));
    }, [searchParams]);

    if (!users && !error) {
        return <Spinner />;
    }

    return (
        <div>
            {error && <Banner type="error" text={error} />}
            <div className={styles.cardsHolder}>
                {users.map((user) => (
                    <UserCard key={user.id} deleteUser={handleDelete} {...user} />
                ))}
            </div>
            <Pagination
                currentPage={parseInt(searchParams.get('page') || '1')}
                totalPages={totalPages}
                paginate={updatePage}
            />
        </div>
    );
};
