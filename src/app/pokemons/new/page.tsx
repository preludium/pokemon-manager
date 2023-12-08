'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { useState } from 'react';
import { Pokemon } from '@prisma/client';
import { toast } from 'react-toastify';

import PokemonForm from '#/components/pokemon-form';
import { createPokemon } from '#/lib/api';

import PokemonContent from '../[id]/pokemon-content';

const pokemonInit: Omit<Pokemon, 'id'> = {
    name: '',
    height: 0,
    weight: 0,
    image: ''
};

export default function PokemonCreate() {
    const router = useRouter();
    const [pokemonForm, setPokemonForm] = useState(pokemonInit);

    const mutation = useMutation({
        mutationFn: createPokemon,
        onSuccess: () => {
            toast.success('Pokemon created');
            router.push('/pokemons');
        },
        onError: (error) => {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An error occurred while creating pokemon');
            }
        }
    });

    return (
        <PokemonContent pokemon={{ name: 'New Pokemon', image: pokemonForm.image }}>
            <PokemonForm
                form={pokemonForm}
                setForm={setPokemonForm}
                submitting={mutation.isLoading}
                buttonTitle={mutation.isLoading ? 'Creating...' : 'Create'}
                onSubmit={() => {
                    mutation.mutate(pokemonForm);
                }}
            />
        </PokemonContent>
    );
}
