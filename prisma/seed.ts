import { Pokemon, PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

import pokemons from './pokemons.json';

const prisma = new PrismaClient();

function upsertPokemon(pokemon: Pokemon) {
    if (!pokemon.image) return Promise.resolve();
    return prisma.pokemon.upsert({
        where: { name: pokemon.name },
        update: {},
        create: {
            name: pokemon.name,
            height: pokemon.height,
            weight: pokemon.weight,
            image: pokemon.image,
        },
    });
}

async function upsertAdminUser() {
    const password_hash = await hash("admin", 12);
    return prisma.user.upsert({
        where: { email: "admin@pokemon.com" },
        update: {},
        create: {
            email: "admin@pokemon.com",
            password_hash,
        },
    });
}

async function main() {
    await upsertAdminUser();
    await Promise.all((pokemons as Pokemon[])
        .map(pokemon => upsertPokemon(pokemon)));
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });