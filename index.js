const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const {seuqelizeCon} = require('./config/dbConfig');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
// const { User}= require('./models/UserModel');
const {Task}=require("./models/TaskModel")
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.render('tasks/dashboard', { title: 'Dashboard' });
});

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({db:seuqelizeCon })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

app.use('/auth', authRoutes);
app.use('/', taskRoutes);

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

seuqelizeCon.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});
