export type ProductArgs = {
    vin?: string;
    colour?: string;
    make?: string;
    model?: string;
    price?: number;
};

export type CreateProductArgs = {
    vin: string;
    colour: string;
    make: string;
    model: string;
    price: number;
};
