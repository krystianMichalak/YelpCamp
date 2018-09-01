var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    flash = require("connect-flash"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds"),
    clearDB = require("./clear");
    
//requring routes
var commentRoutes = require("./routes/comments"),
    campgroundsRouts = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

//seedDB(); //seeds the database with some initial data
//clearDB(); //clears the database

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp"

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASEURL, {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:"Linia tekstu sluzaca do szyfrowania sesji",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundsRouts);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp Server Has Started!");
});
