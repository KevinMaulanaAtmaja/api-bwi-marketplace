const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
const PORT = 3300;

app.get('/', (req, res) => {
    // res.send('Testing the server');
    res.json({
        message: 'Testing the server'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
})