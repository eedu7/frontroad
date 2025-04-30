"use client";

import { useProductFilters } from "@/modules/products/hooks/use-product-filters";
import { ProductCard } from "@/modules/products/ui/components/product-card";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

interface Props {
    category?: string;
}

export const ProductList = ({ category }: Props) => {
    const [filters] = useProductFilters();

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.products.getMany.queryOptions({ category, ...filters }));

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {data?.docs.map((product) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    imageUrl={product.image?.url}
                    authorUsername={"Mueed"}
                    authorImageUrl={undefined}
                    reviewRating={3}
                    reviewCount={5}
                    price={product.price}
                />
            ))}
        </div>
    );
};
