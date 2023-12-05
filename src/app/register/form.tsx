"use client";

import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";

import styles from '#/components/external-wrapper/external-wrapper.module.css';
import Link from 'next/link';

export const RegisterForm = () => {
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

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
                setError((await res.json()).message);
                return;
            }

            signIn(undefined, { callbackUrl: "/" });
        } catch (error: any) {
            setLoading(false);
            setError(error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <form onSubmit={onSubmit} className={styles.form}>
            {error && (
                <p>{error}</p>
            )}
            <div>
                <label htmlFor='email'>Email</label>
                <input
                    id='email'
                    required
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="Email address"
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
                    placeholder="Password"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
            >
                {loading ? "loading..." : "Register"}
            </button>
            <Link href='/login'>
                Already have an account?
            </Link>
        </form>
    );
};
