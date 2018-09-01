var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");
    
var data = [
    {   name: "Yellow Lake",
        image: "https://farm8.staticflickr.com/7179/6927088769_cc14a7c68e.jpg",
        description: "Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula. Ut molestie a, ultricies porta urna. Vestibulum commodo volutpat a, convallis ac, laoreet enim. Phasellus fermentum in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi."
    },
    {
        name: "Rocky Summit",
        image: "http://farm5.staticflickr.com/4100/4798314980_bc31231984.jpg",
        description: "Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula. Ut molestie a, ultricies porta urna. Vestibulum commodo volutpat a, convallis ac, laoreet enim. Phasellus fermentum in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi."
    },
    {
        name: "Ice Crown",
        image: "https://farm6.staticflickr.com/5098/5496185186_d7d7fed22a.jpg",
        description: "Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula. Ut molestie a, ultricies porta urna. Vestibulum commodo volutpat a, convallis ac, laoreet enim. Phasellus fermentum in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi."
    },
    {
        name: "Black Creek",
        image: "https://farm4.staticflickr.com/3742/10759552364_a796a5560a.jpg",
        description: "Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula. Ut molestie a, ultricies porta urna. Vestibulum commodo volutpat a, convallis ac, laoreet enim. Phasellus fermentum in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi."
    }
];

function seedDB(){
    
    //Remove all campgrounds
    Campground.remove({}, function (err) {
        if(err) {
            console.log(err);
        } else {
            //Add a few campgrounds
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground){
                    if(err) {
                        console.log(err)
                    } else {
                        //Create a comment
                        Comment.create({
                            text: "This place is great, but i wish there was internet",
                            author: "Mud"
                        }, function(err, comment) {
                            if(err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                            }
                        });
                    }
                });
            });
            console.log("database set!");
        }
    });
}

module.exports = seedDB;

/*
https://farm8.staticflickr.com/7179/6927088769_cc14a7c68e.jpg
http://farm5.staticflickr.com/4100/4798314980_bc31231984.jpg
https://farm6.staticflickr.com/5098/5496185186_d7d7fed22a.jpg
https://farm4.staticflickr.com/3742/10759552364_a796a5560a.jpg
https://farm7.staticflickr.com/6067/6082139335_1ddf1b47c6.jpg
https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg
https://farm3.staticflickr.com/2457/4003707467_a5edf1fb9e.jpg
https://farm5.staticflickr.com/4079/4805487492_618e66b63b.jpg
https://farm3.staticflickr.com/2765/4240509073_d34393d09d.jpg
https://farm5.staticflickr.com/4152/5006674791_e6dc0f60ed.jpg
https://farm9.staticflickr.com/8142/29210120670_23f4b854a8.jpg
https://farm9.staticflickr.com/8250/29419072551_4a52acfdaa.jpg
*/