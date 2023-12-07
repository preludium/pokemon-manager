'use client';

import { Param } from '#/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './search.module.css';

export default function Search() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set(Param.QUERY, term);
        } else {
            params.delete(Param.QUERY);
        }
        params.set(Param.PAGE, '1');    
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div title='search' className={styles['search-bar']}>
            <FontAwesomeIcon icon={faSearch} />
            <input
                placeholder='Search'
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get(Param.QUERY)?.toString()}
            />
        </div>
    );
}
