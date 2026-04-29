// services/ProductFactory.js
const Vitamin = require('../models/Vitamin');
const Supplement = require('../models/Supplement');
const MedicalEquipment = require('../models/MedicalEquipment');

class ProductFactory {
  static createProduct(type, data) {
    const { name, price, stock } = data;
    switch (type.toLowerCase()) {
      case 'vitamin':
        return new Vitamin(name, price, stock);
      case 'supplement':
        return new Supplement(name, price, stock);
      case 'medical':
        return new MedicalEquipment(name, price, stock);
      default:
        throw new Error('Kategori produk tidak ditemukan!');
    }
  }
}

module.exports = ProductFactory;