import { Footer } from "@/modules/tenants/ui/components/footer";
import { Navbar } from "@/modules/tenants/ui/components/navbar";
import React from "react";

interface Props {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}

export default async function TenantHomeLayout({ params, children }: Props) {
    return (
        <div className="flex min-h-screen flex-col bg-[#F4F4F0]">
            <Navbar />
            <main className="flex-1">
                <div className="mx-auto max-w-(--breakpoint-xl)">{children}</div>
            </main>
            <Footer />
        </div>
    );
}
