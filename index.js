// adding the dependencies in our project
require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const layouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session)
const passport = require('passport')

const path = require('path')
const templatePath = path.join(__dirname, 'views')

const PORT = process.env.PORT || 2000

mongoose.connect("mongodb://localhost/Web-a-thon", 
{useNewUrlParser: true, useUnifiedTopology: true,})
.then(() => console.log("connection succesfull"))
.catch((err) => console.log(err));

const mongoStore = new MongoDbStore({
    mongooseConnection: mongoose.connection,
    collection: 'sessions'
})

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

const passportInit = require('./app/configuration/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

app.use(layouts)
app.set('views', templatePath)
app.set('view engine', 'ejs')

require('./routes/web')(app)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})