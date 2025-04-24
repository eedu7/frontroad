"use client";

import { NavbarSidebar } from "@/app/(home)/navbar-sidebar";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";

import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});

export const Navbar = () => {
    const pathname = usePathname();

    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    return (
        <>
            <NavbarSidebar
                items={navbarItems}
                open={isSidebarOpen}
                onOpenChange={setIsSidebarOpen}
            />
            <nav className="flex h-20 justify-between border-b bg-white font-medium">
                <Link
                    href="/"
                    className="flex items-center pl-6"
                >
                    <span className={cn("text-5xl font-semibold", poppins.className)}>frontroad</span>
                </Link>
                <div className="hidden items-center gap-4 lg:flex">
                    {navbarItems.map((item) => (
                        <NavbarItem
                            key={item.href}
                            {...item}
                            isActive={pathname === item.href}
                        />
                    ))}
                </div>
                <div className="hidden lg:flex">
                    <Button
                        asChild
                        variant="secondary"
                        className="h-full rounded-none border-t-0 border-r-0 border-b-0 border-l bg-white px-12 text-lg transition-colors hover:bg-pink-400"
                    >
                        <Link href={"/sign-in"}>Log in</Link>
                    </Button>
                    <Button
                        asChild
                        className="h-full rounded-none border-t-0 border-r-0 border-b-0 border-l bg-black px-12 text-lg text-white transition-colors hover:bg-pink-400 hover:text-black"
                    >
                        <Link href={"/sign-up"}>Start selling</Link>
                    </Button>
                </div>
                <div className="flex items-center justify-center lg:hidden">
                    <Button
                        variant="ghost"
                        className="size-12 border-transparent bg-white"
                        onClick={() => setIsSidebarOpen(isSidebarOpen)}
                    >
                        <MenuIcon />
                    </Button>
                </div>
            </nav>
        </>
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
        <Button
            asChild
            variant="outline"
            className={cn(
                "hover:border-primary rounded-full border-transparent bg-transparent hover:bg-transparent",
                "px-3.5 text-lg",
                isActive && "bg-black text-white hover:bg-black hover:text-white",
            )}
        >
            <Link href={href}>{children}</Link>
        </Button>
    );
};
