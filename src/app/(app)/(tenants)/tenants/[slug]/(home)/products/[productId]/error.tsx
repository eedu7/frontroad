"use client";
import { TriangleAlertIcon } from "lucide-react";
import React from "react";

export default function ErrorPage() {
    return (
        <div className="px-4 py-10 lg:px-12">
            <div className="flex w-full flex-col items-center justify-center gap-y-4 rounded-lg border border-dashed border-black bg-white p-8">
                <TriangleAlertIcon className="fill-rose-400 hover:fill-rose-700" />
                <p className="text-base font-medium">No products found</p>
            </div>
        </div>
    );
}
