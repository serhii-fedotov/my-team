import { Link } from 'react-router-dom';
import { PROFILE_PAGE } from '../../constants/routes';
import { UserCardModel } from '../../types/user';
import { Button } from '../button';
import styles from './styles.module.css';

interface UserCardProps extends UserCardModel {
    deleteUser: (id: number) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ id, avatar, fullName, deleteUser }) => (
    <div className={styles.card}>
        <Button customClass={styles.delete} onClick={() => deleteUser(id)}>
            Delete
        </Button>
        <img src={avatar} alt="user avatar" width={100} height={100} className={styles.avatar} />
        <h2 className={styles.name}>{fullName}</h2>
        <Link to={PROFILE_PAGE.replace(':id', id.toString())}>View profile</Link>
    </div>
);
