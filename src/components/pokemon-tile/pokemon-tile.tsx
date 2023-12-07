import { Pokemon } from '@prisma/client';

import styles from './pokemon-tile.module.css';

interface Props {
    pokemon: Pokemon;
}

export default function PokemonTile({ pokemon }: Props) {
    return (
        <div
            className={styles.tile}
            title={pokemon.name}
        >
            <img
                key={pokemon.id}
                src={pokemon.image}
                alt={pokemon.name}
            />
            <h3>
                {pokemon.name}
            </h3>
        </div>
    );
}