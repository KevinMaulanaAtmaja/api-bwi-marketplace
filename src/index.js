const express = require("express");
const helmet = require("helmet");
const { getData } = require("./services/service");
const { normalizeProduct } = require("./normalizes/normalize.js");

const app = express();
app.use(express.json());
app.use(helmet());
const PORT = 3300;

app.get('/', (req, res) => {
    // res.send('Testing the server');
    res.json({
        message: 'Go to http://localhost:3300/integrator-products to get data'
    });
});

const getWarungData = () => getData(process.env.API_TOKO);
const getFashionData = () => getData(process.env.API_FASHION);
const getRestoData = () => getData(process.env.API_RESTO);

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