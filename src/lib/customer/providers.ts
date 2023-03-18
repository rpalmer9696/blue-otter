// This file will contain all data provider interfaces related to the Customer namespace.
import { Customer as CustomerData } from "./data";
import { CustomerArgs } from "./types";

// This will be implemented by any data provider we would like.
// It could be used for CSV storage or a database.
// Our library code doesn't need to know where it's data is coming from.
// It just needs to know that it can fetch data.
export interface Customer {
    fetch(args?: CustomerArgs): Promise<CustomerData[]>;
}
