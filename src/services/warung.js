const axios = require("axios");
require('dotenv').config();


async function getWarungData() {
    const res = await axios.get(process.env.API_TOKO);
    return res.data;
}

module.exports = { getWarungData };