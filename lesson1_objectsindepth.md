# lesson 1 Objects in depth



## Remember the Array?
The array is one of the most useful data structures in JavaScript. At its core, an array is just an ordered collection of elements, enclosed by square brackets (i.e., [ and ]). Here's a variable called myArray, which is assigned to an empty array:

const myArray = [];
Each element in an array is referenced by a numeric key called an index, which starts from zero and increments by one for each additional element in the array. Check out the following example:

```
const fruits = ['apple', 'banana', 'orange', 'grape', 'lychee'];

console.log(fruits);
// ['apple', 'banana', 'orange', 'grape', `lychee`]
If we want to retrieve the first (left-most) element in fruits, we access that element by its index:

fruits[0];

// 'apple'
Likewise, this is how we can access the last (right-most) element in fruits:

fruits[4];

// 'lychee'
/*

```
Recall that arrays can store many different types of data, not just strings!
Below, create an array called `mixedArray` that contains:

* A number
* A string
* A boolean
* Another array

The order and length of the array are up to you; just be sure to include
at least one of each data type listed above.

```
*/
const number = 5;
const string = 'joe';
const boolean = true;
const gender = [1,2,3];

const mixedArray = [number, string, boolean, gender];

console.log(mixedArray);
  
```
## Objects
The object is one of the most important data structures in JavaScript. After all, you're currently taking an entire course on object-oriented programming!

Fundamentally, an object is a collection of associated key/value pairs. We create an object with curly brackets (i.e., { and }). Here's a variable called myObject, which is assigned to an empty object:

const myObject = {};
While elements in arrays are referenced by a numeric index, keys in an object must be named explicitly, like color or year. Check out the following example:

```
const car = {
  color: 'red',
  year: 1992,
  isPreOwned: true
};

```
Let's break this down and see what's going on:

The variable that is assigned to the object is named car.
Curly brackets are used to define the car object.
Individual keys (e,g, color) are associated with a single value ('red' in this case). These key/value pairs are connected by a colon (:).
Each distinct key/value pair, known as a property of that object, is separated from other properties by a comma (,). The car object therefore contains three properties.
Unlike arrays, objects are unordered collections. For example, the car object above could be written with the key/value pairs in a different order, and it wouldn't change how you'd access car's items:
```
const car = {
  isPreOwned: true,
  color: 'red',
  year: 1992
};
```
## object Property Syntax
Another thing to note is that keys (i.e., the names of the object's properties) are strings, but quotation marks surrounding these strings are optional as long as the string is also a valid Javascript identifier (i.e., you could use it as a variable name or function name). As a result, the following three objects are equivalent:

const course = { courseId: 711 };    // ← no quotes around the courseId key
const course = { 'courseId': 711 };  // ← single quotes around the courseId key
const course = { "courseId": 711 };  // ← double quotes around the courseId key
You'll commonly find quotation marks omitted from property names. Certain situations require them to be included, especially if the property name:

Is a reserved word (e.g., for, if, let, true, etc.).
Contains spaces or special characters that cannot appear in a variable name (i.e., punctuation other than $, and _ -- most accented characters).
For the exact rules for property names, feel free to check out the links at the end of this section.

💡 JavaScript Objects Might Look Familiar 💡

If you've had past experience with Python or Ruby, objects are quite similar to dictionaries and hashes (respectively). Though they may look the same, there are key differences to be mindful of.

First, Ruby hashes and JavaScript objects have similar functionality: they are both collections of values accessible by keys. However, values are accessed in Ruby hashes a bit differently. Consider the following Ruby hash:

book = {
  title: 'To Kill a Mockingbird',
  author: 'Harper Lee',
  published: 1960
}
Because the hash keys are symbols (rather than strings), properties are accessed _by_ that symbol:

book[:title]

# 'To Kill a Mockingbird'
Any attempts to using JavaScript's dot notation or square bracket notation lead to undesirable results:

book.title

# undefined method `title' for #<Hash> (NoMethodError)
book['title']

# nil
Another major difference between Ruby hashes and JavaScript objects are that objects can take a function as a property value (we'll take a deep dive into this in the next section). This functionality does not exist for Ruby hashes!

On the other hand, Python dictionaries have some similar functionality to objects in JavaScript as well, with some notable differences. For one, keys in Python dictionaries must be something hashable (e.g., a string, a number, a float, etc.). The following is a valid object in JavaScript:

const javascriptObject = { name: 'George Orwell', year: 1984 }
However, it would be invalid as a Python dictionary:

python_dictionary = {name: 'George Orwell', year: 1984}

# Traceback (most recent call last):
# NameError: name 'name' is not defined
A quick fix would be to convert the Python dictionary's keys into strings:

my_dictionary = {'name': 'George Orwell', 'year': 1984}
Above all else, you can also leverage objects in JavaScript not just to hold data, but for many powerful functionalities such as constructors. This is an object-oriented JavaScript course, so we'll take a deep dive into these features throughout this course!

/*
Create an object called `menu` that represents the following menu item:
```
Salted Caramel Ice Cream
2.95
butter, ice cream, salt, sugar

The object should contain the following properties:
* name
* price
* ingredients

Hint: Which data collection can hold all the listed ingredients in order?
*/

const menu = {
    name : 'Salted Caramel Ice Cream',
    price : 2.95,
    ingredients : ['butter', 'ice cream', 'salt', 'sugar']
};

console.log(menu);
```
  
QUESTION 3 OF 6
Which of the following are features or characteristics of an object? Select all that apply:



Key/value pairs

{ Curly Braces }



Unordered

## Accessing Object Properties
So now that we know what objects look like, how do we retrieve information from them? In other words: how do we access their values? There are two ways: dot notation and square bracket notation. Consider this bicycle object:
```
const bicycle = {
  color: 'blue',
  type: 'mountain bike',
  wheels: {
    diameter: 18,
    width: 8
  }
};

Using dot notation, we can access bicycle's color property by writing:

bicycle.color;

// 'blue'
Similarly, we can access the same property using square bracket notation by writing:

bicycle['color'];

// 'blue'
Both expressions are equivalent, and will each return 'blue'.

```

What about nested objects? To retrieve the value of the width property of the object contained within bicycle's wheels property, you can do the following with dot notation:
'''
bicycle.wheels.width;

// 8
And with square bracket notation:

bicycle['wheels']['width'];

// 8
Again, both expressions are equivalent, and will each return 8.

'''

⚠️ Dot Notation Limitations ⚠️
Note that while dot notation may be easier to read and write, it can't be used in every situation. For example, let's say there's a key in the above bicycle object that is a number. An expression like bicycle.1; will cause a error, while bicycle[1]; returns the intended value:

bicycle.1;

// Uncaught SyntaxError: Unexpected number

bicycle[1];

// (returns the value of the `1` property)
Another issue is when variables are assigned to property names. Let's say we declare myVariable, and assign it to the string 'color':

```
const myVariable = 'color';
bicycle[myVariable]; returns 'blue' because the variable myVariable gets substituted with its value (the string 'color') and bicycle['color']'s value is 'blue'. However, bicycle.myVariable; returns undefined:

bicycle[myVariable];

// 'blue'

bicycle.myVariable;

// undefined
```

It may seem odd, but recall that all property keys in a JavaScript object are strings, even if the quotation marks are omitted. With dot notation, the JavaScript interpreter looks for a key within bicycle whose value is 'myVariable'. Since there isn't such a key defined in the object, the expression returns undefined.

## Reading Arrays
Write an expression to access the last item in the following array:

```
const mileTimes = [7.50, 6.25, 10.60, 8.88];
mileTimes[3];

```

## Reading Objects
Write an expression to access the value of the population object's brazil property:

```
const populations = {
  china: 1379000000,
  brazil: 207700000,
  india: 1324000000,
  unitedStates: 323100000
};
populations['brazil'];
```

## Reading Nested Objects
Write an expression that outputs how to say hello in Portuguese:

```
const greetings = {
  hello: {
    english: 'hi',
    french: 'bonjour',
    portuguese: 'oi'
  },
  goodbye: {
    english: 'bye',
    french: 'au revoir',
    portuguese: 'tchau'
  }
};
greetings['hello']['portuguese'];
```

## Summary
In JavaScript, an object is an unordered collection of properties. Each property consists of a key/value pair, and can reference either a primitive (e.g., strings, numbers, booleans, etc.) or another object. Unlike elements in an array, which are accessed by a numeric index, properties in objects are accessed by their key name using either square bracket notation or dot notation. For a closer look at object fundamentals, check out Intro to JavaScript linked below.

Now that we know how to read existing properties in an object, how do we go about creating new properties? What about modifying existing properties, or even adding and removing properties altogether? We'll answer all this and more in the very next section!

Further Research
Intro to JavaScript
Unquoted property names / object keys in JavaScript
Valid JavaScript variable names in ECMAScript 5
Valid JavaScript variable names in ECMAScript 6

# Section 2 Create and modify properties

## Creating Objects
To create a new, blank (i.e., “empty”) object, you can use object literal notation, or the Object() constructor function. If you're not familiar with constructor functions, no need to worry! We'll jump into them in-depth in Lesson 3. For now, just know that the following two expressions are equivalent:
```
// Using literal notation:

const myObject = {};
// Using the Object() constructor function:

const myObject = new Object();

```
While both methods ultimately return an object without properties of its own, the Object() constructor function is a bit slower and more verbose. As such, the recommended way to create new objects in JavaScript is to use literal notation.

## Modifying Properties
Keep in mind that data within objects are mutable, meaning that data can be changed. There are a few exceptions to this, but for now, let's see how we can modify/reassign existing properties in an object.

Consider the following cat object:

```
const cat = {
  age: 2,
  name: 'Bailey',
  meow: function () {
    console.log('Meow!');
  },
  greet: function (name) {
    console.log(`Hello ${name}`);
  }
};
Now, let's go ahead change it up a bit!

cat.age += 1;

cat.age;
// 3


cat.name = 'Bambi';

cat.name;
// 'Bambi'
After incrementing the value of the age property by 1, and reassigning name's value to 'Bambi', our cat object now looks like:

{
  age: 3,
  name: 'Bambi',
  meow: function () {
    console.log('Meow!');
  },
  greet: function (name) {
    console.log(`Hello ${name}`);
  }
};
```
## Adding Properties
Properties can be added to objects simply by specifying the property name, then giving it a value. Let's start off with a blank object, then add two properties:

```
const printer = {};

printer.on = true;
printer.mode = 'black and white';
The above example uses dot notation to add properties, but keep in mind that square bracket notation works just as well:

printer['remainingSheets'] = 168;
Likewise, we can add a method to the printer object in a similar manner. This time, the value of the property is an anonymous (i.e., unnamed) function:

printer.print = function () {
  console.log('The printer is printing!');
};
Great! The complete printer object now looks like the following:

{
  on: true,
  mode: 'black and white',
  remainingSheets: 168,
  print: function () {
    console.log('The printer is printing!');
  }
}
```
## Removing Properties
Recall that since objects are mutable, not only can we modify existing properties (or even add new ones) -- we can also delete properties from objects.

Say that the printer object above actually doesn't have any modes (i.e., 'black and white', 'color', etc.). We can go ahead and remove that property from printer using the delete operator.

```
delete printer.mode;

// true
Note that delete directly mutates the object at hand. If we try to access a deleted property, the JavaScript interpreter will no longer be able to find the mode property because the mode key (along with its value, true) have been deleted:

printer.mode;

// undefined
```


QUESTION 1 OF 6
What is true about modifying objects? Select all that apply:

Removing properties with the delete operator returns true upon successful deletion.



With a few exceptions, properties in objects are mutable.



Consider the following house object:
```
let house = {
  color: 'green',
  numRooms: 4,
  numWindows: 8,
  forSale: false
};
```
Write an expression to delete the numWindows property from house.

`delete house.numWindows;`

Consider the updated house object from above:
```
let house = {
  color: 'green',
  numRooms: 4,
  forSale: false
};
```
Write an expression to add a new hasGarage property to house. Set the value of the hasGarage property to true.

`house.hasGarage = true;`

## Passing Arguments
### Passing a Primitive
In JavaScript, a primitive (e.g., a string, number, boolean, etc.) is immutable. In other words, any changes made to an argument inside a function effectively creates a copy local to that function, and does not affect the primitive outside of that function. Check out the following example:

```
function changeToEight(n) {
  n = 8; // whatever n was, it is now 8... but only in this function!
}

let n = 7;

changeToEight(n);

console.log(n);
// 7
changeToEight() takes in a single argument, n, and changes it to 8. However, this change only exists inside the function itself. We then pass the global variable n (which is assigned the value 7) into the function. After invoking it, n is still equal to 7.
'''

## Passing an Object
On the other hand, objects in JavaScript are mutable. If you pass an object into a function, Javascript passes a reference to that object. Let's see what happens if we pass an object into a function and then modify a property:
```
let originalObject = {
  favoriteColor: 'red'
};

function setToBlue(object) {
  object.favoriteColor = 'blue';
}

setToBlue(originalObject);

originalObject.favoriteColor;
// 'blue'
```

In the above example, originalObject contains a single property, favoriteColor, which has a value of 'red'. We pass originalObject into the setToBlue() function and invoke it. After accessing originalObject's favoriteColor property, we see that the value is now 'blue'!

How did this happen? Well, since objects in JavaScript are passed by reference, if we make changes to that reference, we're actually directly modifying the original object itself!

What's more: the same rule applies when re-assigning an object to a new variable, and then changing that copy. Again, since objects are passed by reference, the original object is changed as well. Let's take a look at this more closely with another example.

Consider this iceCreamOriginal object, which shows the amount of ice cream cones each instructor has eaten:
```
const iceCreamOriginal = {
  Andrew: 3,
  Richard: 15
};
Let's go ahead and make assign a new variable to iceCreamOriginal. We'll then check the value of its Richard property:

const iceCreamCopy = iceCreamOriginal;

iceCreamCopy.Richard;
// 15
As expected, the expression iceCreamCopy.Richard; returns 15 (i.e., it is the same value as the Richard property in iceCreamOriginal). Now, let's change the value in the copy, then check the results:

iceCreamCopy.Richard = 99;

iceCreamCopy.Richard;
// 99

iceCreamOriginal.Richard;
// 99
Since objects are passed by reference, making changes to the copy (iceCreamCopy) has a direct effect on the original object (iceCreamOriginal) as well. In both objects, the value of the Richard property is now 99.
```
## Comparing an Object with Another Object
On the topic of references, let's see what happens when we compare one object with another object. The following objects, parrot and pigeon, have the same methods and properties:

```
const parrot = {
  group: 'bird',
  feathers: true,
  chirp: function () {
    console.log('Chirp chirp!');
  }
};

const pigeon = {
  group: 'bird',
  feathers: true,
  chirp: function () {
    console.log('Chirp chirp!');
  }
};
Naturally, one might expect the parrot object and pigeon object to be equal. After all, both objects look exactly the same! Let's compare parrot and pigeon to find out:

parrot === pigeon;

// false
What's going on here? As it turns out, the expression will only return true when comparing two references to exactly the same object. Using what we now know about passing objects, let's confirm this. To start off, let's create a new variable, myBird, and assign it to one of the objects above:

const myBird = parrot;
As we've just learned, myBird not only refers to the same object as parrot -- they are the same object! If we make any updates to myBird's properties, parrot's properties will be updated with exactly the same changes as well. Now, the comparison will return true:

myBird === parrot;

// true
So since pigeon is not the same object as myBird or parrot, any comparisons between myBird and pigeon will return false:

myBird === pigeon;

// false
```
## QUESTION 4 OF 6
Which of the following is immutable? Select all that apply:

8

'How are you today?'



3.14

true





QUESTION 5 OF 6
Consider the following:
```
let string = 'orange';

function changeToApple(string) {
  string = 'apple';
}

changeToApple(string);

console.log(string);
// ???
```
What is logged to the console?



orange





QUESTION 6 OF 6
Consider the following object, oven:

```
const oven = {
  type: 'clay',
  temperature: 400
};
What is the value of oven's temperature property after the following operations?

const newOven = oven;

newOven.temperature += 50;




450
```


## Summary
Objects are commonly created with literal notation, and can include properties that point to functions called methods. Methods are accessed the same way as other properties of objects, and can be invoked the same way as regular functions, except they automatically have access to the other properties of their parent object.

By default, objects are mutable (with a few exceptions), so data within them can be altered. New properties can be added, and existing properties can be modified by simply specifying the property name and assigning (or re-assigning) a value. Additionally, properties and methods of an object can be deleted as well with the delete operator, which directly mutates the object.

We've modified objects quite a bit in this section, and even added new methods into them. In the very next section, we'll take a closer look at invoking these methods, as well as how these methods can directly access and modify an object itself!

Further Research
The 'delete' operator on MDN


# Section 3 Invoking Object Methods

## Functions vs. Methods
At this point, we've mostly seen objects with properties that behave more like attributes. That is, properties such as color or type are data that describe an object, but they don't "do" anything. We can extend functionality to objects by adding methods to them.

Say that we have a function, sayHello(), which simply logs a message to the console:
```
function sayHello () {
  console.log('Hi there!');
}
Now, say that we also have a developer object with a single property, name:

const developer = {
  name: 'Andrew'
};
If we want to add the sayHello() function into the developer object, we can add the same way as we add other new properties: by providing property name, then giving it a value. This time, the value of the property is a function!

developer.sayHello = function () {
  console.log('Hi there!');
};
This is how the updated developer object looks:

{
  name: 'Andrew',
  sayHello: function () {
    console.log('Hi there!');
  }
}
```
So now that a sayHello property has been defined, how do we go about calling (i.e., invoking) its referenced function?

## Calling Methods
We can access a function in an object using the property name. Again, another name for a function property of an object is a method. We can access it the same way that we do with other properties: by using dot notation or square bracket notation. Let's take a look back at the updated developer object above, then invoke its sayHello() method:

```
const developer = {
  name: 'Andrew',
  sayHello: function () {
    console.log('Hi there!');
  }
};
developer.sayHello();
// 'Hi there!'

developer['sayHello']();
// 'Hi there!'
```

Just like calling a function, an object's method is called by adding parentheses at the end of the method's name. Note that both dot notation and square bracket notation return the same result!

## Passing Arguments Into Methods
If the method takes arguments, you can proceed the same way, too:

```
const developer = {
  name: 'Andrew',
  sayHello: function () {
    console.log('Hi there!');
  },
  favoriteLanguage: function (language) {
    console.log(`My favorite programming language is ${language}`);
  }
};


developer.favoriteLanguage('JavaScript');
// My favorite programming language is JavaScript'
```

QUESTION 1 OF 6
What is true about object methods? Select all that apply:

  A method is a property that points to a function.
  
Write an expression that invokes the alerter() function in the following array, myArray:

```
const myArray = [ function alerter() { alert('Hello!'); } ];
myArray[0]();
```
Write an expression that invokes the function referenced by the bell object's ring property:

```
const bell = {
  color: 'gold',
  ring: function () {
    console.log('Ring ring ring!');
  }
};
```
`bell.ring();`

💡 Call Methods by Property Name 💡
We've been using anonymous functions (i.e., functions without a name) for object methods. However, naming those functions is still valid JavaScript syntax. Consider the following object, greeter:

```
const greeter = {
  greet: function sayHello() {
    console.log('Hello!');
  }
};
Note that the greet property points to a function with a name: sayHello. Whether this function is named or not, greet is invoked the same way:

greeter.greet();

// 'Hello!'
```
## A Method Can Access the Object it was Called On
Recall that an object can contain data and the means to manipulate that data. But just how can an object reference its own properties, much less manipulate some of those properties itself? This is all possible with the this keyword!

Using this, methods can directly access the object that it is called on. Consider the following object, triangle:

```
const triangle = {
  type: 'scalene',
  identify: function () {
    console.log(`This is a ${this.type} triangle.`);
  }
};
```
Note that inside the identify() method, the value this is used. When you say this, what you're really saying is "this object" or "the object at hand." this is what gives the identify() method direct access to the triangle object's properties:

```
triangle.identify();

// 'This is a scalene triangle.'
```

When the identify() method is called, the value of this is set to the object it was called on: triangle. As a result, the identify() method can access and use triangle's type property, as seen in the above console.log() expression.

Note that this is a reserved word in JavaScript, and cannot be used as an identifier (e.g. variable names, function names, etc.).

QUESTION 4 OF 6
What is true about this? Select all that apply:

  `Using this, methods can access and manipulate an object's properties.
  This is a reserved word in JavaScript.`



Write an expression that invokes the function referenced by the tree object's growOneFoot property:

```
const tree = {
  type: 'redwood',
  leaves: 'green',
  height: 80,
  age: 15,
  growOneFoot: function () {
    this.height += 1;
  }
};
```

//answer
`tree.growOneFoot();`



Create an object called `chameleon` with two properties:

1. `color`, whose value is initially set to 'green' or 'pink'
2. `changeColor`, a function which changes `chameleon`'s `color` to 'pink'
    if it is 'green', or to 'green' if it is 'pink'
    
    ```
    const chameleon = {
    color: 'green',
    changeColor: function(){
       if (this.color === 'green'){
           this.color = 'pink'
       } else {
           this.color = 'green';
       }
    }
};
,,,

## remember dot notaion and THIS 

## Summary
A method is a function property of an object. It is accessed the same way as any other property of the object (i.e., using dot notation or square bracket notation), and is invoked the same way as a regular function outside of an object (i.e., adding parentheses to the end of the expression).

Since an object is a collection of data and the means to operate on that data, a method can access the object it was called on using the special this keyword. The value of this is determined when a method is invoked, and its value is the object on which the method was called. Since this is a reserved word in JavaScript, its value cannot be used as an identifier. Feel free to check out the links below for an additional look at methods and their relationship with this.

We've spent a bit of time on this inside objects, but did you know that the value of this can have different meanings outside an object? In the next section, we'll take a close look at globals, their relationship with this, and the implications of using them.

Further Research
Defining Methods on MDN
"this" in Methods
****************************************************************************************************************

# Section 4 Beware of globals

## Things that belong to objects


    
    
