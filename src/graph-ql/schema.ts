import customer from "./schema/customer";
import product from "./schema/product";

import { buildSchema } from "graphql";

const schema = `
    type Query {
        customer(
            email: String
            forename: String
            surname: String
            contactNumber: String
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

    type Mutation {
        createCustomer(
            email: String!
            forename: String!
            surname: String!
            contactNumber: String!
            postcode: String!
        ): Customer
        createProduct(
            vin: String!
            colour: String!
            make: String!
            model: String!
            price: Float!
        ): Product
        deleteCustomer(
            email: String!
        ): Customer
        deleteProduct(
            vin: String!
        ): Product
        updateCustomer(
            email: String!
            forename: String
            surname: String
            contactNumber: String
            postcode: String
        ): Customer
        updateProduct(
            vin: String!
            colour: String
            make: String
            model: String
            price: Float
        ): Product
    }
`;

const schemas = [schema, customer, product].join();

export default buildSchema(schemas);
