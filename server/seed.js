const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');
const Product = require('./models/Product');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/product_management_db', {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB Connected for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing users and products.');

    // Seed Admin user
    const admin = await User.create({
      name: 'System Administrator',
      email: 'admin@netutech.com',
      password: 'admin123',
      role: 'Admin',
    });
    console.log(`Admin created: ${admin.email} / admin123`);

    // Seed Regular user
    const user = await User.create({
      name: 'John Doe',
      email: 'user@netutech.com',
      password: 'user123',
      role: 'User',
    });
    console.log(`User created: ${user.email} / user123`);

    // Seed sample products
    const products = await Product.insertMany([
      {
        name: 'Logitech MX Master 3S Wireless Mouse',
        sku: 'LOGI-MX3S-BLK',
        price: 99.99,
        category: 'Electronics',
        description: 'Quiet clicks and 8K DPI any-surface tracking with ergonomic wrist support.',
        image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80',
        variant: 'Graphite / Wireless',
      },
      {
        name: 'Keychron K2 Pro Mechanical Keyboard',
        sku: 'KEY-K2PRO-RGB',
        price: 119.00,
        category: 'Electronics',
        description: 'QMK/VIA wireless mechanical keyboard with hot-swappable tactile switches.',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
        variant: 'RGB / Brown Switch',
      },
      {
        name: 'Dell UltraSharp 27" 4K USB-C Monitor',
        sku: 'DELL-U2723QE',
        price: 549.50,
        category: 'Monitors',
        description: 'IPS Black technology with 2000:1 contrast ratio and extensive connectivity.',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80',
        variant: '27-inch / 4K UHD',
      },
      {
        name: 'Sony WH-1000XM5 ANC Headphones',
        sku: 'SONY-WHXM5-SIL',
        price: 398.00,
        category: 'Audio',
        description: 'Industry-leading noise canceling with Auto NC Optimizer and 30-hr battery life.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
        variant: 'Silver / Over-Ear',
      },
      {
        name: 'Apple Watch Ultra 2',
        sku: 'APPLE-WU2-ORG',
        price: 799.00,
        category: 'Wearables',
        description: 'The most rugged and capable Apple Watch with precision dual-frequency GPS.',
        image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&auto=format&fit=crop&q=80',
        variant: 'Orange Alpine Loop / 49mm',
      },
      {
        name: 'Samsung Galaxy Buds3 Pro',
        sku: 'SAM-GB3P-SLV',
        price: 249.99,
        category: 'Audio',
        description: 'Blade-lights design with 2-way speaker and adaptive noise control.',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&auto=format&fit=crop&q=80',
        variant: 'Silver / In-Ear',
      },
    ]);
    console.log(`${products.length} products seeded.`);

    console.log('\n--- Seed Complete ---');
    console.log('Admin: admin@netutech.com / admin123');
    console.log('User:  user@netutech.com  / user123');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
