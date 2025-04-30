"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProductFilters } from "@/modules/products/hooks/use-product-filters";
import React from "react";

export const ProductSort = () => {
    const [filters, setFilters] = useProductFilters();

    return (
        <div className="flex items-center gap-2">
            <Button
                size="sm"
                className={cn(
                    "rounded-full bg-white hover:bg-white",
                    filters.sort !== "curated" &&
                        "hover:border-border border-transparent bg-transparent hover:bg-transparent",
                )}
                onClick={() => setFilters({ sort: "curated" })}
                variant="secondary"
            >
                Curated
            </Button>
            <Button
                size="sm"
                className={cn(
                    "rounded-full bg-white hover:bg-white",
                    filters.sort !== "trending" &&
                        "hover:border-border border-transparent bg-transparent hover:bg-transparent",
                )}
                onClick={() => setFilters({ sort: "trending" })}
                variant="secondary"
            >
                Trending
            </Button>
            <Button
                size="sm"
                className={cn(
                    "rounded-full bg-white hover:bg-white",
                    filters.sort !== "hot_and_new" &&
                        "hover:border-border border-transparent bg-transparent hover:bg-transparent",
                )}
                onClick={() => setFilters({ sort: "hot_and_new" })}
                variant="secondary"
            >
                Hot and New
            </Button>
        </div>
    );
};
