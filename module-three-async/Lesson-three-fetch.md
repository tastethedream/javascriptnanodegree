# Lesson 3: Using Promises With Fetch

## The Fetch API

JavaScript had an old syntax for making asynchronous XHTTP requests, but you've probably seen the more modern Fetch syntax for making calls to external resources. Being comfortable with Fetch is a singularly helpful skill and absolutely essential for expanding your abilities as a JavaScript developer.

## Fetch Request Code Examples
Sometimes its nice to have a reference to important syntax. I am going to walk through an example of a Fetch request performing each of the CRUD actions.

### GET
```
fetch('https://url-with-desired-data')
.then(response => response.json())
.catch(error => console.log(error))
```
Get type requests are the simplest, the only argument you need to provide to the fetch request is the URL where the data is found. Fetch always defaults to this GET request, but there are other options we can supply to create the other types of requests we might need.

### POST / PUT / PATCH / DELETE
```
fetch('https://url-with-desired-data', {
    method: 'POST', // Other options: PUT, PATCH, DELETE
    mode: 'cors', // Other options are: 'no-cors', 'same-origin', and the default: 'cors'
    headers: {
      'Content-Type': 'application/json'
    },
    body: {"data": "This is json"} // body data type must match "Content-Type" header
  })
.then(response => response.json())
.catch(error => console.log(error))
```
If you haven't learned about CORS yet don't worry about that part, you will come across it another time, but for now, know that there are more options we could specify here - what I have shown you in this example are just the basic ones that are most common to use and see.

![fetch](https://video.udacity-data.com/topher/2020/June/5eed34ec_jsndc3-l2-fetch/jsndc3-l2-fetch.jpg)

**Fetch() uses GET by default**

### Video example code
```
// Note that we have to use a Node package called node-fetch to use fetch on the backend
const fetch = require('node-fetch');

// GET

fetch('http://localhost:3000')
.then(response => response.json())
.then(json => console.log(json))
.catch(error => console.log(error));


// POST/PUT/PATCH/DELETE WITH OPTIONS

fetch('http://localhost:3000', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({text: "Norman"})
})
.then(response => {
    return response.json()
})
.then(json => console.log(json))
.catch(error => console.log(error));
```
### Fetch practice solution

```
/ Create a GET request to http://localhost:3000

fetch('http://localhost:3000')
.then(response => response.json())
.then(response => console.log(response))
.catch(error => console.log(error))


// Create a POST request to http://localhost:3000
const postData = { name: "Alyssa" }
fetch('http://localhost:3000', {
    method: 'POST', 
    mode: 'cors', 
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
})
.then(response => response.json())
.then(response => console.log(response))
.catch(error => console.log(error))


// Create a PUT request to http://localhost:3000
const putData = { name: "Alyssa" }
fetch('http://localhost:3000', {
    method: 'PUT',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(putData)
})
.then(response => response.json())
.then(response => console.log(response))
.catch(error => console.log(error))


// Create a DELETE request to http://localhost:3000

const deleteData = { name: "Alyssa" }
fetch('http://localhost:3000', {
    method: 'DELETE',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(deleteData)
})
.then(response => response.json())
.then(response => console.log(response))
.catch(error => console.log(error))
```
## Promises Best Practices and error handling

One of the benefits of using Promises is that by constraining us to a small set of syntax, its easier to keep code simple and readable. The simplicity of the promises syntax means that there aren't a lot of best practice rules you have to remember, but there are still a few things we can do to keep our code clean, and a few examples we can learn from of what not to do.

### Functions in Promise Clauses

**Resolve** and **reject** clauses have the ability to clean up code drastically, but you can still make them messy if you aren't careful. Avoid the temptation to do too much work in a single clause. For instance, if you find yourself declaring a function inside a clause - you might want to move the declaration outside the promise. If you can identify two distinct things happening in a clause, break it into two clauses. There is no limit to the number of then clauses you can write, so don't feel a need to cram too much logic into one.

Here is code from an earlier example, re-written to have too much logic in a then statement

#### Too much logoc in a clause example
```
const categories = [];
const currentItem = {};

const data = {
    id: "KDF8D903N",
    intVal: 855,
    message: "This is a message",
    sourceId: "NotNull"
}

new Promise((resolve, reject) => {
    resolve(data)
})
.then(data => {
    if (data.soucreId && data.soucreId !== null) {
        return data;
    }
    // when the if statement returns something, there is no need for an else statement
    throw new Error('No source was defined');
})
.then(data => {
    const { intVal, id } = data
    if (intVal > 0 && intVal !== null) {
        const category = data.intVal.toString().split()[0];

        currentItem.id = id;
        category.toString();
        if (!categories.find(category => category.value === id)) {
            categories.push({ value: category, count: 0 })
        } else {
            const index = categories.findIndex(category => category.value === id)
            categories[index].count++
        }
        currentItem.category = category.toString();
        console.log("Category assigned!")
    } else {
        throw new Error('No integer value was provided');
    }
})
.catch((error) => {
    console.log(error)
})
```
### You Need a Catch Clause

One of the biggest ways you can mess up a promise chain is by not creating a catch clause. You haven't seen a single promise without a catch clause in this course yet, because you shouldn't write a promise without one. The problem is that a promise *will still try to run* without a catch clause, but if an error occurs, you'll get an **un-handled rejection error** - or worse - you might never see it. Promise chains - depending on where they are run - have the potential to "swallow" errors, meaning that if an error happens and there is no `catch` to handle it, you might not ever see it. The promise chain will hit the problem, throw an error, but if no one is listening, the program will just move on.

Here is what happens when you don't catch a promise and it encounters an error. Comment in and out the `catch` statement and experiment with the two different types of errors in the`then` clause. Depending on where you run this code you might see a red type error appear, when there is no catch clause, this might or might not appear depending on where you run the code. But, if you have the catch commented in, you will always get a gray console log statement, because the catch is explicitly handling the error.

```
let num = null;

new Promise((resolve, reject) => {
    resolve(['B', 'C', 'D']);
    // reject();
})
.then(data => {
    foo
    // throw new Error('Error at B');
    console.log(data.shift());
      num = 5;
    return data;
})
.catch(error => console.log(error))
.finally(() => console.log("I'm running!"))

setTimeout(() => {
  console.log("And I'm still running!", num)
}, 5000)
// notice that despite an error in the promise, the code continues running and simply prints the old value of num
```

## Mixing Promise Chain Methods
Take a look at this example:
```
new Promise((resolve, reject) => {
  resolve("message");
})
.then(() => {
    throw new Error("Something went wrong");
})
.catch(error => {
    return "this is another message";
})
.then(data => {
    throw Error("Now throw another error");
})
.catch(error => console.log(error.message));
```
Though I don't think this would be considered best practice, it is valid Promise syntax and you might see it around from time to time. To trace what is happening here, an error in a `.then` statement will cause the **nearest** catch statement to run. Any `.then` statement after a catch, is considered further logic on that catch. So in this example, we follow these logic steps:

1. Resolve the Promise and run the first then statement.
2. First then statement throws an error which triggers the first catch clause
3. The first catch clause doesn't throw a new error, it just passes a string to the next then. At this point, by returning a string from a catch clause, we have buried the error that caused the catch to run.
4. The final then clause runs, and itself throws a new error. This error causes the next catch clause to run
5. The last catch clause runs and console logs the error message





