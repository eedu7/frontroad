import { ProductView, ProductViewSkeleton } from "@/modules/products/ui/views/product-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";

interface Props {
    params: Promise<{
        productId: string;
        slug: string;
    }>;
}

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: Props) {
    const { productId, slug } = await params;

    const queryClient = getQueryClient();

    void trpc.tenants.getOne.queryOptions({
        slug,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<ProductViewSkeleton />}>
                <ProductView
                    productId={productId}
                    tenantSlug={slug}
                />
            </Suspense>
        </HydrationBoundary>
    );
}
