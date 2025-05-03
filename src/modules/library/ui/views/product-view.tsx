"use client";

import { ReviewFormSkeleton } from "@/modules/library/ui/components/review-form";
import { ReviewSidebar } from "@/modules/library/ui/components/review-sidebar";
import { useTRPC } from "@/trpc/client";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

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
            <section className="mx-auto max-w-(--breakpoint-xl) px-4 py-10 lg:px-12">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-7 lg:gap-16">
                    <div className="lg:col-span-2">
                        <div className="gap-4 rounded-md border bg-white p-4">
                            <Suspense fallback={<ReviewFormSkeleton />}>
                                <ReviewSidebar productId={productId} />
                            </Suspense>
                        </div>
                    </div>
                    <div className="lg:col-span-5">
                        {data.content ? (
                            <p className="text-muted-foreground font-medium italic">
                                <RichText data={data.content} />
                            </p>
                        ) : (
                            <p className="text-muted-foreground font-medium italic">No special content</p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export const ProductViewSkeleton = () => {
    return (
        <div className="min-h-screen bg-white">
            <nav className="w-full border-b bg-[#F4F4F0] p-4">
                <div className="flex items-center gap-2">
                    <ArrowLeftIcon className="size-4" />
                    <span className="text font-medium">Back to library</span>
                </div>
            </nav>
        </div>
    );
};
