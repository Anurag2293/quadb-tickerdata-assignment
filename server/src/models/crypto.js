import mongoose from "mongoose";

// "base_unit": "btc",
// "quote_unit": "inr",
// "low": "2349999.0",
// "high": "2450000.0",
// "last": "2413986.0",
// "type": "SPOT",
// "open": "2439999",
// "volume": "9.29318",
// "sell": "2413986.0",
// "buy": "2413985.0",
// "at": 1680628459,
// "name": "BTC/INR"

const cryptoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    last: { type: String, required: true },
    buy: { type: String, required: true },
    sell: { type: String, required: true },
    volume: { type: String, required: true },
    base_unit: { type: String, required: true }
})

const Crypto = mongoose.model('Crypto', cryptoSchema)

export default Crypto