"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { registerSchema } from "@/modules/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Poppins } from "next/font/google";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});

export const SignUpView = () => {
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
        },
    });

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        console.log(values);
    };

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
