import configPromise from "@payload-config";
import { getPayload } from "payload";

export default async function HomePage() {
    const payload = await getPayload({
        config: configPromise,
    });

    const data = await payload.find({
        collection: "categories",
        depth: 1,
        where: {
            parent: {
                exists: false,
            },
        },
    });
    return <div>{JSON.stringify(data, null, 2)}</div>;
}
