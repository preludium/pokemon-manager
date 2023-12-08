'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import styles from './pagination.module.css';
import { Param } from '#/types';

interface Props {
    totalPages: number;
}

export const getCurrentPage = (search: URLSearchParams) => {
    const page = search.get(Param.PAGE);
    const pageNumber = Number(page);
    return !page || Number.isNaN(pageNumber) ? 1 : pageNumber;
};

export default function Pagination({ totalPages }: Props) {
    const router = useRouter();
    const search = useSearchParams();
    const pathname = usePathname();

    const pages = Array.from(
        Array(totalPages).keys(), page => page + 1
    );

    const handleClick = (page: number) => {
        const params = new URLSearchParams(search);
        params.set(Param.PAGE, String(page));
        router.replace(`${pathname}?${params.toString()}`);
    };

    const content = (
        <>
            <button
                className={`${styles.pageButton} ${pages[0] === getCurrentPage(search) ? styles.hidden : ''}`}
                onClick={() => handleClick(getCurrentPage(search) - 1)}
                title='Go to the previous page'
            >
                <span>
                    {'<'}
                </span>
            </button>
            {pages
                .filter(page => page >= getCurrentPage(search) - 3 && page <= getCurrentPage(search) + 3)
                .map(page => (
                    <button
                        key={page}
                        className={`${styles.pageButton} ${page === getCurrentPage(search) ? styles.selected : ''}`}
                        onClick={() => handleClick(page)}
                        title={`Go to ${page} page`}
                    >
                        <span>
                            {page}
                        </span>
                    </button>
                ))}
            <button
                className={`${styles.pageButton} ${pages[pages.length - 1] === getCurrentPage(search) ? styles.hidden : ''}`}
                onClick={() => handleClick(getCurrentPage(search) + 1)}
                title='Go to the next page'
            >
                <span   >
                    {'>'}
                </span>
            </button>
        </>
    );

    return (
        <div className={styles.paginationWrapper}>
            {totalPages === 0 ? <></> : content}
        </div>
    );
};
