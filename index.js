function Restaurant(obj) {
    this.cash = obj.cash;
    this.seats = obj.seats;
    this.staff = obj.staff;
}
Restaurant.prototype.hire = function(people) {
    this.staff.push(people);
}
Restaurant.prototype.fire = function(people) {
    for(var i = 0; i < this.staff.length; i++) {
        if(this.staff[i].id === people.id) {
            console.log("true", this.staff.slice(0, i), this.staff.slice(i+1))
            this.staff = this.staff.slice(0, i).concat(this.staff.slice(i+1)); 
        }
    }
}

function Worker(name, pay, restaurant) {
    this.name = name;
    this.pay = pay;
    var id = Math.floor(Math.random() * 100 + 1);
    var ids = [];
    for(var i = 0; i < restaurant.staff.length; i++) {
        ids.push(restaurant.staff[i].id)
    }
    while(ids.indexOf(id) > -1) {
        id = Math.floor(Math.random() * 100 + 1);
    }
    // console.log("id", id);
    this.id = id;
}
Worker.prototype.finishWorker = function() {}
 
var waiterSingleton = (function() {
    var instance = null;
    function Waiter(name, pay, restaurant) {
        Worker.call(this, name, pay, restaurant);
    }
    Waiter.prototype.finishWorker = function(arg) {
        if(Array.isArray(arguments[0])) {
            console.log("记录菜品", arg[0].name);
            return arg;
        } else {
            console.log("完成上菜")
        }
    }

    return function(name, pay, restaurant) {
        if(!instance) {
            instance = new Waiter(name, pay, restaurant)
        }
        return instance
    }
})()

var cookSingleton = (function() {
    var instance = null;
    function Cook(name, pay, restaurant) {
        Worker.call(this,  name, pay, restaurant);
    }
    Cook.prototype.finishWorker = function(food) {
        console.log("烧完菜" + food[0].name)
        return food;
    }

    return function(name, pay, restaurant) {
        if(!instance) {
            instance = new Cook(name, pay, restaurant)
        }
        return instance
    }
})()

function Customer() {
    this.consumption = 0;
    this.food = [];
}
Customer.prototype.order = function(restaurant, foodList) {
    var index =  Math.floor((Math.random() * 10));
    var cost = 0;
    this.food = [foodList[index]]
    for(let i = 0; i < this.food.length; i++) {
        this.consumption += this.food[i].price;
        cost += this.food[i].cost;
    }
    restaurant.cash += this.consumption - cost;
    console.log("customer order")
}
Customer.prototype.eat = function(food) {
    console.log("customer eat it up")
}
 
function foods(name, cost, price) {
    this.name = name;
    this.cost = cost;
    this.price = price;
}

//测试用例
var ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 20,
    staff: []
});
var foodList = [];
var foodsName = ["qingcai", "huanggua", "nangua", "niurou", "jirou", "paigu", "qiezi", "jiucai", "zhuti", "zhuyaozi"];
var foodsCost = [20, 20, 20, 30, 30, 30, 20, 20, 30, 30];
var foodsPrice = [30, 30, 30, 40, 40, 40, 30, 30, 40, 40];
for(let i = 0; i < 10; i++) {
    foodList.push(new foods(foodsName[i], foodsCost[i], foodsPrice[i]));
}
var customerList = [];
for(let i = 0; i < 8; i++) {
    customerList.push(new Customer());
}

var waiter = waiterSingleton("alice", 10000, ifeRestaurant);
var cook = cookSingleton("bob", 10000, ifeRestaurant);
ifeRestaurant.hire(waiter);
ifeRestaurant.hire(cook);

for(let i = 0; i < customerList.length; i++) {
    customerList[i].order(ifeRestaurant, foodList);
    var food = waiter.finishWorker(customerList[i].food);
    var cookedFood = cook.finishWorker(food);
    waiter.finishWorker();
    customerList[i].eat();
}
