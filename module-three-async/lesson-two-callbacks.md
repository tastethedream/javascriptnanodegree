## Introduction To Sequencing Events - Callbacks

### Callbacks For Asynchronous Functionality Recap

Callbacks are the vehicle for our asynchronous tasks to rejoin the main thread. When work moves off the thread, we send it with a function to run on the main thread when it is complete. This allows us to continue acting on the result of an asynchronous event whenever the event completes. In this way, passing functions as callbacks allows us to schedule reactions to asynchronous events without having to know how long the asynchronous event will take.

### Best Prictice when using callbacks

#### Chaining for Easier Reading Recap

```
const mockAPI = (returnValue) => (arg, cb) => {
    setTimeout(() => cb(returnValue), 2000)
}

const fetchSession = mockAPI({ id: "123765" })
const fetchUser = mockAPI({ firstname: "Bob" })
const fetchUserFavorites = mockAPI([ "lions", "tigers", "bears" ])

const runCallbacks = () => {
    fetchSession("session-id", (session) => {
        fetchUser(session, (user) => {
            fetchUserFavorites(user, (favorites) => {
                console.log(favorites)
            })
        })
    })
}

// alternative flat style

const runCallbacksFlat = () => {
    const handleFavorites = (favorites) => {
        console.log(favorites)
    }

    const handleUser = (user) => {
        fetchUserFavorites(user, handleFavorites)
    }

    const handleSession = (session) => {
        fetchUser(session, handleUser)
    }

    fetchSession("session-id", handleSession)
}
```
#### Review Points
* Flattening a callback chain might make it easier to read, but it will be more code
* The cleanest way to write the callback chain will depend on how much logic is happening in each step, and your personal preference
* It is always cleaner to move repeated steps, or long sets of steps, out into an external function

### Dealing With Errors

```
const mockAPI = (returnValue) => (arg, success, failure) => {
    setTimeout(() => success(returnValue), 2000)
}

const fetchSession = mockAPI({ id: "123765" })
const fetchUser = mockAPI({ firstname: "Bob" })
const fetchUserFavorites = mockAPI([ "lions", "tigers", "bears" ])
const handleError = error => {
    // you can put more custom logic here
    console.log(error)
}

const runCallbacks = () => {
    fetchSession("session-id", session => {
        fetchUser(session, (user) => {
            fetchUserFavorites(user, (favorites) => {
                console.log(favorites)
            }, handleError)
        }, handleError)
    }, handleError)
}

runCallbacks();
```
#### Error Handling Recap
* The function to handle errors is passed as an argument in the same way we pass a function to handle a response with data
* Each step in the chain will have its own error handling
* It is cleaner (especially if needed to do more than console log) to move the error handling out into an external function

### Cons of Callbacks

#### Callback Hell

```
setTimeout( (firstMessage, int) => {
    console.log(firstMessage, int);

    setTimeout((secondMessage, int2) => {
        let sum = int + int2
        console.log(secondMessage, sum);

        setTimeout((thirdMessage, int3) => {
            sum = sum + int3
            console.log(thirdMessage, sum);

        }, 3000, "THIRD", 3);
    }, 2000, "SECOND", 2);
}, 1000, "FIRST", 1);
```
Imagine if the code block above were not three steps but eight, and each function had five lines of logic to get to the next step, and you were tasked with updating part of the flow. How do you update just one part? What if you need your logic flow to account for multiple different paths? Callback chains were notorious in the JavaScript community as being hairy to read and risky to change.

Also notice how each time we open a new step we have to indent again? Long chains of callbacks end up in this increasingly indented spiral, which is commonly referred to as Callback Hell. **Callback Hell** along with the low readability made complex callback chains an experience that left many developers frustrated. In vanilla JavaScript there was no way to clean up this syntax or make it easier to deal with asynchronous event chains, but asynchronous flows are essential to JavaScript functionality, so there was no option but to put up with them -- until es2015.

#### Excercise 1 question
```
// Challenge 1: Broken callback chain

// There are three problems with this code, fix them to get the console.log message: 
// "Well done! { points: [ 45938, 1314 ], type: '3K8B' }"


// Hint: Order of function calls should go getData -> HandleResponse -> parseResponse -> useValues

const dataJson = {
    response: {
        timeElapsed: 45938,
        distanceTotal: 1314,
        variant: "3K8B"
    }
}

const useValues = (parsedData) => {
    // pretend we're using these
    console.log("Well done!", parsedData)
}

// cb is a common naming choice for a callback argument
const parseResponse = (data, cb) => {
    const parsed = {
        points: [response.timeElapsed, response.distanceTotal],
        type: response.variant
    }
    cb(parsed)
}

const handleResponse = (json) => {
    let data = json
    parseResponse(data, parseResponse)
}

const getData = () => {
    // Mock API call
    setTimeout(handleResponse, 1000, JSON.stringify(dataJson));
  		
}

getData()
```
#### Excercise 1 answer
```
const dataJson = {
    response: {
        timeElapsed: 45938,
        distanceTotal: 1314,
        variant: "3K8B"
    }
}

const useValues = (parsedData) => { // pretend we're using these
    console.log("Well done!", parsedData)
}

// cb is a common naming choice for a callback argument
const parseResponse = (data, cb) => {
    const {response} = data;
    const parsed = {
        points: [
            response.timeElapsed, response.distanceTotal
        ],
        type: response.variant
    }
    cb(parsed)
}

const handleResponse = (json) => {
    let data = JSON.parse(json)
    parseResponse(data, useValues)
}

const getData = () => { // Mock API call
    setTimeout(handleResponse, 1000, JSON.stringify(dataJson));
} 

getData()

```
**The three mistakes were:**

The `handleResponse` function passed the wrong callback function to `parseResponse`. It was actually causing `parseResponse` to call itself! Which is a legitimate strategy for some cases, but there's no need for recursion here!

The `parseResponse` function references the variable `response` ... but `response` doesn't exist. We can infer that the developer actually wanted to use the response object inside the data object and forgot to **destructure** the object they wanted before referencing it!

The program complains about JSON. You might notice that the `getData` function turns the data into JSON before passing it to the `handleResponse` function. This was done to mock what a real API response might send back, but the `handleResponse` function never turned that JSON back into a JavaScript object, so we had to add the JSON parse around it. This is actually a really common error to come across in the wild. Its simple to fix, easy to anticipate, and will still get you stumped from time to time!



#### Excercise 2 question
```

// Callback Challenge 2: Secret Number

// Write a callback chain that does the following:

// 1. Generates a random number
// 2. Waits three seconds, then adds 5 to the random number
// 3. Every two seconds, adds 2 to the random number for a total of 6 seconds
// 4. Subtracts 3
// 5. Waits four seconds, and logs the resulting number


// Your Code Here:


// Function for you to get started with:
const generateRandomNumber = () => { 
    const rand = Math.round(Math.random() * 10);
  	// ....
} 

// HINT: Add in console logs!

// HINT: setInterval can be stopped using clearInterval like this:
// const myInterval = setInterval(exampleFunc, 2000)
// clearInterval(myInterval)
```
#### Excercise 2 answer
```
const wait4 = secret_num => { 
    setTimeout(console.log, 4000, secret_num)
}

const interval2 = (rand, cb) => {
    let sum = rand;
    const add1 = () => {

        sum = sum + 2;

        if ( sum-rand >= 6) {
            clearInterval(byTwo);
            cb(sum-3);
        }
    }
    const byTwo = setInterval(add1, 2000)
}

const add5 = (rand, cb, cb2 ) => {
    cb(rand+5, cb2);
}

const generateRandomNumber = () => { 
    const rand = Math.round(Math.random() * 10);
    setTimeout(add5, 3000, rand, interval2, wait4);
} 

generateRandomNumber()
```
Its easier to keep track of what needs to run next by naming your functions with descriptive names like wait4 or add5. Names this simplistic probably won't work in real programs, but its good practice to keep these function names descriptive and short.
The `if()` statement in `interval2` allows us to control the flow of the program and only call wait4 exactly when we need it.

#### Practice Interview Question

What is the purpose of a callback in an asynchronous function?

*A callback function is the action to be taken once the asynchronous action completes, it is the way for information retrieved or resulting from the asynchronous action to become available for use in the rest of the program.

You could also say something about a callback being the event scheduled to happened next, after the asynchronous action is completed.*
