class Food {
    constructor() {
        this.lastFed;
        this.image = loadImage("images/Milk.png");
        this.foods = 0;
    }

    getFoodStock() {
        this.foods = foods;
    }
    updateFoodStock(x) {
        this.foods = x;
    }
    deductFoodStock() {
        if(this.foods>0){
            this.foods--;
        }
    }

    washroom(){
        background(washroomImage,250,250)
    }
    bedroom(){
        background(bedroomImage,250,250)
    }
    garden(){
        background(gardenImage,250,250)
    }

    display() {
        var x = 20;
        var y = 100;

        for (var i = 0; i <= foods; i++) {
            x = x + 20
            if (i % 10 === 0) {
                x = 20
                y = y + 50;
            }
            image(milkBottle, x, y, 40, 50)
        }

        if (lastFed < 12) {
            text("Last fed" + lastFed + "AM", 200, 350)

        }
        else if (lastFed == 12) {
            text("Last fed" + lastFed + "PM", 200, 350)

        }

        else if (lastFed > 12) {
            text("Last fed" + lastFed % 12 + "PM", 200, 350)

        }
    }
}