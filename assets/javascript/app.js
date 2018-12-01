function searchLastFM(artist) {

    var queryURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=1dcfb244939573ecb6439c31080d44c0&format=json";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var artBio = $("<p>").html(response.artist.bio.summary);
        var artImg = $("<img>").attr("src", response.artist.image[2]["#text"])
        artImg.attr("class", "art-pic");
        artBio.attr("class", "art-bio");
  
        // if(!response.artist.url) {
        //     alert("no url found");
       
        $(".img-bio").empty();
        $(".img-bio").append(artImg, artBio);      
    });
  }
  
  $("#select-artist").on("click", function (event) {   
    event.preventDefault();
    var inputArtist = $("#artist-input").val().trim();
    searchLastFM(inputArtist);
    // searchLastFM(inputArtist);
  });