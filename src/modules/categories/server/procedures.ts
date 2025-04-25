import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
    getMany: baseProcedure.query(async ({ ctx }) => {
        const data = await ctx.payload.find({
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

        return data.docs.map((doc) => ({
            ...doc,
            subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
                // Because of "depth: 1", we are confident "doc" will be of type "Categpry"
                ...(doc as Category),
                subcategories: undefined,
            })),
        }));
    }),
});
