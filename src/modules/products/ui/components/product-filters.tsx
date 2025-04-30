"use client";

import { cn } from "@/lib/utils";
import { useProductFilters } from "@/modules/products/hooks/use-product-filters";
import { PriceFilter } from "@/modules/products/ui/components/price-filter";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import React from "react";

interface ProductFilterProps {
    title: string;
    className?: string;
    children?: React.ReactNode;
}

const ProductFilter = ({ title, className, children }: ProductFilterProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const Icon = isOpen ? ChevronDownIcon : ChevronUpIcon;

    return (
        <div className={cn("flex flex-col gap-2 border-b p-4", className)}>
            <div
                className="flex cursor-pointer items-center justify-between"
                onClick={() => setIsOpen((current) => !current)}
            >
                <p className="font-medium">{title}</p>
                <Icon className="size-5" />
            </div>
            {isOpen && children}
        </div>
    );
};

export const ProductFilters = () => {
    const [filters, setfilters] = useProductFilters();

    const onClear = () => {
        setfilters({
            minPrice: "",
            maxPrice: "",
        });
    };

    const hasAnyFilters = Object.entries(filters).some(([, value]) => {
        if (typeof value === "string") {
            return value !== "";
        }
        return value !== null;
    });

    const onChange = (key: keyof typeof filters, value: unknown) => {
        setfilters({
            ...filters,
            [key]: value,
        });
    };
    return (
        <div className="rounded-md border bg-white">
            <div className="flex items-center justify-between border-b p-4">
                <p className="font-medium">Filters</p>
                {hasAnyFilters && (
                    <button
                        className="cursor-pointer underline"
                        onClick={() => onClear()}
                        type="button"
                    >
                        Clear
                    </button>
                )}
            </div>
            <ProductFilter
                title={"Price"}
                className="border-b-0"
            >
                <PriceFilter
                    minPrice={filters.minPrice}
                    maxPrice={filters.maxPrice}
                    onMinPriceChange={(value) => onChange("minPrice", value)}
                    onMaxPriceChange={(value) => onChange("maxPrice", value)}
                />
            </ProductFilter>
        </div>
    );
};
