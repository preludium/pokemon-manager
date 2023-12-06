import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextResponse } from 'next/server';
import { ZodError, z } from 'zod';

export const numberZodPreprocessor = (message?: string) => z.preprocess(
    Number,
    z.number({ invalid_type_error: message ?? 'Parameter id must be a number' }),
);

export const emptyStringTransform = (e: unknown) => e === "" ? undefined : e;

export function handleErrorResponse(error: unknown) {
    console.error(error);
    if (error instanceof ZodError) {
        return NextResponse.json(
            { message: error.issues[0].message },
            { status: 400 }
        );
    }

    if (error instanceof PrismaClientKnownRequestError) {
        return NextResponse.json(
            { message: error.meta?.cause ?? error.message },
            { status: 500 }
        );
    }

    if (error instanceof Error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json(
        { message: 'Unexpected error occurred' },
        { status: 500 }
    );
}