"use client";

import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";

import styles from '#/components/external-wrapper/external-wrapper.module.css';
import Link from 'next/link';
import PrimaryButton from '#/components/buttons/primary';
import { toast } from 'react-toastify';

export const RegisterForm = () => {
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setFormValues({ email: "", password: "" });

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setLoading(false);
            if (!res.ok) {
                toast.error((await res.json()).message);
                return;
            }

            signIn(undefined, { callbackUrl: "/" });
        } catch (error) {
            setLoading(false);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An error occurred');
            }
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <div>
                <label htmlFor='email'>Email</label>
                <input
                    id='email'
                    required
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                    id='password'
                    required
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                />
            </div>
            <PrimaryButton
                type="submit"
                disabled={loading}
            >
                {loading ? "loading..." : "Register"}
            </PrimaryButton>
            <Link href='/login'>
                Already have an account?
            </Link>
        </form>
    );
};
