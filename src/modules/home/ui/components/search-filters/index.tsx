"use client";

import { Categories } from "@/modules/home/ui/components/search-filters/categories";
import { SearchInput } from "@/modules/home/ui/components/search-filters/search-input";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import React from "react";

export const SearchFilters = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

    return (
        <div
            className="flex w-full flex-col gap-4 border-b px-4 py-8 lg:px-12"
            style={{
                backgroundColor: "#F5F5F5",
            }}
        >
            <SearchInput />
            <div className="hidden lg:block">
                <Categories data={data} />
            </div>
        </div>
    );
};

export function SearchFiltersLoadingFallback() {
    return (
        <div
            className="flex w-full flex-col gap-4 border-b px-4 py-8 lg:px-12"
            style={{
                background: "#F5F5F5",
            }}
        >
            <SearchInput disabled />
            <div className="hidden lg:block">
                <div className="h-11"></div>
            </div>
        </div>
    );
}
