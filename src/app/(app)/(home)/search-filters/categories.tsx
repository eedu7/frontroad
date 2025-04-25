import { CategoryDropdown } from "@/app/(app)/(home)/search-filters/category-dropdown";
import { Category } from "@/payload-types";
import React from "react";

interface Props {
    data: any;
}

export const Categories = ({ data }: Props) => {
    return (
        <div>
            {data.map((category: Category) => (
                <div key={category.id}>
                    <CategoryDropdown
                        category={category}
                        isActive={false}
                        isNavigationHovered={false}
                    />
                </div>
            ))}
        </div>
    );
};
