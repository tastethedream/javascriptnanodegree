# Lesson 2 : Functions At Runtime

## Section 2 : First Class Functions

### Functions are First-Class Functions
In JavaScript, functions are first-class functions. This means that you can do with a function just about anything that you can do with other elements, such as numbers, strings, objects, arrays, etc. JavaScript functions can:

* Be stored in variables
* Be returned from a function.
* Be passed as arguments into another function.

Note that while we can, say, treat a function as an object, a key difference between a function and an object is that functions can be called (i.e., invoked with ()), while regular objects cannot.

```
const myFunction = function (n1, n2) {
  return n1 * n2;
};

// const myFunction = function howdy(n1, n2) {
//   return n1 * n2;
// };

myFunction(2, 4);
// 8

function average(n1, n2, n3) {
  return (n1 + n2 + n3) / 3;
}

average.length;
// 3

average.name;
// average
```
### QUESTION 1 OF 2
How are JavaScript functions first-class functions? Select all that apply:

**A function can be returned from another function**

**A function can be stored in a variable**

**A function can be passed in as an argument into another function**

### Functions Can Return Functions
Recall that a function must always return a value. Whether the value is explicitly specified in a return statement (e.g., returning a string, boolean, array, etc.), or the function implicitly returns undefined (e.g., a function that simply logs something to the console), a function will always return just one value.

Since we know that functions are first-class functions, we can treat a function as a value and just as easily return a function from another function! A function that returns another function is known as higher-order function. Consider this example:
```
function alertThenReturn() {
  alert('Message 1!');

  return function () {
    alert('Message 2!');
  };
}
```
If alertThenReturn() is invoked in a browser, we'll first see an alert message that says 'Message 1!', followed by the alertThenReturn() function returning an anonymous function. However, we don't actually see an alert that says 'Message 2!', since none of the code from the inner function is executed. How do we go about executing the returned function?

Since alertThenReturn() returns that inner function, we can assign a variable to that return value:

`const innerFunction = alertThenReturn();`
We can then use the innerFunction variable like any other function!

`innerFunction();`

// alerts 'Message 2!'

Likewise, this function can be invoked immediately without being stored in a variable. We'll still get the same outcome if we simply add another set of parentheses to the expression alertThenReturn();:

`alertThenReturn()();`

// alerts 'Message 1!' then alerts 'Message 2!'

Notice the double set of parentheses (i.e. ()()) in that function call! The first pair of parentheses executes the alertThenReturn() function. The return value of this invocation is a function, which then gets invoked by the second pair of parentheses!

```
const returnsAFunction = function () {
  return function () {
    console.log('Hello from inside a function');
  };
};

const newFunction = returnsAFunction();

newFunction();


returnsAFunction()();
```
/*
### question
Declare a function named `higherOrderFunction` that takes no arguments,
and returns an anonymous function.

The returned function itself takes no arguments as well, and simply
returns the number 8.

*/
const higherOrderFunction = function (){
    
    return function(){
        return 8;
    };
    
    
/*

Declare a function named `higherOrderFunction` that takes no arguments,
and returns an anonymous function.

The returned function itself takes no arguments as well, and simply
returns the number 8.

*/
```
const higherOrderFunction = function (){
    
    return function(){
        return 8;
    };
};
```
### Summary
In the JavaScript language, functions are first-class functions. This means that we can do with functions just about everything that we can do with other elements in JavaScript, such as strings, arrays, or numbers. JavaScript functions can:

1. Be stored in variables
2. Be returned from a function.
3. Be passed as arguments into another function.

We've seen quite a few examples of the first two in the list, but what about passing a function as an argument into another function? Since this is such an important and common pattern in JavaScript, we'll take a deep dive in the next section!

### Further Research
First-class function on Wikipedia


## Section 3: Callbacks
### Callback functions

Recall that JavaScript functions are first-class functions. We can do with functions just about everything we can do with other values -- including passing them into other functions! A function that takes other functions as arguments (and/or returns a function, as we learned in the previous section) is known as a higher-order function. A function that is passed as an argument into another function is called a callback function.

We'll be focusing on callbacks in this section. Callback functions are great because they can delegate calling functions to other functions. They allow you to build your applications with composition, leading to cleaner and more efficient code.
```
function callAndAdd(n, callbackFunction) {
  return n + callbackFunction();
}

function returnsThree() {
  return 3;
}

let result = callAndAdd(2, returnsThree);

console.log(result);
```
### QUESTION 1 OF 5
What is true about callbacks? Select all that apply:

**A function that is passed as an argument to another function is called a callback.**

**A function that takes another function in as an argument is a higher-order function.**

**Leveraging callbacks is possible because JavaScript functions are first-class functions**

### QUESTION 2 OF 5
Consider the following two functions:
```
function each(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i])) {
      console.log(array[i]);
    }
  }
}
function isPositive(n) {
  return n > 0;
};
```
The following is then executed:

`each([-2, 7, 11, -4, -10], isPositive);`
What is outputted to the console?

**7, 11**

### Array Methods

### forEach()
Array's forEach() method takes in a callback function and invokes that function for each element in the array. In other words, forEach() allows you to iterate (i.e., loop) through an array, similar to using a for loop. Check out its signature:
```
array.forEach(function callback(currentValue, index, array) {
    // function code here
});
```
The callback function itself receives the arguments: the current array element, its index, and the entire array itself.

Let's say we have a simple function, logIfOdd(), that takes in a single number and logs it to the console if that number is an odd number:

```
function logIfOdd(n) {
  if (n % 2 !== 0) {
    console.log(n);
  }
}

logIfOdd(2);
// (nothing is logged)

logIfOdd(3);
// 3
```
When 2 is passed into the function, logIfOdd() does not output anything to the console because 2 is an even number. However, when 3 is passed into the function, 3 _is_ logged to the console because it's an odd number.

The logIfOdd() function works great for individual numbers, but what if we want to check an entire array and log only the odd numbers within it?

[1, 5, 2, 4, 6, 3]
We can iterate through the above array with forEach() and simply pass it the logIfOdd() function!

```
[1, 5, 2, 4, 6, 3].forEach(function logIfOdd(n) {
  if (n % 2 !== 0) {
    console.log(n);
  }
});

// 1
// 5
// 3
```
In the above array, only the numbers that are odd numbers are printed to the console. Let's recap what happened: logIfOdd() is a function and is passed in as an argument to forEach(). forEach() then invokes logIfOdd() for each element in the array (i.e., [1, 5, 2, 4, 6, 3]), which outputs 1, 5, and 3.

Keep in mind that it's quite common to pass an anonymous function as an argument in forEach() as well:
```
[1, 5, 2, 4, 6, 3].forEach(function (n) {
  if (n % 2 !== 0) {
    console.log(n);
  }
});

// 1
// 5
// 3
```
Alternatively, it's possible to simply pass in just the name of the function as well (i.e., assuming the function was already defined, of course).

[1, 5, 2, 4, 6, 3].forEach(logIfOdd);
```
const favoriteFlavors = ['cookie dough', 'salted caramel', 'toffee'];

favoriteFlavors.forEach(function(flavor) {
  // debugger;
  console.log('I enjoy ' + flavor + ' ice cream!');
});
```
### QUESTION 3 OF 5
Which of the following are valid ways to iterate through an array and log each value to the console?

The following approach works because we pass an anonymous callback that takes a number, num, as an argument:
```
[1, 2, 3, 4].forEach(function(num) {
  console.log(num);
});
```
Compare the above with the following approach does does not work, since no arguments are passed into the callback:
```
[1, 2, 3, 4].forEach(function() {
  console.log(num);
});
```
Passing in a defined function as the callback works just fine, however:
```
function logNum (num) {
  console.log(num);
}

[1, 2, 3, 4].forEach(logNum);
```
And lastly, the following approach does not work because no callback function is passed in:
```
[1, 2, 3, 4].forEach(console.log);

// 1
// 5
// 3
```
The three different ways shown each produce the same output (i.e., logging 1, 5, and 3 to the console).

### map()
Array's map() method is similar to forEach() in that it invokes a callback function for each element in an array. **However, map() returns a new array based on what's returned from the callback function.**
```
const names = ['David', 'Richard', 'Veronika'];

const nameLengths = names.map(function(name) {
  return name.length;
});
```

Let's go over what's happening here. `The map()` method works on arrays, so we have to have an array to start with:

`const names = ['David', 'Richard', 'Veronika'];`
We call map() on the names array and pass it an anonymous function as an argument:
```
names.map(function(name) {
  return name.length;
});
```
The function that's passed to `map()` gets called for each item in the names array! The function receives the first name in the array, stores it in the name variable and returns its length. Then it does that again for the remaining two names.

Remember that the key difference between `forEach()` and `map()` is that `forEach(`) doesn't return anything, while` map() `returns a new array with the values that are returned from the function:
```
const nameLengths = names.map(function(name) {
  return name.length;
});
```
So nameLengths will be a new array: `[5, 7, 8]`. **Again, it is important to understand that the `map()` method returns a new array; it does not modify the original array**

```
/* Using map()
 *
 * Using the musicData array and map():
 *   - Return a string for each item in the array in the following format:
 *     <album-name> by <artist> sold <sales> copies
 *   - Store the returned data in a new albumSalesStrings variable
 *
 * Note:
 *   - Do not delete the musicData variable
 *   - Do not alter any of the musicData content
 *   - Do not format the sales number; leave it as a long string of digits
 */

const musicData = [
    { artist: 'Adele', name: '25', sales: 1731000 },
    { artist: 'Drake', name: 'Views', sales: 1608000 },
    { artist: 'Beyonce', name: 'Lemonade', sales: 1554000 },
    { artist: 'Chris Stapleton', name: 'Traveller', sales: 1085000 },
    { artist: 'Pentatonix', name: 'A Pentatonix Christmas', sales: 904000 },
    { artist: 'Original Broadway Cast Recording', 
    name: 'Hamilton: An American Musical', sales: 820000 },
    { artist: 'Twenty One Pilots', name: 'Blurryface', sales: 738000 },
    { artist: 'Prince', name: 'The Very Best of Prince', sales: 668000 },
    { artist: 'Rihanna', name: 'Anti', sales: 603000 },
    { artist: 'Justin Bieber', name: 'Purpose', sales: 554000 }
];


const albumSalesStrings = musicData.map(function(music){

});



const albumSalesStrings = musicData.map(function(music){
    // <album-name> by <artist> sold <sales> copies
    
    const string1 = music.name + " by " + music.artist + " sold " +  music.sales + " copies";

    return string1;
});

console.log(albumSalesStrings);

```
## flow chart albumsalesflow.png will help with the above code

### filter()
Array's filter() method is similar to the map() method:

* It is called on an array
* It takes a function as an argument
* It returns a new array

The difference is that the function passed to `filter()` is used as a test, and only items in the array that pass the test are included in the new array. Consider the following example:
```
const names = ['David', 'Richard', 'Veronika'];

const shortNames = names.filter(function(name) {
  return name.length < 6;
});
```
Just as before, let's break it down a bit! We have the **starti
`const names = ['David', 'Richard', 'Veronika'];`

We call `filter()` on the `names` array and pass it a function as an argument:
```
names.filter(function(name) {
  return name.length < 6;
});
```
Again, just like with `map()`, the function that's passed to `filter()` gets called for each item in the `names` array. The first item (i.e., `'David'`) is stored in the `name` variable. Then the test is performed -- and this is what's doing the actual filtering. First, it checks the length of the name. If it's `6` or greater, then it's skipped (and not included in the new array!). But, if the length of the name is less than `6`, then `name.length < 6` returns `true` and the name _is_ included in the new array!

And lastly, just like with `map()`, the `filter()` method returns a new array instead of modifying the original array:
```
const shortNames = names.filter(function(name) {
  return name.length < 6;
});

console.log(shortNames);
// ['David']
```
Above, the value of `shortNames` is the new array: `['David']`. Notice that it only has one name in it, because both `'Richard'` and `'Veronika'` are `6` characters or longer, and were filtered out.

### question

/* Using filter()
 *
 * Using the musicData array and filter():
 *   - Return only album objects where the album's name is
 *     10 characters long, 25 characters long, or anywhere in between
 *   - Store the returned data in a new `results` variable
 *
 * Note:
 *   - Do not delete the musicData variable
 *   - Do not alter any of the musicData content
 */
 
```
const musicData = [
    { artist: 'Adele', name: '25', sales: 1731000 },
    { artist: 'Drake', name: 'Views', sales: 1608000 },
    { artist: 'Beyonce', name: 'Lemonade', sales: 1554000 },
    { artist: 'Chris Stapleton', name: 'Traveller', sales: 1085000 },
    { artist: 'Pentatonix', name: 'A Pentatonix Christmas', sales: 904000 },
    { artist: 'Original Broadway Cast Recording', 
      name: 'Hamilton: An American Musical', sales: 820000 },
    { artist: 'Twenty One Pilots', name: 'Blurryface', sales: 738000 },
    { artist: 'Prince', name: 'The Very Best of Prince', sales: 668000 },
    { artist: 'Rihanna', name: 'Anti', sales: 603000 },
    { artist: 'Justin Bieber', name: 'Purpose', sales: 554000 }
];
```
### answer
```
const results = musicData.filter(function(result){
    if (result.name.length > 9 && result.name.length < 26){

        return result.name.length ;
    }
});
console.log(results);
```

### Summary
JavaScript functions can take in a variety of different arguments, including strings, numbers, arrays, and objects. Since functions are first-class functions, functions can also be passed as arguments to a given function. Functions that take in other functions as arguments are called **higher-order functions**. Functions that are passed as arguments to other functions are called **callback functions.**

Callbacks allow you to pass functions without needing to name them (i.e., **anonymous functions**, which leads to less variables floating around. They also allow you to delegate calling functions to *other* functions. Array methods, such as `forEach()`, `map()`, and `filter()`, take advantage of callbacks to execute functions onto a given array's elements. Feel free to check out the list of other array methods listed below.

Now that we know that functions in JavaScript can have access to many different types of variables in its list of arguments -- what else is available for functions to use? That is, what is included in the scope of a function? Let's find out in the next section!

Further Research
Array Methods on MDN

## Section 4 : Scope

### Scope
A function's runtime scope describes the variables available for use inside a given function. The code inside a function has access to:

The function's arguments.
* Local variables declared within the function.
* Variables from its parent function's scope.
* Global variables.
Check out the following image that highlights a function's scope, then we'll take a look at a live example.

![scope image]
(https://video.udacity-data.com/topher/2017/December/5a31c70a_l2-34-scope-image/l2-34-scope-image.png)

The nested child() function has access to all a, b, and c variables. That is, these variables are in the child() function's scope.

### code from video
```
const myName = 'Andrew';

function introduceMyself() {
  const you = 'student';

  function introduce() {
    console.log(`Hello, ${you}, I'm ${myName}!`);
  }

  return introduce();
}

introduceMyself();
// 'Hello, student, I'm Andrew!'
```
### Video Recap
In the previous video, the `introduceMyself()` function contains a nested `introduce()` function. While `introduce()` does not take in any arguments, nor are there any local variables declared within it -- variables in both the aforementioned settings are indeed in `introduce()`'s scope.

`introduce()` does use the global variable `myName`, however, as well as the you variable contained in its parent function, `ntroduceMyself(`) (where `introduce()` was defined). Both are highlighted below:
```
const myName = 'Andrew';
// Global variable

function introduceMyself() {

  const you = 'student';
  // Variable declared where introduce() is defined
  // (i.e., within introduce()'s parent function, introduceMyself())

  function introduce() {
    console.log(`Hello, ${you}, I'm ${myName}!`);
  }

  return introduce();
}
```
### QUESTION 1 OF 4
Consider the following:
```
const num1 = 5;

function functionOne() {
  const num2 = 10;

  function functionTwo(num3) {
    const num4 = 35;

    return num1 + num2 + num3 + num4;
  }

  return functionTwo(0);
}
```
Which variables does `functionTwo()` have access to? Select all that apply:

All four variables are available for `functionTwo()` to use. Let's break this one down:

`num1` is a global variable, accessible anywhere in the application code.

`num2` is a local variable in `functionOne()`, the parent function in which `functionTwo()` is defined.

`num3 `is an argument passed directly to `functionTwo()`.

`num4 `is a local variable in `functionTwo()`.

### JavaScript is Function-Scoped
You may be wondering why scope is so heavily associated with functions in JavaScript. Especially if you've had past experience in another programming language, this might seem a bit unusual (e.g., blocks in Ruby have their own scope)!

This is all because variables in JavaScript are traditionally defined in the scope of a function, rather than in the scope of a block. Since entering a function will change scope, any variables defined inside that function are not available outside of that function. On the other hand, if there are any variables defined inside a block (e.g., within an `if` statement), those variables are available outside of that block.

```
var globalNumber = 5;

function globalIncrementer() {
  const localNumber = 10;

  globalNumber += 1;
  return globalNumber;
}
```
In the example above, `globalNumber` is outside the function; it is a **global** variable that the `globalIncrementer()` function has access to. `globalIncrementer()` simply has a **local** variable `(localNumber)` declared within it, then increments `globalNumber` by 1 before returning the updated value of `globalNumber` itself.

After calling the function a few times, we see that the value of `globalNumber` has indeed increased each time:
```
console.log(globalIncrementer());
// 6

console.log(globalIncrementer());
// 7

console.log(globalIncrementer());
// 8
```
However, when attempting to access `localNumber` outside of the function, we see a error:
```
console.log(localNumber);

// ReferenceError: localNumber is not defined
```
Because JavaScript is function-scoped, functions have access to all its own variables as well as all the global variables outside of it. For more details on block scoping, check out Further Research at the end of this page.

### 💡 Block-Scoping 💡
ES6 syntax allows for additional scope while declaring variables with the `let` and `const` keywords. These keywords are used to declare block-scoped variables in JavaScript, and largely replace the need for `var`.

We've used them throughout this course, but for a closer look, check out our course: (ES6 - JavaScript Improved). Via MDN:

let
const

### Scope Chain
Whenever your code attempts to access a variable during a function call, the JavaScript interpreter will always start off by looking within its own local variables. If the variable isn't found, the search will continue looking up what is called the **scope chain**. Let's take a look at an example:
```
function one() {
  two();
  function two() {
    three();
    function three() {
      // function three's code here
    }
  }
}

one();
```
In the above example, when `one()` is called, all the other nested functions will be called as well (all the way to three()).

You can visualize the scope chain moving outwards starting at the innermost level: from `three()`, to `two()`, to `one()`, and finally to window (i.e., the global/window object). This way, the function `three()` will not only have access to the variables and functions "above" it (i.e., those of `two()` and `one()`) -- `three()` will also have access to any global variables defined outside `one()`.

Let's now revisit the image from the beginning of this section, and visualize the entire process:
[!function/scope image]
(https://video.udacity-data.com/topher/2017/December/5a31c70a_l2-42-scope-chain/l2-42-scope-chain.png)

### 💡 The Global (window) Object💡
Recall that when JavaScript applications run inside a host environment (e.g., a browser), the host provides a `window` object, otherwise known as the global object. Any global variables declared are accessed as properties of this object, which represents the outermost level of the scope chain.

For a refresher, feel free to check out Beware of Globals in Lesson 1.

### Variable Shadowing
**What happens when you create a variable with the same name as another variable somewhere in the scope chain?**

JavaScript won't throw an error or otherwise prevent you from creating that extra variable. In fact, the variable with **local scope** will just temporarily **"shadow"** the variable in the **outer scope**. This is called **variable shadowing**. Consider the following example:
```
const symbol = '¥';

function displayPrice(price) {
  const symbol = '$';
  console.log(symbol + price);
}

displayPrice('80');
// '$80'
```
In the above snippet, note that `symbol` is declared in **two** places:

Outside the `displayPrice()` function, as a **global variable**.
Inside the `displayPrice()` function, as a **local variable**.
After invoking `displayPrice()` and passing it an argument of `'80'`, the function outputs `'$80'` to the console.

How does the JavaScript interpreter know which value of `symbol` to use? Well, since the variable pointing to '`$'` is declared inside a function (i.e., the **"inner" scope**), it will override any variables of the same name that belong in an **outer scope** -- such as the global variable pointing to `'¥'`. As a result, `'$80'` is displayed rather than `'¥80'`.

All in all, if there are any naming overlaps between variables in different contexts, they are all resolved by moving through the scope chain from **inner** to **outer** scopes (i.e., local all the way to global). This way, any **local variables** that have the same name take precedence over those with a wider scope.


### QUESTION 2 OF 4
What will the console display when myFunction() is called?
```
let n = 2;

function myFunction() {
  let n = 8;
  console.log(n);
}

myFunction();
// ???
```

**When attempting to access a variable, the JavaScript engine look outwards, starting from the innermost level. In this example, since the JavaScript engine finds n declared as a local variable within `myFuction()`, it will never reach the `n` variable (whose value is 2) further up the chain. As such, `8 `is logged to the console.**

### QUESTION 3 OF 4
When searching for variables along the scope chain, in what order will the JavaScript interpreter search?

ORDER

LOCATION

1st local variables


2nd parent function's variables


3rd parent function's parent function's variables


4th global variables

### QUESTION 4 OF 4
When the following code runs, what is the output of the first, second, and third logs to the console (respectively)?
```
let n = 8;

function functionOne() {
  let n = 9;

  function functionTwo() {
    let n = 10;
    console.log(n);  // First log
  }

  functionTwo();

  console.log(n);  // Second log
}

functionOne();

console.log(n);  // Third log
```

The code outputs `10,` `9`, and `8` to the console (in that particular order). With each log to the console, the JavaScript engine will search for the innermost (i.e., most local) variable it can find; this is the value passed into the `console.log(n)` expression.

When `functionTwo()` is called, even though there's an `n` variable that has a value of `9`, and another `n` variable that has a value of `8` -- the JavaScript engine won't find them! Since there's another variable `n` that is more local (i.e., directly inside `functionTwo())`, the JavaScript engine will use that variable instead.

### Summary

When a function is run, it creates its own **scope**. A function's scope is the set of variables available for use within that function. The scope of a function includes:

1. The function's arguments.
2. Local variables declared within the function.
3. Variables from its parent function's scope.
4. Global variables.

Variables in JavaScript are also function-scoped. This means that any variables defined inside a function are not available for use outside the function, though any variables defined within blocks (e.g. `if` or `for`) are available outside that block.

When it comes to accessing variables, the JavaScript engine will traverse the **scope chain**, first looking at the innermost level (e.g., a function's local variables), then to outer scopes, eventually reaching the global scope if necessary.

In this section, we've seen quite a few examples of a nested function being able to access variables declared in its parent function's scope (i.e., in the scope in which that function was nested). These functions, combined with the lexical environment it which it was declared, actually have a very particular name: **closure**. Closures are very closely related to scope in JavaScript, and lead to some powerful and useful applications. We'll take a look at closures in detail next!

### Further Research
Intro to JavaScript (Lesson 5's coverage of scope) (https://www.udacity.com/course/intro-to-javascript--ud803)
Douglas Crockford's discussion of block-scoped variables in The Better Parts(https://www.youtube.com/watch?v=Ji6NHEnNHcA&t=26m9s)
Block Scoping Rules on MDN (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block#Description)
Functions and Function Scope on MDNs (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)

## Section 5: Closures

### Functions retain their scope

We just looked at how function scope works and how a scope chain is created. Just to recap: when an **identifier** (i.e., a variable) is used, the JavaScript engine will check the scope chain to retrieve the value for that identifier. The identifier might be found in the local scope (either in the function or block). If it's not found locally, then it might exist in an outer scope. It'll then keep checking the next outer scope followed by the next outer scope until it reaches the global scope (if necessary).

**Identifier lookup** and the **scope chain** are really powerful tools for a function to access identifiers in the code. In fact, this lets you do something really interesting: create a function now, package it up with some variables, and save it to run later. If you have five buttons on the screen, you could write five different click handler functions, or you could use the same code five times with different saved values.

Let's check out an example of a function retaining access to its scope. Consider the `remember()` function below:
```
function remember(number) {
    return function() {
        return number;
    }
}

const returnedFunction = remember(5);

console.log( returnedFunction() );
// 5
```
When the Javascript engine enters `remember()`, it creates a new execution scope that points back to the prior execution scope. This new scope includes a reference to the `number` parameter (an immutable `Number` with the value `5`). When the engine reaches the inner function (*a function expression*), it attaches a link to the current execution scope.

This process of a function retaining access to its scope is called a **closure**. In this example, the inner function "closes over" number. A closure can capture any number of parameters and variables that it needs. MDN defines a closure as:

> "the combination of a function and the lexical environment within which that function was declared."

This definition might not make a lot of sense if you don't know what the words **"lexical environment"** mean. The ES5 spec refers to a lexical environment as:

> "the association of Identifiers to specific variables and functions based upon the lexical nesting structure of ECMAScript code."

In this case, the **"lexical environment"** refers the code as it was written in the JavaScript file. As such, a closure is:

* The function itself, and
* The code (but more importantly, the scope chain of) where the function is declared

When a function is declared, it locks onto the scope chain. You might think this is pretty straightforward since we just looked at that in the previous section. What's really interesting about a function, though, is that it will retain this scope chain -- even if it is invoked in a location other than where it was declared. This is all due to the closure!

So looking back at the above example -- after `remember(5)` is executed and returned, how is the returned function still able to access `number'`s value (i.e., `5`)? In this section, we'll investigate how closures allow us to store a snapshot of state at the time the function object is created.

### closure video
(https://youtu.be/qSUqXlJ3CII)

### Creating a Closure
Every time a function is defined, closure is created for that function. Strictly speaking, then, every function has closure! This is because functions close over at least one other context along the scope chain: the global scope. However, the capabilities of closures really shine when working with a **nested** function (i.e., a function defined within another function).

Recall that a nested function has access to variables outside of it. From what we have learned about the scope chain, this includes the variables from the outer, enclosing function itself (i.e., the parent function)! These nested functions close over (i.e., capture) variables that aren't passed in as arguments nor defined locally, otherwise known as **free variables**.

As we saw with the `remember()` function earlier, it is important to note that a function maintains a reference to its parent's scope. If the reference to the function is still accessible, the scope persists!

### Closures and Scope
Closures and scope are so closely related that you may even be surprised you had been working with them all along! Let's revisit an example from the previous section:
```
const myName = 'Andrew';

function introduceMyself() {
  const you = 'student';

  function introduce() {
    console.log(`Hello, ${you}, I'm ${myName}!`);
  }

  return introduce();
}

introduceMyself();
// 'Hello, student, I'm Andrew!'
```
To recap: `myName` is a variable defined outside a function, hence it's a **global** variable in the global scope. In other words,  `myName`   is available for all functions to use.

But let's look closely at the other variable: `you`. `you` is referenced by `introduce()`, even though it wasn't declared within `introduce()`! This is possible because a **nested** function's scope includes variables declared in the scope where the function is nested (i.e., variables from its parent function's scope, where the function is defined).

As it turns out, the `introduce()` function and its lexical environment form a closure. This way, `introduce()` has access to not only the global variable `myName`, but also the variable `you`, which was declared in the scope of its parent function, `introduceMyself()`.

### Code from video
```
const number = 3;

function myFunction () {
  const otherNumber = 1;

  function logger() {
    console.log(otherNumber);
  }

  return logger;
}

const result = myFunction();

result();
// 1
```
### QUESTION 1 OF 3
What is true about closures? Select all that apply:

**A function maintains a reference to its parent's scope.**

**If the reference to a parent function is still accessible, the scope persists.**

## QUESTION 2 OF 3
What is the output when result(10); is executed?
```
function outerFunction() {
  let num1 = 5;

  return function(num2) {
    console.log(num1 + num2);
  };
}

let result = outerFunction();

result(10);
// ???
```
After `outerFunction()` is returned, it may seem that all of its local variables would be allocated back to available memory. As it turns out, however, the nested `innerFunction()` still has access to the `num1` variable!

Let's take a closer look: `outerFunction()` returns a reference to the inner, nested function. The return value of this invocation is saved in `result`. When this function is called, it maintains access to its scope; that is, all the variables it was able to access back when it was originally defined. This includes the `num1` variable in its parent scope. The nested function closes over these variables, and those variables persist as long as the reference to the function itself exists.

When `result(10);` is executed, then, the function is still able to access `num1's` value of 5. As a result, `15` is logged to the console.

### code from video
```
function myCounter() {
  let count = 0;

  return function () {
    count += 1;
    return count;
  };
}

let counter = myCounter();

counter();
// 1

counter();
// 2

counter.count;
// undefined

count;
// undefined
```
## Applications of Closures
To recap, we've seen two common and powerful applications of closures:

1. Passing arguments implicitly.
2. At function declaration, storing a snapshot of scope.
```
/*

Declare a function named `expandArray()` that:

* Takes no arguments
* Contains a single local variable, `myArray`, which points to [1, 1, 1]
* Returns an anonymous function that directly modifies `myArray` by
  appending another `1` into it
* The returned function then returns the value of `myArray`

*/
  
    function expandArray(){
         let myArray = [1,1,1];
    
            return function(){
                myArray.push(1);
            return myArray;
    };
};
```


### note: `array.push()`to append an item to an array

### garbage collection

JavaScript manages memory with automatic **garbage collection**. This means that when data is no longer referable (i.e., there are no remaining references to that data available for executable code), it is "garbage collected" and will be destroyed at some later point in time. This frees up the resources (i.e., computer memory) that the data had once consumed, making those resources available for re-use.

Let's look at garbage collection in the context of **closures**. We know that the variables of a parent function are accessible to the **nested**, inner function. If the nested function captures and uses its **parent's** variables (or variables along the scope chain, such as its parent's parent's variables), those variables will stay in memory as long as the functions that utilize them can still be referenced.

As such, referenceable variables in JavaScript are not garbage collected! Let's quickly look back at the myCounter function from the previous video:
```
function myCounter() {
  let count = 0;

  return function () {
    count += 1;
    return count;
  };
}
```
The existence of the nested function keeps the `count` variable from being available for garbage collection, therefore `count` remains available for future access. After all, a given function (and its scope) does not end when the function is returned. Remember that functions in JavaScript retain access to the scope that they were created in!

### Summary
A **closure** refers to the combination of a function and the lexical environment in which that function was declared. Every time a function is defined, closure is created for that function. This is especially powerful in situations where a function is defined within another function, allowing the nested function to access variables outside of it. Functions also keep a link to its parent's scope even if the parent has returned. This prevents data in its parents from being garbage collected.

At this point, we've worked a lot with functions declarations and function expressions. Did you know that you can write functions that can be immediately invoked after they're defined? We'll check out these immediately-invoked function expressions (IIFE's, or iiffy's) in the next section!

### Further Research
Memory Management on MDN(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
Closures on MDN (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
Lexical Environments in the ES5 spec (http://es5.github.io/#x10.2)

## Section 6: Immediately-invoked function expressions(IIFE)

### Function declarations vs. function expressions

Before we jump into **immediately-invoked function expressions (IIFE)**, let's make sure we're on the same page regarding the differences between function *declarations* and function *expressions*.

A function *declaration* defines a function and does not require a variable to be assigned to it. It simply declares a function, and doesn't itself return a value. Here's an example:
```
function returnHello() {
  return 'Hello!';
}
```
On the other hand, a function *expression* does return a value. Function expressions can be anonymous or named, and are part of another expression's syntax. They're commonly assigned to variables, as well. Here's the same function as a function *expression*:
```
// anonymous
const myFunction = function () {
  return 'Hello!';
};

// named
const myFunction = function returnHello() {
  return 'Hello!';
};
```

### Immediately-Invoked Function Expressions: Structure and Syntax
An immediately-invoked function expression, or IIFE (pronounced *iffy*), is a function that is called immediately after it is defined. Check out the following example:
```
(function sayHi(){
    alert('Hi there!');
  }
)();

// alerts 'Hi there!'
```
**The syntax might seem a bit odd, but all we're doing is wrapping a function in parentheses, then adding a pair of parentheses at the end of that to invoke it!**

### Passing Arguments into IIFE's
Let's look into how we can go about passing arguments into IIFE's. Consider the following example of an *anonymous* function expression that takes in a single argument:
```
(function (name){
    alert(`Hi, ${name}`);
  }
)('Andrew');

// alerts 'Hi, Andrew'
```
The second pair of parentheses not only immediately executes the function preceding it -- it's also the place to put any arguments that the function may need! We pass in the string `'Andrew'`, which is stored in the function expression's `name` variable. It is then immediately invoked, alerting the message   `'Hi, Andrew'` onto the screen.

Here's another example of an IIFE, this time taking two arguments and returning their product:
```
(function (x, y){
    console.log(x * y);
  }
)(2, 3);

// 6
```
Again -- the arguments passed into the anonymous function (i.e., `2` and `3)` belong in trailing set of parentheses.

### IIFE's and Private Scope
One of the primary uses for IIFE's is to create *private scope *(i.e., private state). Recall that variables in JavaScript are traditionally scoped to a function. Knowing this, we can leverage the behavior of closures to protect variables or methods from being accessed! Consider the following example of a simple closure within an IIFE, referenced by `myFunction`:
```
const myFunction = (
  function () {
    const hi = 'Hi!';
    return function () {
      console.log(hi);
    }
  }
)();
```
Let's break `myFunction` down and review the individual parts that make it up:
[https://video.udacity-data.com/topher/2017/December/5a31c70b_l2-67-iife-with-a-closure/l2-67-iife-with-a-closure.png]

In the above image, an immediately-invoked function expression is used to immediately run a function. This function runs and returns an anonymous function that is stored in the `myFunction` variable.

Note that the function that is being returned closes over (i.e., captures) the `hi` variable. This allows `myFunction` to maintain a private, mutable state that cannot be accessed outside the function! What's more: because the function expressed is called immediately, the IIFE wraps up the code nicely so that we don't pollute the global scope.

If any of this sounds familiar -- it's because IIFE's are *very* closely related to everything you've learned about scope and closures!

### QUESTION 1 OF 2
What is true about immediately-invoked function expressions? Select all that apply:

**IIFE's can be used to create private scope
IIFE's are very closely associated with scope and closures
There is an alternative syntax for writing an IIFE**

### 💡 Alternative Syntax for IIFE's 💡
Recall the example from the beginning of this section:
```
(function sayHi(){
   alert('Hi there!');
 }
)();

// alerts 'Hi there!'
```
This works great, but there's also another way we can write this to achieve the same results! The first set of parentheses can wrap around the entire expression. That is, we can move the first closing parenthesis to the very end:
```
(function sayHi(){
   alert('Hi there!');
}());

// alerts 'Hi there!'
```
Again, using either approach will still produce the same result: alerting `'Hi there!'` in the browser.

Now, when would you choose one form over the other? Much of this is a stylistic choice; there is no "correct" way of auto-executing an anonymous function. Both are valid approaches for achieving the same result, and the JavaScript engine will still parse them each as a function expression (i.e., rather than as a function declaration).

Among developers, Douglas Crockford has mentioned that wrapping the entire unit in parentheses (as presented directly above) helps readers understand that what they're seeing is indeed an expression. 

All in all, however you decide to form your immediately-invoked function expressions is up to you!

### IIFE's, Private Scope, and Event Handling
Let's check out another example of an immediately-invoked function expression -- this time in the context of handling an event. Say that we want to create a button on a page that alerts the user on every other click. One way to begin doing this would be to keep track of the number of times that the button was clicked. But how should we maintain this data?

We *could* keep track of the count with a variable that we declare in the global scope (this would make sense if other parts of the application need access to the count data). However, an even better approach would be to enclose this data in the *event handler itself!*

For one, this approach prevents us from polluting the global with extra variables (and potentially variable name collisions). What's more: if we use an IIFE, we can leverage a closure to protect the count variable from being accessed externally! This prevents any accidental mutations or unwanted side-effects from inadvertently altering the count.

To begin, let's first create an HTML file containing a single button:
```
<!-- button.html -->

<html>

  <body>

     <button id='button'>Click me!</button>

     <script src='button.js'></script>

  </body>

</html>
```
No surprises here -- just a `<button>` tag with ID of `'button'`. We also reference a `button.js` file that we're now going to build. Within that file, let's retrieve a reference to that element via its ID, then save that reference to a variable, `button`:
```
// button.js

const button = document.getElementById('button');
```
Next, we'll add an event listener to `button,` and listen for a `'click'` event. Then, we'll pass in an IIFE as the second argument:
```
/ button.js

button.addEventListener('click', (function() {
  let count = 0;

  return function() {
    count += 1;

    if (count === 2) {
      alert('This alert appears every other press!');
      count = 0;
    }
  };
})());
```
Quite a bit is going on in the IIFE, so let's break it down!

First, we declare a local variable, `count`, which is initially set to `0`. We then return a function from that function. The returned function increments `count`, but alerts the user and resets the count back to `0`if the count reaches `2`.

What is important to note is that the returned function closes over the `count` variable. That is, because a function maintains a reference to its parent's scope, `count` is available for the returned function to use! As a result, we immediately invoke a function that returns that function. And since the returned function has access to the internal variable, `count`, a private scope is created -- effectively protecting the data!

Containing `count` in a closure allows us to retain the data from each click. Now, let's see this all in action!

### QUESTION 2 OF 2
The following immediately-invoked function expression is run in the browser:
```
(function(n){
  delete n;
  return n;
})(2);
```
What is the return value?
**2**

### Benefits of Immediately-Invoked Function Expressions
We've seen how using an immediately-invoked function expression creates a private scope that protects variables or methods from being accessed. IIFE's ultimately use the returned functions to access private data within the closure. This works out very well: while these returned functions are publicly-accessible, they still maintain privacy for the variables defined within them!

Another great opportunity to use an IFFE is when you want to execute some code without creating extra global variables. However, **note that an IIFE is only intended to be invoked once, to create a unique execution context. If you have some code that is expected to be re-used (e.g., a function meant to be executed more than once in the application), declaring the function and then invoking it might be a better option**.

All in all, if you simply have a one-time task (e.g., initializing an application), an IIFE is a great way to get something done without polluting your the global environment with extra variables. Cleaning up the global namespace decreases the chance of collisions with duplicate variable names, after all.

### Summary
An **immediately-invoked function expression (IIFE)** is a function that is called immediately after it is defined. Utilizing an IIFE alongside closures allows for a **private scope**, which maintains privacy for variables defined within them. And since less variables are created, an IIFE will help to minimize pollution of the global environment, hindering the chances of variable name collisions.

### Further Research
Function Declarations vs. Function Expressions(https://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/)
An Introduction to IIFEs - Immediately Invoked Function Expressions on A Drip of JavaScript(http://adripofjavascript.com/blog/drips/an-introduction-to-iffes-immediately-invoked-function-expressions.html)
Immediately-Invoked Function Expression (IIFE) by Ben Alman(http://benalman.com/news/2010/11/immediately-invoked-function-expression/)

Further Research
Addy Osmani's Learning JavaScript Design Patterns(https://addyosmani.com/resources/essentialjsdesignpatterns/book/)



