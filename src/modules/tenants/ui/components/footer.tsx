import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import React from "react";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});

export const Footer = () => {
    return (
        <footer className="border-t bg-white font-medium">
            <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center gap-2 px-4 py-6 lg:px-12">
                <p className="text-xl">Powered by</p>
                <Link href="/">
                    <span className={cn("text-2xl font-semibold", poppins.className)}>frontroad</span>
                </Link>
            </div>
        </footer>
    );
};
