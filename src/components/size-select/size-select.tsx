'use client';

import { Param } from '#/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { MouseEvent } from 'react';

export default function SizeSelect() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handleClick = (event: MouseEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams);
        // @ts-ignore
        params.set(Param.SIZE, event.target.value);
        router.replace(`${pathname}?${params.toString()}`);
    };

    const defaultValue = Number(searchParams.size) ?? 10;

    return (
        <select
            data-type='size'
            onClick={handleClick}
            defaultValue={defaultValue}
        >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
        </select>
    );
}
