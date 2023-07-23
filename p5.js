var ball_x, ball_dx, ball_y, ball_dy, ball_radius;
var paddle_x, paddle_y, paddle_width, paddle_height, paddle_dx;

var brickRows = 5,brickColumns = 6,brickWidth = 75, brickHeight = 20, brickPadding = 20, brickOffsetLeft = 15, brickOffsetTop = 10;

var bricks = [];
var score = 0;
var lives;


function setup() {
  createCanvas(600,600);
  
  ball_x = width / 2;
  ball_dx = 3;
  
  ball_y =  height / 2;
  ball_dy = 3;
  
  ball_radius = 25;
  
  paddle_width = 90;
  paddle_height = 15;
  paddle_x = (width / 2) - (paddle_width / 2);
  paddle_y = height - 30;
  
  paddle_dx = 3;
  
  lives = 3;
  
  create_grid();
}


function show_grid() {
  
  for(var c=0; c<brickColumns; c++){
    for(var r=0; r<brickRows; r++ ){
        
          const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
          const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
      
        if(bricks[c][r].hidden == 0){

          fill("black");
          rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
        }
      else{
        fill("#D9D9D9");
        rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
      }
    }
  }
  
}

function hitting() {
  let radiusComp = ball_radius/sqrt(2);
  for(var c=0; c<brickColumns; c++){
    for(var r=0; r<brickRows; r++ ){
        
        if(bricks[c][r].hidden == 0){
          let x = bricks[c][r].x , y = bricks[c][r].y;
          if((ball_y>=y-ball_radius) && (ball_y<=y+brickWidth))
          {
              if((ball_x>x-radiusComp) && (ball_x<x+brickWidth+radiusComp))
                {
                    ball_dy = -ball_dy;
                    bricks[c][r].hidden = 1;
                    score = score+1;
                  break;
                }
              else if((ball_x===x-radiusComp) || (ball_x===x+brickWidth+radiusComp))
                {
                    ball_dy = -ball_dy;
                    ball_dx = -ball_dx;
                    bricks[c][r].hidden = 1;
                    score = score+1;
                  break;
                }
              else if((ball_x<x-ball_radius) || (ball_x>x+brickWidth+ball_radius))
                {
                  continue;
                }
              else{
                 ball_dx= -ball_dx
                    bricks[c][r].hidden = 1;
                    score = score+1;
                break;
              }
          }
        }
    }
  }
}

function create_grid() {
  for(var c=0; c<brickColumns; c++) {
    bricks[c] = []
    for(var r=0; r<brickRows; r++) {
      bricks[c][r] ={x: 0, y: 0, hidden: 0}
    }
  }
  
}

function func()
{
  
  background('#D9D9D9');
  
  if(score===brickColumns*brickRows){
    clear();
    fill("red")
    text("Victory !!!",height/2,width/2)
    return 1;
  }
  if(ball_y+ball_radius>=height)
    {
      return 0;
    }
  
  show_grid();
  fill("black");
  circle(ball_x, ball_y, ball_radius)
  rect(paddle_x, paddle_y, paddle_width, paddle_height)
  
  ball_x = ball_x-ball_dx;
  
  if((ball_x<=ball_radius) || (width-ball_x<=ball_radius)){
    ball_dx = -ball_dx;
  }
  
  ball_y = ball_y-ball_dy;
  
  if((ball_y<=ball_radius)){
    ball_dy = -ball_dy;
  }
  
  
  if (keyIsDown(LEFT_ARROW)) {
     paddle_x = paddle_x - paddle_dx;
  }
   if (keyIsDown(RIGHT_ARROW)) {
     paddle_x = paddle_x + paddle_dx;
  }
  
  if((ball_x>=paddle_x-ball_radius) && (ball_x<=paddle_x+ball_radius+paddle_width))
    {
       if (paddle_y-ball_y<=ball_radius) {
      ball_dy = -ball_dy;
        }
    }
  hitting();
    
  fill("red")
  text("score: ",0,200);
  text(score,35,200);
  // return -1;
}
function draw() {
    if(lives===0)
      {
          clear();
    fill("red")
    text("Game Over !!!",height/2,width/2)
        return;
      }
      let x = func();
      if(x===0)
        {
          lives = lives-1;
          ball_dx = -1.1*ball_dx;
          ball_dy = -1.1*ball_dy;
          create_grid();
          ball_y = height/2;
          ball_x = width/2;
          paddle_x = (width / 2) - (paddle_width / 2);
          paddle_y = height - 30;
        }
}