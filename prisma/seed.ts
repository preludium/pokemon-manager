import { Pokemon, PrismaClient } from '@prisma/client';
import pokemons from './pokemons.json';

const prisma = new PrismaClient();

function upsertPokemon(pokemon: Pokemon) {
    return prisma.pokemon.upsert({
        where: { id: pokemon.id },
        update: {},
        create: {
            id: pokemon.id,
            name: pokemon.name,
            order: pokemon.order,
            height: pokemon.height,
            weight: pokemon.weight,
            image: pokemon.image,
        },
    });
}

async function main() {
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