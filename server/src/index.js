import express from "express";
import cors from "cors"
import axios from "axios";

import connectDB from "./db/mongoose.js";
import Crypto from "./models/crypto.js";

const app = express()
const PORT = 3000

// MIDDLEWARE 
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World! Hare Krishna'
    })
})

app.get('/api/tickers', async (req, res) => {
    try {
        const rows = await Crypto.find({})
        res.json(rows)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch tickers from database' });
    }
});

const fetchAndSaveCryptoData = async () => {
    try {
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const cryptoData = response.data;

        // Get the top 10 crypto data
        const top10tickers = Object.values(cryptoData).slice(0, 10).map((ticker) => ({
            name: ticker.name,
            last: ticker.last,
            buy: ticker.buy,
            sell: ticker.sell,
            volume: ticker.volume,
            base_unit: ticker.base_unit,
        }));

        // Save the top 10 tickers data to the database
        await Crypto.deleteMany({});
        await Crypto.insertMany(top10tickers);

        console.log('Successfully fetched and saved crypto data');
    } catch (error) {
        console.error(error.message);
    }
};
const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
    connectDB()
    fetchAndSaveCryptoData()
}

startServer()