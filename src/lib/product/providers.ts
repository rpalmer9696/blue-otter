import { Product as ProductData } from "./data";
import { ProductArgs } from "./types";

export interface Product {
    fetch(args?: ProductArgs): Promise<ProductData[]>;
    add(product: ProductData): Promise<ProductData>;
    delete(vin: string): Promise<void>;
}
