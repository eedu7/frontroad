import { Footer } from "@/app/(app)/(home)/footer";
import { Navbar } from "@/app/(app)/(home)/navbar";
import { SearchFilters } from "@/app/(app)/(home)/search-filters";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<p>Loading...</p>}>
                    <SearchFilters />
                </Suspense>
            </HydrationBoundary>
            <div className="flex-1 bg-[#F4F4F0]">{children}</div>
            <Footer />
        </div>
    );
}
