var dog, happyDog, database, foodS, foodCount
var dogImg, dogHappyImg;
var milk, milkImg;




function preload()
{
  dogImg = loadImage("sitting.jpg");
  dogHappyImg = loadImage("drinking.jpg");
  milkImg = loadImage("milk.jpg");
}

function setup() {
  database = firebase.database(); 

  createCanvas(500, 500);

  
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15

  milk = createSprite(140,435,10,10);
  milk.addImage(milkImg);
  milk.scale = 0.25;

   foodCount = database.ref("food");
   foodCount.on("value", readCount)
   foodCount.set(20);
}


function draw() {  
background("lightyellow")

if(foodS !== 0){
  if(keyWentDown(UP_ARROW)){
    dog.addImage(dogHappyImg);
    dog.scale = 0.9
  

   
  }

  if(keyWentUp(UP_ARROW)){
    writeCount(foodS);
    dog.addImage(dogImg);
    dog.scale = 0.2;

   
  }
}

if(foodS === 0){
  
  dog.addImage(dogImg);
  foodS = 20;

}



  drawSprites();
  textSize(17);

  fill("black");
  text("Long Press up arrow key to feed your pet Dog labro",50,50);
  fill("black");
  text("lab + hero = labro",30,100);
  fill("black");
  text("Milk Bottles Remaining  "+foodS,170,440);
}

function readCount(data)
{
  foodS = data.val();
}

function writeCount(x){

  if(x<=0){
    x = 0;
  }else{
    x=x-1
  }

  database.ref('/').update({
    food:x
  })
}





