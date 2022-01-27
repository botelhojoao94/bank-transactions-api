require('dotenv').config()
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const api = express();
const clientRouter = require('./Router/clientRouter')
const transactionRouter = require('./Router/transactionRouter')
const depositRouter = require('./Router/depositRouter')
const port = process.env.PORT || 3000;

api.use(cors());

api.use(bodyparser.urlencoded({
    extended: true
}));

api.use(bodyparser.json());

api.get('/', (req, res) => {
    res.send('Online API')
})

// -------------- ROUTES --------------
api.use('/', clientRouter, transactionRouter, depositRouter);


// -------------- LISTEN -------------

api.listen(port, () => {
    console.log(`Running API on port ${port}`)
})