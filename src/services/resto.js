const axios = require("axios");
require('dotenv').config();


async function getRestoData() {
    const res = await axios.get(process.env.API_RESTO);
    return res.data;
}

module.exports = { getRestoData };