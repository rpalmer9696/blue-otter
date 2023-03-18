import * as Customer from "@/lib/customer/resolvers";
import { CustomerArgs } from "@/lib/customer/types";
import * as Product from "@/lib/product/resolvers";
import { ProductArgs } from "@/lib/product/types";
import CustomerProvider from "@/provider/csv/customer";
import ProductProvider from "@/provider/csv/product";

// Keeps all the resolvers in one place.
// So it's easy to see what resolvers are available.
export function getResolvers() {
    return {
        Query: {
            customer: customerResolver,
            product: productResolver,
        },
    };
}

function customerResolver(parent: unknown, args: CustomerArgs) {
    return Customer.customerResolver({
        args,
        provider: new CustomerProvider(),
    });
}

function productResolver(parent: unknown, args: ProductArgs) {
    return Product.productResolver({
        args,
        provider: new ProductProvider(),
    });
}
