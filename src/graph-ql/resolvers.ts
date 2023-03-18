import * as Customer from "@/lib/customer/resolvers";
import { CustomerArgs } from "@/lib/customer/types";
import * as Product from "@/lib/product/resolvers";
import { ProductArgs } from "@/lib/product/types";
import CustomerCSVProvider from "@/provider/csv/customer";
import CustomerDBProvider from "@/provider/db/customer";
import ProductCSVProvider from "@/provider/csv/product";
import ProductDBProvider from "@/provider/db/product";
import { env } from "@/env/server.mjs";

const customerResolver = new Customer.CustomerResolver(
    env.DATA_SOURCE === "csv"
        ? new CustomerCSVProvider()
        : new CustomerDBProvider()
);
const productResolver = new Product.ProductResolver(
    env.DATA_SOURCE === "csv"
        ? new ProductCSVProvider()
        : new ProductDBProvider()
);

// Keeps all the resolvers in one place.
// So it's easy to see what resolvers are available.
export function getResolvers() {
    return {
        Query: {
            customer: customerQueryResolver,
            product: productQueryResolver,
        },
        // Mutation resolvers would go here.
    };
}

function customerQueryResolver(parent: unknown, args: CustomerArgs) {
    return customerResolver.fetch(args);
}

function productQueryResolver(parent: unknown, args: ProductArgs) {
    return productResolver.fetch(args);
}
