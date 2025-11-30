const axios = require("axios");
require('dotenv').config();


async function getData(url) {
    const res = await axios.get(url);
    return res.data;
}
module.exports = { getData };
