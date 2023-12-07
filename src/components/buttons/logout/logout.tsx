"use client";

import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'next-auth/react';

import styles from './logout.module.css';

export default function LogoutButton() {
    return (
        <button
            title='logout'
            type='button'
            className={styles['logout-button']}
            onClick={() => signOut()}
        >
            <FontAwesomeIcon icon={faSignOut} />
        </button>
    );
};
