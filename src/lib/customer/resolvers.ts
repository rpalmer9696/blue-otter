//This file will contain all the resolvers for the Customer namespace.
import { Customer } from "./providers";
import { CustomerArgs } from "./types";

export class CustomerResolver {
    constructor(private readonly provider: Customer) {}

    fetch(args?: CustomerArgs) {
        return this.provider.fetch(args);
    }

    // We can add a method for mutation here.
}
