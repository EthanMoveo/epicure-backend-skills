require('dotenv').config();
const express = require('express');
const app = express();
const connectToDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const chefRoutes = require('./routes/chef.routes');

const PORT = 3000;
connectToDB();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/chefs', chefRoutes);



app.get('/', (req, res) => {
    res.status(200);
    res.send("Server is live.");
})


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
