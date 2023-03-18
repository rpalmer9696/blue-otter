import { ProductResolver } from "@/lib/product/resolvers";
import { Product } from "@/lib/product/data";
import ProductProvider from "@/provider/csv/product";
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

        const provider = new ProductProvider();
        const product = new Product(
            "VNI83728",
            "black",
            "Range Rover",
            "Evoque",
            45000
        );

        const spy = vi.spyOn(provider, "fetch").mockResolvedValue([product]);
        const resolver = new ProductResolver(provider);

        // Act
        const actual = resolver.fetch(args);

        // Assert
        await expect(actual).resolves.toEqual([product]);
        expect(spy).toHaveBeenCalledWith(args);
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
