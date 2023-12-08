export interface Props {
    children?: React.ReactNode;
}

export interface PageProps<T extends Record<string, string> | undefined = undefined> {
    params: T;
    searchParams: { [key: string]: string | string[] | undefined };
}

export enum Param {
    QUERY = 'query',
    PAGE = 'page',
    SIZE = 'size',
    SORT_DIRECTION = 'sortDirection',
    SORT_BY = 'sortBy',
}