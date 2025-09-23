

require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');
const cartRouters = require("./routers/cartRoutes.js");
const orderRouters = require("./routers/orderRoutes.js");



const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
app.use("/api/cart", cartRouters);
app.use("/api/orders", orderRouters);

const authRouters = require("./routers/authRouters.js");
const productRouters = require("./routers/productRoutes.js");


app.get("/", (req, res) => {
    res.send({ message: "Welcome to ShopSphere" });
});

app.use('/auth', authRouters);
app.use("/products", productRouters);

const startServer = async () => {
    try {
        
        await connectDB();

      
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });

    } catch (error) {
        console.error("Failed to connect to the database. Server is not starting.", error);
    }
};


startServer();