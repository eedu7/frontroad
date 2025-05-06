import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function generateTenantURL(tenantSlug: string) {
    const isDevelopment = process.env.NODE_ENV === "development";
    const isSubdomainRoutingEnabled = process.env.NEXT_PUBLIC_ENABLE_SUBDOMAIN_ROUTING! === "true";

    // In development or subdomain disalbe mode, use normal routing
    if (isDevelopment || !isSubdomainRoutingEnabled) {
        return `${process.env.NEXT_APP_PUBLIC_URL}/tenants/${tenantSlug}`;
    } else {
        const protocol = "https";
        const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

        // Use Subdomain routing
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
