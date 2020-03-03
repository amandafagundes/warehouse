export class Product {
    id: number;
    description: string;
    amount: number;

    constructor(id: number, description: string, amount: number) {
        this.id = id;
        this.description = description;
        this.amount = amount;
    }
}

export class Warehouse {
    products: Product[];

    constructor(products?: Product[]) {
        this.products = products || [];
    }

    add(product: Product) {
        this.products.push(product);
    }

    remove(id: number, amount: number) {
        this.products = this.products.map((p) => {
            if (p.id === id) {
                p.amount -= amount;
            }
            return p;
        });
    }

    getInventory(id: number): number {
        const product = this.products.find((p) => p.id === id);
        if (product) {
            return product.amount;
        }
        return 0;
    }

    hasInventory(id: number, amount: number): boolean {
        const product = this.products.find((p) => p.id === id);
        if (product) {
            return amount <= product.amount;
        }
        return false;
    }
}

export class Order {
    productId: number;
    productAmount: number;
    isDone: boolean = false;

    constructor(productId: number, productAmount: number) {
        this.productId = productId;
        this.productAmount = productAmount;
    }

    buy(warehouse: Warehouse) {
        if (warehouse.hasInventory(this.productId, this.productAmount)) {
            warehouse.remove(this.productId, this.productAmount);
            this.isDone = true;
        } else {
            this.isDone = false;
        }
    }
}