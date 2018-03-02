$( document ).ready(function() {
    
    var animals = ["Dog", "Cat", "Horses", "Cows", "Deer", "Bear", "Moose", "Shark", "Whales", "Seals"];
    
    //Displays all Gif Buttons up top
    function displayGifButtons(){
        $("#myButtons").empty(); 
        for (var i = 0; i < animals.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("animal");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", animals[i]);
            gifButton.text(animals[i]);
            $("#myButtons").append(gifButton);
        }
    }
    
    //Adds New Button
    function addNewButton(){
        $("#addGif").on("click", function(){
        var animal = $("#animal-input").val().trim();
        if (animal == ""){
          return false; 
        }
        animals.push(animal);
    
        displayGifButtons();
        return false;
        });
    }
    
    //Removes Last Button
    function removeLastButton(){
        $("removeGif").on("click", function(){
        animals.pop(animal);
        displayGifButtons();
        return false;
        });
    }
    //Gifs & API
    function displayGifs(){
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=G91eYzmzipgfpHqVDZAJzEMjBYf68hXh&q="+ animal + "&limit=10&offset=0&rating=PG-13&lang=en";
        console.log(queryURL); 
        
        //API Call
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response); 
            $("#gifsView").empty(); 
            var results = response.data; 
            if (results == ""){
              alert("There isn't a gif for this selected button");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); 
                gifDiv.addClass("gifDiv");
                
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
                gifImage.attr("data-state", "still"); 
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    
    displayGifButtons(); 
    addNewButton();
    removeLastButton();
    
    $(document).on("click", ".animal", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });
