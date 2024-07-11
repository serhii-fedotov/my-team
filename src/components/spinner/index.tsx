import styles from './styles.module.css';

export const Spinner: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.spinner}></div>
        </div>
    );
};
