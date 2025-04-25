"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
    const trpc = useTRPC();
    const categories = useQuery(trpc.categories.getMany.queryOptions());

    return <div>{JSON.stringify(categories.data, null, 2)}</div>;
}
