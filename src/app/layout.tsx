import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextAuthProvider } from './providers';
import { Props } from '#/types';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Pokemon Manager'
};

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <NextAuthProvider>{children}</NextAuthProvider>
            </body>
        </html>
    );
}
