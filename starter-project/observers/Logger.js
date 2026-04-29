class Logger {
  update(product) {
    console.log(`[LOGGER]: Stok produk ${product.name} telah diperbarui menjadi ${product.stock}`);
  }
}
module.exports = Logger;