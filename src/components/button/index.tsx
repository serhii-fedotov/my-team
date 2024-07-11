import styles from './styles.module.css';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    children: React.ReactNode;
    onClick?: (...args: any[]) => void;
    customClass?: string;
}

export const Button: React.FC<ButtonProps> = ({
    type = 'button',
    disabled = false,
    children,
    onClick = () => {},
    customClass = '',
}) => {
    return (
        <button type={type} onClick={onClick} disabled={disabled} className={`${styles.button} ${customClass}`}>
            {children}
        </button>
    );
};
