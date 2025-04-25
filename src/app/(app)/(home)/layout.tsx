import { Footer } from "@/app/(app)/(home)/footer";
import { Navbar } from "@/app/(app)/(home)/navbar";
import { SearchFilters } from "@/app/(app)/(home)/search-filters";
import { CustomCategory } from "@/app/(app)/(home)/types";
import { Category } from "@/payload-types";

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
        pagination: false,
        where: {
            parent: {
                exists: false,
            },
        },
        sort: "name",
    });

    const formattedData: CustomCategory[] = data.docs.map((doc) => ({
        ...doc,
        subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            // Because of "depth: 1", we are confident "doc" will be of type "Categpry"
            ...(doc as Category),
            subcategories: undefined,
        })),
    }));

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <SearchFilters data={formattedData} />
            <div className="flex-1 bg-[#F4F4F0]">{children}</div>
            <Footer />
        </div>
    );
}
