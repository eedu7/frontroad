import { Category } from "@/payload-types";
import React from "react";

interface Props {
    category: Category;
    isActive?: boolean;
    isNavigationHovered?: boolean;
}

export const CategoryDropdown = ({ category, isActive, isNavigationHovered }: Props) => {
    return <div>CategoryDropdown</div>;
};
