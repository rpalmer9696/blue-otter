import { Customer } from "@/lib/customer/data";
import { CustomerResolver } from "@/lib/customer/resolvers";
import { CustomerArgs } from "@/lib/customer/types";
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

        const customer = new Customer(
            "",
            "John",
            "Smith",
            "01234567890",
            "AB1 2CD"
        );
        const provider = vi.fn(() => {
            return {
                fetch: async (args: CustomerArgs) => [customer],
                add: async (args: Customer) => customer,
                delete: async (email: string) => {},
                update: async (args: Customer) => customer,
            };
        })();

        const spy = vi.spyOn(provider, "fetch").mockResolvedValue([customer]);
        const resolver = new CustomerResolver(provider);

        // Act
        const actual = resolver.fetch(args);

        // Assert
        await expect(actual).resolves.toEqual([customer]);
        expect(spy).toHaveBeenCalledWith(args);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("should add a customer", async () => {
        // Arrange
        const customer = new Customer(
            "",
            "John",
            "Smith",
            "01234567890",
            "AB1 2CD"
        );
        const provider = vi.fn(() => {
            return {
                fetch: async (args: CustomerArgs) => [customer],
                add: async (args: Customer) => customer,
                delete: async (email: string) => {},
                update: async (args: Customer) => customer,
            };
        })();

        const spy = vi.spyOn(provider, "add").mockResolvedValue(customer);
        const resolver = new CustomerResolver(provider);

        // Act
        const actual = resolver.add(customer);

        // Assert
        await expect(actual).resolves.toEqual(customer);
        expect(spy).toHaveBeenCalledWith(customer);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("should delete a customer", async () => {
        // Arrange
        const email = "test@email.com";
        const customer = new Customer(
            "test@email.com",
            "John",
            "Smith",
            "01234567890",
            "AB1 2CD"
        );

        const provider = vi.fn(() => {
            return {
                fetch: async (args: CustomerArgs) => [customer],
                add: async (args: Customer) => customer,
                delete: async (email: string) => {},
                update: async (args: Customer) => customer,
            };
        })();

        const spy = vi.spyOn(provider, "delete").mockResolvedValue();
        const resolver = new CustomerResolver(provider);

        // Act
        const actual = resolver.delete(email);

        // Assert
        await expect(actual).resolves.toEqual(undefined);
        expect(spy).toHaveBeenCalledWith(email);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("should update a customer", async () => {
        // Arrange
        const customer = new Customer(
            "test@email.com",
            "John",
            "Smith",
            "01234567890",
            "AB1 2CD"
        );
        const provider = vi.fn(() => {
            return {
                fetch: async (args: CustomerArgs) => [customer],
                add: async (args: Customer) => customer,
                delete: async (email: string) => {},
                update: async (args: Customer) => customer,
            };
        })();

        const spy = vi.spyOn(provider, "update").mockResolvedValue(customer);
        const resolver = new CustomerResolver(provider);

        // Act
        const actual = resolver.update(customer);

        // Assert
        await expect(actual).resolves.toEqual(customer);
        expect(spy).toHaveBeenCalledWith(customer);
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
