import { AnchorHTMLAttributes } from 'react';
import styles from './primary.module.css';
import Link from 'next/link';

type Props = AnchorHTMLAttributes<HTMLAnchorElement>;

export default function LinkButton(props: Props) {
    return (
        <Link
            className={styles['link-button']}
            href={props.href ?? ''}
            {...props}
        />
    );
}