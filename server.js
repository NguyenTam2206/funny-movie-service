const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');
const session = require('express-session');

const authRoute = require('./routes/auth');
const movieRoute = require('./routes/movies');
const app = express();

// app middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
connectDB();
// app.use(session({
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.SESSION_SECRET
//   }));

// app routes
app.get('/', (req, res) => {
    return res.send("index page")
})
app.use('/auth', authRoute)
app.use('/movie', movieRoute)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    console.log(err);
    res.status(err.status || 500);
    res.json(err);
});

// app listen
app.listen(process.env.PORT, () => {
    console.log('Funny movie service is running...');
})