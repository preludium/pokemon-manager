import { ButtonHTMLAttributes } from 'react';
import styles from './primary.module.css';
type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function PrimaryButton(props: Props) {
    return (
        <button className={styles['primary-button']} {...props} />
    );
}