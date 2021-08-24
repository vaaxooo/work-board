const express = require('express');
const handlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const hbs = require('hbs');

const {routes} = require('./config/routes');

const app = express();

hbs.reg;
app.engine(
    'hbs',
    handlebars({
        layoutsDir: "views/layouts",
        defaultLayout: 'app',
        extname: "hbs"
    })
);

hbs.registerPartials("./views/components");
app.set('views', './views/pages')
app.set('view engine', 'hbs')
app.use(express.static('./public'));

app.use(routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});