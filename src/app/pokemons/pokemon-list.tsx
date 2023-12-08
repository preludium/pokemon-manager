import Pagination from '#/components/pagination';
import PokemonTile from '#/components/pokemon-tile';
import { fetchPokemonsPage } from '#/lib/api';
import { PageProps } from '#/types';
import { PokemonsPage } from '../api/pokemons/route';

import styles from './pokemons.module.css';

export default async function PokemonList({
    searchParams
}: Pick<PageProps, 'searchParams'>) {
    const pokemons: PokemonsPage = await fetchPokemonsPage(searchParams);

    const pokemonList = pokemons.data
        .map(pokemon => <PokemonTile key={pokemon.id} pokemon={pokemon} />);

    const emptyPageMessage = (
        <h1>No Pokemon found that match your criteria</h1>
    );

    return (
        <>
            {pokemons.data.length === 0
                ? emptyPageMessage
                :<div className={styles.list}>
                    {pokemonList}
                </div>}
            <div className={styles.center}>
                <Pagination totalPages={pokemons.totalPages} />
            </div>
        </>
    );
}
