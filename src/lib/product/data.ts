export class Product {
    constructor(
        private readonly vin: string | null,
        private readonly colour: string | null,
        private readonly make: string | null,
        private readonly model: string | null,
        private readonly price: number | null
    ) {}

    getVin() {
        return this.vin;
    }

    getColour() {
        return this.colour;
    }

    getMake() {
        return this.make;
    }

    getModel() {
        return this.model;
    }

    getPrice() {
        return this.price;
    }
}
