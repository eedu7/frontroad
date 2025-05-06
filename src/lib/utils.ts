import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function generateTenantURL(tenantSlug: string) {
    if (process.env.NODE_ENV === "development") {
        return `/tenants/${tenantSlug}`;
    } else {
        const protocol = "https";
        const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

        // http://antonio.funroad.com
        return `${protocol}://${tenantSlug}.${domain}`;
    }
}

export function formatCurrency(value: string | number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(Number(value));
}
