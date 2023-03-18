import customer from "./schema/customer";
import product from "./schema/product";

import { buildSchema } from "graphql";

const schema = `
    type Query {
        customer(
            email: String
            forename: String
            surname: String
            contact_number: String
            postcode: String
        ): [Customer]
        product(
            vin: String
            colour: String
            make: String
            model: String
            price: Float
        ): [Product]
    }
`;

const schemas = [schema, customer, product].join();

export default buildSchema(schemas);
