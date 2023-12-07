import { prisma } from "#/lib/prisma";
import { Pokemon } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';
import { handleErrorResponse, numberZodPreprocessor } from '#/app/api/common';
import { NextApiRequest } from 'next';
import { Param } from '#/types';

const pageQuerySchema = z.object({
    [Param.PAGE]: numberZodPreprocessor('Page must be a number').optional().nullable(),
    [Param.SIZE]: numberZodPreprocessor('Size must be a number').optional().nullable().pipe(
        z.union([
            z.literal(10),
            z.literal(20),
            z.literal(50),
        ], {
            errorMap: () => ({ message: 'Size values allowed: 10, 20, 50' })
        })
            .optional().nullable()
    ),
    [Param.SORT_BY]: z.union([
        z.literal('id'),
        z.literal('name'),
        z.literal('height'),
        z.literal('weight'),
    ], {
        errorMap: () => ({ message: 'SortBy values allowed: id, name, height, weight' })
    }).optional().nullable(),
    [Param.SORT_DIRECTION]: z.union([
        z.literal('asc'),
        z.literal('desc'),
    ], {
        errorMap: () => ({ message: 'SortDirection values allowed: asc, desc' })
    }).optional().nullable(),
    [Param.QUERY]: z.string().optional().nullable(),
});

export const pokemonCreateSchema = z.object({
    name: z.string({ required_error: 'name property is missing' }),
    weight: z.number({ required_error: 'weight property is missing' }),
    height: z.number({ required_error: 'height property is missing' }),
    image: z.string({ required_error: 'image property is missing' }),
});

type PokemonCreateRequest = z.infer<typeof pokemonCreateSchema>;

function extractQuery(searchParams: URLSearchParams) {
    const page = searchParams.get(Param.PAGE);
    const size = searchParams.get(Param.SIZE);
    const sortBy = searchParams.get(Param.SORT_BY);
    const sortDirection = searchParams.get(Param.SORT_DIRECTION);
    const query = searchParams.get(Param.QUERY);
    const params = {
        page, size, sortBy, sortDirection, query,
    };

    return pageQuerySchema.parse(params);
}

export interface PokemonsPage extends z.infer<typeof pageQuerySchema> {
    totalPages: number;
    data: Pokemon[];
}

export async function GET(
    request: NextRequest,
) {
    try {
        const searchParams = extractQuery(request.nextUrl.searchParams);
        const skip = searchParams.page && searchParams.page > 1
            ? (searchParams.page - 1) * (searchParams.size ?? 10)
            : 0;
        const take = searchParams.size ?? 10;
        const sortBy = searchParams.sortBy ?? 'id';
        const sortDirection = searchParams.sortDirection ?? 'asc';
        const isNumberFilter = !Number.isNaN(Number(searchParams.query));
        const filters = [{
            name: {
                contains: searchParams.query ?? ''
            }
        }];

        if (isNumberFilter) {
            filters.push({
                // @ts-ignore
                height: {
                    equals: Number(searchParams.query)
                }
            });
            filters.push({
                // @ts-ignore
                weight: {
                    equals: Number(searchParams.query)
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
            page: searchParams.page ?? 1,
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
