import { AUTH_COOKIE } from "@/modules/auth/constants";
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
    register: baseProcedure
        .input(
            z.object({
                email: z.string().email(),
                password: z.string(),
                username: z
                    .string()
                    .min(3, "Username must be at least 3 characters")
                    .max(63, "Username must be less" + " than 63 characters")
                    .regex(
                        /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
                        "Username can only contain lowercase letters, numbers and" +
                            " hyphens. It must start and end with a letter or number",
                    )
                    .refine((val) => !val.includes("--"), "Username cannot contain consecutive hypens"),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.db.create({
                collection: "users",
                data: {
                    email: input.email,
                    username: input.username,
                    password: input.password, // PayloadJs automatically handles this
                },
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
                path: "/",
                // TODO: Ensure cross-domain cookie sharing
            });

            return data;
        }),
});
