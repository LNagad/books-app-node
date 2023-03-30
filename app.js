const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const sequelize = require('./util/database');

const relationShip = require('./models/RelationShips');

const homeRoute = require('./routes/homeRoute');
const categoryRoute = require('./routes/categoryRoute');
const publisherRoute = require('./routes/publisherRoute');
const auhorRoute = require('./routes/authorRoute');
const bookRoute = require('./routes/bookRoute');

const errorController = require('./controllers/ErrorController');

const selectHelper = require('./util/selectHelper')


const app = express();

app.engine('hbs', engine({
    layoutsDir: 'views/layouts',
    defaultLayout: 'main-layout',
    extname: 'hbs',
    helpers: {
        compareSelectedValue: selectHelper.compareSelectedValue
    }
}));


app.set('view engine', 'hbs');
app.set('views', './views');


app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(homeRoute);
app.use(categoryRoute);
app.use(publisherRoute);
app.use(auhorRoute);
app.use(bookRoute);

app.use(errorController.get404);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
    
}).catch(err => {
    console.log(err);
});

