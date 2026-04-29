// services/OrderService.js
const inventory = require('./Inventory');

class OrderService {
  processOrder(productName, quantity) {
    // 1. Cari produk di inventory
    const product = inventory.getAllProducts().find(p => p.name === productName);

    if (!product) {
      console.log(`[ORDER ERROR]: Produk ${productName} tidak ditemukan!`);
      return;
    }

    // 2. Cek ketersediaan stok
    if (product.stock < quantity) {
      console.log(`[ORDER ERROR]: Stok ${productName} tidak cukup! (Sisa: ${product.stock})`);
      return;
    }

    // 3. Hitung biaya
    const subtotal = product.price * quantity;
    const shipping = product.calculateShipping();
    const total = subtotal + shipping;

    console.log(`--- Memproses Pesanan: ${productName} ---`);
    console.log(`Subtotal: Rp${subtotal}`);
    console.log(`Ongkir: Rp${shipping}`);
    console.log(`Total Bayar: Rp${total}`);

    // 4. Update stok (Otomatis memicu Observer jika stok berubah)
    product.stock -= quantity;
    console.log(`[ORDER SUCCESS]: Pesanan berhasil diproses.`);
  }
}

module.exports = new OrderService();