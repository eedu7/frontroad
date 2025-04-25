import { SearchInput } from "@/app/(app)/(home)/search-filters/search-input";
import React from "react";

interface Props {
    data: any;
}

export const SearchFilters = ({ data }: Props) => {
    return (
        <div className="flex w-full flex-col gap-4 border-b px-4 py-8 lg:px-12">
            <SearchInput />
        </div>
    );
};
