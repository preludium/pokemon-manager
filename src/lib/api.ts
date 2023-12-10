import { PageProps } from '#/types';
import { Pokemon } from '@prisma/client';

export function fetchPokemon(pokemonId: Pokemon['id']): Promise<Pokemon> {
    return fetch(`http://localhost:3000/api/pokemons/${pokemonId}`, {
        cache: 'no-store'
    })
        .then(async (response) => {
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message);
            }

            return json;
        });
}

export function fetchPokemonsPage(searchParams: PageProps['searchParams']) {
    const queryParams = Object.entries(searchParams)
        .map(([param, value]) => `${param}=${value}`);
    return fetch(`http://localhost:3000/api/pokemons?${queryParams.join('&')}`)
        .then(async (response) => {
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message);
            }

            return json;
        });
}

export function updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
    return fetch(`http://localhost:3000/api/pokemons/${pokemon.id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pokemon),
    })
        .then(async (response) => {
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message);
            }

            return json;
        });
}

export function createPokemon(pokemon: Omit<Pokemon, 'id'>): Promise<Pokemon> {
    return fetch(`http://localhost:3000/api/pokemons`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pokemon),
    })
        .then(async (response) => {
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message);
            }

            return json;
        });
}

export function deletePokemon(pokemonId: Pokemon['id']) {
    return fetch(`http://localhost:3000/api/pokemons/${pokemonId}`, {
        method: 'DELETE'
    })
        .then(async (response) => {
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message);
            }

            return json;
        });
}