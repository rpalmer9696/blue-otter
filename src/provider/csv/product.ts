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

    async add(product: ProductData) {
        return new Promise<ProductData>((resolve, reject) => {
            const row = {
                vin: product.getVin(),
                colour: product.getColour(),
                make: product.getMake(),
                model: product.getModel(),
                price: product.getPrice(),
            };

            fs.appendFile(
                path.resolve(CONFIG.PRODUCT_PATH),
                `${row.vin},${row.colour},${row.make},${row.model},${row.price}`,
                (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(this.toProduct(row));
                    }
                }
            );
        });
    }

    async delete(vin: string) {
        return new Promise<void>((resolve, reject) => {
            const results: ProductData[] = [];

            fs.createReadStream(path.resolve(CONFIG.PRODUCT_PATH))
                .pipe(csv.parse({ headers: true }))
                .on("error", (error) => reject(error))
                .on("data", (row) => {
                    if (row.vin !== vin) {
                        results.push(this.toProduct(row));
                    }
                })
                .on("end", () => {
                    const formattedHeaders = Object.keys(results[0]).join(",");

                    const formattedRows = results.map((row) => {
                        return `${row.getVin()},${row.getColour()},${row.getMake()},${row.getModel()},${row.getPrice()}`;
                    });

                    const data = [formattedHeaders, ...formattedRows].join(
                        "\r\n"
                    );

                    fs.writeFile(
                        path.resolve(CONFIG.PRODUCT_PATH),
                        data.concat("\r\n"),
                        (error) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve();
                            }
                        }
                    );
                });
        });
    }

    async update(product: ProductData) {
        return new Promise<ProductData>((resolve, reject) => {
            const results: ProductData[] = [];

            fs.createReadStream(path.resolve(CONFIG.PRODUCT_PATH))
                .pipe(csv.parse({ headers: true }))
                .on("error", (error) => reject(error))
                .on("data", (row) => {
                    results.push(this.toProduct(row));
                })
                .on("end", () => {
                    const index = results.findIndex(
                        (row) => row.getVin() === product.getVin()
                    );

                    if (index !== -1) {
                        results[index] = product;
                    }

                    const formattedHeaders = Object.keys(results[0]).join(",");

                    const formattedRows = results.map((row) => {
                        return `${row.getVin()},${row.getColour()},${row.getMake()},${row.getModel()},${row.getPrice()}`;
                    });

                    const data = [formattedHeaders, ...formattedRows].join(
                        "\r\n"
                    );

                    fs.writeFile(
                        path.resolve(CONFIG.PRODUCT_PATH),
                        data.concat("\r\n"),
                        (error) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(product);
                            }
                        }
                    );
                });
        });
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
            row.vin as string,
            row.colour as string,
            row.make as string,
            row.model as string,
            row.price as number
        );
    }
}
