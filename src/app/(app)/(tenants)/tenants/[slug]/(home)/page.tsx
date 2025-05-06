import { DEFAULT_LIMIT } from "@/constants";
import { loadProductFilters } from "@/modules/products/searchParams";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs/server";
import React from "react";

interface Props {
    searchParams: Promise<SearchParams>;
    params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export default async function TenantPage({ searchParams, params }: Props) {
    const { slug } = await params;

    const filters = await loadProductFilters(searchParams);

    const queryClient = getQueryClient();
    void queryClient.prefetchInfiniteQuery(
        trpc.products.getMany.infiniteQueryOptions({
            ...filters,
            tenantSlug: slug,
            limit: DEFAULT_LIMIT,
        }),
    );

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView
                tenantSlug={slug}
                narrowView={true}
            />
        </HydrationBoundary>
    );
}
