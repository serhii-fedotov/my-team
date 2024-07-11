import styles from './styles.module.css';

interface InputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    name: string;
    placeholder: string;
    error: string;
}

export const Input: React.FC<InputProps> = ({ value, onChange, type, name, placeholder, error }) => {
    return (
        <div className={styles.wrapper}>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={styles.input}
            />
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};
