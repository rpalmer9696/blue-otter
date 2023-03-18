//This file will contain all the resolvers for the Product namespace.
import { Product } from "./providers";
import { ProductArgs } from "./types";

export function productResolver({
    args,
    provider,
}: {
    args?: ProductArgs;
    provider: Product;
}) {
    return provider.fetch(args);
}
