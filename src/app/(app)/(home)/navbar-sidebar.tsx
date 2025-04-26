import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

interface NavbarItem {
    href: string;
    children?: React.ReactNode;
}

interface Props {
    items: NavbarItem[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({ items, open, onOpenChange }: Props) => {
    const trpc = useTRPC();
    const session = useQuery(trpc.auth.session.queryOptions());

    return (
        <Sheet
            open={open}
            onOpenChange={onOpenChange}
        >
            <SheetContent
                side="right"
                className="p-0"
            >
                <SheetHeader className="border-b p-4">
                    <div className="flex items-center">
                        <SheetTitle>Menu</SheetTitle>
                    </div>
                </SheetHeader>
                <ScrollArea className="flex h-full flex-col overflow-y-auto pb-2">
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex w-full items-center p-4 text-left text-base font-medium hover:bg-black hover:text-white"
                            onClick={() => onOpenChange(false)}
                        >
                            {item.children}
                        </Link>
                    ))}
                    <div className="border-t">
                        {session.data?.user ? (
                            // TODO: Dashboard should be visible or not
                            <Link
                                className="flex w-full items-center p-4 text-left text-base font-medium hover:bg-black hover:text-white"
                                href={"/admin"}
                                onClick={() => onOpenChange(false)}
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    className="flex w-full items-center p-4 text-left text-base font-medium hover:bg-black hover:text-white"
                                    href={"/sign-in"}
                                    onClick={() => onOpenChange(false)}
                                >
                                    Log in
                                </Link>
                                <Link
                                    className="flex w-full items-center p-4 text-left text-base font-medium hover:bg-black hover:text-white"
                                    href={"/sign-up"}
                                    onClick={() => onOpenChange(false)}
                                >
                                    Start selling
                                </Link>
                            </>
                        )}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};
