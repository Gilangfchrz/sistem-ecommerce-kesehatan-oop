const ProductFactory = require('./services/ProductFactory');
const inventory = require('./services/Inventory');
const orderService = require('./services/OrderService');
const Logger = require('./observers/Logger');
const EmailNotifier = require('./observers/EmailNotifier');
const SMSNotifier = require('./observers/SMSNotifier');

// 1. Buat beberapa produk pakai Factory
const vitaminC = ProductFactory.createProduct('vitamin', { name: 'Vitamin C', price: 50000, stock: 10 });
const mask = ProductFactory.createProduct('medical', { name: 'Masker KN95', price: 15000, stock: 100 });

// 2. Tambahkan ke Inventory
inventory.addProduct(vitaminC);
inventory.addProduct(mask);

// 3. Subscribe Observer ke Vitamin C (biar dapet notif kalau stoknya abis)
const logger = new Logger();
const email = new EmailNotifier();
const sms = new SMSNotifier();

vitaminC.addObserver(logger);
vitaminC.addObserver(email);
vitaminC.addObserver(sms);

// 4. Proses Pesanan via OrderService
console.log("=== TRANSAKSI MULAI ===");
orderService.processOrder('Vitamin C', 5); // Beli 5, harusnya memicu notif

console.log("\n=== CEK STOK AKHIR ===");
console.log(`Sisa stok ${vitaminC.name}: ${vitaminC.stock}`);