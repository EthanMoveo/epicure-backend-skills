const express = require('express');
const app = express();
const connectToDB = require('./config/db');
const PORT = 3000;

connectToDB();


app.get('/', (req, res) => {
    res.status(200);
    res.send("Server is live.");
})


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
