import { AUTH_COOKIE } from "@/modules/auth/constants";
import { registerSchema } from "@/modules/auth/schemas";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { cookies as getCookies, headers as getHeaders } from "next/headers";
import { z } from "zod";

export const authRouter = createTRPCRouter({
    session: baseProcedure.query(async ({ ctx }) => {
        const headers = await getHeaders();

        const session = await ctx.db.auth({ headers });
        return session;
    }),
    register: baseProcedure.input(registerSchema).mutation(async ({ ctx, input }) => {
        const existingData = await ctx.db.find({
            collection: "users",
            limit: 1,
            where: {
                username: {
                    equals: input.username,
                },
            },
        });

        const existingUser = existingData.docs[0];

        if (existingUser) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Username already exists",
            });
        }

        await ctx.db.create({
            collection: "users",
            data: {
                email: input.email,
                username: input.username,
                password: input.password, // PayloadJs automatically
                // handles this
            },
        });

        const data = await ctx.db.login({
            collection: "users",
            data: {
                email: input.email,
                password: input.password,
            },
        });

        if (!data.token) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "Failed to login",
            });
        }

        const cookies = await getCookies();

        cookies.set({
            name: AUTH_COOKIE,
            value: data.token,
            httpOnly: true,
            path: "/", // TODO: Ensure cross-domain cookie sharing
        });
    }),
    login: baseProcedure
        .input(
            z.object({
                email: z.string().email(),
                password: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const data = await ctx.db.login({
                collection: "users",
                data: {
                    email: input.email,
                    password: input.password,
                },
            });

            if (!data.token) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "Failed to login",
                });
            }

            const cookies = await getCookies();

            cookies.set({
                name: AUTH_COOKIE,
                value: data.token,
                httpOnly: true,
                path: "/", // TODO: Ensure cross-domain cookie sharing
            });

            return data;
        }),
    logout: baseProcedure.mutation(async () => {
        const cookies = await getCookies();
        cookies.delete(AUTH_COOKIE);
    }),
});
