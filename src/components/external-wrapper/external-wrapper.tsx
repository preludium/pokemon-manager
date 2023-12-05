import { Props } from '#/types';
import styles from './external-wrapper.module.css';

interface ExternalWrapperProps extends Props {
    title: string;
}

export function ExternalWrapper({ title, children }: ExternalWrapperProps) {
    return (
        <div className={styles.root}>
            <div className={styles.paper}>
                <h2>{title}</h2>
                {children}
            </div>
        </div>
    );
}
