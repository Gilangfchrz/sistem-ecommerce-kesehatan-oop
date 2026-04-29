// models/Product.js
class Product {
  #price;
  #stock;

  constructor(name, price, stock) {
    this.name = name;
    this.#price = price;
    this.#stock = stock;
    this.observers = []; // Daftar yang bakal dikasih tau kalau ada perubahan
  }

  // Encapsulation (Getter/Setter)
  get price() { return this.#price; }
  set price(val) { this.#price = val; }

  get stock() { return this.#stock; }
  set stock(val) {
    this.#stock = val;
    // Jika stok berubah, kasih tau semua observer
    this.notifyObservers();
  }

  // Observer Pattern Logic
  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers() {
    this.observers.forEach(obs => obs.update(this));
  }

  calculateShipping() {
    return 0; // Default shipping
  }
}

module.exports = Product;