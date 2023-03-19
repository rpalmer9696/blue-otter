import { Product } from "@/lib/product/data";
import { ProductResolver } from "@/lib/product/resolvers";
import { ProductArgs } from "@/lib/product/types";
import { describe, it, expect, vi, afterEach } from "vitest";

describe("ProductResolver", () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it("should return a product", async () => {
        // Arrange
        const args = {
            make: "Range Rover",
        };

        const product = new Product(
            "VNI83728",
            "black",
            "Range Rover",
            "Evoque",
            45000
        );
        const provider = vi.fn(() => {
            return {
                fetch: async (args: ProductArgs) => [product],
                add: async (args: Product) => product,
                delete: async (vin: string) => {},
                update: async (args: Product) => product,
            };
        })();

        const spy = vi.spyOn(provider, "fetch").mockResolvedValue([product]);
        const resolver = new ProductResolver(provider);

        // Act
        const actual = resolver.fetch(args);

        // Assert
        await expect(actual).resolves.toEqual([product]);
        expect(spy).toHaveBeenCalledWith(args);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("should add a product", async () => {
        // Arrange
        const product = new Product(
            "VNI83728",
            "black",
            "Range Rover",
            "Evoque",
            45000
        );
        const provider = vi.fn(() => {
            return {
                fetch: async (args: ProductArgs) => [product],
                add: async (args: Product) => product,
                delete: async (vin: string) => {},
                update: async (args: Product) => product,
            };
        })();

        const spy = vi.spyOn(provider, "add").mockResolvedValue(product);
        const resolver = new ProductResolver(provider);

        // Act
        const actual = resolver.add(product);

        // Assert
        await expect(actual).resolves.toEqual(product);
        expect(spy).toHaveBeenCalledWith(product);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("should delete a product", async () => {
        // Arrange
        const product = new Product(
            "VNI83728",
            "black",
            "Range Rover",
            "Evoque",
            45000
        );
        const provider = vi.fn(() => {
            return {
                fetch: async (args: ProductArgs) => [product],
                add: async (args: Product) => product,
                delete: async (vin: string) => {},
                update: async (args: Product) => product,
            };
        })();

        const spy = vi.spyOn(provider, "delete").mockResolvedValue();
        const resolver = new ProductResolver(provider);

        // Act
        const actual = resolver.delete(product.getVin());

        // Assert
        await expect(actual).resolves.toEqual(undefined);
        expect(spy).toHaveBeenCalledWith(product.getVin());
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("should update a product", async () => {
        // Arrange
        const product = new Product(
            "VNI83728",
            "black",
            "Range Rover",
            "Evoque",
            45000
        );
        const provider = vi.fn(() => {
            return {
                fetch: async (args: ProductArgs) => [product],
                add: async (args: Product) => product,
                delete: async (vin: string) => {},
                update: async (args: Product) => product,
            };
        })();

        const spy = vi.spyOn(provider, "update").mockResolvedValue(product);
        const resolver = new ProductResolver(provider);

        // Act
        const actual = resolver.update(product);

        // Assert
        await expect(actual).resolves.toEqual(product);
        expect(spy).toHaveBeenCalledWith(product);
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
