import { Orders } from "@/collections/Orders";
import { Reviews } from "@/collections/Reviews";
import { Tags } from "@/collections/Tags";
import { Tenants } from "@/collections/Tenants";
import { Config } from "@/payload-types";
import { isSuperAdmin } from "@/trpc/access";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { multiTenantPlugin } from "@payloadcms/plugin-multi-tenant";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Categories } from "./collections/Categories";
import { Media } from "./collections/Media";
import { Products } from "./collections/Products";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
        components: {
            beforeNavLinks: ["@/components/stripe-verify"],
        },
    },
    collections: [Users, Media, Categories, Products, Tags, Tenants, Orders, Reviews],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || "",
    typescript: {
        outputFile: path.resolve(dirname, "payload-types.ts"),
    },
    db: mongooseAdapter({
        url: process.env.DATABASE_URI || "",
    }),
    sharp,
    plugins: [
        payloadCloudPlugin(),
        vercelBlobStorage({
            enabled: true,
            collections: {
                media: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
        }),
        multiTenantPlugin<Config>({
            collections: {
                products: {},
                media: {},
            },
            tenantsArrayField: {
                includeDefaultField: false,
            },
            userHasAccessToAllTenants: (user) => isSuperAdmin(user),
        }),
    ],
});
