import {
    CustomerArgs,
    CreateCustomerArgs,
    UpdateCustomerArgs,
} from "@/lib/customer/types";
import { Customer as CustomerData } from "@/lib/customer/data";
import { CreateProductArgs, ProductArgs } from "@/lib/product/types";
import { Product as ProductData } from "@/lib/product/data";
import * as Factory from "@/factory";

// Keeps all the resolvers in one place.
// So it's easy to see what resolvers are available.
export function getResolvers() {
    return {
        Query: {
            customer: customerQueryResolver,
            product: productQueryResolver,
        },
        Mutation: {
            createCustomer: createCustomerResolver,
            createProduct: createProductResolver,
            deleteCustomer: deleteCustomerResolver,
            deleteProduct: deleteProductResolver,
            updateCustomer: updateCustomerResolver,
        },
    };
}

function customerQueryResolver(parent: unknown, args: CustomerArgs) {
    return Factory.getCustomer().fetch(args);
}

function createCustomerResolver(parent: unknown, args: CreateCustomerArgs) {
    return Factory.getCustomer().add(
        new CustomerData(
            args.email,
            args.forename,
            args.surname,
            args.contactNumber,
            args.postcode
        )
    );
}

function deleteCustomerResolver(parent: unknown, args: CreateCustomerArgs) {
    return Factory.getCustomer().delete(args.email);
}

function updateCustomerResolver(parent: unknown, args: UpdateCustomerArgs) {
    return Factory.getCustomer().update(
        new CustomerData(
            args.email,
            args.forename || "",
            args.surname || "",
            args.contactNumber || "",
            args.postcode || ""
        )
    );
}

function productQueryResolver(parent: unknown, args: ProductArgs) {
    return Factory.getProduct().fetch(args);
}

function createProductResolver(parent: unknown, args: CreateProductArgs) {
    return Factory.getProduct().add(
        new ProductData(
            args.vin,
            args.colour,
            args.make,
            args.model,
            args.price
        )
    );
}

function deleteProductResolver(parent: unknown, args: CreateProductArgs) {
    return Factory.getProduct().delete(args.vin);
}
