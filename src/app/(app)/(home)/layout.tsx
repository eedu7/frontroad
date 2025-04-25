import { Footer } from "@/app/(app)/(home)/footer";
import { Navbar } from "@/app/(app)/(home)/navbar";
import { SearchFilters } from "@/app/(app)/(home)/search-filters";

import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
    const payload = await getPayload({
        config: configPromise,
    });

    const data = await payload.find({
        collection: "categories",
        depth: 1,
        where: {
            parent: {
                exists: false,
            },
        },
    });
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <SearchFilters data={data} />
            <div className="flex-1 bg-[#F4F4F0]">{children}</div>
            <Footer />
        </div>
    );
}
