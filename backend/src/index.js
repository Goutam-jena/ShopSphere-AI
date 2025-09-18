

require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send({ message: "Welcome to ShopSphere" });
});


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