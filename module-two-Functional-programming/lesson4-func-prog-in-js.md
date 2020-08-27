# Intermediate JavaScript Nanodegree

## Lesson 4 Functional programming In JS

### Section 2 Intro

**Higher-Order Functions** are not only used in Functional programming but are a central part of Functional programs specifically. Higher-Order Functions (HOFs) allow us to string together many functions. HOFs have slightly different definitions across programming languages, but in JavaScript, you can say that a function is Higher-Order if it:

- Takes in a function as an argument (a callback)
- Returns a function

Often, you will see both of these happen in a single function.

We are already quite familiar with functions that take a callback. Map, Filter, and Reduce are all HOFs. When a function returns another function, it forms a closure around that function, typically to wrap it with extra functionality. HOFs are an important tool for creating more-complex Functional programs in JavaScript.

```
// Doubling
const nums = [1, 2, 3, 4, 5]
const doubles = nums.map(x => x * 2)

console.log(doubles)
// expected output: Array [2, 4, 6, 8, 10]

// Equivalent to:
const doubler = function (x) {
    return x * 2
}

const doubles2 = nums.map(doubler)

// inside map…
// doubler(1, 0, [1, 2, 3, 4, 5])

console.log(doubles2)
// expected output: Array [2, 4, 6, 8, 10]
```

### Section 7 Functional Data Manipulations

#### Quick tips for large data sets

1. Determine the data points and shape you need (shape??? is it an oject insode of an array etc)

2. Locate one individual to use as an example

3. Sometimes working up the data tree is easier than down 

4. Extract the information you need as soon as you can (grab out the info you need in the same function as the response)


![Data manipulation](https://github.com/tastethedream/javascriptnanodegree/blob/master/images/datamanipulationdomoverview.jpg "Data and DOM manipulation diagram")

### Section 10 Functional DOM Manipulations

Dealing with the DOM is inherently not Functional. As we learned in the last section, data can be handled well by Functional concepts and tools, but it is harder to imagine working with the DOM. In this section, we are going to create our own React-inspired program to create and update DOM elements. The goal is that by doing this, you will see where the Functional concepts come into play.

**You cannot reach the DOM without innerHTML and getElementById**

you need a simple HTML file with a single div with the ID of root

The send strings of HTML content

Here is an example od a function that calls innerHTML on root andf sends it a single div

```
const root = document.getElementById('root');

const render = root => {
    root.innerHTML = <div> I exist </div>
}

render(root)
```
**This is only suitable if there is only small amounts of layout to add**

```
const root = document.getElementById('root');

const render = root => {
    root.innerHTML = App()
}

const welcome = () => {
    return 'Welcome to my program'
}

const App = () => {
    return `
     <hi>${Welcome()}<h1>
     <div> I Exist </div>
}

render(root)
```
 **see render-method.js for working example**

 ### Section 12 Holding Application state

 We can now create elements in our JavaScript program and make them appear in the DOM, but now how do we hold onto values, take in data and do all the other things necessary for an interactive app? That is the focus of this section. We need a place to hold information. Our app is likely going to collect information from users or receive it from an API, and we need an organized way to handle it all. Functional Programming stays away from the global state, but to do without it entirely would make our app very difficult to structure, especially if we had to deal with changing data. Instead, what we can do is create just one place where all that information will live. We will create an **immutable object** - Functional Programming has nothing against that, and we will use it as the single source of truth for our application’s data.
```
const store = {
    user: {
        first_name: ‘John’,
        last_name: ‘Doe’
    }
}
```
`Store` can now be passed as an argument into our app.
```
const render = (root, state) => {
   root.innerHTML = App(state)
}

const Welcome = (name) => {
   return `Welcome, ${name} to my JavaScript Program!`
}

const App = (state) => {
   return `
       <h1>${Welcome(state.user.first_name)}<h1>
      <div> I EXIST! </div>
   `
}

render(root, store)
```

Here we have taken the code that generated the DOM elements in the last section, and passed our new store object through it so that it is accessible to our component functions. One more thing, if you have recreated these two sections on your own computer and tried to see the results in your browser, there was likely a problem that caused nothing to show up on the screen except what was in your index.html file. That’s because we are missing one function that tells our JavaScript when to run. The DOM is loading at one speed, and our JavaScript file is running at another speed, so we need to make sure that our JavaScript doesn’t run before the DOM element root actually exists.
```
window.addEventListener('load', () => {
   render(root, store)
})
```
Now we are telling our JavaScript to wait until the load event has finished in the browser, which means it's safe to create the rest of our layout.