import styles from './styles.module.css';

interface BannerProps {
    type: string;
    text: string;
}

const typeMap: Record<string, string> = {
    error: styles.error,
};

export const Banner: React.FC<BannerProps> = ({ text, type }) => {
    return <p className={`${styles.banner} ${typeMap[type]}`}>{text}</p>;
};
