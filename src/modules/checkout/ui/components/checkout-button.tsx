"use client";

import { Button } from "@/components/ui/button";
import { cn, generateTenantURL } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

interface Props {
    className?: string;
    hideIfEmpty?: boolean;
    tenantSlug: string;
}

export const CheckoutButton = ({ className, hideIfEmpty, tenantSlug }: Props) => {
    const { totalItems } = useCart(tenantSlug);

    if (hideIfEmpty && totalItems === 0) return null;

    return (
        <Button
            className={cn("border bg-white", className)}
            variant="elevated"
            asChild
        >
            <Link href={`${generateTenantURL(tenantSlug)}/chekout`}>
                <ShoppingCartIcon /> {totalItems > 0 ? totalItems : ""}
            </Link>
        </Button>
    );
};
