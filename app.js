require('dotenv').config();
const express = require('express');
const app = express();
const connectToDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const chefRoutes = require('./routes/chef.routes');
const restaurantRoutes = require('./routes/restaurant.routes');
const dishRoutes = require('./routes/dish.routes');

const PORT = 3000;
connectToDB();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/chefs', chefRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/dishes', dishRoutes);


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
