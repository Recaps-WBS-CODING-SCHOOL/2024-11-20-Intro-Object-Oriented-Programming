// Object Literal
// const marbleTrack = {
//   name: 'Marble Track',
//   price: 65.48,
//   url: 'marblemarb.le',
//   notes: {
//     color: '#13e087',
//   },
// };

// Access 'name' via dot notation
// console.log(marbleTrack.name)

// Access 'price' dynamically via bracket notation
// const myKey = 'price';
// console.log(marbleTrack[myKey])

// In JS you can change any property to any value, there is no type checking right away
// marbleTrack.price = 'hohoho';

// You can add new properties via dot notation as well
// marbleTrack.owner = 'Isaiah';

// You can add functions to objects too.
// They can work on the data stored in the object, accessing it via the this keyword
// marbleTrack.prepare = function () {
//   console.log(`This ${this.name} is about to be wrapped!`);
// };

// marbleTrack.prepare();

// Creating Objecs like this comes with many downsides. You can delegate object creation to special constructor functions.
// Note there is no 'return' here. If you include it, it would override the creted object again.
// function Gift(name, price, url) {
//   this.name = name;
//   this.price = price;
//   this.url = url;
// }

// The new keyword tells JS that this function is a spection constructor function and it creates our new object for us.
// const marbleTrack = new Gift('Marble Track', 42, 'marbel.com');

// Classes in JS are mostly 'syntactic sugar' upon constructor functions. They make working with typical Object Oriented Patterns like Inheritance much easier.
// Also some 'newer' additions like private properties are not available via plain constructor functions-
class Gift {
  // Private Property - only accessible within this class
  #price;

  // called with the 'new' keyword - creates a new instance, a new Gift Object
  constructor(name, price, url) {
    this.name = name;
    this.#price = price;
    this.url = url;
  }

  // special getter method to access the #price property from outside - it can do work on the existing data, like formatting...
  get price() {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(this.#price);
  }

  // special setter method - it performs some validation before setting the new value to the private property
  set price(value) {
    const newPrice = Number.parseFloat(value);
    if (Number.isNaN(newPrice)) throw new TypeError('Price must be a number');
    this.#price = newPrice;
  }

  // a method - this is a function that works on the data of some object it belongs to
  // returning 'this' enables method chaining
  prepare() {
    console.log(`This ${this.name} is about to be wrapped!`);
    return this;
  }

  wrap() {
    const paperAmount = this.url.length * this.name.length * (this.#price / 10);
    console.log(`Wrapping this ${this.name} in ${paperAmount}m² of paper!`);
    return this;
  }

  // you can use parameters on methods as well
  give(gifted) {
    console.log(`Giving ${this.name} to ${gifted}.`);
    return this;
  }

  // special method that overrides 'toString' inherited from the Object prototype - customizes the output, when a Gift object is turned to a string
  // another example would be 'toJSON'
  toString() {
    return `
    ${this.name}: Price: ${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(this.#price)}
    Found on: ${this.url}`;
  }
}

// instantiate a new Gift object
const drill = new Gift('Drill', 40, 'drills.com');

// calling methods on an object
// drill.prepare();
// drill.wrap();

// example of methid chaining on an Array
// [1, 2, 3, 4, 5].filter().map().join()

// method chaining with out Gift object
// drill.prepare().wrap().give('Isaiah');

// This line calls the 'set price(value)' method, performs validation and either throws an error or assigns a proper value to the otherwise private field '#price'
// drill.price = 234;

// Implicitly calls the 'toString' method
// console.log(`${drill}`);

// Example for inheritance
class ChrismasGift extends Gift {
  // some special field that exists on ChrismasGifts, but not on Gifts
  #due = new Date(new Date().getFullYear(), 10, 23);

  // calling the constructor with all arguments, that the Gift constructor needs, plus some more
  constructor(name, price, url, relativeToAssignTo) {
    // 'super()' is a special function, that calls the constructor of the base class (here Gift)
    super(name, price, url);

    // assigning the other properties that belong to ChrismasGifts only
    this.relativeToAssignTo = relativeToAssignTo;
  }

  // overriding a method from the base class to have some special behaviour
  give(gifted) {
    console.log(`HoHoHo from ${this.relativeToAssignTo} to ${gifted}`);
  }

  // an additional method, that only exists on ChrismasGifts
  getDue() {
    return new Intl.DateTimeFormat('de-DE').format(this.#due);
  }
}

const marbleTrack = new ChrismasGift('Marble Track', 42, 'marbel.com', 'Grandma');

marbleTrack.prepare().wrap().give('Isaiah');
console.log(marbleTrack.getDue());

const plainGiftObj = {
  name: 'Marble Track',
  price: 65.48,
  url: 'marblemarb.le',
};

// You can check, if an object belongs to a certain class
// All objects of a derived class (ChristmasGift) also belong to the base classes (Gift, Object)
console.log(marbleTrack instanceof ChrismasGift);
console.log(marbleTrack instanceof Gift);
console.log(plainGiftObj instanceof Gift);
