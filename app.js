const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const sequelize = require('./util/database');
const relationShip = require('./models/RelationShips');

const homeRoute = require('./routes/homeRoute');
const categoryRoute = require('./routes/categoryRoute');
const publisherRoute = require('./routes/publisherRoute');
const auhorRoute = require('./routes/authorRoute');
const bookRoute = require('./routes/bookRoute');

const errorController = require('./controllers/ErrorController');

const selectHelper = require('./util/selectHelper');

const app = express();

//Handlebars
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

//Body parser
app.use(express.urlencoded({extended: false}));

//Public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images',express.static(path.join(__dirname, 'images')));

//Multer
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },filename: (req, file, cb) => {
        cb(null, `${uuidv4()}-${file.originalname}`); //uuid for unique id
    }
});

app.use(multer({storage: imageStorage}).single('Image'));

//Rutas
app.use(homeRoute);
app.use(categoryRoute);
app.use(publisherRoute);
app.use(auhorRoute);
app.use(bookRoute);

app.use(errorController.get404);

//Sequelize

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
    
}).catch(err => {
    console.log(err);
});

