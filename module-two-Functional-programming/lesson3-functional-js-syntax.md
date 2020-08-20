# Lesson 3 Functional JS syntax

## Section 1 Introduction


JavaScript is an object orientated programming language

## Section 2 Array Methods

Let's start with what was most likely one of the first things you learned to do in JavaScript -- `for` loops. `for` loops are great, we seem all the time, but - **they aren’t functional**. Take a moment and think - what about a for loop wouldn’t be functional?

**QUIZ QUESTION**
Which of these are reasons that JavaScript for loops are not functional?

For loops continuously update a variable, therefore breaking the immutable rule.

For loops do not take arguments, therefore they rely on side effects.

For loops are not functions.

Functional programming only allows us to use **pure functions** to do work, so functional programs use *recursion* rather than *loops.* A truly functional language won’t even have the functionality of `for` loops built into the language! In the same way, do...while loops, for..in, and all the other similar looping constructs don’t have a place in Functional programming. So, how do we automatically repeat actions in functional JS? Thankfully, ES6 came packed with functions for doing just that. Get ready for some serious array practice!


![Array Methods](https://github.com/tastethedream/javascriptnanodegree/blob/master/images/arraymethodsoverview.jpg "Array Methods Overview")

## Section 3 The Map Method

The map method performs an action on every item in an array, but creates a new array to store the results

### Array Map Basic
```
const captains = ['Picard', 'Adama', 'Reynolds', 'Beeblebrox']

// create new array
const titles = captains.map(cap => `Captain ${cap}`)

// equivalent to
const titles = captains.map(cap => {
    return `Captain ${cap}`
})

console.log('Resulting Array: ', titles)
// expected output: Resulting Array: ['Captain Picard', 'Captain Adama', 'Captain Reynolds', 'Captain Beeblebrox']
console.log('Original Array:', captains)
// is unchanged, expected output: Original Array: ['Picard', 'Adama', 'Reynolds', 'Beeblebrox']
```

### Array Maps Doubling
```
const nums = [1, 2, 3, 4, 5]

// Internal callback
// ----------------------------------------------------------------------
const doubles = nums.map(x => x * 2)

console.log(doubles)
// expected output: Array [2, 4, 6, 8, 10]

// External callback
// ----------------------------------------------------------------------
const doubler = function(x) {
    return x * 2
}

const doubles2 = nums.map(x => {
    return doubler
})

console.log(doubles2)
// expected output: Array [2, 4, 6, 8, 10]
```

**see array-map.js for code examples**

## Section 8 The Filter Method

The `filter` method is a separator, we give it a function with the logic to distinguish the items we want, and filter runs item in the array through that function. In the end, it creates a new array that contains only the elements that our function allowed. So the ONLY difference between filter and map, is that map performs a function on every item in an array to change each item, and filter uses a function on every item in an array to decide if that value should be kept or discarded. This means that one key difference between map and filter, is that the callback function you call on every item in a filter method must return either true or false. If it returns true, the value will be kept; if it returns false, that value is discarded.

### Code Example

Filter is easiest to learn when you play around with it. Below, you can see how a filter is applied to the `values` list. This function is looking to see if each value in the array resolves to ‘true’ or not. So the ‘filter’ function we are running looks like this: `(v == true)`, where ‘v’ is each value in turn. Only array items where this condition is ‘true’ will be included in the new array ‘result’.
```
const values = ['true', true, 'yes', 'no', 1, 0, 'false', false];

const result = values.filter(v => v == true);

console.log(result);
// expected output: Array [true, 1]
```
You’ll get to see and practice using filter in the next workspace. You can also check out Mozilla, which has great information on all of these array methods.

## Section 9 The Reduce Method

The `map` and `filter` methods have a lot in common, they both:

- Run a function (callback given by the developer) on every item in an array.
- Pass three arguments to the function (item value, item index, whole array).
- Return a new array.

The `reduce` method has some slight differences. From the name you might be able to guess that this method boils our array down to a **single value**.

For example, if you have an array of products, each with a price, you could use reduce to boil down that entire array to a single value like the total cost. You write a function to add the current item's cost to the running total of all products and reduce will run that function on the array until it runs out of items and the total is found.

To do this, reduce only passes the function **two arguments**, the total so far - or **accumulator**, and the **current item value**. Another way that it differs from the first two array methods is that it does not necessarily return an array. In the case of the example above, reduce would return a single integer of the total cost.

### Code Example

Below, you can see how reduce is applied to the sales list. Reduce goes through the list sales and adds the individual value to a running total which is what will ultimately be returned by reduce. The final output of reduce on sales will be 147.49.
```
const sales = [120.00, 19.99, 3.50, 4.00];

const total = sales.reduce((runningTotal, currentValue) => {
    console.log(runningTotal, currentValue)
    return runningTotal + currentValue
})

// cycle 1: 120 19.99
// cycle 2: 139.99 3.5
// cycle 3: 143.49 4

// expected output: 147.49

// If you can follow the code above - great job! No one masters the reduce method overnight, but being able to follow the code is the first step. Below are two examples of alternate syntax that you might also see out in the wild. Can you follow these?

//  SAME AS:
const reducer = (runningTotal, currentValue) => runningTotal + currentValue;
console.log(sales.reduce(reducer));

// Look! You can even run map, filter, and reduce on array literals!
// SAME AS:
[120.00, 19.99, 3.50, 4.00].reduce((runningTotal, currentValue) => {
    return runningTotal + currentValue
})
```
**see array-reduce.js for code examples**

### Summary

`Map `- The map method iterates over every item in the array it is called on, and performs one action on each item. The action logic is held in a callback function. The map method returns a new array that is the same length as the original array, but with the items updated according to the callback function logic.
`Filter` - The filter method iterates over every item in the array it is called on, and runs each item through a pass or fail checking logic. The logic is held in a callback function which must return either true or false. The filter method returns a new array that is shorter than the original array (or potentially the same length, if all values passed successfully through the callback), but the values that pass through will be unchanged.
`Reduce` - The reduce method iterates over every item in the array it is called on, and keeps one value (for instance, the sum of all prices). Each item in the array is forgotten, and the end result is a single value. The uses of reduce vary greatly depending on your need, and it is typically the hardest one of the three array methods to master because though its logic is not complicated, its use cases can be very creative.

## Section 14 Array Methods for Selection

### Flat

Sometimes we have to deal with arrays within arrays - also called **multidimensional arrays**. The bigger and more nested multidimensional arrays get, the harder they become to wrap your head around, and accessing information can be a headache. `flat` is a tool that allows you to undo array nesting to exactly the level you want.

#### Code Example

In the following code, `flat` is applied to arrays: `nestedArr` and `moreNested`. The first instance with `nestedArr`, flat takes away the higher level of nesting. But with `moreNested` we can see when flat takes in an integer parameter, it will flatten 2 levels of nesting. This returns an array without any nesting.
```
var nestedArr = [1, 2, [3, 4, [5, 6]]];
nestedArr.flat();
console.log(nestedArr)
// expected output: [1, 2, 3, 4, [5, 6]]

var moreNested = [1, 2, [3, 4, [5, 6]]];
moreNested.flat(2);
console.log(moreNested)
// expected output: [1, 2, 3, 4, 5, 6]
```

### Find

Locating unique values in arrays is another indispensable ability. JavaScript `find` and Includes methods perform similar actions, but their use cases differ. Here are their Mozilla definitions side by side:

**Find Method**

`find` returns the value of the **first** element in the provided array that satisfies the provided testing function.

**Include Method**

`includes `determines whether an array contains a certain value among its entries, returning **true or false** as appropriate.

`find` is most useful when you are not looking for a specific value. It is best to use `find` when you want to see if any item in array meets a criteria. In this way, `find` is a little bit like`filter`, in that they both run every item in array through a function to determine if the item passes the function’s requirement. But, `find` is a little bit simpler in that it only passes a single argument (the current value) and returns a single value from the array (the first one to pass the function’s test).

#### Code Example

The code below shows that if no value in the array is found to meet the criteria, `undefined` will be the result. Also, if there are multiple items that match the criteria, it does not change the output.
```
const bestBars = [
    'Mos Eisley Cantina',
    'Clark`s Bar',
    '10 Forward',
    'The Restaurant at the End of the Universe',
    'The Prancing Pony',
    '10 Forward',
]

const test1 = bestBars.find(x => x === 'Quark`s Bar')
const test2 = bestBars.find(x => x === '10 Forward')

console.log(test1) //expected output: undefined
console.log(test2) // expected output: 10 Forward
```

### Include

`includes` is most useful when are looking for the existence of a specific value. All you have to do is provide the value you are looking for, and includes will return *true* if it finds it and *false* if it does not.

It is good to note that neither find nor includes is a good tool to use if you need to know how many times a value is found in an array. To do that, you would have to use map or filter.

#### Code Example

In the following code, you can see that includes only returns a `true` or `false` value. Includes can also be used on strings.
```
const bestBars = [
    'Mos Eisley Cantina',
    'Clark`s Bar',
    '10 Forward',
    'The Restaurant at the End of the Universe',
    'The Prancing Pony',
    '10 Forward',
]

const test1 = bestBars.includes('Quark`s Bar')
const test2 = bestBars.includes('The Prancing Pony')

console.log(test1) // expected output: false
console.log(test2) // expected output: true
```
**see flat-find-include.js for code examples**

