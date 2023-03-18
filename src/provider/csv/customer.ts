import { Customer } from "@/lib/customer/providers";
import { CustomerArgs } from "@/lib/customer/types";
import { Customer as CustomerData } from "@/lib/customer/data";
import * as fs from "fs";
import * as csv from "fast-csv";
import * as CONFIG from "./config";
import * as path from "path";

type CustomerCSV = {
    email: string | null;
    forename: string | null;
    surname: string | null;
    contactNumber: string | null;
    postcode: string | null;
};

export default class CustomerProvider implements Customer {
    async fetch(args: CustomerArgs) {
        return this.parse(args);
    }

    async add(customer: CustomerData) {
        return new Promise<CustomerData>((resolve, reject) => {
            const row = {
                email: customer.getEmail(),
                forename: customer.getForename(),
                surname: customer.getSurname(),
                contactNumber: customer.getContactNumber(),
                postcode: customer.getPostcode(),
            };

            fs.appendFile(
                path.resolve(CONFIG.CUSTOMER_PATH),
                `${row.email},${row.forename},${row.surname},${row.contactNumber},${row.postcode}`,
                (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(this.toCustomer(row));
                    }
                }
            );
        });
    }

    private async parse(args: CustomerArgs) {
        return new Promise<CustomerData[]>((resolve, reject) => {
            const results: CustomerData[] = [];

            fs.createReadStream(path.resolve(CONFIG.CUSTOMER_PATH))
                .pipe(csv.parse({ headers: true }))
                .on("error", (error) => reject(error))
                .on(
                    "data",
                    (row) =>
                        this.handleArgs(row, args) &&
                        results.push(this.toCustomer(row))
                )
                .on("end", () => {
                    resolve(results);
                });
        });
    }

    private handleArgs(row: CustomerCSV, args: CustomerArgs) {
        if (args.email && row.email !== args.email) {
            return false;
        }

        if (args.forename && row.forename !== args.forename) {
            return false;
        }

        if (args.surname && row.surname !== args.surname) {
            return false;
        }

        if (args.contactNumber && row.contactNumber !== args.contactNumber) {
            return false;
        }

        if (args.postcode && row.postcode !== args.postcode) {
            return false;
        }

        return true;
    }

    private toCustomer(row: CustomerCSV) {
        return new CustomerData(
            row.email as string,
            row.forename as string,
            row.surname as string,
            row.contactNumber as string,
            row.postcode as string
        );
    }
}
