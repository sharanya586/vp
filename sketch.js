//Create variables here



var database;
var foods;

var gameState;
var lastFed;
var foodObject;


function preload() {
  //load images here
  dogImage = loadImage("images/Dog.png");
  happyDog = loadImage("images/happy dog.png");
  milkBottle = loadImage("images/Milk.png")

  bedroomImage = loadImage("images/Bed Room.png");
  washroomImage = loadImage("images/Wash Room.png");
  garderImage = loadImage("images/Garden.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();

  dog = createSprite(250, 250, 20, 20);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  addFood = createButton('Add Food');
  addFood.position(100, 50)
  addFood.mousePressed(AddFood)

  feedDog = createButton('Feed Dog');
  feedDog.position(200, 50)
  feedDog.mousePressed(FeedDog)

  foodObject = new Food();
  database.ref('Food').on("value", readFood)

  database.ref('FeedTime').on("value", function (data) {
    lastfed = data.val();
  })

  database.ref('gameState').on("value", function (data) {
    gameState = data.val();
  })

}


function draw() {

  background(46, 139, 87)
  drawSprites();

  fill("white")
  text("Food Remaining : " + foods, 250, 50)
  //add styles here



  currentTime = hour();
  console.log(currentTime);



  if (currentTime == lastFed + 1) {
    update("playing");
    foodObject.garden();
  }
  else if (currentTime == lastFed + 2) {
    update("bedroom");
    foodObject.bedroom();
  }
  else if (currentTime > lastFed + 2 && currentTime <= lastFed + 4) {
    update("washroom");
    foodObject.washroom();
  }
  else {
    update("hungry")
    foodObject.display();
  }


  /*if(keyWentDown(UP_ARROW)){
    foods--;
    writeFood();
  }*/

}

function update(x) {
  database.ref('/').set({
    gameState: x,
  })
}

function readFood(data) {
  foods = data.val();
}

function writeFood() {
  database.ref('/').update({
    Food: foods,
  })
}

function AddFood() {
  foods++;
  database.ref('/').update({
    Food: foods,
  })
}

function FeedDog() {
  dog.addImage(happyDog);
  foods--;
  database.ref('/').update({
    Food: foods,
    FeedTime: currentTime,
  })
}