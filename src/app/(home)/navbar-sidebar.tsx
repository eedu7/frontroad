import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
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
            </SheetContent>
        </Sheet>
    );
};
