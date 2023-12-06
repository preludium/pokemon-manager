import { prisma } from "#/lib/prisma";
import { Pokemon } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';
import { emptyStringTransform, handleErrorResponse, numberZodPreprocessor } from '#/app/api/common';
import { NextApiRequest } from 'next';

const pageQuerySchema = z.object({
    page: numberZodPreprocessor('Page must be a number').optional().nullable(),
    size: numberZodPreprocessor('Size must be a number').optional().nullable().pipe(
        z.union([
            z.literal(10),
            z.literal(20),
            z.literal(50),
        ], {
            errorMap: () => ({ message: 'Size values allowed: 10, 20, 50' })
        })
            .optional().nullable()
    ),
    sortBy: z.union([
        z.literal('name'),
        z.literal('height'),
        z.literal('weight'),
    ], {
        errorMap: () => ({ message: 'SortBy values allowed: name, height, weight' })
    }).optional().nullable(),
    sortDirection: z.union([
        z.literal('asc'),
        z.literal('desc'),
    ], {
        errorMap: () => ({ message: 'SortDirection values allowed: asc, desc' })
    }).optional().nullable(),
    filter: z.string().optional().nullable(),
});

export const pokemonCreateSchema = z.object({
    name: z.string({ required_error: 'name property is missing' }),
    weight: z.number({ required_error: 'weight property is missing' }),
    height: z.number({ required_error: 'height property is missing' }),
    image: z.string({ required_error: 'image property is missing' }),
});

type PokemonCreateRequest = z.infer<typeof pokemonCreateSchema>;

function extractQuery(params: URLSearchParams) {
    const page = params.get('page');
    const size = params.get('size');
    const sortBy = params.get('sortBy');
    const sortDirection = params.get('sortDirection');
    const filter = params.get('filter');
    const query = {
        page, size, sortBy, sortDirection, filter,
    };

    return pageQuerySchema.parse(query);
}

export async function GET(
    request: NextRequest,
) {
    try {
        const query = extractQuery(request.nextUrl.searchParams);
        const skip = query.page ? query.page * (query.size ?? 10) : 0;
        const take = query.size ?? 10;
        const sortBy = query.sortBy ?? 'id';
        const sortDirection = query.sortDirection ?? 'asc';
        const isNumberFilter = !Number.isNaN(Number(query.filter));
        const filters = [{
            name: {
                contains: query.filter ?? ''
            }
        }];

        if (isNumberFilter) {
            filters.push({
                // @ts-ignore
                height: {
                    equals: Number(query.filter)
                }
            });
            filters.push({
                // @ts-ignore
                weight: {
                    equals: Number(query.filter)
                }
            });
        }

        const where = {
            OR: filters,
        };

        const [pokemons, count] = await prisma.$transaction([
            prisma.pokemon.findMany({
                orderBy: {
                    [sortBy]: sortDirection,
                },
                take,
                skip,
                where,
            }),
            prisma.pokemon.count({
                where,
            }),
        ]);
        return NextResponse.json({
            page: query.page ?? 1,
            totalPages: Math.ceil(count / take),
            size: take,
            sortBy,
            sortDirection,
            data: pokemons,
        });
    } catch (error) {
        return handleErrorResponse(error);
    }
}

export async function POST(
    request: NextApiRequest,
) {
    const data: Omit<Pokemon, 'id'> = request.body;
    try {
        const parsedPokemon = pokemonCreateSchema.parse(data);
        const dbPokemon = await prisma.pokemon.findFirst({ where: { name: parsedPokemon.name } });
        if (dbPokemon) {
            return NextResponse.json(
                { message: `Pokemon ${parsedPokemon.name} already exists` },
                { status: 400 }
            );
        }
        const pokemon = await prisma.pokemon.create({ data: parsedPokemon });
        return NextResponse.json(pokemon);
    } catch (error) {
        return handleErrorResponse(error);
    }
}
