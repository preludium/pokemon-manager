'use client';

import { fetchPokemon, updatePokemon } from '#/lib/api';
import { PageProps } from '#/types';
import { redirect, useRouter } from 'next/navigation';
import PokemonContent from '../pokemon-content';
import { useMutation, useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { Pokemon } from '@prisma/client';
import { toast } from 'react-toastify';
import Loader from '#/components/loader';
import styles from '../pokemon.module.css';
import PokemonForm from '#/components/pokemon-form';

const pokemonInit: Omit<Pokemon, 'id'> = {
    name: '',
    height: 0,
    weight: 0,
    image: ''
};

export default function PokemonEdit({ params }: PageProps<{id: string}>) {
    const router = useRouter();

    const pokemonId = Number(params.id);

    if (Number.isNaN(pokemonId)) {
        redirect('/404');
    }

    const { isLoading, data: pokemon } = useQuery('pokemon',
        () => fetchPokemon(pokemonId),
        {
            onError: (error) => {
                if (error instanceof Error) {
                    toast.error(error.message);
                }
                redirect('/404');
            }
        });
    const mutation = useMutation({
        mutationFn: updatePokemon,
        onSuccess: () => {
            toast.success('Pokemon updated');
            router.push(`/pokemons/${pokemonId}`);
        },
        onError: (error) => {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An error occurred while updating pokemon');
            }
        }
    });

    const [pokemonForm, setPokemonForm] = useState(pokemonInit);

    useEffect(() => {
        if (pokemon) {
            setPokemonForm({ ...pokemonInit, ...pokemon });
        }
    }, [pokemon]);

    if (!pokemon) {
        return (
            <div className={styles['loader-wrapper']}>
                <Loader />
            </div>
        );
    }

    return (
        <PokemonContent pokemon={{ name: pokemon.name, image: pokemonForm.image }}>
            <PokemonForm
                form={pokemonForm}
                setForm={setPokemonForm}
                submitting={mutation.isLoading}
                buttonTitle={mutation.isLoading ? 'Saving...' : 'Save'}
                onSubmit={() => {
                    mutation.mutate({ id: pokemonId, ...pokemonForm });
                }}
            />
        </PokemonContent>
    );
}
