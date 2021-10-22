audio= "";
st1= "";
object = [];
function preload(){
    audio = loadSound('MV27TES-alarm.mp3');
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "STATUS: Detecting Object";
}

function modelLoaded(){
    console.log("Model Loaded");
    st1 = true;
    objectDetector.detect(video , gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        object = results;
    }
}

function draw(){
    image(video , 0, 0, 380, 380);
 
    if(status!= ""){
        for(i = 0;i<object.length;i++){
    document.getElementById("status").innerHTML = "Status:objectdetected";
    
     
    fill('#FF0000');
    percent = floor(object[i].confidence * 100);
    text( object[i].label+"  "+ percent+ "%", object[i].x, object[i].y );
    nofill();
    stroke(r,g,b);
    rect(object[i].x , object[i].y, object[i].width, object[i].height);
     
        } 
    } else{
        audio.play('MV27TES-alarm.mp3');
        audio.volume(1);
        audio.rate(1);
    }
   
}