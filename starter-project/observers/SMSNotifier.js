// observers/SMSNotifier.js
class SMSNotifier {
  update(product) {
    console.log(`[SMS]: Warning! Stok ${product.name} tinggal ${product.stock}. Segera restock!`);
  }
}
module.exports = SMSNotifier;