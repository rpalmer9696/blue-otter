// This file will contain all types related to the Customer namespace.
export type CustomerArgs = {
    email?: string;
    forename?: string;
    surname?: string;
    contactNumber?: string;
    postcode?: string;
};

export type CreateCustomerArgs = {
    email: string;
    forename: string;
    surname: string;
    contactNumber: string;
    postcode: string;
};

export type UpdateCustomerArgs = {
    email: string;
    forename?: string;
    surname?: string;
    contactNumber?: string;
    postcode?: string;
};
