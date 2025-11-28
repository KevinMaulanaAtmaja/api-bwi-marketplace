const axios = require("axios");
require('dotenv').config();


async function getFashionData() {
    const res = await axios.get(process.env.API_FASHION);
    return res.data;
}
module.exports = { getFashionData };
