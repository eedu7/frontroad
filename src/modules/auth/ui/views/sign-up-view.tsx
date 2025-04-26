"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { registerSchema } from "@/modules/auth/schemas";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});

export const SignUpView = () => {
    const router = useRouter();

    const trpc = useTRPC();
    const register = useMutation(
        trpc.auth.register.mutationOptions({
            onError: (error) => {
                toast.error(error.message);
            },
            onSuccess: () => {
                router.push("/");
            },
        }),
    );

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
        },
        mode: "all",
    });

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        register.mutate(values);
    };

    const username = form.watch("username");
    const usernameError = form.formState.errors.username;

    const showPreview = username && !usernameError;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="h-screen w-full overflow-y-auto bg-[#F4F4F0] lg:col-span-3">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-8 p-4 lg:p-16"
                    >
                        <div className="mb-8 flex items-center justify-between">
                            <Link href={"/"}>
                                <span className={cn("text-2xl font-semibold", poppins.className)}>frontroad</span>
                            </Link>
                            <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="border-none text-base underline"
                            >
                                <Link
                                    prefetch
                                    href={"/sign-in"}
                                >
                                    Sign in
                                </Link>
                            </Button>
                        </div>
                        <h1 className="text-4xl font-medium">Join over 1,543 creators earning money on Frontroad.</h1>
                        <FormField
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription className={cn("hidden", showPreview && "block")}>
                                        {/* TODO: User proper method to generate preview url */}
                                        Your store will be available at &nbsp;<strong>{username}</strong>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={register.isPending}
                            type="submit"
                            size="lg"
                            variant="elevated"
                            className="hover:text-primary bg-black text-white hover:bg-pink-400"
                        >
                            Create account
                        </Button>
                    </form>
                </Form>
            </div>
            <div
                style={{
                    backgroundImage: "url('/auth-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center ",
                }}
                className="hidden h-screen w-full overflow-y-auto lg:col-span-2 lg:block"
            ></div>
        </div>
    );
};
