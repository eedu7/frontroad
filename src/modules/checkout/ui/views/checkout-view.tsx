"use client";

import React from "react";

interface CheckoutViewProps {
    tenantSlug: string;
}

export const CheckoutView = ({ tenantSlug }: CheckoutViewProps) => {
    return <div>{tenantSlug}</div>;
};
