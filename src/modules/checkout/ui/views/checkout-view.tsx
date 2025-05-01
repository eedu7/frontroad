"use client";

import { generateTenantURL } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import { CheckoutItem } from "@/modules/checkout/ui/components/checkout-item";
import { CheckoutSidebar } from "@/modules/checkout/ui/components/checkout-sidebar";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

interface CheckoutViewProps {
    tenantSlug: string;
}

export const CheckoutView = ({ tenantSlug }: CheckoutViewProps) => {
    const { productIds, clearAllCarts, removeProduct } = useCart(tenantSlug);

    const trpc = useTRPC();
    const { data, error } = useQuery(
        trpc.checkout.getProducts.queryOptions({
            ids: productIds,
        }),
    );

    React.useEffect(() => {
        if (error?.data?.code === "NOT_FOUND") {
            clearAllCarts();
            toast.warning("Invalid products found, cart cleared");
        }
    }, [error, clearAllCarts]);

    return (
        <div className="px-4 pt-4 lg:px-12 lg:pt-15">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-7 lg:gap-16">
                <div className="lg:col-span-4">
                    <div className="rouded-md overflow-hidden border bg-white">
                        {data?.docs.map((product, index) => (
                            <CheckoutItem
                                key={product.id}
                                isLast={index === data.docs.length - 1}
                                imageUrl={product.image?.url}
                                name={product.name}
                                productUrl={`${generateTenantURL(product.tenant.slug)}/products/${product.id}`}
                                tenantUrl={generateTenantURL(product.tenant.slug)}
                                tenantName={product.tenant.name}
                                price={product.price}
                                onRemove={() => removeProduct(product.id)}
                            />
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-3">
                    <CheckoutSidebar
                        total={data?.totalPrice || 9}
                        onCheckout={() => {}}
                        isCanceled={false}
                        isPending={false}
                    />
                </div>
            </div>
        </div>
    );
};
