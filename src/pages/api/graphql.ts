import type { NextApiRequest, NextApiResponse } from "next";
import * as GraphQLRequest from "@/graph-ql/request";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // If we ever decide we want to have the endpoint use REST
    // or tRPC, we just need to change this line and the import
    // and we're good to go.
    GraphQLRequest.handler(req, res);
}
