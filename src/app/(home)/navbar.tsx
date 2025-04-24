import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import React from "react";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});

export const Navbar = () => {
    return (
        <nav className="flex h-20 justify-between border-b bg-white font-medium">
            <Link
                href="/"
                className="flex items-center pl-6"
            >
                <span className={cn("text-5xl font-semibold", poppins.className)}>frontroad</span>
            </Link>
        </nav>
    );
};

interface NavbarItemProps {
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
}

const navbarItems: NavbarItemProps[] = [
    {
        href: "/",
        children: "Home",
    },
    {
        href: "/about",
        children: "About",
    },
    {
        href: "/features",
        children: "Features",
    },
    {
        href: "/pricing",
        children: "Pricing",
    },
    {
        href: "/contact",
        children: "Contact",
    },
];

const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
    return (
        <Button asChild>
            <Link href="#"></Link>
        </Button>
    );
};
