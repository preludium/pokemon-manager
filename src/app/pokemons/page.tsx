import Pagination from '#/components/pagination';
import PokemonTile from '#/components/pokemon-tile';
import Search from '#/components/search';
import SizeSelect from '#/components/size-select';
import SortDirection from '#/components/sort-direction';
import SortSelect from '#/components/sort-select';

import { PageProps } from '#/types';

import { PokemonsPage } from '../api/pokemons/route';
import styles from './pokemons.module.css';

function fetchPokemonsPage(searchParams: PageProps['searchParams']) {
    const queryParams = Object.entries(searchParams)
        .map(([param, value]) => `${param}=${value}`);
    return fetch(`http://localhost:3000/api/pokemons?${queryParams.join('&')}`)
        .then(response => response.json());
}

export default async function Pokemons({ searchParams }: PageProps) {
    const pokemons: PokemonsPage = await fetchPokemonsPage(searchParams);

    const pokemonList = pokemons.data
        .map(pokemon => <PokemonTile key={pokemon.id} pokemon={pokemon} />);

    return (
        <div className={styles.root}>
            <section className={styles.toolbar}>
                <Search />
                <div className={styles['sub-toolbar']}>
                    <SizeSelect />
                    <div className={styles.sort}>
                        <SortDirection />
                        <SortSelect />
                    </div>
                </div>
            </section>
            <div className={styles.list}>
                {
                    // TODO: suspense + loader
                }
                {pokemonList}
            </div>
            <Pagination totalPages={pokemons.totalPages} />
        </div>
    );
}
