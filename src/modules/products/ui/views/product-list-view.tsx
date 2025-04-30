import { ProductFilters } from "@/modules/products/ui/components/product-filters";
import { ProductList, ProductListSkeleton } from "@/modules/products/ui/components/product-list";
import { ProductSort } from "@/modules/products/ui/components/product-sort";
import React, { Suspense } from "react";

interface Props {
    category?: string;
}

export const ProductListView = ({ category }: Props) => {
    return (
        <div className="flex flex-col gap-4 px-4 py-8 lg:px-12">
            <div className="flex flex-col justify-between gap-y-2 lg:flex-row lg:items-center lg:gap-y-0">
                <p className="text-2xl font-medium">Curated for you</p>
                <p className="cursor-pointer">SORTING</p>
                <ProductSort />
            </div>

            <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-6 xl:grid-cols-8">
                <div className="lg:col-span-2 xl:col-span-2">
                    <ProductFilters />
                </div>
                <div className="lg:col-span-4 xl:col-span-6">
                    <Suspense fallback={<ProductListSkeleton />}>
                        <ProductList category={category} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};
