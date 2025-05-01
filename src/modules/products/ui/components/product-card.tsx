"use client";
import { formatCurrency, generateTenantURL } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
    id: string;
    name: string;
    imageUrl?: string | null;
    tenantSlug: string;
    tenantImageUrl?: string | null;
    reviewRating: number;
    reviewCount: number;
    price: number;
}

export const ProductCard = ({
    tenantSlug,
    tenantImageUrl,
    imageUrl,
    id,
    name,
    reviewCount,
    reviewRating,
    price,
}: Props) => {
    const router = useRouter();

    const handleUserClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        router.push(generateTenantURL(tenantSlug));
    };

    return (
        <Link href={`${generateTenantURL(tenantSlug)}/products/${id}`}>
            <div className="flex h-full flex-col overflow-hidden rounded-md border bg-white transition-shadow hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="relative aspect-square">
                    <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-1 flex-col gap-3 border-y p-4">
                    <h2 className="line-clamp-4 text-lg font-medium">{name}</h2>
                    <div
                        className="flex items-center gap-2"
                        onClick={handleUserClick}
                    >
                        {tenantImageUrl && (
                            <Image
                                src={tenantImageUrl}
                                alt={tenantSlug}
                                width={16}
                                height={16}
                                className="size-[16px] shrink-0 rounded-full border"
                            />
                        )}
                        <p className="text-sm font-medium underline">{tenantSlug}</p>
                    </div>
                    {reviewCount > 0 && (
                        <div className="flex items-center gap-1">
                            <StarIcon className="size-3.5 fill-black" />
                            <p className="text-sm font-medium">
                                {reviewRating} ({reviewCount})
                            </p>
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <div className="relative w-fit border bg-pink-400 px-2 py-1">{formatCurrency(price)}</div>
                </div>
            </div>
        </Link>
    );
};

export const ProductCardSkeleton = () => {
    return <div className="aspect-3/4 w-full animate-pulse rounded-lg bg-neutral-200"></div>;
};
