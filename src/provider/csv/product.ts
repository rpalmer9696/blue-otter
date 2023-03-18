import { Product } from "@/lib/product/providers";
import { ProductArgs } from "@/lib/product/types";
import { Product as ProductData } from "@/lib/product/data";
import * as fs from "fs";
import * as csv from "fast-csv";
import * as CONFIG from "./config";
import * as path from "path";

type ProductCSV = {
    vin: string | null;
    colour: string | null;
    make: string | null;
    model: string | null;
    price: number | null;
};

export default class ProductProvider implements Product {
    async fetch(args: ProductArgs) {
        return this.parse(args);
    }

    private async parse(args: ProductArgs) {
        return new Promise<ProductData[]>((resolve, reject) => {
            const results: ProductData[] = [];

            fs.createReadStream(path.resolve(CONFIG.PRODUCT_PATH))
                .pipe(csv.parse({ headers: true }))
                .on("error", (error) => reject(error))
                .on(
                    "data",
                    (row) =>
                        this.handleArgs(row, args) &&
                        results.push(this.toProduct(row))
                )
                .on("end", () => {
                    resolve(results);
                });
        });
    }

    private handleArgs(row: ProductCSV, args: ProductArgs) {
        if (args.vin && row.vin !== args.vin) {
            return false;
        }

        if (args.colour && row.colour !== args.colour) {
            return false;
        }

        if (args.make && row.make !== args.make) {
            return false;
        }

        if (args.model && row.model !== args.model) {
            return false;
        }

        if (args.price && row.price !== args.price) {
            return false;
        }

        return true;
    }

    private toProduct(row: ProductCSV) {
        return new ProductData(
            row.vin,
            row.colour,
            row.make,
            row.model,
            row.price
        );
    }
}
