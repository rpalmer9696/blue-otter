import {
    CustomerArgs,
    CreateCustomerArgs,
    UpdateCustomerArgs,
} from "@/lib/customer/types";
import { Customer as CustomerData } from "@/lib/customer/data";
import * as Factory from "@/factory";

export function customerQueryResolver(parent: unknown, args: CustomerArgs) {
    return Factory.getCustomer().fetch(args);
}

export function createCustomerResolver(
    parent: unknown,
    args: CreateCustomerArgs
) {
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

export function deleteCustomerResolver(
    parent: unknown,
    args: CreateCustomerArgs
) {
    return Factory.getCustomer().delete(args.email);
}

export function updateCustomerResolver(
    parent: unknown,
    args: UpdateCustomerArgs
) {
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
