import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import React from "react";

interface Props {
    total: number;
    onCheckout: () => void;
    isCanceled?: boolean;
    isPending?: boolean;
}

export const CheckoutSidebar = ({ total, onCheckout, isCanceled, isPending }: Props) => {
    return (
        <div className="flex flex-col overflow-hidden rounded-md border bg-white">
            <div className="flex items-center justify-between border-b p-4">
                <h4 className="text-lg font-medium">Total</h4>
                <p className="text-lg font-medium">{formatCurrency(total)}</p>
            </div>
            <div className="flex items-center justify-center p-4">
                <Button
                    variant="elevated"
                    disabled={isPending}
                    onClick={onCheckout}
                    size="lg"
                    className="bg-primary hover:text-primary w-full text-base text-white hover:bg-pink-400"
                >
                    Checkout
                </Button>
            </div>
        </div>
    );
};
