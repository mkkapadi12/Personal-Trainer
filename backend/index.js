require('dotenv').config({ quiet: true });
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

const auth_routes = require('./routes/auth.routes');
const address_routes = require('./routes/address.routes');
const article_routes = require('./routes/article.routes');
const appo_routes = require('./routes/appo.routes');
const product_routes = require('./routes/product.routes');

const errorMiddleware = require('./middlewares/error.middleware');

//middleware
app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

//mongodb connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.log(err));

//routes
app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api', (req, res) => res.send('API is working!'));

app.use('/api/auth', auth_routes);
app.use('/api/user/addresses', address_routes);
app.use('/api/article', article_routes);
app.use('/api/appointment', appo_routes);
app.use('/api/products', product_routes);

//error handling middleware
app.use(errorMiddleware);

app.listen(port, () => console.log(`Server running on port ${port}`));
