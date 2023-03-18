import { CustomerResolver } from "@/lib/customer/resolvers";
import { Customer } from "@/lib/customer/data";
import CustomerProvider from "@/provider/csv/customer";
import { describe, it, expect, vi, afterEach } from "vitest";

describe("CustomerResolver", () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it("should return a customer", async () => {
        // Arrange
        const args = {
            forename: "John",
        };

        const provider = new CustomerProvider();
        const customer = new Customer(
            "",
            "John",
            "Smith",
            "01234567890",
            "AB1 2CD"
        );

        const spy = vi.spyOn(provider, "fetch").mockResolvedValue([customer]);
        const resolver = new CustomerResolver(provider);

        // Act
        const actual = resolver.fetch(args);

        // Assert
        await expect(actual).resolves.toEqual([customer]);
        expect(spy).toHaveBeenCalledWith(args);
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
