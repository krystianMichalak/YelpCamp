var Campground = require("./models/campground");

function clearDB() {
    Campground.remove({}, function (err) {
        if(err){
            console.log(err);
        } else {
            console.log("database cleared!")
        }
    });
}

module.exports = clearDB;