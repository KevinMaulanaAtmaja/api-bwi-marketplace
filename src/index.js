const express = require("express");
const helmet = require("helmet");
const { getWarungData } = require("./services/warung");
const { getFashionData } = require("./services/fashion");
const { getRestoData } = require("./services/resto");
const { normalizeProduct } = require("./normalizes/normalize.js");

const app = express();
app.use(express.json());
app.use(helmet());
const PORT = 3300;

app.get('/', (req, res) => {
    // res.send('Testing the server');
    res.json({
        message: 'Testing the server'
    });
});


app.get("/integrator-products", async (req, res) => {
    try {
        const [warung, fashion, resto] = await Promise.all([
            getWarungData(),
            getFashionData(),
            getRestoData(),
        ]);

        const result = [
            ...warung.map((i) => normalizeProduct(i, "Warung")),
            ...fashion.map((i) => normalizeProduct(i, "Fashion")),
            ...resto.map((i) => normalizeProduct(i, "Resto")),
        ];

        res.json({
            message: "success",
            total: result.length,
            data: result,
        });
    } catch (err) {
        res.status(500).json({
            message: "Integrator error",
            error: err.message,
        });
    }
});


app.listen(PORT, () => {
    console.log(`Integrator Server running on port http://localhost:${PORT}`);
})