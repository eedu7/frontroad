"use client";
import { Button } from "@/components/ui/button";
import { generateTenantURL } from "@/lib/utils";
// import { CheckoutButton } from "@/modules/checkout/ui/components/checkout-button";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ShoppingCartIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
    slug: string;
}

const CheckoutButton = dynamic(
    () => import("@/modules/checkout/ui/components/checkout-button").then((mod) => mod.CheckoutButton),
    {
        ssr: false,
        loading: () => (
            <Button
                variant="elevated"
                className="border bg-white"
                disabled
            >
                <ShoppingCartIcon className="text-black" />
            </Button>
        ),
    },
);

export const Navbar = ({ slug }: Props) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(
        trpc.tenants.getOne.queryOptions({
            slug,
        }),
    );

    return (
        <nav className="h-20 border-b bg-white font-medium">
            <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 lg:px-12">
                <Link
                    href={generateTenantURL(slug)}
                    className="flex items-center gap-2"
                >
                    {data.image?.url && (
                        <Image
                            src={data.image.url}
                            alt={slug}
                            width={32}
                            height={32}
                            className="size-[32px] shrink-0 rounded-lg border"
                        />
                    )}
                    <p className="text-xl">{data.name}</p>
                </Link>
                <CheckoutButton tenantSlug={slug} />
            </div>
        </nav>
    );
};

export const NavbarSkeleton = () => {
    return (
        <nav className="h-20 border-b bg-white font-medium">
            <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 lg:px-12">
                <div>
                    <Button
                        variant="elevated"
                        className="border bg-white"
                        disabled
                    >
                        <ShoppingCartIcon className="text-black" />
                    </Button>
                </div>
            </div>
        </nav>
    );
};
