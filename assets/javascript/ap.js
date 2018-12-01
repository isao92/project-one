$(document).ready(function () {

    var venueID = "";

    // Event handler for user clicking the select-artist button
    $("#select-artist").on("click", function (event) {
        // Preventing the button from trying to submit the form
        event.preventDefault();
        // Storing the artist name
        var inputArtist = $("#artist-input").val().trim();
        $("#new-artist-div").empty();
        // Running the getIdsFromKeyword function to extract id's
        getIdsFromKeyword(inputArtist);
        // search by music category
        searchCategory(inputArtist);
    });

    function searchCategory(artistName) {
        // storing the artist name
        var artist = artistName;
        // eventbrite query for address
        var queryURL = "https://www.eventbriteapi.com/v3/events/search/?q=" + artist + "&categories=103&sort_by=date&token=LZK5FF2X7F4CBKXH2PUW";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            //tracking if artist was found
            var foundArtist = false;
            var artistTracker = 0; //4 max

            //loop to search for keyword in 
            for (var i = 0; i < response.events.length; i++) {
                var description = response.events[i].description.text.toLowerCase();
                if (description.includes(artist.toLowerCase())) {


                    //create one row div per artist
                    var newDiv = $("<div>").addClass("row").attr("id", "number" + i);
                    $("#new-artist-div").append(newDiv);

                    //IF ARTIST WAS FOUND IN MUSIC CATEGORY
                    artistTracker++;

                    //just a response check
                    console.log("searchCategory response: ");
                    console.log(response.events[i]);
                    foundArtist = true;

                    //extract event id 
                    var getID = response.events[i].id;
                    console.log("searchCategory getid: " + getID);

                    // search by id and print address
                    searchbyID(getID, i);

                    //extract organizer id 
                    organizerID = response.events[i].organizer_id;
                    console.log("searchCategory organizer_id: " + organizerID);



                    //send id to function and display the address
                    console.log("sending " + organizerID + " to searchVenue: ");
                    searchVenue(organizerID);

                    // Constructing HTML containing the artist information
                    var artistName1 = $("<h1>").text(artistName);

                    // var startTime = $("<h3>").text("Event date and start time details in searchCategory: " + formattedEventDate);

                    // var endTime = $("<h3>").text("Event date and end time details: " + response.end.utc)
                    $("#artist-div").empty();
                    $("#artist-div").append(artistName1);

                    if (artistTracker > 4) {
                        console.log("more than 4");
                        break;
                    }

                } else if (foundArtist === false) {
                    //show Sorry message

                    //hide concert and merch divs if artist not found
                    console.log("No artist found in: " + response.events[i].name.text);
                }
            }

            //hide concert and merch divs if artist not found
            if (!foundArtist) {
                alert("No artist found!");
            }

        });
    }

    function searchbyID(getID, i) {

        // eventbrite query for address
        var queryURL = "https://www.eventbriteapi.com/v3/events/" + getID + "/?token=LZK5FF2X7F4CBKXH2PUW&expand=venue";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);
            //for loop that adds corresponding address to the corresponding event
            for (x = i; x < 10; x++) {


                //create one col div per div tag
                var newDiv = $("<div>").addClass("col-3").attr("id", "number1" + i);
                $("#number" + i).append(newDiv);

                //create one col div per div tag
                var newDiv = $("<div>").addClass("col-5").attr("id", "number2" + i);
                $("#number" + i).append(newDiv);

                //create one col div per div tag
                var newDiv = $("<div>").addClass("col-4").attr("id", "number3" + i);
                $("#number" + i).append(newDiv);

                //for date
                var eventDate = moment(response.start.local, "YYYY-MM-DDTHH:mm:ss");
                var formatDate = eventDate.format("LLLL");
                console.log(formatDate);
                $("#number1" + i).append(formatDate);

                //for address and description
                var description = (response.name.text);
                $("#number2" + i).append("<h5>" + description + "</h5>");
                var address1 = (response.venue.address.localized_address_display);
                $("#number2" + i).append("<p>Address: " + address1 + "</p>");
                

                //for image
                var artistImage = $("<img>").attr("src", response.logo.url);
                console.log(artistImage);
                $("#number3" + i).append(artistImage);


                break;
            }

        })
    }



    function getIdsFromKeyword(artist) {

        // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
        var queryURL = "https://www.eventbriteapi.com/v3/events/search/?q=" + artist + "&token=LZK5FF2X7F4CBKXH2PUW";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            // Printing the entire object to console
            console.log(response);


            // console.log(response.pagination);
            // console.log(response.events);
            // console.log(response.events[0].description);

            // Constructing HTML containing the artist information

            //  var description = $("<h2>").text("Description for event: " + response.events[0].name.text);

            //  var description1 = $("<img>").attr("src", response.events[0].logo.url);

            //Location ID Pull
            venueID = response.events[0].venue_id;
            console.log("bandsinTown venue_id: " + venueID);

            //extract organizer id
            organizerID = response.events[0].organizer_id;
            console.log("bandsinTown organizer_id: " + organizerID);

            //category id
            categoryID = response.events[0].category_id;
            console.log("bandsinTown category_id: " + categoryID)

            // searchVenue(organizerID);

            // Empty the contents of the artist-div, append the new artist content
            //  $("#artist-div").empty();
            //  $("#artist-div").append(description, description1);
        });
    }


    function searchVenue(organizerID) {

        // eventbrite query for address
        var queryURL = "https://www.eventbriteapi.com/v3/events/search/?token=LZK5FF2X7F4CBKXH2PUW&organizer.id=" + organizerID + "&expand=venue";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            // show organizer id being used
            // console.log("this is the organizerID inside searchVenue: " + organizerID);
            // Printing the entire object to console
            // console.log("Second log: ");
            // show by Venue
            // console.log(response);
            // reach the id to compare in an if



            var address1 = ("Address from searchVenue: " + response.events[0].venue.address.localized_address_display);
            // console.log(response);
            // $("#address-div").empty();
            // $("#address-div").append(address1);


            //show address
            var address = response.events[0].venue.address.localized_address_display;
            console.log("address variable in searchVenue: " + address);
            return address;

        });
    }



});



//get event date
// var randomDate = "02/23/1999";
// randomDate = moment("02/23/1999", "MM/DD/YYYY");
// var formattedRandomDate = randomDate.format("MM/DD/YYYY");

// Using scripts from moment.js write code below to complete each of the following.
// Console.log to confirm the code changes we made worked.

// 1 ...to convert the randomDate into three other date formats
// console.log(moment().format("DD/MM/YYYY"));
// console.log(moment().format("MM/DD/YYYY"));
// console.log(moment().format("DD/MM/YY"));