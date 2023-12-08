import { Pokemon } from '@prisma/client';
import { redirect } from 'next/navigation';

import { fetchPokemon } from '#/lib/api';
import { PageProps } from '#/types';

import PokemonContent from './pokemon-content';
import PokemonToolbar from './pokemon-toolbar';

import styles from './pokemon.module.css';

export default async function Pokemon({
    params
}: PageProps<{id: string}>) {
    const pokemonId = Number(params.id);

    if (Number.isNaN(pokemonId)) {
        redirect('/404');
    }

    const pokemon = await fetchPokemon(pokemonId);
    if (!pokemon) {
        redirect('/404');
    }

    return (
        <PokemonContent
            pokemon={pokemon}
            toolbar={<PokemonToolbar pokemon={pokemon} />}
        >
            <div className={styles['readonly-details']}>
                <strong>Height</strong>
                {pokemon.height}
                <strong>Weight</strong>
                {pokemon.weight}
            </div>
        </PokemonContent>
    );
}
