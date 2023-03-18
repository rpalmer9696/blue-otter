import type { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import schema from "@/graph-ql/schema";
import * as Resolvers from "@/graph-ql/resolvers";

// Keeping all of this GraphQL request code in one place
// makes it easy to see what's going on. It also makes it
// easy to change the GraphQL server if we ever decide to.
export async function handler(req: NextApiRequest, res: NextApiResponse) {
    const typeDefs = schema;
    const resolvers = Resolvers.getResolvers();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    const handler = startServerAndCreateNextHandler(server);

    handler(req, res);
}
