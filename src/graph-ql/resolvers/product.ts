import { CreateProductArgs, ProductArgs } from "@/lib/product/types";
import { Product as ProductData } from "@/lib/product/data";
import * as Factory from "@/factory";

export function productQueryResolver(parent: unknown, args: ProductArgs) {
    return Factory.getProduct().fetch(args);
}

export function createProductResolver(
    parent: unknown,
    args: CreateProductArgs
) {
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

export function deleteProductResolver(
    parent: unknown,
    args: CreateProductArgs
) {
    return Factory.getProduct().delete(args.vin);
}

export function updateProductResolver(
    parent: unknown,
    args: CreateProductArgs
) {
    return Factory.getProduct().update(
        new ProductData(
            args.vin,
            args.colour || "",
            args.make || "",
            args.model || "",
            args.price || 0
        )
    );
}
