import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoriesSidebar } from "@/modules/home/ui/components/search-filters/categories-sidebar";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

import React from "react";

interface Props {
    defaultValue?: string;
    onChange?: (value: string) => void;

    disabled?: boolean;
}

export const SearchInput = ({ disabled, defaultValue, onChange }: Props) => {
    const [searchValue, setSearchValue] = React.useState(defaultValue || "");
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const trpc = useTRPC();
    const session = useQuery(trpc.auth.session.queryOptions());

    React.useEffect(() => {
        const timeoutId = setTimeout(() => onChange?.(searchValue), 5000);
        return () => clearTimeout(timeoutId);
    }, [searchValue, onChange]);

    return (
        <div className="flex w-full items-center gap-2">
            <CategoriesSidebar
                open={isSidebarOpen}
                onOpenChange={setIsSidebarOpen}
            />
            <div className="relative w-full">
                <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
                <Input
                    className="pl-8"
                    placeholder="Search products"
                    disabled={disabled}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
            <Button
                variant="elevated"
                className="flex size-12 shrink-0 border lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
            >
                <ListFilterIcon />
            </Button>
            {session.data?.user && (
                <Button
                    asChild
                    variant="elevated"
                    className="border"
                >
                    <Link
                        href="/library"
                        prefetch
                    >
                        <BookmarkCheckIcon />
                        Library
                    </Link>
                </Button>
            )}
        </div>
    );
};
