import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CategoriesGetManyOutput } from "@/modules/categories/types";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const CategoriesSidebar = ({ open, onOpenChange }: Props) => {
    const router = useRouter();
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

    const [parentCategories, setParentCategories] = React.useState<CategoriesGetManyOutput | null>(null);
    const [selectedCategory, setSelectedCategory] = React.useState<CategoriesGetManyOutput[1] | null>(null);

    // If we have parent categories, show those, otherwise show root categories
    const currentCategories = parentCategories ?? data ?? [];

    const handleOpenChange = (open: boolean) => {
        setSelectedCategory(null);
        setParentCategories(null);
        onOpenChange(open);
    };

    const handleCategoryClick = (category: CategoriesGetManyOutput[1]) => {
        if (category.subcategories && category.subcategories.length > 0) {
            setParentCategories(category.subcategories as CategoriesGetManyOutput);
            setSelectedCategory(category);
        } else {
            // This is a leaf category
            if (parentCategories && selectedCategory) {
                // this is a subcategory
                router.push(`/${selectedCategory.slug}/${category.slug}`);
            } else {
                // This is main category
                if (category.slug === "all") {
                    router.push("/");
                } else {
                    router.push(`/${category.slug}`);
                }
            }
            handleOpenChange(false);
        }
    };

    const handleBackClick = () => {
        if (parentCategories) {
            setSelectedCategory(null);
            setParentCategories(null);
        }
    };

    const backgroundColor = selectedCategory?.color || "white";

    return (
        <Sheet
            open={open}
            onOpenChange={handleOpenChange}
        >
            <SheetContent
                side="right"
                className="p-0 transition-none"
                style={{ backgroundColor }}
            >
                <SheetHeader className="border-b p-4">
                    <SheetTitle>Categories</SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex h-full flex-col overflow-y-auto pb-2">
                    {parentCategories && (
                        <button
                            onClick={handleBackClick}
                            className="flex w-full cursor-pointer items-center p-4 text-left text-base font-medium hover:bg-black hover:text-white"
                        >
                            <ChevronRightIcon className="mr-2 size-4" />
                            Back
                        </button>
                    )}
                    {currentCategories.map((category) => (
                        <button
                            className="flex w-full cursor-pointer items-center justify-between p-4 text-left text-base font-medium hover:bg-black hover:text-white"
                            key={category.slug}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category.name}
                            {category.subcategories && category.subcategories.length > 0 && <ChevronLeftIcon />}
                        </button>
                    ))}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};
