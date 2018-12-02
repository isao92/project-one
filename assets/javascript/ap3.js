$(document).ready(function () {

  // Parse the response and build an HTML table to display search results
  // End _cb_findItemsByKeywords() function
  // Construct the request
  // Replace MyAppID with your Production AppID 
  function searchLol(inputArtist) {

    var corsURL = "https://cors-anywhere.herokuapp.com/";
    var ebayUrl = "http://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=FahadAls-ucsdboot-PRD-8c2330161-309d8a4d&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&callback=_cb_findItemsByKeywords&REST-PAYLOAD&keywords=" + inputArtist + "&paginationInput.entriesPerPage=10";
    var queryURL = corsURL + ebayUrl;
    $.ajax({
      url: queryURL,
      method: "GET",
      contentType: "application/json",


    }).then(function (response) {
      var newResponse = response.substr(28).slice(0, -1);
      var newerResponse = JSON.parse(newResponse);
      console.log(newerResponse);

      //retrieves item title from ebay api and groups it with other properties requested from same item
      for (var i = 0; i < 4; i++) {
        var div = $("<div>").addClass("col-md-3 merch-items");
        var itemTitle = $("<p>").text(newerResponse.findItemsByKeywordsResponse[0].searchResult[0].item[i].title).addClass("merch-title");
          var itemImage = $("<img>").attr("src", newerResponse.findItemsByKeywordsResponse[0].searchResult[0].item[i].galleryURL).addClass("merch-image");
          
          var itemPrice = $("<p>").text("$" + newerResponse.findItemsByKeywordsResponse[0].searchResult[0].item[i].sellingStatus[0].currentPrice[0].__value__ + " USD").addClass("merch-price");
        
        var itemGoto = $("<a>").attr("href", newerResponse.findItemsByKeywordsResponse[0].searchResult[0].item[i].viewItemURL).text("Buy on eBay").addClass("merch-link");
        // removed this because some items did not have this object property and was returning an undefined error // var itemOriginalPrice = $("<p>").text("Retail Price: " + newerResponse.findItemsByKeywordsResponse[0].searchResult[0].item[i].discountPriceInfo[0].originalRetailPrice[0].__value__ + " USD");
        div.append(itemTitle, itemImage, itemPrice, itemGoto);
        $("#art-div").append(div);

      };

      //retrieves item image from ebay api and groups it with other properties requested from same item
      // for (var i = 0; i < 4; i++) {
      //   var div = $("<div>").addClass("col-md-3");

        // removed this because some items did not have this object property and was returning an undefined error // var itemOriginalPrice = $("<p>").text("Retail Price: " + newerResponse.findItemsByKeywordsResponse[0].searchResult[0].item[i].discountPriceInfo[0].originalRetailPrice[0].__value__ + " USD");
      //   div.append(itemImage);
      //   $("#art-div").append(div);

      // }

      //retrieves item link from ebay api and groups it with other properties requested from same item
      // for (var i = 0; i < 4; i++) {
      //   var div = $("<div>").addClass("col-md-3");

        // removed this because some items did not have this object property and was returning an undefined error // var itemOriginalPrice = $("<p>").text("Retail Price: " + newerResponse.findItemsByKeywordsResponse[0].searchResult[0].item[i].discountPriceInfo[0].originalRetailPrice[0].__value__ + " USD");
      //   div.append(itemGoto);
      //   $("#art-div").append(div);

      // }



      //retrieves item price ("+tax" tag appended) from ebay api and groups it with other properties requested from same item
      // for (var i = 0; i < 4; i++) {
      //   var div = $("<div>").addClass("col-md-3");
        // <br> variable just incase we need space var lineBreak = $("<p>").append("<br>");
        // removed this because some items did not have this object property and was returning an undefined error // var itemOriginalPrice = $("<p>").text("Retail Price: " + newerResponse.findItemsByKeywordsResponse[0].searchResult[0].item[i].discountPriceInfo[0].originalRetailPrice[0].__value__ + " USD");
  //       itemPrice.append(itemTax);
  //       div.append(itemPrice);
  //       $("#art-div").append(div);

  //     }

    });

  };
  $("#select-artist").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    $("#art-div").empty();
    // Storing the artist name
    var artistA = $("#artist-input").val().trim();
    var inputArtist = artistA.toString();
    searchLol(inputArtist)
  
  })





});