import { prisma } from "#/lib/prisma";
import { NextResponse } from 'next/server';
import z from 'zod';
import { handleErrorResponse, numberZodPreprocessor } from '#/app/api/common';
import { pokemonCreateSchema } from '../route';
import { NextApiRequest } from 'next';
import { revalidatePath } from 'next/cache';

const paramsSchema = z.object({
    id: numberZodPreprocessor(),
});

const pokemonUpdateSchema = z.object({
    id: paramsSchema.shape.id,
}).and(pokemonCreateSchema);

interface Options {
    params: z.infer<typeof paramsSchema>;
}

type PokemonUpdateRequest = z.infer<typeof pokemonUpdateSchema>;

export async function GET(
    request: NextApiRequest,
    { params }: Options
) {
    console.log(`=> GET /api/pokemons/${params.id}`);
    try {
        const id = paramsSchema.parse(params).id;
        const pokemon = await prisma.pokemon.findUnique({ where: { id } });
        if (!pokemon) {
            console.warn(`<= GET /api/pokemons/${params.id} 404`);
            return NextResponse.json({ message: 'Pokemon not found' }, { status: 404 });
        }
        console.log(`<= GET /api/pokemons/${params.id}`);
        return NextResponse.json(pokemon);
    } catch (error) {
        console.error(`<= GET /api/pokemons/${params.id}`, error);
        return handleErrorResponse(error);
    }
}

export async function PUT(
    request: NextApiRequest,
    { params }: Options
) {
    try {
        console.log(`=> PUT /api/pokemons/${params.id}`);
        const id = paramsSchema.parse(params).id;
        // @ts-ignore
        const data: PokemonUpdateRequest = await request.json();

        if (id !== data.id) {
            return NextResponse.json(
                { message: "Data mismatch" },
                { status: 400 }
            );
        }

        const parsedRequest = pokemonUpdateSchema.parse(data);

        const pokemon = await prisma.pokemon.findUnique({ where: { id } });

        if (!pokemon) {
            return NextResponse.json(
                { message: "Pokemon does not exist" },
                { status: 400 }
            );
        }

        const newPokemon = await prisma.pokemon.update({
            where: { id },
            data: { ...pokemon, ...parsedRequest }
        });
        revalidatePath(`/pokemons`);
        revalidatePath(`/pokemons/${params.id}`);
        console.log(`<= PUT /api/pokemons/${params.id}`);
        return NextResponse.json(newPokemon);
    } catch (error) {
        console.error(`<= PUT /api/pokemons/${params.id}`, error);
        return handleErrorResponse(error);
    }
}

export async function DELETE(
    request: NextApiRequest,
    { params }: Options
) {
    try {
        console.log(`=> DELETE /api/pokemons/${params.id}`);
        const id = paramsSchema.parse(params).id;
        const pokemon = await prisma.pokemon.delete({ where: { id } });
        revalidatePath('/pokemons');
        console.log(`<= DELETE /api/pokemons/${params.id}`);
        return NextResponse.json(pokemon);
    } catch (error) {
        console.error(`<= DELETE /api/pokemons/${params.id}`, error);
        return handleErrorResponse(error);
    }
}