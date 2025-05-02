"use client";

import { Button } from "@/components/ui/button";
import { DEFAULT_LIMIT } from "@/constants";
import { cn } from "@/lib/utils";
import { useProductFilters } from "@/modules/products/hooks/use-product-filters";
import { ProductCard, ProductCardSkeleton } from "@/modules/products/ui/components/product-card";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { InboxIcon } from "lucide-react";
import React from "react";

interface Props {
    category?: string;
    tenantSlug?: string;
    narrowView?: boolean;
}

export const ProductList = ({ category, tenantSlug, narrowView }: Props) => {
    const [filters] = useProductFilters();

    const trpc = useTRPC();
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useSuspenseInfiniteQuery(
        trpc.products.getMany.infiniteQueryOptions(
            { category, tenantSlug, ...filters, limit: DEFAULT_LIMIT },
            {
                getNextPageParam: (lastPage) => {
                    return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
                },
            },
        ),
    );

    if (data.pages?.[0]?.docs.length === 0) {
        return (
            <div className="flex w-full flex-col items-center justify-center gap-y-4 rounded-lg border border-dashed border-black bg-white p-8">
                <InboxIcon />
                <p className="text-base font-medium">No products found</p>
            </div>
        );
    }

    return (
        <>
            <div
                className={cn(
                    "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" +
                        " 2xl:grid-cols-4",
                    narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3",
                )}
            >
                {data?.pages
                    .flatMap((page) => page.docs)
                    .map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            imageUrl={product.image?.url}
                            tenantSlug={product.tenant.slug}
                            tenantImageUrl={product.tenant?.image?.url}
                            reviewRating={product.reviewRating}
                            reviewCount={product.reviewCount}
                            price={product.price}
                        />
                    ))}
            </div>
            <div className="flex justify-center pt-8">
                {hasNextPage && (
                    <Button
                        type="button"
                        disabled={isFetchingNextPage}
                        onClick={() => fetchNextPage()}
                        className="bg-white text-base font-medium disabled:opacity-50"
                        variant="elevated"
                    >
                        Load more...
                    </Button>
                )}
            </div>
        </>
    );
};

export const ProductListSkeleton = ({ narrowView }: { narrowView?: boolean }) => {
    return (
        <div
            className={cn(
                "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" +
                    " 2xl:grid-cols-4",
                narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3",
            )}
        >
            {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </div>
    );
};
