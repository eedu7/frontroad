import { Tenant } from "@/payload-types";
import { isSuperAdmin } from "@/trpc/access";
import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
    slug: "products",
    access: {
        read: () => true,
        create: ({ req }) => {
            if (isSuperAdmin(req.user)) return true;

            const tenant = req.user?.tenants?.[0]?.tenant as Tenant;

            return Boolean(tenant?.stripeDetailsSubmitted);
        },
        update: ({ req }) => isSuperAdmin(req.user),
        delete: ({ req }) => isSuperAdmin(req.user),
    },
    admin: {
        useAsTitle: "name",
        description: "You must verify your account before creating products.",
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "description",
            // TODO: Change to RichText
            type: "text",
        },
        {
            name: "price",
            type: "number",
            required: true,
            admin: {
                description: "Price in USD",
            },
        },
        {
            name: "category",
            type: "relationship",
            relationTo: "categories",
            hasMany: false,
        },
        {
            name: "tags",
            type: "relationship",
            relationTo: "tags",
            hasMany: true,
        },

        {
            name: "image",
            type: "upload",
            relationTo: "media",
        },
        {
            name: "refundPolicy",
            type: "select",
            options: ["30-days", "14-days", "7-days", "3-days", "1-day", "no-refunds"],
            defaultValue: "30-days",
        },
        {
            name: "content",
            // TODO: Change to RichText
            type: "textarea",
            admin: {
                description:
                    "Protected content only visible to customer after purchase. Add product documentation," +
                    " downloadable files, getting started guides, and bonus materials. Support Markdown formatting",
            },
        },
        {
            name: "isArchived",
            label: "Archive",
            defaultValue: false,
            type: "checkbox",
            admin: {
                description: "If checked, this product will be archived.",
            },
        },
    ],
};
