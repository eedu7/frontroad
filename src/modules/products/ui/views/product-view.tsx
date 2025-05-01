import Image from "next/image";
import React from "react";

interface Props {
    productId: string;
    slug: string;
}

export const ProductView = ({ productId, slug }: Props) => {
    return (
        <div className="px-4 py-10 lg:px-12">
            <div className="overflow-hidden rounded-sm border bg-white">
                <div className="relative aspect-[3.9] border-b">
                    <Image
                        src={"/placeholder.svg"}
                        alt="cover"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    );
};
