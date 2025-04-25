"use client";

import { CategoriesSidebar } from "@/app/(app)/(home)/search-filters/categories-sidebar";
import { CustomCategory } from "@/app/(app)/(home)/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ListFilterIcon, SearchIcon } from "lucide-react";

import React from "react";

interface Props {
    disabled?: boolean;
    data: CustomCategory[];
}

export const SearchInput = ({ data, disabled }: Props) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    return (
        <div className="flex w-full items-center gap-2">
            <CategoriesSidebar
                data={data}
                open={isSidebarOpen}
                onOpenChange={setIsSidebarOpen}
            />
            <div className="relative w-full">
                <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
                <Input
                    className="pl-8"
                    placeholder="Search products"
                    disabled={disabled}
                />

                {/* TODO: Add categories view all button*/}
                {/* TODO: Add library button*/}
            </div>
            <Button
                variant="elevated"
                className="flex size-12 shrink-0 border lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
            >
                <ListFilterIcon />
            </Button>
        </div>
    );
};
