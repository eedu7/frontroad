"use client";

import { generateTenantURL } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import { CheckoutItem } from "@/modules/checkout/ui/components/checkout-item";
import { CheckoutSidebar } from "@/modules/checkout/ui/components/checkout-sidebar";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { InboxIcon, LoaderIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface CheckoutViewProps {
    tenantSlug: string;
}

export const CheckoutView = ({ tenantSlug }: CheckoutViewProps) => {
    const { productIds, clearAllCarts, removeProduct } = useCart(tenantSlug);

    const trpc = useTRPC();
    const { data, error, isLoading } = useQuery(
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

    if (isLoading) {
        return (
            <div className="px-4 pt-4 lg:px-12 lg:pt-15">
                <div className="flex w-full flex-col items-center justify-center gap-y-4 rounded-lg border border-dashed border-black bg-white p-8">
                    <LoaderIcon className="text-muted-foreground animate-spin" />
                </div>
            </div>
        );
    }

    if (data?.docs.length === 0) {
        return (
            <div className="px-4 pt-4 lg:px-12 lg:pt-15">
                <div className="flex w-full flex-col items-center justify-center gap-y-4 rounded-lg border border-dashed border-black bg-white p-8">
                    <InboxIcon />
                    <p className="text-base font-medium">No products found</p>
                </div>
            </div>
        );
    }

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
                    {data?.totalPrice && (
                        <CheckoutSidebar
                            total={data.totalPrice}
                            onCheckout={() => {}}
                            isCanceled={false}
                            isPending={false}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
