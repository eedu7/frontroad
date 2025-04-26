import { cn } from "@/lib/utils";
import { CategoriesGetManyOutputSingle } from "@/modules/categories/types";
import { Category } from "@/payload-types";
import Link from "next/link";
import React from "react";

interface Props {
    category: CategoriesGetManyOutputSingle;
    isOpen: boolean;
    position: { left: number; top: number };
}

export const SubcategoryMenu = ({ category, isOpen, position }: Props) => {
    if (!isOpen || !category.subcategories || category.subcategories.length === 0) return null;

    const backgroundColor = category.color || "#F5F5F5";

    return (
        <div
            className="fixed z-100"
            style={{
                top: position.top,
                left: position.left,
            }}
        >
            {/* Invisible bridge to maintain hover */}
            <div className="h-3 w-60" />
            <div
                className={cn(
                    "w-60 overflow-hidden rounded-md border text-black",
                    "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                    "-translate-x-[2px] -translate-y-[2px]",
                )}
                style={{
                    backgroundColor: backgroundColor,
                }}
            >
                <div>
                    {category.subcategories?.map((subcategory: Category) => (
                        <Link
                            key={subcategory.slug}
                            href={`/${category.slug}/${subcategory.slug}`}
                            className="flex w-full items-center justify-between p-4 text-left font-medium underline hover:bg-black hover:text-white"
                        >
                            {subcategory.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
