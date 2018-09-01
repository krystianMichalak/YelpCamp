var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX - show all campgrounds
router.get("/",function(req, res) {
    //get all camprounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn,function(req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var author = { 
        id: req.user._id,
        username: req.user.username
    };
    var desc = req.body.description;
    var newCampground = { name: name, price: price, image: image, author: author, description: desc };
    
    Campground.create(newCampground , function(err, campground) {
            if(err) {
                console.log(err);
                req.flash("error", "Cannot add a new campground. Please try again later");
            } else {
                res.redirect("/campgrounds");
            }
    });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn,function(req, res) {
    res.render("campgrounds/new");
});

//SHOW - show more info about one campground
router.get("/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec( function(err, foundCampground) {
        if(err) {
            console.log(err);
            req.flash("error", "Campground not found");
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT - show form to edit/update camprgound
router.get("/:id/edit", middleware.checkCampgroundOwner, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            req.flash("error", "Campground not found");
            res.redirect("back");
        } else {
            res.render("campgrounds/edit",{campground: campground});
        }
    });
});

//UPDATE - make changes to campground in mongoDB
router.put("/:id", middleware.checkCampgroundOwner, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if(err) {
            console.log(err);
            req.flash("error", "Campground not found");
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

//DESTROY - delete campground from mongoDB
router.delete("/:id", middleware.checkCampgroundOwner, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
       if(err) {
           console.log(err);
           req.flash("error", "Campground not found or couldnt be removed. Pleaes try again later.");
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds");
       }
    });
});

module.exports = router;