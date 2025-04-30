import React from "react";

export const Navbar = () => {
    return (
        <nav className="h-20 border-b bg-white font-medium">
            <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 lg:px-12">
                <p className="text-xl">Tenant</p>
            </div>
        </nav>
    );
};
