const fs = require('fs');

function getAllPokemons() {
    return fetch('https://pokeapi.co/api/v2/pokemon?limit=1292')
        .then(response => response.json());
}

function getPokemon(url) {
    return fetch(url)
        .then(response => response.json())
        .then(pokemon => ({
            id: pokemon.id,
            order: pokemon.order,
            name: pokemon.name,
            height: pokemon.height,
            weight: pokemon.weight,
            image: pokemon.sprites.front_default,
            types: pokemon.types,
            stats: pokemon.stats,
        }));
}

function writeFile(data) {
    fs.writeFileSync('pokemons.json', JSON.stringify(data, null, 4));
}

async function main() {
    const pokemons = await getAllPokemons();
    const detailedPokemons = await Promise.all(pokemons.results
        .map(pokemon => getPokemon(pokemon.url))
    );
    writeFile(detailedPokemons);
}

main();