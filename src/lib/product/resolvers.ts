//This file will contain all the resolvers for the Product namespace.
import { Product } from "./providers";
import { ProductArgs } from "./types";

export class ProductResolver {
    constructor(private readonly provider: Product) {}

    fetch(args?: ProductArgs) {
        return this.provider.fetch(args);
    }
}