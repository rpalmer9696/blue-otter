import { Product } from "@/lib/product/providers";
import { ProductArgs } from "@/lib/product/types";
import { Product as ProductData } from "@/lib/product/data";
import { prisma } from "@/server/db/client";

export default class ProductProvider implements Product {
    async fetch(args: ProductArgs) {
        const products = await prisma.product.findMany({
            where: {
                vin: args.vin,
                colour: args.colour,
                make: args.make,
                model: args.model,
                price: args.price,
            },
        });

        return products.map((product) => {
            return new ProductData(
                product.vin,
                product.colour,
                product.make,
                product.model,
                product.price
            );
        });
    }

    async add(product: ProductData) {
        const row = await prisma.product.create({
            data: {
                vin: product.getVin(),
                colour: product.getColour(),
                make: product.getMake(),
                model: product.getModel(),
                price: product.getPrice(),
            },
        });

        return new ProductData(
            row.vin,
            row.colour,
            row.make,
            row.model,
            row.price
        );
    }
}
