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
### `this` in constructor functions




