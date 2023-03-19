import { Customer } from "@/lib/customer/providers";
import { CustomerArgs } from "@/lib/customer/types";
import { Customer as CustomerData } from "@/lib/customer/data";
import { prisma } from "@/server/db/client";

export default class CustomerProvider implements Customer {
    async fetch(args: CustomerArgs) {
        const customers = await prisma.customer.findMany({
            where: {
                email: args.email,
                forename: args.forename,
                surname: args.surname,
                contact_number: args.contactNumber,
                postcode: args.postcode,
            },
        });

        return customers.map((customer) => {
            return new CustomerData(
                customer.email,
                customer.forename,
                customer.surname,
                customer.contact_number,
                customer.postcode
            );
        });
    }

    async add(customer: CustomerData) {
        const row = await prisma.customer.create({
            data: {
                email: customer.getEmail(),
                forename: customer.getForename(),
                surname: customer.getSurname(),
                contact_number: customer.getContactNumber(),
                postcode: customer.getPostcode(),
            },
        });

        return new CustomerData(
            row.email,
            row.forename,
            row.surname,
            row.contact_number,
            row.postcode
        );
    }

    async delete(email: string) {
        await prisma.customer.delete({
            where: {
                email: email,
            },
        });
    }

    async update(customer: CustomerData) {
        const row = await prisma.customer.update({
            where: {
                email: customer.getEmail(),
            },
            data: {
                forename: customer.getForename(),
                surname: customer.getSurname(),
                contact_number: customer.getContactNumber(),
                postcode: customer.getPostcode(),
            },
        });

        return new CustomerData(
            row.email,
            row.forename,
            row.surname,
            row.contact_number,
            row.postcode
        );
    }
}
