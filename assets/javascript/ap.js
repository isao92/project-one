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

    // searches only on music category
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
                var description = response.events[i].name.text.toLowerCase();
                if (description.includes(artist.toLowerCase())) {


                    //create one row div per artist
                    var newDiv = $("<div>").addClass("row mt-2 mb-2").attr("id", "number" + i);
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
                    console.log(response.events[i]);
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
        var queryURL = "https://www.eventbriteapi.com/v3/events/" + getID + "/?token=LZK5FF2X7F4CBKXH2PUW&expand=organizer,venue";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);
            //for loop that adds corresponding address to the corresponding event
            for (x = i; x < i+1; x++) {

                //avoid same col-3 inside col-3
                console.log("This is the i: " + i);

                // date
                var newDivDate = $("<div>").addClass("col-3").attr("id", "number1" + i);
                var tag1=("#number1" + i);
                if(tag1 == "#number1" + i && i > 9){
                    console.log("");
                }else{
                $("#number" + i).append(newDivDate);
                }

                // name
                var newDivName = $("<div>").addClass("col-5").attr("id", "number2" + i);
                tag1=("#number2" + i);
                if(tag1 == "#number2" + i && i > 9){
                    console.log("");
                }else{
                $("#number" + i).append(newDivName);
                }

                // image
                var newDivImg = $("<div>").addClass("col-4").attr("id", "number3" + i);
                tag1=("#number3" + i);
                if(tag1 == "#number3" + i && i > 9){
                    console.log("");
                }else{
                $("#number" + i).append(newDivImg);
                }

                //for date
                var eventDate = moment(response.start.local, "YYYY-MM-DDTHH:mm:ss");
                var formatDate = eventDate.format("LLLL");
                $("#number1" + i).append(formatDate);

                //for address and description
                var description = (response.name.text);
                $("#number2" + i).append("<h5>" + description + "</h5>");
                var address1 = (response.venue.address.localized_address_display);
                $("#number2" + i).append("<p>Address: " + address1 + "</p>");
                
                //for image
                var artistImage = $("<img>").attr("src", response.logo.url);
                $("#number3" + i).append(artistImage);
                break;
            }

        })
    }



    function getIdsFromKeyword(artist) {

        // Querying the getIdsFromKeyword api for the selected artist, the ?app_id parameter is required, but can equal anything
        var queryURL = "https://www.eventbriteapi.com/v3/events/search/?q=" + artist + "&token=LZK5FF2X7F4CBKXH2PUW";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            // Printing the entire object to console
            console.log(response);

            //Location ID Pull
            venueID = response.events[0].venue_id;
            console.log("getIdsFromKeyword venue_id: " + venueID);

            //extract organizer id
            organizerID = response.events[0].organizer_id;
            console.log("getIdsFromKeyword organizer_id: " + organizerID);

            //category id
            categoryID = response.events[0].category_id;
            console.log("getIdsFromKeyword category_id: " + categoryID)

            //ticket availability id
            ticketID = response.events[0].ticket_availability;
            console.log("getIdsFromKeyword ticket_availability: " + ticketID)
        });
    }



});

