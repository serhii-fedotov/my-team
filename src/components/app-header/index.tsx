import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import { Button } from '../button';
import styles from './styles.module.css';

export const AppHeader: React.FC = () => {
    const auth = useAuth();

    const handleLogout = () => {
        auth.logout().catch((e) => console.log(e));
    };

    return (
        <header className={styles.header}>
            <h1 className={styles.logo}>
                <Link to="/">
                    <span className={styles.my}>My</span>Team
                </Link>
            </h1>
            {auth.token && <Button onClick={handleLogout}>Logout</Button>}
        </header>
    );
};
