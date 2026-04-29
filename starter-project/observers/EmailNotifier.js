class EmailNotifier {
  update(product) {
    console.log(`[EMAIL]: Mengirim email... Stok ${product.name} sekarang ${product.stock}`);
  }
}
module.exports = EmailNotifier;