var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

middlewareObj.checkCampgroundOwner = function (req, res, next) {
        if(req.isAuthenticated()) {
            Campground.findById(req.params.id, function(err, campground) {
                if(err) {
                    console.log(err);
                    req.flash("error", "Campground not found");
                    res.redirect("back");
                } else {
                    if(campground.author.id.equals(req.user._id)) {
                        return next();
                    } else {
                        req.flash("error", "You do not have permission to do that");
                        res.redirect("back");
                    }
                }
            });
        } else {
            req.flash("error", "You need to be logged in to do that");
            res.redirect("back");
        }
}

middlewareObj.checkCommentOwner = function (req, res, next) {
        if(req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, function(err, comment) {
                if(err) {
                    console.log(err);
                    req.flash("error", "Comment not found");
                    res.redirect("back");
                } else {
                    if(comment.author.id.equals(req.user._id)) {
                        return next();
                    } else {
                        req.flash("error", "You do not have permission to do that");
                        res.redirect("back");
                    }
                }
            });
        } else {
            req.flash("error", "You need to be logged in to do that");
            res.redirect("back");
        }
}

module.exports = middlewareObj;