const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/auth');
const bannerRouter = require('./routes/banner');
const categoryRouter = require('./routes/category');
const subCategoryRouter = require('./routes/sub_category');
const productRouter = require('./routes/product');
const productReviewRouter = require('./routes/product_review');

const PORT = 3000;
const DB = "mongodb+srv://shivammishra6339_db_user:shivamMongo@cluster0.k0pilin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRouter);
app.use('/api/banner', bannerRouter);          
app.use('/api/categories', categoryRouter);   
app.use('/api/subcategories', subCategoryRouter);
app.use('/api/products', productRouter);
app.use('/api/reviews', productReviewRouter);


// Test server
app.get('/', (req, res) => res.send("Server is running"));

// Connect to MongoDB
mongoose.connect(DB)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
