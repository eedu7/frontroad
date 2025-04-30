import { Footer } from "@/modules/tenants/ui/components/footer";
import { Navbar, NavbarSkeleton } from "@/modules/tenants/ui/components/navbar";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";

interface Props {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}

export default async function TenantHomeLayout({ params, children }: Props) {
    const { slug } = await params;

    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(
        trpc.tenants.getOne.queryOptions({
            slug,
        }),
    );

    return (
        <div className="flex min-h-screen flex-col bg-[#F4F4F0]">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<NavbarSkeleton />}>
                    <Navbar slug={slug} />
                </Suspense>
            </HydrationBoundary>
            <main className="flex-1">
                <div className="mx-auto max-w-(--breakpoint-xl)">{children}</div>
            </main>
            <Footer />
        </div>
    );
}
