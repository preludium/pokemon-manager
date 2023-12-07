import styles from './header.module.css';
import LogoutButton from '#/components/buttons/logout';

export function Header() {
    return (
        <header className={styles.header}>
            <LogoutButton />
        </header>
    );
}