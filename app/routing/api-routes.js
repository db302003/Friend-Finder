var friends = require("../data/friends.js");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        console.log(req.body);

        // Take the result of the user's survey POST and parse it.
        var userData = req.body;
        var userScores = userData.scores;

        console.log(userScores); 

        //This is the variable will calculate the difference between the user's scores and the scores of each user in the database.
        var totalDifference = 0;

        //This is the loop through all the friend possibilties in the database.
        for (var i = 0; i < friends.length; i++) {

            console.log(friends[i]);
            totalDifference = 0;

            //Then we loop through all the scores of each friend.
            for (var j = 0; j < friends[i].scores[j]; j++) {

                //Then its calculated the difference between the scores and sum them into the totalDifference.
            totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[i]));


            //If the sum of differences is less than the differences of the current "best match".    
            if (totalDifference <= bestMatch.friendDifference) {

                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.friendDiffernce = totalDifference;
            }
        }
    }

       //This is the final user's data to the database, once the database will return that user's best friend.     
    friends.push(userData); 

    res.json(bestMatch);
});
}
