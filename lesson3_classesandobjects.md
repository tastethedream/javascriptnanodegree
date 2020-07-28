# Lesson 3: Classes and objects

## Section 1: Introduction
### Properties and methods
We've been using **properties** and **methods** all up to this point, and in the next section you'll bring your knowledge of object-oriented programming to another level of sophistication by creating **classes** (i.e., categories) of objects!

Since an object can represent *data* and *functionality*, we can use an object to express real-life things (i.e., someone or something) in code. You've seen a few one-off examples throughout the course, but now let's take a deeper dive into it!

Reflect
Find something around you and create an object of its properties and methods.
```
Your reflection: My laptop
{
color: black,
name: Lulu,
make: lenovo,
action: function(){
     console.log(this.name + 'will help Dawn take over the world!');
    }
{
```
### Object-Oriented Programming
To recap the above, objects in JavaScript can represent real-life things. That is, objects can have properties to represent *attributes* or *characteristics*, as well as methods to represent *actions* that can be performed. Using the analogy of spoken language, you can think of objects as *nouns*, such as a "dog" or a "car." Values of properties are *adjectives*, such as "blue." Methods, then, are the *verbs*, such as "bark" or "drive."

## Section 2:
### Constructor Functions

Previously, we have created objects using the object literal notation. Likewise, we can even write functions that return objects. There is yet another way for us to create objects, and it is the foundation of object-oriented JavaScript: the **constructor function**. We saw a bit of it back in Lesson 1 when invoking the `Object()` constructor function. Now, let's take a deeper dive into it!

To instantiate (i.e., create) a new object, we use the `new` operator to invoke the function:

The first thing to note above is the use of the `new `keyword. Second, note that the name of the constructor function, `SoftwareDeveloper(`), is written with the **first letter capitalized** to visually distinguish it from a regular function.

Keep in mind that even though the function's name starts with a capital, that doesn't *automatically* make this a constructor function (i.e., though developers name constructor functions in CamelCase by convention, it is not enforced by the language). What does make `SoftwareDeveloper() `a constructor function are:

#### The use of the `new` operator to invoke the function
#### How the function is coded internally (which we'll look at right now!)

### Constructor Functions: Structure and Syntax
This is what the internals of a constructor function looks like:
```
function SoftwareDeveloper() {
  this.favoriteLanguage = 'JavaScript';
}
```
This might seem a bit different than the functions you've written up to this point, so let's break it down!

First, rather than declaring local variables, constructor functions persist data with the `this` keyword. The above function will add a `favoriteLanguage` property to any object that it creates, and assigns it a default value of `'JavaScript'`. Don't worry too much about `this` in a constructor function for now; just know that this refers to the new object that was created by using the `new` keyword in front of the constructor function. We'll go into more detail about `this` soon!

One last thing that might seem unusual is that this function doesn't seem to return anything! Constructor functions in JavaScript should not have an explicit return value (i.e., there should not be `return` statement).

Great! Now that we've seen the structure and syntax of a constructor, how can we use it to create an object?

### Creating a New Object
As we've seen above, let's use the new operator to create a new object:

`let developer = new SoftwareDeveloper();`

We've saved the return value of this invocation to the variable `developer`. Let's execute `console.log(developer)`; to log this `SoftwareDeveloper `object to the console:

### image
(https://video.udacity-data.com/topher/2017/December/5a31c70b_l3-10-object-from-constructor-function/l3-10-object-from-constructor-function.png)
```
function SoftwareDeveloper() {
  this.favoriteLanguage = 'JavaScript';
}

let developer = new SoftwareDeveloper();

let otherDeveloper = {favoriteLanguage: 'JavaScript'};
```
### Creating Multiple Objects
What's more: we can even use the *same* constructor function to create as many objects as we'd like!

Let's invoke the same  `SoftwareDeveloper(`) constructor two more times to instantiate two additional objects: `engineer` and `programmer`.
```
let engineer = new SoftwareDeveloper();
let programmer = new SoftwareDeveloper();

console.log(engineer);
// SoftwareDeveloper { favoriteLanguage: 'JavaScript' }

console.log(programmer);
// SoftwareDeveloper { favoriteLanguage: 'JavaScript' }
```
### Constructor Functions Can Have Parameters
Just like regular functions, one benefit of using constructor functions is that they can also accept arguments. Let's update the constructor above to accept a single argument, and assign the `name` property to it:
```
function SoftwareDeveloper(name) {
  this.favoriteLanguage = 'JavaScript';
  this.name = name;
}
```
In the updated `SoftwareDeveloper()` function, whatever value is passed into the function will be the value of the object's `name` property. Let's check it out:
```
let instructor = new SoftwareDeveloper('Andrew');

console.log(instructor);
// SoftwareDeveloper { favoriteLanguage: 'JavaScript', name: 'Andrew' }
```
Great! And as we've seen above, we can create different objects using the same constructor. Let's call the same constructor function but pass a different argument this time:
```
let teacher = new SoftwareDeveloper('Richard');

console.log(teacher);
// SoftwareDeveloper { favoriteLanguage: 'JavaScript', name: 'Richard' }
```
Just to recap: above, we passed the string `'Richard'` into the `SoftwareDeveloper()` constructor function, then instantiated a new object. `'Richard'` then became the value of the name property in the `teacher` object.

### video example
```
function Hero(name, role) {
  this.name = name;
  this.role = role;

  this.introduce = function () {
    console.log(`My name is ${this.name} and I am a ${this.role}.`);
  };
}

let taylor = new Hero('Taylor', 'mother');

let riley = new Hero('Riley', 'coach');

taylor.name;
riley.role;

taylor.introduce();
riley.introduce();
```
### QUESTION 1 OF 4
Which of the following about constructor functions are true? Constructor functions (select all that apply)...

**must be invoked with new**

**are used to instantiate a new object**
### QUESTION 2 OF 4
What happens if a constructor function begins with a lower-case letter?
**nothing it will still work**

Capitalizing the first letter of a constructor function's name is just a naming convention. Though the first letter should be capitalized, inadvertently leaving it lower-cased still makes the constructor function (i.e., when invoked with the `new` operator, etc.).

### code question
```
/*

Now it's your turn to create a constructor function. Declare a
`Sandwich` constructor function that takes three parameters:

1. `bread` (string) - the type of bread for the sandwich (e.g. "Wheat")
2. `meat` (array) - the meats to put on the sandwich
   (e.g. `[]` for a vegetarian sandwich!)
3. `vegetables` (array) - the vegetables to include in the sandwich

*/

function Sandwich(bread, meat, vegetables){
    this.bread = bread;
    this.meat = meat;
    this.vegetables =vegetables;
    
}
```
###  Omitting the new Operator 
What happens if you inadvertently invoke a constructor function without using the `new` operator?
```
function SoftwareDeveloper(name) {
   this.favoriteLanguage = 'JavaScript';
   this.name = name;
}

let coder = SoftwareDeveloper('David');

console.log(coder);
// undefined
```
What's going on? Without using the `new` operator, no object was created. The function was invoked just like any other regular function. Since the function doesn't return anything (except `undefined`, which all functions return by default), the `coder` variable ended up being assigned to `undefined`.

One more thing to note: since this function was invoked as a regular function, the value of `this` is also drastically different. Don't worry too much about this for now; we'll take a deep dive into the `this` keyword in the very next section!

### Seeing the Object's Constructor (instanceof)
What if we want to see if an object was created with a constructor function in the first place? We can use the `instanceof` (which returns a boolean) to give us some insight. Let's check it out!
```
function Developer(name) {
  this.name = name;
}

let dev = new Developer('Veronika');

typeof dev
// "object"

dev instanceof Developer;
// true
```
 ### `instanceof` and the Prototype Chain
 
Many times, however, it's a bit more complex: the `instanceof` operator actually tests whether or not that constructor appears in the **prototype chain** of an object. This means that we can't always check exactly which constructor created that object, but it does give us insight as to what other properties and methods an object may have access to.

### QUESTION 4 OF 4
Consider the following constructors:
```
function Finch(name) {
  this.kingdom = 'Animalia';
  this.name = name;
}

function Sparrow(name) {
  this.kingdom = 'Animalia';
  this.name = name;
}
Let's create an instance of each constructor:

const atticus = new Finch('Atticus');
const jack = new Sparrow('Jack');
```
What is the result when atticus instanceof Sparrow; is executed?

**false is returned. Not only is Sparrow not the atticus object's constructor function -- the Sparrow object is nowhere to be found in atticus's prototype chain.**

### Summary
JavaScript's class system is built directly on using functions and objects. Calling a constructor function with the `new` operator instantiates a new object. The same constructor function can be used to create different objects.

### Further Research
The new operator on MDN (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)
The instanceof operator on MDN(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)

## Section 3 The THIS Keyword

### `This` in Constructor Functions
In the previous section, we saw `this` right inside a constructor function. Here's another example:
```
function Cat(name) {
 this.name = name;
 this.sayName = function () {
   console.log(`Meow! My name is ${this.name}`);
 };
}

const bailey = new Cat('Bailey');
```
In the above `Cat()` constructor, the function that `sayName` references `this.name`. Back in Lesson 1, we saw `this` used in methods. But in `Cat()'`s case, what exactly does this refer to?

As it turns out, when invoking a constructor function with the `new` operator, `this` gets set to the newly-created object! Let's check out what the new `bailey` object looks like:
```
{
  name: 'Bailey',
  sayName: function () {
    console.log(`Meow! My name is ${this.name}`);
  }
}
```
In the snippet above, notice that `this` is outside a constructor function (i.e., in a method). As we saw in Lesson 1, when you say `this` in a method, what you're really saying is "this object" or "the object at hand." As a result, the `sayName()` method can use `this` to access the `name` property of that object! This makes the following method call possible:
```
bailey.sayName();

// 'Meow! My name is Bailey'
```


### When is this Assigned?
A common misconception is that `this` refers to the object where it is defined. This is not the case!

The value of `this` is actually not assigned to anything until an object calls the method where `this` is used. In other words, the value assigned to `this` is based on the object that invokes the method where `this` is defined. 
```
const dog = {
  bark: function () {
    console.log('Woof!');
  },
  barkTwice: function () {
    this.bark();
    this.bark();
  }
};
```
invoke the `dogs` methods
```
dog.bark();
// Woof!

dog.barkTwice();
// Woof!
// Woof!
```
We know that when we call `dog.bark()`; (or `dog.barkTwice()`;) a variable this gets set. Since this can access the object it was called on, `barkTwice` can use `this` to access the `dog` object, which contains the` bark` method.

But what if we just wrote `bark();` instead of `this.bark();` in `barkTwice?` The function would have first looked for a local variable named `bark` in the scope of `barkTwice`. If `bark` isn't found, it would have looked further up the scope chain.

To tie things all together: `this.bark()`; tells `barkTwice` to look at `dog` -- the object that the method was called on -- to find `bark`.

### QUESTION 1 OF 4
What is true about this? Select all that apply:

**Using `this`, methods can access and manipulate an object's properties**

**`this` is a reserved word in JavaScript

### QUESTION 2 OF 4
Consider the following constructor function, City:
```
function City(name, population) {
  this.name = name;
  this.population = population;

  this.identify = function () {
    console.log(`${this.name}'s population is ${this.population}.`);
  };
}
```
The following is executed:

`const sanFrancisco = new City('San Francisco', 870000);`
What is the value of this?

**The newly-created object, referenced by sanFrancisco**

### What Does this Get Set To?
At this point, we've seen `this` in many different contexts, such as within a **method**, or referenced by a **constructor function**. 

There are four ways to call functions, and each way sets `this` differently.

First, calling a **constructor function** with the `new` keyword sets this to a **newly-created object**. Recall that creating an instance of `Cat` earlier had set `this` to the new `bailey` object.

On the other hand, calling a function that belongs to an object (i.e., a **method**) sets `this` to the **object** itself. Recall that earlier, the `dog` object's `barkTwice()` method was able to access properties of `dog` itself.

Third, calling a function on its own (i.e., simply invoking a regular function) will set `this` to `window`, which is the global object if the host environment is the browser.
```
function funFunction() {
  return this;
}

funFunction();
// (returns the global object, `window`)
```
What Does this Get Set To?
At this point, we've seen this in many different contexts, such as within a method, or referenced by a constructor function. Let's now organize our thoughts and bring it all together!

There are four ways to call functions, and each way sets this differently.

First, calling a constructor function with the new keyword sets this to a newly-created object. Recall that creating an instance of Cat earlier had set this to the new bailey object.

On the other hand, calling a function that belongs to an object (i.e., a method) sets this to the object itself. Recall that earlier, the dog object's barkTwice() method was able to access properties of dog itself.

Third, calling a function on its own (i.e., simply invoking a regular function) will set this to window, which is the global object if the host environment is the browser.

function funFunction() {
  return this;
}

The fourth way to call functions allows us to set `this` ourselves! Don't worry about this approach for now; we'll take a deep dive in the very next section.

**call style**| `new`| method |function
--------------|------|--------|-------
**`this`**    | {}   | object ietself| global object
**Example**   | new Cat()| bailey.sayName()| introduce()

if a constructor function is called with the `new` operator, the value of `this` is set to a newly created object.
if a method id invoked on an object `this` is set to that object itself.
if a function is simply invoked, `this` is set to the global object `window`.

### QUESTION 3 OF 4
Consider the following object, building:
```
const building = {
  floors: 5,
  addFloor: function () {
    this.floors += 1;
  }
};

building.addFloor();
// ???
```
What is the value of this when building.addFloor(); is executed?
**building**

### QUESTION 4 OF 4
Consider the following:
```
function myFunction() {
  console.log("What is the value of 'this'?");
}

myFunction();
// ???
```
When myFunction(); is executed, what is the value of the this keyword?

When a function is invoked (i.e., as a function, rather than as a method or with the `new` operator), `this` gets set to the **lobal object: window**. 

### Summary
Functions, objects, and `this` are all interconnected. When invoking constructor functions with the `new` operator, a
 `this`variable is set to the newly-created object. 
 
 When invoking a method on an object, `this` is set to that object itself. 
 
 When invoking a function in a browser environment, `this` is set to `window`, otherwise known as the global object.

Along with all `this`, there is yet one more set of ways to invoke functions: with `apply()`, and with `call()`. Both methods share quite a few similarities, and they each allow us to specify how we want to set this. We'll take a look at each of them in detail next!

Further Research
The this operator on MDN(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

## Section 4 : setting our own `this`

### More Ways to Invoke Functions
We've seen various ways to invoke functions, each with their own implications regarding the value of `this`. There are yet two more ways to invoke a function: either using the `call()` or the `apply()` methods.

Each method can be directly invoked onto a function itself (after all, JavaScript functions are first-class functions and can have properties and methods). As a result, the receiving function will be invoked with a specified `thi`s value, as well as any arguments passed in.

Let's take a closer look at each of these methods, starting with call()!

### call()
`call()` is a method **directly** invoked onto a function. We first pass into it a single value to set as the value of `this`; then we pass in any of the receiving function's arguments one-by-one, separated by commas.

Consider the following function, multiply(), which simply returns the product of its two arguments:
```
function multiply(n1, n2) {
  return n1 * n2;
}
```
Let's invoke it in the console:
```
multiply(3, 4);

// 12
```
No surprises here! But now -- let's use the `call()` method to invoke the same function:
```
multiply.call(window, 3, 4);

// 12
```
We get the same result! How did this happen? We first invoke the `call()` method directly onto the `multiply()` function. Note that the `multiply` preceding `.call(window, 3, 4)` is not followed by any parentheses. `call(`) will be handling the invocation and the `multiply()` function's arguments itself!

After writing that part, it's time to pass in the arguments! For the first argument of the `call()` method, we pass in the value to be set as `this`, which is `window`. We then finish up by passing in the `multiply()` function's arguments individually, separated by commas.

Once `multiply.call(window, 3, 4)`; executes, the function will be invoked with the given value of `this`, and the result that we see is `12`. Outside of strict mode, both ways of invoking `multiply()` above are equivalent.

### functions attached to objects (methods)
Using `call` to invoke a method allows us to *borrow* a method from one object then use it for *another* object.
```
const mockingbird = {
  title: 'To Kill a Mockingbird',
  describe: function () {
    console.log(`${this.title} is a classic novel`);
  }
};
```
We can have `mockingbird` invoke its own `describe()` method:
```
mockingbird.describe();

// 'To Kill a Mockingbird is a classic novel'
```
Using `call()`, however, the following `pride` object can utilize mockingbird's `describe()` method:

```
const pride = {
  title: 'Pride and Prejudice'
};

mockingbird.describe.call(pride);
// 'Pride and Prejudice is a classic novel'
```

Let's break down what happened when `mockingbird.describe.call(pride)`; is executed!

First, the `call()` method is invoked onto `mockingbird.describe` (which points to a function). Then, the value of `this` is passed into the `call()` method: `pride`.

Since mockingbird's `describe()` method references `this.title`, we need to access the title property of the object that `this` refers to. But since we've set our own value of `this`, the value of `this.title` will be accessed from the `pride` object! As a result, `mockingbird.describe.call(pride)`; is executed, and we see `'Pride and Prejudice is a classic novel'` in the console.

`call()` is very effective if you're looking to invoke a function in the scope of the first argument passed into it. Likewise, we can leverage the `apply()` method to do the same, albeit with differences in how arguments are passed into it. 

### apply()
Just like `call()`, the `apply()` method is called on a function to not only invoke that function, but also to associate with it a specific value of `this`. However, rather than passing arguments one-by-one, separated by commas -- `apply()` takes the function's arguments in an array. Recall the `multiply()` function from earlier:
```
function multiply(n1, n2) {
  return n1 * n2;
}
```
We used `call()` and passed in arguments individually:
```
multiply.call(window, 3, 4);

// 12
```
Using `apply()`, however, we collect all of the `multiply()` function's arguments in an array! Then, we pass that entire array into `apply()`:
```
multiply.apply(window, [3, 4]);

// 12
```
Great! Note that the first argument in both `call()` and `apply()` is still **window**(i.e., the object to bind the value of this to).

Now what about invoking an object's method with `apply()`? Recall the previous mockingbird and pride objects:
```
const mockingbird = {
  title: 'To Kill a Mockingbird',
  describe: function () {
    console.log(`${this.title} is a classic novel`);
  }
};


const pride = {
  title: 'Pride and Prejudice'
};
```
Previously, we used `call(`) to allow the pride object to "borrow" mockingbird's `describe()` method:
```
mockingbird.describe.call(pride);

// 'Pride and Prejudice is a classic novel'
```
We can achieve the same result using `apply()`!
```
mockingbird.describe.apply(pride);

// 'Pride and Prejudice is a classic novel'
```
Note that the first argument passed into both `call()` and `apply()` is the same: `pride`. Since the `describe()` method doesn't take any arguments, the only difference between `mockingbird.describe.call(pride)`; and m`ockingbird.describe.apply(pride)`; is just the method! Both approaches produce the same result.

### Choosing One Method Over the Other
Both `call()` and `apply()` invoke a function in the scope of the first argument passed in them (i.e., the object to be the value of `this`). So when would you choose `call(`) over `apply()`, or vice versa?

`call()` may be limited if you don't know ahead of time the number of arguments that the function needs. In this case, `apply()` would be a better option, since it simply takes an array of arguments, then unpacks them to pass along to the function. Keep in mind that the unpacking comes at a minor performance cost, but it shouldn't be much of an issue.
```
const cat = {
  name: 'Bailey'
};

function sayHello(message) {
  console.log(`${message}, ${this.name}`);
}
//using `call`
sayHello.call(cat, 'Nice to see you');
//using `apply`
sayHello.apply(cat, ['Hello']);
```
### QUESTION 1 OF 5
Consider the following dave object, and the sayHello() function:
```
const dave = {
  name: 'Dave'
};

function sayHello(message) {
  console.log(`${message}, ${this.name}. You're looking well today.`);
}
```
Let's say you want the message 'Hello, Dave. You're looking well today.' printed to the console.

Which of the following expressions could you write to accomplish that?

The main question here is: how do we set this to the `dav`e object if `sayHello()` is a function (i.e., not a method)? We can use `apply` can do just that that! Keep in mind that `apply` takes in two arguments: the object that this should refer to, and an array of arguments meant to be passed into the function (i.e. `sayHello()`). As such `sayHello.apply(dave, ['Hello'])`; outputs the intended message: `'Hello, Dave. You're looking well today.'`

Note that we also could have used `call` to solve this quiz. The expression `sayHello.call(dave, 'Hello')`; produces the same message: `'Hello, Dave. You're looking well today.'`

### QUESTION 2 OF 5
Consider the following Andrew and Richard objects:
```
const Andrew = {
  name: 'Andrew',
  introduce: function () {
    console.log(`Hi, my name is ${this.name}!`);
  }
};
const Richard = {
  name: 'Richard',
  introduce: function () {
    console.log(`Hello there! I'm ${this.name}.`);
  }
};
```
When `Richard.introduce.call(Andrew)`; is executed, what is logged to the console?

First, we access the `Richard` object's introduce property with `Richard.introduce` (note the lack of parentheses). This returns a function. By invoking `.call(Andrew)` on that returned function, we are actually invoking the (returned) function's `introduce()` method -- but with this set to the `Andrew` object.

As a result, when `this.name` is called, the `Andrew` object's name is accessed; this outputs `'Hello there! I'm Andrew'` to the console.

Consider the following:
```
const andrew = {
  name: 'Andrew'
};

function introduce(language) {
  console.log(`I'm ${this.name} and my favorite programming language is ${language}.`);
}
```
Write an expression that uses the `call()` method to produce the message: `'I'm Andrew and my favorite programming language is JavaScript`.'

**introduce.call(andrew, 'JavaScript');**

### Callbacks and this
The value of `this` has some potential scope issues when callback functions are involved, and things can get a bit tricky.

### Saving this with an Anonymous Closure
Let's recap the issue at hand. Here's the `invoiceTwice(` function from the previous video, as well as the `dog` object:
```
function invokeTwice(cb) {
   cb();
   cb();
}

const dog = {
  age: 5,
  growOneYear: function () {
    this.age += 1;
  }
};
```
First, invoking `growOneYear()` works as expected, updating the value of the `dog` object's age property from 5 to 6:
```
dog.growOneYear();

dog.age; 
// 6
```
However, passing `dog.growOneYear` (a function) as an argument into `invokeTwice()` produces an odd result:
```
invokeTwice(dog.growOneYear);

dog.age;
// 6
```
You may have expected the value of the age property in dog to have increased to 8. Why did it remain 6?

As it turns out, `invokeTwice()` does indeed invoke `growOneYear` -- but it is invoked as a function rather than a method! Let's revisit the `this` grid from earlier:

**call style**| `new`| method |function
--------------|------|--------|-------
**`this`**    | {}   | object ietself| global object
**Example**   | new Cat()| bailey.sayName()| introduce()


If a constructor function is called with the `new` operator, the value of `this` is set to the newly-created object. If a method is invoked on an object, `this` is set to that object itself. And if a function is simply invoked, `this` is set to the global object: `window`.

### Saving this with an Anonymous Closure
Recall that simply invoking a normal function will set the value of `this` to the global object (i.e., `window`). This is an issue, because we want this to be the `dog` object!

So how can we make sure that this is preserved?

One way to resolve this issue is to use an anonymous closure to close over the `dog` object:
```
invokeTwice(function () { 
  dog.growOneYear(); 
});

dog.age;
// 7
```
Using this approach, invoking `invokeTwice(`) still sets the value of this to `window`. However, this has no effect on the closure; within the anonymous function, the `growOneYear()` method will still be directly called onto the `dog `object! As a result, the value of dog's age property increases from `5` to `7`.

### Saving this with bind()
Similar to `call()` and `apply()`, the `bind()` method allows us to directly define a value for `this`. `bind()` is a method that is also called _on_ a function, but unlike `call()` or `apply()`, which both invoke the function right away -- `bind() `returns a new function that, when called, has `this` set to the value we give it.
```
function invokeTwice(cb) {
   cb();
   cb();
}

const dog = {
  age: 5,
  growOneYear: function () {
    this.age += 1;
  }
};

const myGrow = dog.growOneYear.bind(dog);

dog.age;
// 7
```
### QUESTION 4 OF 5
What is true about bind()? Select all that apply:

**Under the hood, `bind()` returns a new function that can be called like a normal function (e.g., `myFunction()`), but inside of it, a method will be invoked method-style (e.g., `myObject.myMethod()`). This helps us when we see potential scope issues with this when passing callback functions.**

Consider the following:
```
const driver = {
  name: 'Danica',
  displayName: function () {
    console.log(`Name: ${this.name}`);
  }
};

const car = {
  name: 'Fusion'
};
```
Write an expression using `bind()` that allows us to "borrow" the `displayName()` method from driver for the `car` object to use. Note: The expression itself is sufficient (no need to save it to a variable).

**driver.displayName.bind(car);**

### Summary

JavaScript provides **three** methods that allow us to set the value of this for a given function:

* `call()` invokes the function and has arguments passed in individually, separated by **commas**.

* `apply()` is similar to `call()`; it invokes the function just the same, but arguments are passed in as an **array**.

* `bind()` returns a new function with this bound to a specific object, allowing us to call it as a regular function.

### Further Research
Kyle Simpson's You Don't Know (JS9https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes)
call() on MDN (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
apply() on MDN (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
bind() on MDN (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

## Section 5: Proptotypal Inheritance

### Adding Methods to the prototype

Recall that objects contain data (i.e., properties), as well as the means to manipulate that data (i.e., methods). Earlier in this Lesson, we simply added methods directly into the constructor function itself:
```
function Cat(name) {
 this.lives = 9;
 this.name = name;

 this.sayName = function () {
   console.log(`Meow! My name is ${this.name}`);
 };
}
```
This way, a `sayName` method gets added to all `Cat` objects by saving a function to the `sayNam`e attribute of newly-created `Cat` objects.

This works just fine, but what if we want to instantiate more and more `Cat` objects with this constructor? You'll create a new function every single time for that `Cat` object's `sayName`! What's more: if you ever want to make changes to the method, you'll have to update all objects *individually*. In this situation, it makes sense to have all objects created by the same `Cat` constructor function just share a single `sayName` method.

To save memory and keep things DRY, we can add methods to the constructor function's `prototype` property. The prototype is just an **object**, and all objects created by a constructor function keep a reference to the prototype. Those objects can even use the `prototype`'s properties *as their own*!

JavaScript leverages this secret link -- between an object and its prototype -- to implement **inheritance**.

### Image

https://video.udacity-data.com/topher/2017/December/5a31c70c_l3-64-prototype-chain-diagram/l3-64-prototype-chain-diagram.png

Recall that each function has a `prototype` property, which is really just an object. When this function is invoked as a constructor using the `new` operator, it creates and returns a new object. This object is secretly linked to its constructor's `prototype`, and this secret link allows the object to access the `prototype`'s properties and methods as if it were its own!

Since we know that the `prototype` property just points to a regular object, that object itself also has a secret link to *its* prototype. And *that* prototype object also has reference to its own prototype -- and so on. This is how the **prototype chain** is formed.

### Finding Properties and Methods on the Prototype Chain
Whether you're accessing a property (e.g., `bailey.lives`;) or invoking a method (e.g., `bailey.meow();`), the JavaScript interpreter looks for them along the prototype chain in a very particular order:

* First, the JavaScript engine will look at the object's own properties. This means that any properties and methods defined directly in the object itself will take precedence over any properties and methods elsewhere if their names are the same (similar to variable shadowing in the scope chain).

* If it doesn't find the property in question, it will then search the object's constructor's prototype for a match.
If the property doesn't exist in the prototype, the JavaScript engine will continue looking up the chain.

* At the very end of the chain is the `Object()` object, or the top-level parent. If the property still cannot be found, the property is undefined.

Previously, we simply defined methods directly in a constructor function itself. Let's see how things look if we defined methods in the constructor's `prototype` instead!
```

// function Dog(age, weight, name) {
//   this.age = age;
//   this.weight = weight;
//   this.name = name;
//   this.bark = function () {
//     console.log(`${this.name} says woof!`);
//   };
// }

function Dog(age, weight, name) {
  this.age = age;
  this.weight = weight;
  this.name = name;
}

Dog.prototype.bark = function () {
    console.log(`${this.name} says woof!`);
};

dog1 = new Dog(2, 60, 'Java');

dog2 = new Dog(4, 55, 'Jodi');

dog1.bark();

dog2.bark();
```
### QUESTION 1 OF 5
Let's say that we want to define a method that can be invoked on instances (objects) of the Dalmatian constructor function (we'll be instantiating at least 101 of them!).

Which of the preceding two approaches is optimal?



(B) is optimal, because the function that bark points to does not need to be recreated each time an instance of Dalmatian is created.


**While both approaches work just fine (i.e., any instances created by the constructor function will be able to invoke a bark() method), the second approach is more ideal. By adding methods to the prototype, memory is saved as more Dalmatian objects are instantiated. Along with being more efficient, we also don't have to update all objects individually should be decide to change a method.**

### Replacing the prototype Object

What happens if you completely replace a function's `prototype` object? How does this affect objects created by that function? Let's look at a simple `Hamster` constructor function and instantiate a few objects:
```
function Hamster() {
  this.hasFur = true;
}

let waffle = new Hamster();
let pancake = new Hamster();
```
First, note that even after we make the new objects, `waffle` and `pancake`, we can still add properties to `Hamster'`s prototype and it will still be able to access those new properties.
```
Hamster.prototype.eat = function () {
  console.log('Chomp chomp chomp!');
};

waffle.eat();
// 'Chomp chomp chomp!'

pancake.eat();
// 'Chomp chomp chomp!'
```
Now, let's replace `Hamster'`s `prototype` object with something else entirely:
```
Hamster.prototype = {
  isHungry: false,
  color: 'brown'
};
```
The previous objects don't have access to the updated prototype's properties; they just retain their secret link to the old prototype:
```
console.log(waffle.color);
// undefined

waffle.eat();
// 'Chomp chomp chomp!'

console.log(pancake.isHungry);
// undefined
```
As it turns out, any new `Hamster` objects created moving forward will use the updated prototype:
```
const muffin = new Hamster();

muffin.eat();
// TypeError: muffin.eat is not a function

console.log(muffin.isHungry);
// false

console.log(muffin.color);
// 'brown'
```
### Checking an Object's Properties
As we've just seen, if an object doesn't have a particular property of its own, it can access one somewhere along the prototype chain (assuming it exists, of course). With so many options, it can sometimes get tricky to tell just where a particular property is coming from! Here are a few useful methods to help you along the way.

**`hasOwnProperty()`**

`hasOwnProperty()` allows you to find the origin of a particular property. Upon passing in a string of the property name you're looking for, the method will return a **boolean** indicating whether or not the property belongs to the object itself (i.e., that property was not inherited). Consider the `Phone` constructor with a single property defined directly in the function, and another property on its `prototype` object:
```
function Phone() {
  this.operatingSystem = 'Android';
}

Phone.prototype.screenSize = 6;
```
Let's now create a new object, `myPhone`, and check whether `operatingSystem` is its own property, meaning that it was not inherited from its prototype (or somewhere else along the prototype chain):
```
const myPhone = new Phone();

const own = myPhone.hasOwnProperty('operatingSystem');

console.log(own);
// true
```
Indeed it returns true! What about the `screenSize` property, which exists on` Phone` objects' `prototype`?
```
const inherited = myPhone.hasOwnProperty('screenSize');

console.log(inherited);
// false
```
Using `hasOwnProperty()`, we gain insight a certain property's origins.

**`isPrototypeOf()`**

Objects also have access to the `isPrototypeOf()` method, which checks whether or not an object exists in another object's prototype chain. Using this method, you can confirm if a particular object serves as the prototype of another object. Check out the following `rodent` object:
```
const rodent = {
  favoriteFood: 'cheese',
  hasTail: true
};
```
Let's now build a `Mouse()` constructor function, and assign its `prototype` to `rodent`:
```
function Mouse() {
  this.favoriteFood = 'cheese';
}

Mouse.prototype = rodent;
```
If we create a new Mouse object, its prototype should be the rodent object. Let's confirm:
```
const ralph = new Mouse();

const result = rodent.isPrototypeOf(ralph);

console.log(result);
// true
```
Great! `isPrototypeOf()` is a great way to confirm if an object exists in another object's prototype chain.




### `Object.getPrototypeOf()`
`isPrototypeOf()` works well, but keep in mind that in order to use it, you must have that `prototype` object at hand in the first place! What if you're not sure what a certain object's prototype is? `Object.getPrototypeOf()` can help with just that!

Using the previous example, let's store the return value of `Object.getPrototypeOf()` in a variable, `myPrototype`, then check what it is:
```
const myPrototype = Object.getPrototypeOf(ralph);

console.log(myPrototype);
// { favoriteFood: 'cheese', hasTail: true }
```
Great! The `prototype` of `ralph` has the same properties as the result because they are the same object. `bject.getPrototypeOf()` is great for retrieving the prototype of a given object.

### The `constructor` Property

Each time an object is created, a special property is assigned to it under the hood: `constructor`. Accessing an object's constructor property returns a reference to the constructor function that created that object in the first place! Here's a simple `Longboard` constructor function. We'll also go ahead and make a new object, then save it to a `board `variable:
```
function Longboard() {
  this.material = 'bamboo';
}

const board = new Longboard();
```
If we access `board'`s `constructor` property, we should see the original constructor function itself:
```
console.log(board.constructor);

// function Longboard() {
//   this.material = 'bamboo';
// }
```
Excellent! Keep in mind that if an object was created using literal notation, its constructor is the built-in `Object()` constructor function!
```
const rodent = {
  favoriteFood: 'cheese',
  hasTail: true
};

console.log(rodent.constructor);
// function Object() { [native code] }
```
### QUESTION 2 OF 5
What is true about hasOwnProperty()? Select all that apply:

**It returns a boolean indicating whether the object has the specified property as its own property (i.e., the property isn't inherited)**

**`hasOwnProperty()` is invoked as a method onto an object**

`hasOwnProperty()` takes in a single argument (i.e. the property to be checked), and the method is invoked directly on an object.

### QUESTION 3 OF 5
What is true about isPrototypeOf() or getPrototypeOf()? Select all that apply:

**`isPrototypeOf()` checks whether or not an object exists in another object's prototype chain**

**`isPrototypeOf()` takes a single argument: an object whose prototype chain is to be searched**

**`getPrototypeOf()` returns the prototype of the object passed into it**

### QUESTION 4 OF 5
What is true about `constructor` property? Select all that apply:

**Accessing an object's `constructor` property returns a reference to the constructor function that created that object (instance)

**Every object has a `constructor` property**

**Objects created with literal notation are constructed with the `Object()` constructor function**

### QUESTION 5 OF 5
Let's say that we create the following object, capitals, using regular object literal notation:
```
const capitals = {
  California: 'Sacramento',
  Washington: 'Olympia',
  Oregon: 'Salem',
  Texas: 'Austin'
};
```
What is returned when Object.getPrototypeOf(capitals); is executed?

**A reference to Object()'s prototype**

This one may have been tricky! Keep in mind that since `capitals` was created with object literal notation, its `constructor` is the built-in `Object()` constructor function itself! As such, it maintains a reference to its constructor's `prototype`. That is,
```
Object.getPrototypeOf(capitals) === Object.prototype

// true
```
### Summary
Inheritance in JavaScript is when an object is based on another object. Inheritance allows us to reuse existing code, having objects take on properties of other objects.

When a function is called as a constructor using the `new` operator, the function creates and returns a new object. This object is secretly linked to its constructor's `prototype`, which is just another object. Using this secret link allows an object to access the `prototype'`s properties and methods as if it were its own. If JavaScript does not find a particular property within an object, it will keep looking up the prototype chain, eventually reaching `Object()` (top-level parent) if necessary.

We also looked at a few methods and properties that allow use to check the origins and references of objects and their prototypes, namely:

1. hasOwnProperty()
2. isPrototypeOf()
3. Object.getPrototypeOf()
4. constructor

### Further Research
Object Playground (http://www.objectplayground.com/)
hasOwnProperty() on MDN(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
isPrototypeOf() on MDN (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf)
Object.getPrototypeOf() on MDN (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)
.constructor on MDN (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)

## Lesson 7: Prototypal Inheritance: Subclasses

### Subclasses
One of the benefits of implementing inheritance is that it allows you to reuse existing code. By establishing inheritance, we can **subclass**, that is, have a **"child"** object take on most or all of a **"parent"** object's properties while retaining unique properties of its own.

Let's say we have a parent `Animal` object, which contains properties like `age` and `weight`. That same `Animal` object can also access methods like `eat` and `sleep`.

Now, let's also say that we want to create a `Cat` child object. Just like you can with other animals, you can also describe a cat by its age or weight, and you can also be certain that the cat eats and sleeps as well. When creating that `Cat` object, then, we can simply re-write and re-implement all those methods and properties from `Animal` -- or, we can save some time and prevent repeated code by having `Cat` inherit those existing properties and methods from `Animal`!

Not only can `Cat` take on properties and methods of `Animal`, we can also give Cat its own unique properties and methods as well! Perhaps a `cat` has a unique `lives` property of `9`, or it has a specialized `meow()` method that no `Animal` has.

By using prototypal inheritance, `Cat` only needs to implement `Cat`-specific functionality, and just reuse `Animal`'s existing functionality.

### Inheritance Via Prototypes

https://video.udacity-data.com/topher/2017/December/5a31c70c_l3-83-prototype-chain-diagram/l3-83-prototype-chain-diagram.png

When calling any property on any object, the JavaScript engine will first look for the property in the object itself (i.e., the object's *own*, non-inherited properties). If the property is not found, JavaScript will then look at the object's prototype. If the property still isn't found in the object's prototype, JavaScript will continue the search up the **prototype chain**.

Again, inheritance in JavaScript is all about setting up this chain!

### The Secret Link
As you know, an object's constructor function's prototype is first place searched when the JavaScript engine tries to access a property that doesn't exist in the object itself. Consider the following `bear` object with two properties, `claws` and `diet`:
```
const bear = {
  claws: true,
  diet: 'carnivore'
};
```
We'll assign the following `PolarBear()` constructor function's `prototype` property to `bear`:
```
function PolarBear() { 
  // ...
}

PolarBear.prototype = bear;
```
Let's now call the `PolarBear()` constructor to create a new object, then give it two properties:
```
const snowball = new PolarBear();

snowball.color = 'white';
snowball.favoriteDrink = 'cola';
```
This is how the snowball object looks at this point:
```
{
  color: 'white',
  favoriteDrink: 'cola'
}
```
Note that `snowball` has just two properties of its own: `color` and `favoriteDrink`. However, `snowball` also has access to properties that don't exist inside it: `claws` and `diet`:
```
console.log(snowball.claws);
// true

console.log(snowball.diet);
// 'carnivore'
```
Since `claws` and `die`t both exist as properties in the `prototype` object, they are looked up because objects are secretly linked to their constructor's `prototype` property.

Great! But you may be wondering: just what is this secret link that leads to the `prototype` object? Right after objects are made from the `PolarBear()` constructor (such as `snowball`), they have immediate access to properties in `PolarBear()`'s prototype. How exactly is this possible?

As it turns out, the secret link is `snowball'`s `__proto__`property (note the two underscores on each end). `__proto__ `is a property of all objects (i.e., instances) made by a constructor function, and points directly to that constructor's prototype object. Let's check out what it looks like!
```
console.log(snowball.__proto__);

// { claws: true, diet: 'carnivore' }
```
Since the `__proto__` property refers to the same object as `PolarBear`'s prototype, `bear`, comparing them returns `true`:
```
console.log(snowball.__proto__ === bear);

// true
```
**It is highly discouraged to reassign the __proto__ property, or even use it in any code you write.** First, there are compatibility issues across browsers. What's more: since the JavaScript engine searches and accesses properties along the prototype chain, mutating an object's prototype can lead to performance issues. The MDN article for proto even warns against using this property in red text at the very top of the page!

It's great to know the secret link for learning how functions and objects are interconnected, but you **should not use `__proto__` to manage inheritance.** If you ever just need to review an object's prototype, you can still use `Object.getPrototypeOf()`.

###  What About Just Inheriting the Prototype?
Let's say we want a `Child` object to inherit from a`Parent` object. Why shouldn't we just set C`hild.prototype = Parent.prototype`?

First, recall that objects are passed by reference. This means that since the `Child.prototype` object and the `Parent.prototype` object refer to the same object -- any changes you make to `Child`'s prototype will also be made to `Parent`'s prototype! **We don't want children being able to modify properties of their parents!**

On top of all this, no prototype chain will be set up. What if we want an object to inherit from any object we want, not just its prototype?

We still need a way to efficiently manage inheritance without mutating the prototype at all.

### QUESTION 1 OF 4
Consider the following:
```
function GuineaPig (name) {
  this.name = name;
  this.isCute = true;
}

const waffle = new GuineaPig('Waffle');
```
What does waffle.__proto__ refer to?

**GuineaPig.prototype**




