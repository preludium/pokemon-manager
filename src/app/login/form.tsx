"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

import styles from '#/components/external-wrapper/external-wrapper.module.css';
import Link from 'next/link';
import PrimaryButton from '#/components/buttons/primary';
import { toast } from 'react-toastify';

export const LoginForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/pokemons";

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setFormValues({ email: "", password: "" });

            const res = await signIn("credentials", {
                redirect: false,
                email: formValues.email,
                password: formValues.password,
                callbackUrl,
            });

            setLoading(false);

            console.log(res);
            if (!res?.error) {
                router.push(callbackUrl);
            } else {
                toast.error('invalid email or password');
            }
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
                {loading ? "loading..." : "Login"}
            </PrimaryButton>
            <Link href='/register'>
                No account yet?
            </Link>
        </form>
    );
};
