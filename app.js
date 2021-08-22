const express = require('express')();
const {routes} = require('./config/routes');
express.use(routes);

const PORT = process.env.PORT;
express.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})