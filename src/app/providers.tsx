"use client";

import { Props } from '#/types';
import { SessionProvider } from "next-auth/react";

export const NextAuthProvider = ({ children }: Props) => {
    return <SessionProvider>{children}</SessionProvider>;
};