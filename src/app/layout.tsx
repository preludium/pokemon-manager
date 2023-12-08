import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

import { NextAuthProvider } from './providers';
import { Props } from '#/types';

import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Pokemon Manager'
};

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <NextAuthProvider>
                    {children}
                </NextAuthProvider>
                <ToastContainer
                    position="top-right"
                    pauseOnHover
                    theme='dark'
                />
            </body>
        </html>
    );
}
