"use client";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { CategoriesGetManyOutputSingle } from "@/modules/categories/types";
import { SubcategoryMenu } from "@/modules/home/ui/components/search-filters/subcategory-menu";
import Link from "next/link";

import React from "react";

interface Props {
    category: CategoriesGetManyOutputSingle;
    isActive?: boolean;
    isNavigationHovered?: boolean;
}

export const CategoryDropdown = ({ category, isActive, isNavigationHovered }: Props) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const onMouseEnter = () => {
        if (category.subcategories) {
            setIsOpen(true);
        }
    };

    const onMouseLeave = () => {
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        if (category.subcategories.length) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={toggleDropdown}
        >
            <div className="relative">
                <Button
                    variant="elevated"
                    className={cn(
                        "h-11 rounded-full border-transparent bg-transparent px-4 hover:bg-white",
                        "hover:border-primary text-black",
                        isActive && !isNavigationHovered && "border-primary border bg-white",
                        isOpen &&
                            "border-primary bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" +
                                " -translate-x-[4px] -translate-y-[4px]",
                    )}
                >
                    <Link href={`/${category.slug === "all" ? "" : category.slug}`}>{category.name}</Link>
                </Button>
                {category.subcategories && category.subcategories.length > 0 && (
                    <div
                        className={cn(
                            "absolute -bottom-3 h-0 w-0 border-l-[10px] opacity-0",
                            "border-r-[10px] border-b-[10px] border-l-transparent",
                            "left-1/2 -translate-x-1/2 border-r-transparent border-b-black",
                            isOpen && "opacity-100",
                        )}
                    />
                )}
            </div>
            <SubcategoryMenu
                category={category}
                isOpen={isOpen}
            />
        </div>
    );
};
