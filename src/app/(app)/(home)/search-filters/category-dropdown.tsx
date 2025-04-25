import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/payload-types";
import React from "react";

interface Props {
    category: Category;
    isActive?: boolean;
    isNavigationHovered?: boolean;
}

export const CategoryDropdown = ({ category, isActive, isNavigationHovered }: Props) => {
    return (
        <Button
            variant="elevated"
            className={cn(
                "h-11 rounded-full border-transparent bg-transparent px-4 hover:bg-white",
                "hover:border-primary text-black",
                isActive && !isNavigationHovered && "border-primary bg-white",
            )}
        >
            {category.name}
        </Button>
    );
};
