import { loadSchema } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import * as CONFIG from "./config";

export async function loadAllSchema() {
    return loadSchema(CONFIG.ROOT_SCHEMA_PATH, {
        loaders: [new GraphQLFileLoader()],
    });
}
