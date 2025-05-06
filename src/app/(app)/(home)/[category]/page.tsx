import { DEFAULT_LIMIT } from "@/constants";
import { loadProductFilters } from "@/modules/products/searchParams";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";

import { getQueryClient, trpc } from "@/trpc/server";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";

interface Props {
    params: Promise<{ category: string }>;
    searchParams: Promise<SearchParams>;
}

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params, searchParams }: Props) {
    const { category } = await params;

    const filters = await loadProductFilters(searchParams);

    const queryClient = getQueryClient();

    void queryClient.prefetchInfiniteQuery(
        trpc.products.getMany.infiniteQueryOptions({
            ...filters,
            category,
            limit: DEFAULT_LIMIT,
        }),
    );

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView category={category} />
        </HydrationBoundary>
    );
}
