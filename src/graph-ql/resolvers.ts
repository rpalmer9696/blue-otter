import { CustomerArgs } from "@/lib/customer/types";
import { ProductArgs } from "@/lib/product/types";
import * as Factory from "@/factory";

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
    return Factory.getCustomer().fetch(args);
}

function productQueryResolver(parent: unknown, args: ProductArgs) {
    return Factory.getProduct().fetch(args);
}
