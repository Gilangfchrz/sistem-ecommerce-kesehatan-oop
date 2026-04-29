const Product = require('./Product');
class Supplement extends Product {
  calculateShipping() { return 10000; }
}
module.exports = Supplement;