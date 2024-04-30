const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 8080;
app.use(cors());
const url = "mongodb://localhost:27017/";

// Function to fetch customer data by name from MongoDB
async function fetchCustomerByName(name) {
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db("mydb");

        // Fetch data from MongoDB collection based on name
        const customer = await db.collection("customers").findOne({ name: name });

        client.close();
        return customer;
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
}

// Route to handle GET requests to /customers
app.get("/customers", async (req, res) => {
    try {
        // Get the name query parameter from the request
        const name = req.query.name;

        if (!name) {
            return res.status(400).json({ error: "Name parameter is required" });
        }

        // Fetch customer data based on the provided name
        const customer = await fetchCustomerByName(name);

        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        // Send the customer data as JSON response
        res.json(customer);
    } catch (err) {
        // If an error occurs, send an error response
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
