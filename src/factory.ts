import * as Customer from "@/lib/customer/resolvers";
import * as Product from "@/lib/product/resolvers";
import CustomerCSVProvider from "@/provider/csv/customer";
import CustomerDBProvider from "@/provider/db/customer";
import ProductCSVProvider from "@/provider/csv/product";
import ProductDBProvider from "@/provider/db/product";
import { env } from "@/env/server.mjs";

export function getCustomer() {
    return new Customer.CustomerResolver(
        env.DATA_SOURCE === "csv"
            ? new CustomerCSVProvider()
            : new CustomerDBProvider()
    );
}

export function getProduct() {
    return new Product.ProductResolver(
        env.DATA_SOURCE === "csv"
            ? new ProductCSVProvider()
            : new ProductDBProvider()
    );
}
