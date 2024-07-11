import React from 'react';
import { Button } from '../button';
import styles from './styles.module.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number | null;
    paginate: Function;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, paginate }) => {
    if (!totalPages) {
        return null;
    }

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <ul className={styles.pagination}>
            <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                {'<'}
            </Button>
            {pages.map((number) => (
                <li key={number} className={styles.pageItem}>
                    <Button onClick={() => paginate(number)} disabled={currentPage === number}>
                        {number}
                    </Button>
                </li>
            ))}
            <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                {'>'}
            </Button>
        </ul>
    );
};
