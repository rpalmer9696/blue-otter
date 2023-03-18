// This file will container all ValueObjects related to the Customer namespace.
export class Customer {
    constructor(
        private readonly email: string,
        private readonly forename: string,
        private readonly surname: string,
        private readonly contactNumber: string,
        private readonly postcode: string
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
