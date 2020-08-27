# Intermediate JavaScript NanoDegree

## Module 3 Functional Programming

### Lesson 5 Going Further with Functional JS

 #### Section 2 Persistant Data Structures

 [immutable data structures](https://youtu.be/Wo0qiGPSV-s)

 - **Immutable data** just sits there and never changes

- copying wastes time and space

 - **persistant data structures**  -  you have access to old versions

 - **partially persistant** - read only access to old versions

- **fully persistant** - updating the old data is possible (like git)

- **trees and sharing** allow you to manage the old data

##### Trees

data is split into nodes, select the node that contains the data you want to change and copy it and make the change in the new node,  then select all the nodes that connect to it all the way to the root and copy those too (**path copying**)

**Structural sharing** sharing the structure of the tree between the two versions of the data

##### Accessing the data

**TRIE** - the leaves gold the values and tha paths represent keys

##### Example

First, we will create a class - we’ll call it` PersistentArray`. We are creating a class because it is the easiest way to wrap an array with extra functionality. Again, this wouldn’t really be something you would use in a real application, it is only an example to highlight some of the features of a persistent data structure. So here is our new kind of persistent array:
```
class PersistentArray {
        constructor(items = []) {
                this.persistentArray = items
        }
}

const a = new PersistentArray([1, 2, 3])
console.log("A", a)
```
You can see that `PersistentArray` takes in an array of items or defaults to an empty array if no arguments are provided. Then our class has a property of `persistentArray`, this will be a normal javascript array.

Now imagine that we want to add a new item to this array. But we can’t just push a new value onto the array, because we can’t edit the original. So our `PersistentArray` class isn’t going to let us edit the original, it is going to five us a new array with the change made on that array by default. We are going to implement our own “push” method to work on our `PersistentArray`.
```
class PersistentArray {
        constructor(items = []) {
                this.persistentArray = items
        }

        push(newItem) {
             return new PersistentArray(this.persistentArray.concat(newItem))
         }
}

const a = new PersistentArray([1, 2, 3])
console.log("A", a)

const b = a.push(4)
console.log("A", a)
console.log("B", b)
```

You can see now that we are creating a **push** method which takes in one new value and returns a **whole new class instance** with an array that contains the new item. And you can see when we console log the results that array A is unchanged and the new array B contains the array with ‘4’ added to it. So in persistent data structures, you can see that once a value is created it can never be changed.

Where our example differs from a truly persistent data structure - and why this is such a naive example - is the memory sharing. When our custom push method creates the new class instance, it takes up an entirely new spot in memory, it is saved as its own entity. But in a true implementation of this, array A and array B would share memory, only differing by one node (the new ‘4’ value we added to B).

So now let’s explore the other side and implement a pop method. Take a look at this code.
```
class PersistentArray {
    constructor(items = []) {
                this.persistentArray = items
    }

    push(newItem) {
                return new PersistentArray(this.persistentArray.concat(newItem))
    }

    pop() {
                let poppedArray = [...this.persistentArray]
                poppedArray.pop()
                return new PersistentArray(poppedArray)
    }
}

const a = new PersistentArray([1, 2, 3])
console.log("A", a)

const b = a.push(4)
console.log("A", a)
console.log("B", b)

const c = a.pop()
console.log("A", a)
console.log("B", b)
console.log("C", c)
```
Our custom **pop** method does mostly the same thing as **push** in that it returns a new instance of the class with an array containing the changes.

[immutable js video](blob:https://www.youtube.com/0b4060dd-f6c8-449f-9b58-9f1c2b415ee5)

#### Section 3 Immutable JS

**using immutable js** 
```
// Put this in an html page
<script src="https://cdnjs.cloudflare.com/ajax/libs/immutable/3.8.2/immutable.min.js"></script>
```

```
// Getting and Setting values

// Immutable objects are called ‘maps’
// this is how we declare an immutable Object
const map1 = Immutable.Map({ 
    name: 'Wash',
    ship: {
        name: 'Serenity',
        class: 'Firefly'
    },
    role: 'Pilot',
    favoriteThing: {
        item: "Toy",
        details: {
            type: 'Toy Tyrannosaurus Rex'
        }
    }
});

const map2 = map1.set('b', 50);
map1.get('b'); // 2
map2.get('b'); // 50
console.log(map2.get('b'))

// equality check
map1.equals(map2); // false
console.log(map1.equals(map2))

// Use with ordinary objects
const state1 = Immutable.Map({ a: 1, b: 2, c: 3, d: 4 });
const state2 = Immutable.Map({ c: 10, a: 20, t: 30 });
const obj = { d: 100, o: 200, g: 300 };
const map3 = state1.merge(state2, obj);
console.log(map3)

// If you open the returned object, you can see that it isn't an ordinary object
// you'll find all the properties under "entries"

// Use with ordinary arrays
// An immutable array is declared like this:
const numbers = List([1, 2, 3]);

//But Immutable can also work with plain JS arrays
const otherNumbers = [4, 5, 6]
```

##### RxJS

Before we review ImmutableJS exercise solution you can go to RxJS-playground and load the following code to run some RxJS code.

// Browsers won't run RxJS code on their own, but thankfully RxJS created a tool called the RxJS playground! 
// Take the code below and paste it into https://rxjs-playground.github.io/#/ to see it run

```
// A function runs once and returns one set of information
// An observable is like a function that runs for a period of time and can return many sets of information - a stream of information

const observable = new Rx.Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2); // "return" another value
  subscriber.next(3); // "return" another value
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

console.log('just before subscribe');

observable.subscribe({
  next(x) { console.log('got value ' + x); },
  error(err) { console.error('something wrong occurred: ' + err); },
  complete() { console.log('done'); }
});

console.log('just after subscribe');

// the word 'next' is a special RxJS observable word that allows the observable to "return" multiple things over a period of time


// There are three types of values an Observable Execution can deliver:

// "Next" notification: sends a value such as a Number, a String, an Object, etc.
// "Error" notification: sends a JavaScript Error or exception.
// "Complete" notification: does not send a value.

// "Next" notifications are the most important and most common type: they represent actual data being delivered to a subscriber. 
// "Error" and "Complete" notifications may happen only once during the Observable Execution, and there can only be either one of them.
```

#### Section 6 Implementing ImmutableJS

**Introduction**
There are many options when it comes to implementing ImmutableJS. You can install it as an npm module, grab it with a script in the browser, or use it in a Typescript project. The recommended way is to use the npm module. However, for the workspace environment that we are using in this course, we are going to use the browser script just to test it out. For use in the course project though, you should use the npm module.

**WATCH OUT!** One important thing to note is that nested objects have to be declared as Immutable maps just like top level ones. Otherwise, they will be stored as normal JS objects, which Immutable handles differently. You can see the difference below.
```
// Nest 1
const currentShow = Immutable.Map({
    title: 'Dr. Who',
    seasons: 11,
    currentSeason: 4,
    characters: {
        main: 'The Doctor',
        supporting: ['Dalek1']
    }
})

// Nest 2
const currentShow = Immutable.Map({
    title: 'Dr. Who',
    seasons: 11,
    currentSeason: 4,
    characters: Immutable.Map({
        main: 'The Doctor',
        supporting: List(['Dalek1'])
    })
})
```
`Nest 1` is not the same as `Nest 2`. The main difference is that the nested object characters is declared with **Immutable.Map** in `Nest 2`. characters in `Nest 1` will not be immutable while characters in `Nest 2` will be.

#### Summary

Immutable makes it possible for us to write even better Functional code - or just better code in general - without being a big task to learn, which makes it a big win to me. If you want to look further into the how’s and the why's of Persistent Data Structures and ImmutableJS, a great place to start is their well-written documentation. 

[immutable code github] (https://immutable-js.github.io/immutable-js/)

#### Section 9 RxJS and Rambda

#### The observer design pattern

You create an object that does things, that object can have a list of **observers** If the object changes pr updates state it can updates its **observers** on that change. 

```
// A function runs once and returns one set of information
// An observable is like a function that runs for a period of time and can return many sets of information - a stream of information

// An observable returns a stream of information
// An observer (here, observable.subscribe) is how we ‘listen’ or subscribe to data being returned by an observable.

const observable = new Rx.Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2); // "return" another value
  subscriber.next(3); // "return" another value
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

console.log('just before subscribe');

observable.subscribe({
  next(x) { console.log('got value ' + x); },
  error(err) { console.error('something wrong occurred: ' + err); },
  complete() { console.log('done'); }
});

console.log('just after subscribe');

// the word 'next' is a special RxJS observable word that allows the observable to "return" multiple things over a period of time


// There are three types of values an Observable Execution can deliver:

// "Next" notification: sends a value such as a Number, a String, an Object, etc.
// "Error" notification: sends a JavaScript Error or exception.
// "Complete" notification: does not send a value.

// "Next" notifications are the most important and most common type: they represent actual data being delivered to a subscriber. 
// "Error" and "Complete" notifications may happen only once during the Observable Execution,
```

#### Ramda

Ramda is a library of functions that help JavaScript developers write better Functional code. Where RxJS is a whole new way to think about and interact with data streams and events, Ramda’s goal is to do an excellent job of providing JavaScript developers with truly Functional tools, and a lot of developers think they have done a really good job at that.

**Some cool things about Ramda:**

Each function is self-contained, pure, side effect free, and does not mutate anything
Each function is written in JavaScript, so with the amount of JavaScript you know now, you can go to the source code and be able to understand how they built their function

**Some cool functions in Ramda:**

If you felt robbed when you learned that push, pop, etc. weren’t allowed in Functional programming - Ramda gives them back to you! Their array Update, Tail, Take, and TakeLast are all great options.

Ramda even takes it one step further and allows you to leave specific values out of an array using the function Without

Remember how we struggled with Object.assign not being functional? Well with Ramda’s Merge function - it can be. Merge does exactly the same as Object.assign, except it returns a new object.

Ramda Pluck is another great example. Knowing that developers often work with long arrays of objects, Pluck allows you to choose one property those objects share and will return a new array of just those values.

In the edge cases where you really want a functional method, but the pure JavaScript doesn’t support it, Ramda will be a great resource. So if you end up writing more Functional code, keep Ramda in mind as a great option for adding more Functional utility without changing your workflow.

#### Section 10 Functional Redux

Redux- A predictable state container for JavaScript apps

The actions of the reducer can be compared to a teller at a bank. As a bank patron (event) you want the teller to do something to your account such as withdraw, deposit, or create an account (actions) and the teller (reducer) is able to make changes to the vault (store) where your money (data) is stored.

#### Pure Functions in Redux

Redux is a library typically imported into larger applications and represents state in your application with a single Javascript object. Reducers are pure functions and their only job is to take an action and return the new state, which will be represented in the store. This is straight from their documentation:

“Reducers are just pure functions that take the previous state and an action, and return the next state.”

Oftentimes, reducers are written as functions that contain case statements. Take a look at this example reducer from their docs

```
import { createStore, combineReducers } from 'redux'
const SET_NAME = 'SET_NAME'
const SET_AGE = 'SET_AGE'
function user(state = initialUserState, action) {
   switch (action.type) {
       case SET_NAME: {
           return {
               ...state,
               name: action.name,
           }
       }
       case SET_AGE: {
           return {
               ...state,
               age: action.age,
           }
       }
   }
}
const ADD_TODO = 'ADD_TODO'
const COMPLETE_TODO = 'COMPLETE_TODO'
const initialState = {
   todos: []
}
function todos(state = initialState, action) {
 switch (action.type) {
   case ADD_TODO: {
       const { todos } = state
       return {
           ...state,
           todos: [...todos, action.todo],
       }
   }
   case COMPLETE_TODO: {
       const { todos } = state
       const index = todos.find(todo => todo.id == action.id)
       toods[index].comleted = true
       return {
           ...state,
           todos,
       }
   }
   default:
     return state
 }
}
const reducers = combineReducers({
   todos,
   user,
})
const store = createStore(reducers)
```
The ellipses before state simply means to return the original value for state, except where it is different from the portion of state that was updated, in this case, text and completed. Redux is a great example of how you can accomplish a lot by making good use of simple concepts.

**Functional Highlights of Redux**
Redux is a big topic and we don’t have time for all of it, but here are some of the Functional highlights of the Redux library:

- A read-only -- or immutable -- state. Reducers don’t update state; they return a brand new object.
- Pure Function reducers to handle Actions. This means that no actions in our entire app can be affected by Side Effects. This is a huge reason Redux is so effective.
- This careful Functional flow of data from event to store means that the same action, if called twice, will have the same effect on the whole application.