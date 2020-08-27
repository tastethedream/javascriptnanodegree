# Lesson 3 Functional JS Syntax

## Section 17 Variables

### let

`let` is like `var` in that a value can be edited after it has been declared, but the scoping rules are a bit different between the two.

### const

`const` is what we are going to focus on in this course, and right now, we are just going to look at how const does not go far enough to really be considered functional. In the following example, take a close look at how the consts `‘currentBook’` and `‘bookDetails’` behave differently. We can’t edit` ‘currentBook’` - as expected - but we CAN edit `‘bookDetails’`. Feel free to run and edit the code below to get a feel for what you can and can’t do.
```
const currentBook = 'The Time Machine'

const bookDetails = {
   title: 'The Time Machine',
   author: 'H. G. Wells',
   totalPages: 84,
   currentPage: 42
}

const library = ['Dune', 'Nineteen Eighty-Four', 'Ender`s Game', 'Hyperion', 'Fahrenheit 451']

currentBook = 'Stranger in a Strange Land'
// results in error, can't edit const value

bookDetails = {
   title: 'I, Robot',
   author: 'Isaac Asimov',
   totalPages: 253,
   currentPage: 21
}
// results in error, bookDetails is read-only

bookDetails.currentPage = 75
// this works! We can update values within a const object

library = ['Dune', 'Nineteen Eighty-Four']
// results in error, can't redeclare library

library.concat('The Hitchiker`s Guide to the Galaxy')
// this works! We can update items in the array or add to it
// Note that concat is the best non-mutative way to add items to an array
```
## Section 18 Object Methods

### Object Method Freeze

**Object Freez**e is one way to deal with the shortcomings of const to ensure that objects cannot be changed. This is the Mozilla definition object freeze:

>A frozen object can no longer be changed.” A frozen object can have no properties added to it, removed from it, or its values edited. It effectively makes an immutable object.

**see object-freeze.js for working code example**

## Section 20  Object Method Keys

This method returns an array of strings of all an object’s property names. This is unusual because most methods we run on objects are more interested in the values.

Be aware though, this won’t always get the results you think. Along with the properties you are aware of in an object, this might also return other properties belonging to the prototype.

### Example Code

The following code shows how to use the Object.keys method when applied
```
const character = {
    id: '12mn18udcbv9823',
    name: 'Chewbacca',
    race: 'Wookie',
    planet: 'Kashyyyk',
    job: 'First Mate'
};

console.log(Object.keys(character));
// expected output: Array ["id","name","race","planet","job"]
```
**see object-keys.js for working example**


## Section 22 Object Method Assign

The object `assign` method copies the properties from a source object to a target object. All properties in the source object that aren’t in the target will be created on the target, and any property both objects share, the values will be updated to match the source object. Here is the object assign Mozilla page. **This method is most useful when you want to combine two objects or update one object when it is edited.**

```
Code Example
let state = {
    name: 'Wash',
    favoriteThing: {
        item: "Not complicated"
    },
    ship: {
        name: 'Serenity',
        class: 'Firefly'
    }
    role: 'Pilot',
    favoriteThing: { 
        item: "Toy", 
        details: {
                type: 'Toy Tyrannosaurus Rex'
        }
    }
}

console.log(state)
// expected output:
//{ name: 'Wash',
//  ship: { name: 'Serenity', class: 'Firefly' },
//  role: 'Pilot',
//  favoriteThing: { item: 'Toy', details: { type: 'Toy Tyrannosaurus Rex' } } }

const newState = {
    name: 'Mal',
    role: 'Captain',
    favoriteThing: {
        item: "Not complicated"
    },
    history: ["Browncoat sergeant"]
}

state = Object.assign(state, newState);
// Object.assign(target, source)

console.log(state)
// expected output:
// { name: 'Mal',  ship: { name: 'Serenity', class: 'Firefly' },
//  role: 'Captain',
//  favoriteThing: { item: 'Not complicated' },
//  history: [ 'Browncoat sergeant' ] }
```

