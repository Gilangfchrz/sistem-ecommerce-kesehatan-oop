const Product = require('./Product');
class MedicalEquipment extends Product {
  calculateShipping() { return 25000; }
}
module.exports = MedicalEquipment;