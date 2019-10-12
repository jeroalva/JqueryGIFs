var initialTags = ["Lion","cat","dog","horse","bull","cow"];
var searchValue = "";
var gifTerm = "";
var queryURL = "";
var gifResultURL;
var newHtmlElement;
var newFigElement;
var newCaptionElement;

function createButton(tag){
    var newButton = $("<button>");
    newButton.addClass("btn btn-primary ml-2 mt-2");
    newButton.text(tag);
    newButton.attr("data-value",tag);
    newButton.appendTo($("#buttons-col"));
}

for(i=0;i<initialTags.length;i++){
    createButton(initialTags[i]);
}

$("#searchSubmit").on("click",function(){
    event.preventDefault();
    var searchValue = $("#searchField").val();
    $("#searchField").val("");
    createButton(searchValue);
})

$(document.body).on("click","button",function(){
    if($(this).attr("data-value")!=undefined){
        gifTerm = $(this).attr("data-value");
        gifTerm = gifTerm.split(" ").join("+");
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifTerm + "&api_key=1Z2LDJcUvfiJbely9XEE26yKOEKf4I0V&limit=9&rating=pg-13";
        $.ajax({url: queryURL, method: "GET", dataType: "JSON"}).then(function(response) {
            for(i=0;i<response.data.length;i++){
                gifResultURL = response.data[i].images.original.url;
                gifResultURLStill = response.data[i].images.original_still.url
                gifResultRating = response.data[i].rating
                newHtmlElement = $("<img>");
                newHtmlElement.addClass("figure-img");
                newHtmlElement.attr("src",gifResultURLStill);
                newHtmlElement.attr("movingUrl",gifResultURL);
                newHtmlElement.attr("stillUrl",gifResultURLStill);
                newHtmlElement.attr("gifStatus",false);                newHtmlElement.attr("gifStatus",false);
                newHtmlElement.attr("gifRating",gifResultRating);
                newHtmlElement.attr("id",gifTerm + "-" + i);
                newFigElement = $("<figure>");
                newFigElement.addClass("figure");
                newCaptionElement = $("<figcaption>");
                newCaptionElement.addClass("figure-caption");
                newCaptionElement.text("Rating: " + gifResultRating);
                newHtmlElement.appendTo(newFigElement);
                newCaptionElement.appendTo(newFigElement);
                newFigElement.prependTo($("#gifCol"));
            }
          });
    }
});

$(document.body).on("click","img",function(){
    if($(this).attr("gifStatus")==="false"){
        console.log($(this).attr("src"))
        $(this).attr("src",$(this).attr("movingUrl"));
        console.log($(this).attr("src"))
        $(this).attr("gifStatus",true);
    }
    else if($(this).attr("gifStatus")==="true"){
        $(this).attr("src",$(this).attr("stillUrl"));
        $(this).attr("gifStatus",false);
    }
});