//This file will contain all the resolvers for the Customer namespace.
import { Customer } from "./providers";
import { CustomerArgs } from "./types";
import { Customer as CustomerData } from "./data";

export class CustomerResolver {
    constructor(private readonly provider: Customer) {}

    fetch(args?: CustomerArgs) {
        return this.provider.fetch(args);
    }

    add(customer: CustomerData) {
        return this.provider.add(customer);
    }

    delete(email: string) {
        return this.provider.delete(email);
    }

    update(customer: CustomerData) {
        return this.provider.update(customer);
    }
}
