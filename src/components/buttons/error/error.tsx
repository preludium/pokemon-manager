import { ButtonHTMLAttributes } from 'react';
import styles from './error.module.css';
type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function ErrorButton(props: Props) {
    return (
        <button className={styles['error-button']} {...props} />
    );
}