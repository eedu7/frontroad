import { isSuperAdmin } from "@/trpc/access";
import type { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
    slug: "tenants",
    access: {
        read: () => true,
        create: ({ req }) => isSuperAdmin(req.user),
        delete: ({ req }) => isSuperAdmin(req.user),
    },
    admin: {
        useAsTitle: "slug",
    },
    fields: [
        {
            name: "name",
            required: true,
            unique: true,
            type: "text",
            label: "Store Name",
            admin: {
                description: "This is the name of the store. (e.g Antonio's Store)",
            },
        },
        {
            name: "slug",
            type: "text",
            index: true,
            required: true,
            unique: true,
            access: {
                update: ({ req }) => isSuperAdmin(req.user),
            },
            admin: {
                description: "This is the name of the store. (e.g [slug].frontroad.com Store)",
            },
        },
        {
            name: "image",
            type: "upload",
            relationTo: "media",
        },
        {
            name: "stripeAccountId",
            type: "text",
            required: true,
            access: {
                update: ({ req }) => isSuperAdmin(req.user),
            },
            admin: {
                description: "Stripe Account ID assoicaited with your shop",
            },
        },
        {
            name: "stripeDetailsSubmitted",
            type: "checkbox",
            access: {
                update: ({ req }) => isSuperAdmin(req.user),
            },
            admin: {
                description: "You cannot create product until you submit your Stripe details.",
            },
        },
    ],
};
