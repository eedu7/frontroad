import { Navbar } from "@/modules/checkout/ui/components/navbar";
import { Footer } from "@/modules/home/ui/components/footer";
import React from "react";

interface Props {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}

export default async function CheckoutLayout({ children, params }: Props) {
    const { slug } = await params;

    return (
        <div className="flex min-h-screen flex-col bg-[#F4F4F0]">
            <Navbar slug={slug} />
            <div className="flex-1">
                <div className="mx-auto max-w-(--breakpoint-xl)">{children}</div>
            </div>
            <Footer />
        </div>
    );
}
