import { loadSchema } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import * as CONFIG from "./config";
import path from "path";

export async function loadAllSchema() {
    return loadSchema(path.resolve(CONFIG.ROOT_SCHEMA_PATH), {
        loaders: [new GraphQLFileLoader()],
    });
}
