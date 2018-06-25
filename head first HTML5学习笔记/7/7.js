
// var selectObj = document.getElementById("backgroundColor");
// var index = selectObj.selectedIndex;
// var bgColor = selectObj[index].value;

// var selectObj = document.getElementById("shape");
// var index = selectObj.selectedIndex;
// var shape = selectObj[index].value;

//  var selectObj = document.getElementById("foregoundColor");
//  var index = selectObj.selectedIndex;
//  var fgColor = selectObj[index].value;

window.onload = function() {
    var button = document.getElementById('previewButton');
    button.onclick = previewHandler;
    // drawSmileyFace();
};


function previewHandler() {
    var canvas = document.getElementById('tshirtCanvas');
    var context = canvas.getContext("2d");
    fillBackgroundColor(canvas,context);

    var selectObj = document.getElementById("shape");
    var index = selectObj.selectedIndex;
    var shape = selectObj[index].value;

    if(shape === "squares") {
        for (let squares = 0; squares < 20; squares ++) {
            drawSquare(canvas,context);
        };
    } else if (shape === "Circles") {
        for (let circles = 0; circles < 20; circles ++) {
            drawCircle(canvas,context);
        }
    }

};

function drawSquare(canvas,context) {
    var w = Math.floor(Math.random() * 40);
    
    var x = Math.floor(Math.random() * canvas.width);

    var y = Math.floor(Math.random() * canvas.height);

    context.fillStyle = "lightblue";
    context.fillRect(x,y,w,w);
};

function fillBackgroundColor(convas,context) {
    var selectObj = document.getElementById("backgroundColor");
    var index = selectObj.selectedIndex;
    var bgColor = selectObj[index].value;
    
    context.fillStyle = bgColor;
    context.fillRect(0,0,600,200);

};

function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
};

function drawCircle(canvas,context) {
    var radius = Math.floor(Math.random() * 40);
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);

    context.beginPath();
    context.arc(x,y,radius,0,degreesToRadians(360), true);

    context.fillStyle = "lightblue";
    context.fill();

};

function updateTweets(tweets) {
    var tweetsSelection = document.getElementById('tweets');
    console.log(tweets);
    for (let i = 0; i< tweets.length; i++) {
        tweet = tweets[i];
        var option = document.createElement('option');
        option.text = tweets.text;
        option.value = tweets.text.replace("\"","'");

        tweetsSelection.option.add(option);
    };

    tweetsSelection.selectedIndex = 0;
}
