"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ProductViewProps {
    productId: string;
}

export const ProductView = ({ productId }: ProductViewProps) => {
    const trpc = useTRPC();

    const { data } = useSuspenseQuery(
        trpc.library.getOne.queryOptions({
            productId,
        }),
    );

    return (
        <div className="min-h-screen bg-white">
            <nav className="w-full border-b bg-[#F4F4F0] p-4">
                <Link
                    href="/library"
                    prefetch
                    className="flex items-center gap-2"
                >
                    <ArrowLeftIcon className="size-4" />
                    <span className="text font-medium">Back to library</span>
                </Link>
            </nav>
            <header className="border-b bg-[#F4F4F0] py-8">
                <div className="mx-auto max-w-(--breakpoint-xl) px-4 lg:px-12">
                    <h1 className="text-[40px] font-medium">{data.name}</h1>
                </div>
            </header>
            <section className="mx-auto max-w-(--breakpoint-xl) px-4 py-10 lg:px-12"></section>
        </div>
    );
};
