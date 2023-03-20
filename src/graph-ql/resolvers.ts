import * as CustomerResolver from "@/graph-ql/resolvers/customer";
import * as ProductResolver from "@/graph-ql/resolvers/product";

// Keeps all the resolvers in one place.
// So it's easy to see what resolvers are available.
export function getResolvers() {
    return {
        Query: {
            customer: CustomerResolver.customerQueryResolver,
            product: ProductResolver.productQueryResolver,
        },
        Mutation: {
            createCustomer: CustomerResolver.createCustomerResolver,
            createProduct: ProductResolver.createProductResolver,
            deleteCustomer: CustomerResolver.deleteCustomerResolver,
            deleteProduct: ProductResolver.deleteProductResolver,
            updateCustomer: CustomerResolver.updateCustomerResolver,
            updateProduct: ProductResolver.updateProductResolver,
        },
    };
}
