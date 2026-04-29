// services/Inventory.js
class Inventory {
  constructor() {
    if (!Inventory.instance) {
      this.products = [];
      Inventory.instance = this;
    }
    return Inventory.instance;
  }

  addProduct(product) {
    this.products.push(product);
  }

  getAllProducts() {
    return this.products;
  }

  getProductsByCategory(category) {
    return this.products.filter(p => p.constructor.name.toLowerCase() === category.toLowerCase());
  }

  getTotalValue() {
    return this.products.reduce((total, p) => total + (p.price * p.stock), 0);
  }
}

const instance = new Inventory();
Object.freeze(instance); // Biar nggak bisa diubah-ubah strukturnya
module.exports = instance;