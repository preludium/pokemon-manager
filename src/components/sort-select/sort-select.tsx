'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Param } from '#/types';

import styles from './sort-selet.module.css';

export default function SortSelect() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handleClick = (fieldName: string) => {
        const params = new URLSearchParams(searchParams);
        if (fieldName === 'none') {
            params.delete(Param.SORT_BY);
        } else {
            params.set(Param.SORT_BY, fieldName);
        }
        router.replace(`${pathname}?${params.toString()}`);
    };

    const defaultValue = searchParams.get(Param.SORT_BY) ?? 'none';

    return (
        <select
            title='sort by property'
            data-type='sort'
            className={styles.select}
            //@ts-ignore
            onClick={(event) => handleClick(event.target.value)}
            defaultValue={defaultValue}
        >
            <option value={'none'}>None</option>
            <option value={'name'}>Name</option>
            <option value={'height'}>Height</option>
            <option value={'weight'}>Weight</option>
        </select>
    );
}
