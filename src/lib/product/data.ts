export class Product {
    constructor(
        private readonly vin: string,
        private readonly colour: string,
        private readonly make: string,
        private readonly model: string,
        private readonly price: number
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
