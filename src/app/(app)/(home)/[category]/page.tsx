import { ProductList } from "@/modules/products/ui/components/product-list";

import { getQueryClient, trpc } from "@/trpc/server";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
    params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: Props) {
    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(trpc.products.getMany.queryOptions());

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<ProductListSkeleton />}>
                <ProductList />
            </Suspense>
        </HydrationBoundary>
    );
}

const ProductListSkeleton = () => {
    return <p>Loading...</p>;
};
