import { Props } from '#/types';
import { Header } from '../header';
import styles from './internal-wrapper.module.css';

export function InternalWrapper({ children }: Props) {
    return (
        <div className={styles.root}>
            <Header />
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}