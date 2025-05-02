"use client";

import { ReviewForm } from "@/modules/library/ui/components/review-form";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

interface Props {
    productId: string;
}

export const ReviewSidebar = ({ productId }: Props) => {
    const trpc = useTRPC();

    const { data } = useSuspenseQuery(trpc.reviews.getOne.queryOptions({ productId }));

    return (
        <ReviewForm
            productId={productId}
            initialData={data}
        />
    );
};
