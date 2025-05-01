import { ProductView } from "@/modules/products/ui/views/product-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

interface Props {
    params: Promise<{
        productId: string;
        slug: string;
    }>;
}

export default async function ProductPage({ params }: Props) {
    const { productId, slug } = await params;

    const queryClient = getQueryClient();

    void trpc.tenants.getOne.queryOptions({
        slug,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductView
                productId={productId}
                tenantSlug={slug}
            />
        </HydrationBoundary>
    );
}
