const express = require('express')
const {engine} = require('express-handlebars')
const morgan = require('morgan')
const router = require('./resources/routers/index')
const moment = require('moment');
require('moment/locale/vi');
require('moment-duration-format'); 
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const port = process.env.PORT || 3000
const auth = require('./resources/passports/passports')
const db = require('./config/db/connectDB.js')
require('dotenv').config()
const cors = require("cors");

const app = express()

app.use(cors({
  origin: "http://localhost:5000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true,
}))
app.use(express.json())
app.engine('hbs',engine({
    extname : '.hbs',
}))
app.set('view engine','hbs')
app.set('views','./resources/views')

db.connect()
auth(app)
router(app)

app.listen(port, () => {
    console.log('Server running!...')
})