# Lesson 4: Object Oriented Design Patterns

## Section 2 : Mixins/ Extending Object Functionality with Mixins

### An Object is Prototype-linked to a Single Object
Recall that an object's `.prototype` property points to just one object. This is because JavaScript only supports single inheritance. If there is an object A and an object B, object C can only be prototype-linked to either A _or_ B.

#### image
https://video.udacity-data.com/topher/2018/July/5b3a8d8e_singlez/singlez.png

### QUESTION 1 OF 3
What is true about the following? Select all that apply:
```
const aircraft = {
  flies: true
};

const helicopter = Object.create(aircraft);

console.log(helicopter.flies);
// true
```
**The helicopter object has no properties of its own**

**helicopter is prototype-linked to aircraft**

The given code is just a basic example that reflects prototypal inheritance. although the `helicopter` object is "blank" (i.e., with no properties of its own), it is prototype-linked to the `aircraft` object. This allows `helicopter` to access aircraft's properties as if it were its own.

however, it is important to note that the `helicopter` object's `__proto__` property can only point to a single object: `aircraft`. so since inheritance in javascript is based on prototype.

### Mixins

If a JavaScript object can only be prototype-linked to a single object, how can we go about extending properties and methods from multiple different sources? A mixin allows us to just that!

**A mixin is a technique that takes the properties and methods from one object and copies them over to another object**. In other words: a mixin is an technique that provides some useful functionality, but is not meant to be added to the prototype chain.

### Object.assign()

The simplest way to implement the mixin pattern is to use `Object.assign()`. `Object.assign()` is a method that copies an object's own (non-inherited) properties from one or more source objects into a target object, then returns the updated target object.  `Object.assign()` adds to the target object by *merging* in the source object(s). Consider the following:
```
let target = {};

let source = { number: 7 };

Object.assign(target, source);

console.log(target);
// { number: 7 }
```
The first argument passed in, `target`, is the destination that receives the properties copied from the source object, source. Note that `Object.assign()` does not create and return a new object; it directly modifies then returns the same target object that was passed in! As such, values of existing properties will be overwritten, while properties that don't exist in the source object will remain intact:
```
let target = { letter: 'a', number: 11 };

let source = { number: 7 };

Object.assign(target, source);

console.log(target);
// { letter: 'a', number: 7 }
```
In the above example, the value of target's number property was overwritten, while its letter property was ignored.

### Multiple Source Objects 

`Object.assign()` can even take in multiple different source objects. Let's create a `platypus` object by mixing in properties from other animals:
```
const duck = {
  hasBill: true
};
const beaver = {
  hasTail: true
};
const otter = {
  hasFur: true,
  feet: 'webbed'
};

const platypus = Object.assign({}, duck, beaver, otter);

console.log(platypus);
// { hasBill: true, hasTail: true, hasFur: true, feet: 'webbed' }
```
Great! After merging an **empty target object** (i.e., an object without properties of its own) with the properties from `duck`, `beaver`, and `otter`, the target object is returned with all four properties. It is important to note that the `platypus` object is not prototype-linked to the three other objects! That is, `platypus` doesn't exist in any of the three source objects' prototype chains, and vice versa:
```
platypus.constructor;
// Object()

platypus.isPrototypeOf(duck);
// false

duck.isPrototypeOf(platypus);
// false

platypus.isPrototypeOf(beaver);
// false

beaver.isPrototypeOf(duck);
// false

platypus.isPrototypeOf(otter);
// false

otter.isPrototypeOf(platypus);
// false
```
### Order Matters
```
const duck = {
  hasBill: true,
  feet: 'orange'
};
const beaver = {
  hasTail: true
};
const otter = {
  hasFur: true,
  feet: 'webbed'
};

const platypus = Object.assign({}, duck, beaver, otter);

console.log(platypus);
```
In the above code both `duck` and `otter` have the property `feet`. `platypus` will display **feet webbed** as `otter` was added to the `Object.assign` **last** .

### QUESTION 2 OF 3
Let's modify the above code a bit. What is true after the following?
```
const duck = {
  hasBill: true
};
const beaver = {
  hasTail: true
};
const otter = {
  hasFur: true,
  feet: 'webbed'
};

const platypus = Object.assign(duck, beaver, otter);
```
**The first argument passed into `Object.assign()` is the target object. as such, `duck` is directly mutated: properties and methods of the source objects are mixed into `duck` entirely. And since objects are passed by reference, `platypus` and `duck` now point to the same object!**

### QUESTION 3 OF 3
What is true about multiple inheritance or mixins? Select all that apply:

**A mixin supplies properties and/or methods that can be shared**

**We can leverage Object.assign() to "mix in" properties and methods from a number of objects into a composite object**

### Summary
A **mixin** is a technique that copies data and functionality from a source object (or source objects) to a target object. We can use ES6's `Object.assign()` to return a target object with properties from one or more source objects *"mixed into"* that target object.

### Further Research
Object.assign() on MDN (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

## Section 3 : Functional Mixins

### Remember Constructor Functions?

We previously used a constructor function to create a new object:
```
function City(name, population) {
  this.name = name;
  this.population = population;

  this.identify = function () {
    console.log(`${this.name}'s population is ${this.population}.`);
  };
}
```
To instantiate, we invoke the function with the new operator:
```
const sanFrancisco = new City('San Francisco', 870000);

console.log(sanFrancisco);
// {
//   name: 'San Francisco',
//   population: 870000,
//   identify: function () {
//     console.log(`${this.name}'s population is ${this.population}.`);
//   };
// }
```
We can use the same constructor to create multiple objects:
```
const mountainView = new City('Mountain View', 78000);

console.log(mountainView);
// {
//   name: 'Mountain View',
//   population: 78000,
//   identify: function () {
//     console.log(`${this.name}'s population is ${this.population}.`);
//   };
// }
```
Again, note that we used the `new` keyword each time to create a new object. Let's now shift gears a bit to **factory functions** which produce object instances without the use of the `new` operator!

### Factory Functions
A factory function is a function that returns an object, but isn't itself a class or constructor. As such, we invoke a factory function as a normal function without using the `new` operator. Using a factory function, we can easily create object instances without the complexity of classes and constructors!

Check out the following `Basketball()` factory function:
```
function Basketball(color) {
  return {
    color: color,
    numDots: 35000
  };
}
```
What's important to note here is that `Basketball()` returns an object **directly**. This is different from a constructor function which returns its object automatically.

Let's invoke `Basketball()` and check out its output:
```
const orangeBasketball = Basketball('orange');

console.log(orangeBasketball);
// { color: 'orange', numDots: 35000 }
```
A factory function has its name because, just like a chair factory can produce chair after chair after chair, a factory function can be used over and over to create any number of objects:
```
const myBB = Basketball('blue and green');
const yourBB = Basketball('purple');
const bouncy = Basketball('neon pink');
```
Invoking the factory function allows us to compose a single object -- all without the use of the `new` operator. Before we take a look at a more complex example, let's summarize the differences between a factory function and a constructor function:

### factory vs constructor table

https://video.udacity-data.com/topher/2018/July/5b3a918f_screen-shot-2018-07-02-at-1.56.13-pm/screen-shot-2018-07-02-at-1.56.13-pm.png

### A factory function that returns a closure
```
function Radio(mode) {
  let on = false;

  return {
    mode: mode,
    turnOn: function () {
      on = true;
    },
    isOn: function () {
      return on;
    }
  };
}

let fmRadio = Radio('fm');

fmRadio.on;
//undefined

fmRadio.isOn();
// false

fmRadio.turnOn();

fmRadio.isOn();
```
### Functional Mixins

A **functional mixin** is a composable factory function that receives a _mixin_as an argument, copies properties and methods from that mixin, and returns a new object. Check out the following example: `CoffeeMaker()`:
```
function CoffeeMaker(object) {
  let needsRefill = false;

  return Object.assign({}, object, {
    pourAll: function () {
      needsRefill = true;
    },
    isEmpty: function () {
      return needsRefill;
    }
  });
}
```
Note that unlike a standard factory function, which takes in individual property values as arguments -- the functional mixin actually takes in an **object itself!** Whichever object is passed in to the function, is merged with other objects passed into `Object.assign()`.

Let's pass the following `percolator` object into `CoffeeMaker()` and view the results:

`const mixedCoffeeMaker = CoffeeMaker({ style: 'percolator' });`

The returned `mixedCoffeeMaker` object now looks like:
```
{
  style: 'percolator',
  pourAll: function () {
    needsRefill = true;
  },
  isEmpty: function () {
    return needsRefill;
  }
}
```
Now, one of the great things about functional mixins is that they are composable; we can use them as individual pieces of code that add specific properties like an assembly line.....
```
function IceCreamFactory(obj) {
  let isCold = true;

  return Object.assign({}, obj, {
    melt: function () {
      isCold = false;
    },
    isCold: function () {
      return isCold;
    }
  });
}

let iceCream = IceCreamFactory({});

function ConeFactory(obj) {
  let isDry = true;

  return Object.assign({}, obj, {
    soggy: function () {
      isDry = false;
    },
    isDry: function () {
      return isDry;
    }
  });
}

let iceCreamCone = IceCreamFactory(ConeFactory({}));

console.log(iceCreamCone);
```
### Summary
A factory function creates objects. It is invoked as normal function, *not* with the `new` operator. Functional mixins take things a bit further by accepting a mixin as an argument, copies properties and methods from the mixin, and returns a new object.

### Further Research
JavaScript Factory Functions vs Constructor Functions vs Classes by Eric Elliott (https://medium.com/javascript-scene/javascript-factory-functions-vs-constructor-functions-vs-classes-2f22ceddf33e)
Factory Function Pattern In-Depth by Ronald Chen (https://medium.com/@pyrolistical/factory-functions-pattern-in-depth-356d14801c91)

## Lesson 4: The Module Pattern

### Private Properties: Literal
By default, most things things are publicly accessible in JavaScript. We can use **closure** to make certain parts of an app private, but what if we want to prevent access to a property directly? That is, how would we make a property or method private so it's inaccessible from the outside world? To lend a bit more context, check out a plain object literal handles privacy:
```
let developer = {
  name: 'Veronika',
  getName: function () {
    return this.name;
  }
};
```
We can access the string value `'Veronika'` with the `getName` method, as well as directly by accessing the developer object's name property:
```
developer.getName();
// 'Veronika'

developer.name;
// 'Veronika'
```
However, what happens when we reassign the object's name property?
```
developer.name = 'Not Veronika';

developer.getName();
// 'Not Veronika'

developer.name;
// 'Not Veronika'
```
This sort of open access makes developers uncomfortable. Since we can directly access and mutate an object's properties, we would like a way to implement private properties.

### Private Properties: Function
Let's look into another option: using a function. What if we create a basic function that just returns an object? Does this give the object an adequate level of protection?

Let's look a bit more closely. Check out the following `instantiateDeveloper()` function:
```
function instantiateDeveloper() {
  return {
    name: 'Veronika',
    getName: function () {
      return this.name;
    }
  };
}
```
Nothing too surprising -- just a basic function that returns an object with two properties: `name` and `getName`. Let's go ahead and invoke the function and get the returned object. We'll assign the returned object to a variable, `developer`:
```
let developer = instantiateDeveloper();
```
As it turns out, the string `'Veronika'` is still accessible, because the two aforementioned properties still exist in the object being returned from `instantiateDeveloper()`:
```
developer.getName;
// 'Veronika'

developer.name;
// 'Veronika'
```
Along with direct access, we can mutate and reassign the value of the name property as well:
```
developer.name = 'Not Veronika';

developer.name;
// 'Not Veronika'
```
Wrapping an object within a function doesn't seem too effective either. So, how can we go about making an object's properties private?

### No Private Properties

Since JavaScript has _no_ concept of private properties out-of-the-box, there is no special syntax or keyword we can use to protect certain properties from being accessed.

However, there is hope! Recall from earlier lessons that we can use **scope** and **closures** to create a private state. Let's look at a quick refresher:
```
function myCounter() {
  let count = 0;

  return function () {
    count += 1;
    return count;
  };
}

let counter = myCounter();
```
Note that the `myCounter()` function closes over the count variable. The value of count increments as the function is called:
```
counter();
// 1

counter();
// 2
```
However, there is no way that any method outside the closure itself can access count:
```
counter.count; 
// undefined

count; 
// undefined
```
So, closure provides a way to create private data. How can we leverage these same techniques -- with scope and closures -- to create private properties and methods in an object?

### The module pattern
```
let person = (function () {
  let name = 'Veronika';

  return  {
    getName: function () {
      return name;
    },
    setName: function (myName){
      name = myName;
    }
  };
})();

person.name;
// undefined
person.getName;
// 'Veronika'

person.setName('Not Veronika');
person.getName;
// 'Not Veronika'
```
### The Module Pattern: Recap
Before moving on to the next section, let's make sure we're on the same page regarding the Module Pattern. We'll be improving upon it in the very next section! Consider the following:
```
let diana = (function () {
  let secretIdentity = 'Diana Prince';

  return {
    introduce: function () {
      console.log(`Hi! I am ${secretIdentity}`);
    }
  };
})();
```
Recall that one of the key ingredients here is the **IIFE!** Not only does it prevent pollution of the global scope (which hinders the chance of variable name collisions) -- the IIFE helps prevent access to the secretIdentity variable.
```
console.log(diana.secretIdentity);

// undefined
```
And because the returned object's `introduce()` method retains access to its parent function's scope, we are given a public interface to interact with secretIdentity:
```
diana.introduce();

// 'Hi! I am Diana Prince'
```
### Other Benefits of the Module Pattern
The Module Pattern is commonly used to create private properties in JavaScript, but there are quite a few other benefits of incorporating the Module Pattern in code that you write as well. For one: organization. Modules are a larger unit of organization than, say, functions or objects. This helps partition code and provide structure as an application scales.

Keep in mind, however, that you generally use the Module Pattern when you just want **one "version"** of an object. If you're looking to instantiate unique objects that follow a certain blueprint, you can always still write and invoke a constructor function!

### QUESTION 3 OF 3
What is true about the Module Pattern? Select all that apply:

**The Module Pattern uses closures to create private properties**

**The Module Pattern requires the use of IIFE's**

**Unlike calling a constructor function, implementing the Module Pattern returns just one version of an object**

### Summary
Since JavaScript doesn't have private variables, properties, or methods built-in, we can leverage the Module Pattern to enforce such privacy. At its core, the Module Pattern leverages scope, closures, and (commonly) IIFE's to not only hide data from external access, but to also provide a public interface for such data.

### Further Research
Addy Osmani's The Module Pattern (JavaScript Design Patterns)(https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)
Todd Motto's Mastering the Module Pattern (https://toddmotto.com/mastering-the-module-pattern/#private-methods)

### The Revealing Module Pattern
The underlying philosophy of the Revealing Module Pattern is that, while we still maintain encapsulation (as in the Module Pattern), we also reveal certain properties (and methods). The key ingredients to the Revealing Module Pattern are:

1. An IIFE (wrapper)
2. The module content (variables, methods, objects, etc.)
3. turned object literal


### Another Example
```
let person = (function () {
  let privateAge = 0;
  let privateName = 'Andrew';

  function privateAgeOneYear() {
    privateAge += 1;
    console.log(`One year has passed! Current age is ${privateAge}`);
  }

  function displayName() {
    console.log(`Name: ${privateName}`);
  }

  function ageOneYear() {
    privateAgeOneYear();
  }

  return {
    name: displayName,
    age: ageOneYear
  };
})();
```

In the above snippet, the IIFE has some private data: `privateAge`, `privateName`, and `privateAgeOneYear()`. The returned object is stored in person and provides a public interface through which we can access this data!

Let's first check out what the returned person looks like:
```
{
    name: displayName,
    age: ageOneYear
};
```
Note that the `name()` method reveals the otherwise private `displayName()` function:
```
console.log(person.name());

// 'My name is Andrew'
```
However, what happens if we try to access and mutate privateName?
```
person.privateName = 'Richard';

console.log(person.name());
// 'My name is Andrew'
```
`person.name()` still produces the string `My name is Andrew!` Why don't we see the string `'Richard'` in the returned string?

Pay close attention to what the first line of code is actually doing: it simply adds a `privateName` property to the `person` object. It has no effect on the `privateName` variable that exists inside the IIFE itself! If we look at the `person.name()` function, it is using the `privateName` variable that exists inside the IIFE. So even if we add a `person.privateName` property, the `person.name()` method doesn't ever try to access it.

Note that accessing `displayName()` directly won't be effective, either! This should come as no surprise, since `displayName()` is just a function defined inside the IIFE (i.e., `displayName()` is not a property in the returned object).
```
console.log(person.displayName());

// undefined
```
Likewise, the Revealing Module Pattern also gives us access to the captured `privateAge` variable, via the returned object literal's `age()` method:
```
console.log(person.age());

// 'One year has passed! Current age is 1'

console.log(person.age());

// ''One year has passed! Current age is 2'
```
### QUIZ QUESTION
Which concepts make up the Revealing Module Pattern? Select all that apply:

**IIFE**

**Local variables/functions**

**Returned object literal with keys that point to data intended to be revealed**

### Benefits of the Revealing Module Pattern

When writing your modules, there are a few key advantages of using the Revealing Module Pattern. 
For one, there is clarity at the end of the module (i.e., the return statement) as to which variables or methods may be accessed publicly. Modules may grow large, and this eases readability for other developers who read your code.

Along with clear intent of public or private data, the Revealing Module Pattern lends itself to consistent syntax as well. In contrast, the normal Module Pattern may contain variables and functions spread throughout the entire function body.

While you can't go wrong with either approach to create private properties in your code, be sure to take the time and choose which makes the most sense for your project!

### Summary
The Revealing Module Pattern is a slight variation on the Module Pattern. IIFE's, local variables/functions, and a returned object literal with revealed data make up the structure and syntax of the Revealing Module Pattern. While it still maintains encapsulation of data, certain variables and functions are returned in an object literal.


### Further Research
Addy Osmani's The Revealing Module Pattern (JavaScript Design Patterns)(https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript)
Christian Heilmann's Again with the Module Pattern – reveal something to the world (https://christianheilmann.com/2007/08/22/again-with-the-module-pattern-reveal-something-to-the-world/)


