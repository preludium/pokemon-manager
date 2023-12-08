'use client';

import { Pokemon } from '@prisma/client';
import styles from './pokemon.module.css';
import { useRouter } from 'next/navigation';
import { deletePokemon } from '#/lib/api';
import { toast } from 'react-toastify';
import Link from 'next/link';
import ErrorButton from '#/components/buttons/error/error';
import LinkButton from '#/components/buttons/link';

interface Props {
    pokemon: Pokemon;
}

export default function PokemonToolbar({ pokemon }: Props) {
    const router = useRouter();

    async function handleDelete() {
        const confirmation = confirm(`Do you want to delete ${pokemon.name} pokemon?\nThis operation is irreversible`);
        if (!confirmation) {
            return;
        }

        await deletePokemon(pokemon.id)
            .then(() => {
                toast.success(`Pokemon ${pokemon.name} deleted`);
                router.replace('/pokemons');
            })
            .catch((error) => {
                if (error instanceof Error) {
                    toast.error(error.message);
                } else {
                    toast.error('An error occurred while deleting pokemon');
                }
            });
    }

    return (
        <div className={styles.toolbar}>
            <LinkButton
                href={`/pokemons/${pokemon.id}/edit`}
            >
                Edit
            </LinkButton>
            <ErrorButton onClick={handleDelete}>
                Delete
            </ErrorButton>
        </div>
    );
}
