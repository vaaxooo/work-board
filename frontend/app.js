const express = require('express');
const handlebars = require('express-handlebars');
const hbs = require('hbs');
const Handlebars = require('handlebars');

const {routes} = require('./config/routes');

const app = express();

hbs.registerPartials(__dirname + "/views/components/partials")
hbs.registerPartial("header", "./views/components/partials")
app.engine(
    'hbs',
    handlebars({
        layoutsDir: "views/layouts",
        defaultLayout: 'app',
        extname: "hbs"
    })
)

hbs.registerPartials("/partials");
app.set('views', './views/pages')
app.set('view engine', 'hbs')
app.set('view cache', true);
app.use(express.static('./public'));

app.use(routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on https://127.0.0.1:${PORT}`);
})