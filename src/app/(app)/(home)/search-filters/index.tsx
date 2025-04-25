"use client";

import { Categories } from "@/app/(app)/(home)/search-filters/categories";
import { SearchInput } from "@/app/(app)/(home)/search-filters/search-input";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import React from "react";

export const SearchFilters = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

    return (
        <div className="flex w-full flex-col gap-4 border-b px-4 py-8 lg:px-12">
            <SearchInput data={data} />
            <div className="hidden lg:block">
                <Categories data={data} />
            </div>
        </div>
    );
};
