import { DEFAULT_LIMIT } from "@/constants";
import { loadProductFilters } from "@/modules/products/searchParams";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";

import { getQueryClient, trpc } from "@/trpc/server";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";

interface Props {
    searchParams: Promise<SearchParams>;
}

export default async function CategoryPage({ searchParams }: Props) {
    const filters = await loadProductFilters(searchParams);

    const queryClient = getQueryClient();

    void queryClient.prefetchInfiniteQuery(
        trpc.products.getMany.infiniteQueryOptions({
            ...filters,
            limit: DEFAULT_LIMIT,
        }),
    );

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView />
        </HydrationBoundary>
    );
}
