import type { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
    slug: "tenants",
    admin: {
        useAsTitle: "slug",
    },
    auth: true,
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
            admin: {
                readOnly: true,
            },
        },
        {
            name: "stripeDetailsSubmitted",
            type: "checkbox",
            admin: {
                readOnly: true,
                description: "You cannot create product until you submit your Stripe details.",
            },
        },
    ],
};
