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
}
