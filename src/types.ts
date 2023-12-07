export interface Props {
    children?: React.ReactNode;
}

export interface PageProps {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export enum Param {
    QUERY = 'query',
    PAGE = 'page',
    SIZE = 'size',
    SORT_DIRECTION = 'sortDirection',
    SORT_BY = 'sortBy',
}