import styles from './header.module.css';
import LogoutButton from '#/components/buttons/logout';
import Image from 'next/image';
import Link from 'next/link';
import { getServerSession } from 'next-auth';

export async function Header() {
    const { user } = await getServerSession();
    return (
        <header className={styles.header}>
            <Link href='/pokemons'>
                <Image
                    src='/pokemon.png'
                    alt='Pokemon Manager logo'
                    width={40}
                    height={30}
                />
            </Link>
            <div className={styles['account-group']}>
                <h3>{user.email}</h3>
                <LogoutButton />
            </div>
        </header>
    );
}