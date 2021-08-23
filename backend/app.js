'use strict'

const express = require('express')();
const cors = require('cors');
const {routes} = require('./config/routes');

express.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))
express.use(routes);

const PORT = process.env.PORT;
express.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})