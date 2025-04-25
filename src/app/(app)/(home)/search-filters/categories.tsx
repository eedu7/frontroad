"use client";

import { CategoryDropdown } from "@/app/(app)/(home)/search-filters/category-dropdown";
import { CustomCategory } from "@/app/(app)/(home)/types";
import React from "react";

interface Props {
    data: CustomCategory[];
}

export const Categories = ({ data }: Props) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const measureRef = React.useRef<HTMLDivElement>(null);
    const viewAllRef = React.useRef<HTMLDivElement>(null);

    const [visibleCount, setVisibleCount] = React.useState(data.length);
    const [isAnyHovered, setIsAnyHovered] = React.useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const activeCategory = "all";

    const activeCategoryIndex = data.findIndex((cat) => cat.slug === activeCategory);

    const isActiveCategoryHidden = activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

    React.useEffect(() => {
        const calculateVisible = () => {
            if (!containerRef.current || !measureRef.current || !viewAllRef.current) return;

            const containerWidth = containerRef.current.offsetWidth;
            const viewAllWidth = viewAllRef.current.offsetWidth;
            const availableWidth = containerWidth - viewAllWidth;

            const items = Array.from(measureRef.current.children);
            let totalWidth = 0;
            let visible = 0;

            for (const item of items) {
                const width = item.getBoundingClientRect().width;

                if (totalWidth + width > availableWidth) break;
                totalWidth += width;
                visible++;
            }
            setVisibleCount(visible);
        };

        const resizeObserver = new ResizeObserver(calculateVisible);
        resizeObserver.observe(containerRef.current!);

        return () => resizeObserver.disconnect();
    }, [data.length]);

    return (
        <div className="relative w-full">
            <div className="flex flex-nowrap items-center">
                {data.map((category) => (
                    <div key={category.id}>
                        <CategoryDropdown
                            category={category}
                            isActive={activeCategory === category.slug}
                            isNavigationHovered={false}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
