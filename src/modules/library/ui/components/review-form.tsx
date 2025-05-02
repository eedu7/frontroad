"use client";
import { Review } from "@/payload-types";
import React from "react";

interface Props {
    productId: string;
    initialData?: Review;
}

export const ReviewForm = ({ productId, initialData }: Props) => {
    return <div>ReviewForm</div>;
};
