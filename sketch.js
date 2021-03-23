var ball;
var database,position

function setup(){
    database = firebase.database()
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //ref refers to any of the nodes in the database.
    //3 types of nodes - ball,position and X&Y
    //.ON helps to read a value on a continous basis

    //var ballPosition = database.ref('ball/position')
    //ballPosition.on("value",readPosition)
    database.ref('ball/position').on("value",(data)=>{
        position = data.val()
        ball.x = position.x
        ball.y = position.y
    })
}

function draw(){
    background("purple");
    if(position!==undefined) {

    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }

    drawSprites();
    }
}

function writePosition(x,y){
   database.ref('ball/position').set({
        x:position.x+x,
        y:position.y+y
    })
}

function readPosition(data){
    position = data.val()
    ball.x = position.x
    ball.y = position.y
}