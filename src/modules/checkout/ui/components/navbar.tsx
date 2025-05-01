"use client";

import { Button } from "@/components/ui/button";
import { generateTenantURL } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface Props {
    slug: string;
}

export const Navbar = ({ slug }: Props) => {
    return (
        <nav className="h-20 border-b bg-white font-medium">
            <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 lg:px-12">
                <p className="text-xl">Checkout</p>
                <Button
                    asChild
                    variant="elevated"
                >
                    <Link href={generateTenantURL(slug)}>Continue Shoping</Link>
                </Button>
            </div>
        </nav>
    );
};
