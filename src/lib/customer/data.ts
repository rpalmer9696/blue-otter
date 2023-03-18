// This file will container all ValueObjects related to the Customer namespace.
export class Customer {
    constructor(
        private readonly email: string | null,
        private readonly forename: string | null,
        private readonly surname: string | null,
        private readonly contactNumber: string | null,
        private readonly postcode: string | null
    ) {}

    getEmail() {
        return this.email;
    }

    getForename() {
        return this.forename;
    }

    getSurname() {
        return this.surname;
    }

    getContactNumber() {
        return this.contactNumber;
    }

    getPostcode() {
        return this.postcode;
    }
}
