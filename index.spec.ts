import { Warehouse, Product, Order } from ".";

describe('Warehouse Unit Tests', () => {
    let warehouse : Warehouse;

    beforeAll(() => {
        warehouse = new Warehouse();
        warehouse.add(new Product(1, 'Bread', 150))
        warehouse.add(new Product(2, 'Cookie', 50))
    })

    test('A bread order with the exactly amount in inventory', () => {
        const order = new Order(1, 150);
        order.buy(warehouse);

        expect(order.isDone).toBe(true);
        expect(warehouse.getInventory(1)).toBe(0);
    });

    test('A cookie order with excessive amount', () => {
        const order = new Order(2, 51);
        order.buy(warehouse);

        expect(order.isDone).toBe(false);
        expect(warehouse.getInventory(2)).toBe(50);
    });
});