'use strict'

const express = require('express')();
const cors = require('cors');
const {routes} = require('./config/routes');

express.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))
express.use(routes);
express.set('view cache', true);

const PORT = process.env.PORT || 3002;
express.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})