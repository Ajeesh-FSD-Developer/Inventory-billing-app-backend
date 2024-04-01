const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const body_parser = require("body-parser");
const dotenv = require("dotenv").config();
const adminRoutes = require("./Routes/admin.route.js");
const productsRoutes = require("./Routes/product.route.js");
const customerRouter = require("./Routes/customer.route.js");
const invoicerouter = require("./Routes/admin.invoice.route.js");
const dashboardRoutes=require("./Routes/admin.dashboard.route.js")
const path=require("path");
const cookieparser = require("cookie-parser");
const app = express();
app.use(body_parser.json());
app.use(express.json());
app.use(cors());
app.use(cookieparser());



const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME // Replace 'your_database_name' with your actual database name
  };

  mongoose.connect(process.env.DB_URL , options)
  .then(() => {
    console.log('Connected to MongoDB');
    // You can start defining your Mongoose schemas and models here
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });





app.get("/", (req, res) => {
    res.send(' Backend');
  });
app.use("/api/admin", adminRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/customers", customerRouter);
app.use("/api/invoices", invoicerouter);
app.use("/api/dashboard", dashboardRoutes);
app.use(express.static(path.join(__dirname, '../Front-End/my-App/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Front-End/my-App/dist/index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(400).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(process.env.PORT, (req, res) => {
console.log("port running", process.env.PORT);
});

// app.listen(3000)
// console.log(process.env.DB_URL)







// console.log("hello");
