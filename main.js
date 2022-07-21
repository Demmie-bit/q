status = "";
video = "";
object = [];

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: detecting Objects";
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Satus : Detecting Objects";
}
    

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(gotResult);
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status != ""){
        objectDetector.detect(gotResult);
    }
    
    for(i = 0; i < object.length; i++){
        document.getElementById("status").innerHTML = "Status : Objects Detected";
        document.getElementById("number_of_objects").innerHTML = "Number of object detected are : " + object.length;
    
        fill("#FF0000");
        percent = floor(object[i].confidence * 100);
        text(object[i].label + " " + percent + "% ", object[i].x + 15, object[i].y + 15);
        noFill();
        stroke("#FF0000");
        rect(object[i].x, object[i].y, object[i].width, object[i].height);
    }
}