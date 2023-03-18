//This file will contain all the resolvers for the Customer namespace.
import { Customer } from "./providers";
import { CustomerArgs } from "./types";

export function customerResolver({
    args,
    provider,
}: {
    args?: CustomerArgs;
    provider: Customer;
}) {
    return provider.fetch(args);
}
