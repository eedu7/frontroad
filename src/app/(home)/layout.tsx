import { Footer } from "@/app/(home)/footer";
import { Navbar } from "@/app/(home)/navbar";

import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
        </div>
    );
}
