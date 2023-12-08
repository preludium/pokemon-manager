import Search from '#/components/search';
import SizeSelect from '#/components/size-select';
import SortDirection from '#/components/sort-direction';
import SortSelect from '#/components/sort-select';
import Loader from '#/components/loader';
import { PageProps } from '#/types';
import { Suspense } from 'react';

import styles from './pokemons.module.css';
import PokemonList from './pokemon-list';
import PrimaryButton from '#/components/buttons/primary/primary';
import LinkButton from '#/components/buttons/link/link';

export default async function Pokemons({ searchParams }: PageProps) {
    return (
        <div className={styles.root}>
            <section className={styles.toolbar}>
                <LinkButton href='/pokemons/new'>
                    Create
                </LinkButton>
                <div className={styles['sub-toolbar']}>
                    <SizeSelect />
                    <div>
                        <SortDirection />
                        <SortSelect />
                    </div>
                    <Search />
                </div>
            </section>
            <Suspense fallback={<Loader />}>
                <PokemonList searchParams={searchParams} />
            </Suspense>
        </div>
    );
}
