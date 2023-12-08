import { prisma } from "#/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, password } = (await req.json()) as {
            email: string;
            password: string;
        };
        const password_hash = await hash(password, 12);

        const dbUser = await prisma.user.findUnique({
            where: {
                email: email.toLowerCase(),
            }
        });

        if (dbUser) {
            return NextResponse.json(
                { message: `User ${email.toLowerCase()} already exists` },
                { status: 400 }
            );
        }

        const user = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                password_hash,
            },
        });

        return NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
            },
        });
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}
