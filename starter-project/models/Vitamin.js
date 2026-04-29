const Product = require('./Product');
class Vitamin extends Product {
  calculateShipping() { return 5000; }
}
module.exports = Vitamin;