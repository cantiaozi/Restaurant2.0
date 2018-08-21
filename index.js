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
    console.log("id", id);
    this.id = id;
}
Worker.prototype.finishWorker = function() {}
 
function Waiter(name, pay, restaurant) {
    Worker.call(this, name, pay, restaurant);
}
Waiter.prototype.finishWorker = function(arg) {
    if(Array.isArray(arguments[0])) {
        console.log("记录菜品");
    } else {
        console.log("完成上菜")
    }
}

function Cook(name, pay, restaurant) {
    Worker.call(this,  name, pay, restaurant);
}
Cook.prototype.finishWorker = function(food) {

}

function Customer() {
    this.consumption = 0;
    this.food = [];
}
Customer.prototype.order = function(food, restaurant) {//food is array
    this.food = food;
    for(var i = 0; i < food.length; i++) {
        this.consumption += food[i].price;
    }
    restaurant.cash += this.consumption;
}
Customer.prototype.eat = function(food) {

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
// var newWorker = new Worker("bob", 10000, ifeRestaurant);
// ifeRestaurant.hire(newWorker);
// console.log("hire", ifeRestaurant.staff);
// ifeRestaurant.fire(newWorker);
// console.log("fire", ifeRestaurant.staff);
const workNames = ["jim", "bob", "tom", "alice", "lily"];
const workPays = [10000, 8000, 8000, 7000, 6000];
for(var i = 0; i < 5; i++) {
    if(i < 3) {
        ifeRestaurant.hire(new Cook(workNames[i], workPays[i], ifeRestaurant));
    } else {
        ifeRestaurant.hire(new Waiter(workNames[i], workPays[i], ifeRestaurant))
    }
}
console.log("hire", ifeRestaurant.staff)
ifeRestaurant.fire(ifeRestaurant.staff[2])
console.log("fire", ifeRestaurant.staff)