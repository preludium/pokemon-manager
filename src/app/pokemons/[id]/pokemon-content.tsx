'use client';

import { Pokemon } from '@prisma/client';
import { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';

import { capitalizeFirstLetter, isValidImage } from '#/app/utils';
import { Props as DefaultProps } from '#/types';

import styles from './pokemon.module.css';

interface Props extends DefaultProps {
    pokemon: Pick<Pokemon, 'name' | 'image'>;
    toolbar?: ReactNode;
}

export default function PokemonContent({ pokemon, toolbar, children }: Props) {
    const [isImage, setIsImage] = useState(false);

    useEffect(() => {
        isValidImage(pokemon.image)
            .then((decision) => setIsImage(decision));
    }, [pokemon.image]);

    return (
        <div className={styles.root}>
            <h1>
                {capitalizeFirstLetter(pokemon.name ?? '')}
            </h1>
            <div className={styles.info}>
                {isImage
                    ? <Image
                        className={styles.img}
                        src={pokemon.image}
                        alt={pokemon.name}
                        width={400}
                        height={400}
                    />
                    : <div className={styles.img}>Preview</div>}
                <div className={styles.details}>
                    {children}
                </div>
            </div>
            {toolbar}
        </div>
    );
}
