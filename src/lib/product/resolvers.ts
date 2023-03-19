//This file will contain all the resolvers for the Product namespace.
import { Product as ProductData } from "./data";
import { Product } from "./providers";
import { ProductArgs } from "./types";

export class ProductResolver {
    constructor(private readonly provider: Product) {}

    fetch(args?: ProductArgs) {
        return this.provider.fetch(args);
    }

    add(product: ProductData) {
        return this.provider.add(product);
    }

    delete(vin: string) {
        return this.provider.delete(vin);
    }

    update(product: ProductData) {
        return this.provider.update(product);
    }
}
