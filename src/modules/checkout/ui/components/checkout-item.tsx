import { cn, formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
    isLast?: boolean;
    imageUrl?: string | null;
    name: string;
    productUrl: string;
    tenantUrl: string;
    tenantName: string;
    price: number;
    onRemove: () => void;
}

export const CheckoutItem = ({ isLast, imageUrl, name, productUrl, tenantUrl, tenantName, price, onRemove }: Props) => {
    return (
        <div className={cn("grid grid-cols-[8.5rem_1fr_auto] gap-4 border-b pr-4", isLast && "border-b-0")}>
            <div className="overflow-hidden border-r">
                <div className="relative aspect-square h-full">
                    <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={name}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
            <div className="flex flex-col justify-between py-4">
                <div>
                    <Link href={productUrl}>
                        <h4 className="font-bold underline">{name}</h4>
                    </Link>
                    <Link href={tenantUrl}>
                        <p className="font-mediumm underline">{tenantName}</p>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col justify-between py-4">
                <p className="font-medium">{formatCurrency(price)}</p>
                <button
                    className="cursor-pointer font-medium underline"
                    onClick={onRemove}
                    type="button"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};
