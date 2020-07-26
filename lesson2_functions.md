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

