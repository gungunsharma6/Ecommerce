const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');
const methodOverride = require('method-override');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/User');
const session = require('express-session'); // Add this line to import express-session

// Database connection
mongoose.set('strictQuery', true); // Version 7 ki vajah se
mongoose.connect('mongodb://127.0.0.1:27017/gungun') // Returns a promise
    .then(() => {
        console.log("DB CONNECTED");
    })
    .catch((err) => {
        console.log("Error in DB", err);
    });

// Setting templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Setting static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // Body parsing middleware
app.use(methodOverride('_method')); // Method override

// Express session middleware setup
app.use(session({
    secret: 'your_secret_key', // Change this to your actual secret key
    resave: false,
    saveUninitialized: false
}));

// Passport.js setup
passport.use(new localStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Using all the routes in order to verify the path and run the function
app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);

// Adding dummy data to the collection
// seedDB()

// Running on port
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server connected at port: ${PORT}`);
});
