'use client';

import { Pokemon } from '@prisma/client';
import { ChangeEvent } from 'react';
import PrimaryButton from '../buttons/primary';

import styles from './pokemon-form.module.css';

interface Props {
    form: Omit<Pokemon, 'id'>;
    buttonTitle: string;
    submitting: boolean;
    setForm: (pokemon: Omit<Pokemon, 'id'>) => void;
    onSubmit: (form: Omit<Pokemon, 'id'>) => void;
}

export default function form({
    form, buttonTitle, submitting, setForm, onSubmit,
}: Props) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: name === 'name '
                ? value.toLowerCase()
                : value
        });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form className={styles.form} onSubmit={handleSave}>
            <div>
                <label htmlFor='name'>Name</label>
                <input
                    id='name'
                    required
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor='image'>Image</label>
                <input
                    id='image'
                    required
                    type="url"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor='weight'>Weight</label>
                <input
                    id='weight'
                    required
                    type="number"
                    name="weight"
                    value={form.weight}
                    min={0}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor='height'>Height</label>
                <input
                    id='height'
                    required
                    type="number"
                    name="height"
                    value={form.height}
                    min={0}
                    onChange={handleChange}
                />
            </div>
            <div>
                <PrimaryButton
                    type='submit'
                    disabled={submitting}
                >
                    {buttonTitle}
                </PrimaryButton>
            </div>
        </form>
    );
}