'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Param } from '#/types';

export default function SortDirection() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const direction = searchParams.get(Param.SORT_DIRECTION) === 'desc'
        ? 'desc' : 'asc';

    const handleClick = () => {
        const params = new URLSearchParams(searchParams);
        if (direction === 'desc') {
            params.set(Param.SORT_DIRECTION, 'asc');
        } else {
            params.set(Param.SORT_DIRECTION, 'desc');
        }
        router.replace(`${pathname}?${params.toString()}`);
    };

    const getIcon = () => direction === 'desc'
        ? faArrowDown
        : faArrowUp;

    return (
        <button title='toggle sort direction' type='button' onClick={handleClick}>
            <FontAwesomeIcon icon={getIcon()} />
        </button>
    );
}
