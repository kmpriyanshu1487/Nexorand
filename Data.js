const connectDB = require("./DB/DBconnect");
const Product = require("./model/Product");
const ProductJson=require('./Products.json')

require("dotenv").config();

const start = async () => {
  try {
    await connectDB(process.env.DB_URL);
    await Product.deleteMany();
    await Product.create(ProductJson);
    console.log('success');
    
  } catch (error) {
    console.log(error);
  }
};
start();
