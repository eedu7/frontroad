import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
    id: string;
    name: string;
    imageUrl?: string | null;
    authorUsername: string;
    authorImageUrl?: string | null;
    reviewRating: number;
    reviewCount: number;
    price: number;
}

export const ProductCard = ({
    authorUsername,
    authorImageUrl,
    imageUrl,
    id,
    name,
    reviewCount,
    reviewRating,
    price,
}: Props) => {
    return (
        <Link href="/">
            <div className="flex h-full flex-col overflow-hidden rounded-md border bg-white">
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
                    {/* TODO: Redirect to author's shop */}
                    <div
                        className="flex items-center gap-2"
                        onClick={() => {}}
                    >
                        {authorImageUrl && (
                            <Image
                                src={authorImageUrl}
                                alt={authorUsername}
                                width={16}
                                height={16}
                                className="size-[16px] shrink-0 rounded-full border"
                            />
                        )}
                        <p className="text-sm font-medium underline">{authorUsername}</p>
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
                    <div className="relative w-fit border bg-pink-400 px-2 py-1">
                        {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 0,
                        }).format(Number(price))}
                    </div>
                </div>
            </div>
        </Link>
    );
};
