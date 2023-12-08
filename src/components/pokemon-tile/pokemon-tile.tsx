import { Pokemon } from '@prisma/client';

import styles from './pokemon-tile.module.css';
import Link from 'next/link';
import { capitalizeFirstLetter } from '#/app/utils';
import Image from 'next/image';

interface Props {
    pokemon: Pokemon;
}

export default function PokemonTile({ pokemon }: Props) {
    return (
        <article
            className={styles.tile}
            title={pokemon.name}
        >
            <Link href={`/pokemons/${pokemon.id}`}>
                <Image
                    width={100}
                    height={100}
                    key={pokemon.id}
                    src={pokemon.image}
                    alt={pokemon.name}
                />
                <h3>
                    {capitalizeFirstLetter(pokemon.name)}
                </h3>
            </Link>
        </article>
    );
}