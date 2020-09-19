# Lesson 3 : Advanced promises

## Promises Helpful Tips

### Promise chaining across function calls

We've gone through a number of examples now where our `then` statements were all neatly in a row under the promise. But that is not always how they will be arranged. Often, `then` clauses will call other functions in our app, or chained `then` clauses might be separated across many lines or even files. Sometimes beginners get the idea that promise chaining works because the chains are in line with each other, and it can be confusing at first when the chain is broken up throughout the program. So lets see an example and get used to following a promise chain even if its scattered across many functions.

```
const genericAPIrequest = () => {
   return new Promise((resolve, reject) => {
        resolve({body: "My test data"})
    })
}

genericAPIrequest().then(data => {
    console.log(data);
}).catch(error => console.log(error));
```

So in the code above, see how the function `genericAPIrequest` **returns a Promise**. Any function that returns a Promise, whether its one we make, or that comes as part of a library, or is otherwise abstracted away like with `fetch`, we have to build our `then` and`catch` statements off of the **result** of that function.

Put another way, the function itself is not a Promise, so we can't do this:

```
genericAPIrequest.then(data => {
    console.log(data);
}).catch(error => console.log(error));
```
But rather, we have to call genericAPIrequest and build our then statement off of the result. In your mind, you can replace the genericAPIrequest call with the thing it returns, if we do that, it looks like this:

```
new Promise((resolve, reject) => {
    resolve({body: "My test data"})
}).then(data => {
    console.log(data);
}).catch(error => console.log(error));
```

And that looks exactly like what we've been doing all along. This is how it works to chain off of Promises that are returned from other functions, how we dealt with `fetch` is a good example here.

### Remember the Return

It might sound silly, but this mistake gets everyone eventually, especially if you are using automatic returns in arrow functions. I myself have fallen into this trap many times, so I'm going to say it here to be very clear: a `then` statement passes information to the next `then` in the chain by returning a value. If you don't return anything, your next then statement will try to run without data, which will most likely cause an error and the `catch` clause will be called.

Here is where this mistake often gets me. I start off with a Promise chain that is using the automatic return rule.
```
new Promise((resolve, reject) => {
    resolve("This is a message");
})
.then(data => data.split(" "))
.then(data => data[0])
.then(data => console.log(data))
.catch(err => console.error(err));
```
But then, I need to go back and make a quick edit - maybe even just add a console log to see what is going on in the middle of the chain:

```
new Promise((resolve, reject) => {
    resolve("This is a message");
})
.then(data => {
  // do some more logic
  data.split(" ")
})
.then(data => data[0])
.then(data => console.log(data))
.catch(err => console.error(err));
```
And I forget to add the extra return, now this Promise gives me the following error:

`error: TypeError: can't access property 0, data is undefined`

Any error like this is a good indication that data, or at least not the data you wanted, is being passed all the way through the chain.

So here is the code with the fix:
```
new Promise((resolve, reject) => {
    resolve("This is a message");
})
.then(data => {
  // do some more logic
  return data.split(" ")
})
.then(data => data[0])
.then(data => console.log(data))
.catch(err => console.error(err));
```
### Excercise: promises II

**problem**

```
// Build out this mock API request so that does the following:
// 1. Gets the user information and turns the JSON into a JavaScript object
// 2. Gets the event message and turns the JSON into a JavaScript object
// 3. Prints out a console log message that says "Thank you, Ralph S. Mouse, your account has been updated"


const eventMessage = JSON.parse({body: "Your account has been updated!"});
const currentUser = JSON.parse({
    name: "Ralph S. Mouse",
    id: "238jflK3"
});

const getUserInformation = () => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 2000, currentUser);
    })
};

const getEventMesssage = () => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 2000, eventMessage);
    })
};

getUserInformation().then().catch();
```

**solution**
```
const eventMessage = JSON.stringify({body: "Your account has been updated!"});
const currentUser = JSON.stringify({
    name: "Ralph S. Mouse",
    id: "238jflK3"
});

const getUserInformation = () => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 2000, currentUser);
    }).then(data => JSON.parse(data))
};

const getEventMesssage = () => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 2000, eventMessage);
    }).then(data => JSON.parse(data))
};

getUserInformation().then(userInfo => {
    getEventMesssage()
    .then(message => message.body)
    .then(message => {
        const greeting = `Thank you, ${userInfo.name}.`
        console.log(`${greeting} ${message}`)
    })
}).catch(err => console.log(err));
```

There are a few things you can note here. First, if you are making an API request, it is smart to change the response into the format you need it as soon as possible. So in this case we are receiving JSON and we want a JavaScript object, so I decided to make that conversion as soon as I got the response back. It will work either way, but its easier to remember when you do those things immediately.

Another thing that might have stumped you on this exercise is that this is the first time we are dealing with nested Promises. Here, we can't print the message until both the user information and message are available, that's why we had to make the second request in the then statement of the first Promise.

## Advanced Promise Syntax for single promises

### New Promise

* Initialises a new promise
* Only if promise is npt initiated by other code like `fetch()` or `then()`.

```
new Promise((resolve, reject) => {
// can do logic here
// resolve() or reject()
}
```
Promise new initiates a new project. From here you can resolve or reject the new Promise you have made.

### Promise.reject

* Forces a promise to fail
* Takes reason for faliure as an argument.

Called in a Promise, will cause the `.catch` clause to run in the same way an error does.

### Promise.resolve

* Resolves a promise
* Can pass in a result value if desired

Called in a Promise, will cause the `.then` clause to run. Can optionally be passed an argument that will go to the next statement.

### Promise.finally

* Runs on bith sucsess and faliure
* Triggers a promise when settled
* Typically runs last
* takes **no** arguments
* you use this as you do not care what the response was you want it to happen anyway.

Like `.then` or `.catch`, finally is another clause that runs after the other clauses. It runs in both a reject or resolve case.

## Advanced Promise Syntax for multiple promises

### Promise.allSettled

Promise.allSettled takes an argument that is an array of Promises. It waits for all those Promises to resolve and collects the results of each one into a new array of results. The resulting array contains one object per Promise, saying whether that Promise resolved or rejected, along with the value (if it resolved) or the reason for failure (if it rejected). Promise.all itself returns a Promise, so the resulting array is available in the following `.then` statement.

![promise.allSettled](https://video.udacity-data.com/topher/2020/June/5ef3c92b_jsndc3-l2-promise-allsettled/jsndc3-l2-promise-allsettled.jpg)

#### Code Example - promise.allSettled

```
const book1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 3000, "Enders Game");
});

const book2 = new Promise((resolve, reject) => {
    setTimeout(reject, 4000, "Sorry, not available!");
});

const book3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, "Harry Potter and The Prisoner of Azkaban");
});

const book4 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, "Stranger in a Strange Land");
});

Promise.allSettled([book1, book2, book3, book4])
.then(results => {
    console.log(results)
    results.forEach(result => console.log(result.value))
})
.catch(error => console.log(error));
```

### Promise.all

This method is almost exactly the same time as Promise.allSettled except for what it returns and how it handles rejected Promises. It takes in an array of Promises and waits for them to resolve, but **the first time it encounters a rejected Promise, it stops waiting for any further Promises and runs its catch clause.** If no Promises reject, it returns an array of the values returned by them. Again like Promise.allSettled, Promise.all returns a Promise, so the resulting array is available in the following then.

![promise.all](https://video.udacity-data.com/topher/2020/June/5ef3bbbe_jsndc3-l2-promise-all/jsndc3-l2-promise-all.jpg)

### Promise.race

`Promise.race` also takes an argument of an array of Promises, but instead of waiting for them all to resolve, it only waits for the fastest one. Whatever Promise fulfills first, whether is resolves or rejects. It will pass the value from the resolution or the error from the rejection to its then statement.

![promise.race](https://video.udacity-data.com/topher/2020/June/5ef3b7a7_jsndc3-promise-race-catch/jsndc3-promise-race-catch.jpg)

#### Example code -  promise.race

```
const book1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 3000, "Enders Game");
});

const book2 = new Promise((resolve, reject) => {
    setTimeout(reject, 4000, "Sorry, not available!");
});

const book3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, "Harry Potter and The Prisoner of Azkaban");
});

const book4 = new Promise((resolve, reject) => {
    setTimeout(reject, 1000, "Sorry, not available!");
});

Promise.race([book1, book2, book3, book4])
.then(result => {
    console.log(result);
})
.catch(error => console.log("Error!", error));
```
## Excercises advanced promises

### Challenge 1
```
Promise.allSettled([p1, p2, p3, p4])
.then(results => {
    console.log(results);
    const failed = results.filter(result => result.status === "fulfilled");
    console.log(`Failed: ${failed.length} ::: Fulfilled: ${results.length - failed.length}`);
})
.catch(error => console.log(error));
```
Notice how we are able to filter the results to get the ratio of failed to succeeded.

### Challenge 2
```
Promise.all([p1, p2, p3, p4])
.then(results => {
    console.log(results);
})
.catch(error => console.log(error));
```

### Challenge 3
```
Promise.race([p1, p2, p3, p4])
.then(result => {
    console.log(result);
})
.catch(error => console.log("Error!", error));
```

### Practice Interview Question
**Explain the purpose of the finally clause in Promises.**

* Finally runs after either the final .then or .catch
* Finally is for logic that you want to run in either the resolve or reject case
* It is optional and should only be added if you have a reason to use it

**Name one Promise method for handling multiple Promises and give one use case for when you might need it.**

Promise.All You need information from multiple sources and you expect them all to resolve. You can use this in any case where it would be considered an error for any of the Promises to reject.

Promise.AllSettled You need to make many requests and get an overview of which requests failed or succeeded, for instance if you need to poll multiple resources to which are available.

Promise.Race You only care about the fastest of a set of Promises. If you are building a timeout or a request that is time sensitive and not important after a certain amount of time, this would be the method to use.

## Lesson Glossary

### Terms

**Promise**
A JavaScript Promise object is essentially a placeholder for a value that is not available immediately. A promise is asynchronous and represents the result of a request or operation that may succeed or fail.

**Promise States**
JavaScript Promises have four states. When a promise has been initiated but the result has not yet come back, the promise is PENDING. A promise that succeeded is RESOLVED and a promise that failed is REJECTED. When a promise is either rejected or resolved, its state is SETTLED, which simply means that it is no longer pending, regardless of the result.

**Fetch**
Fetch is the syntax for a modern promise based HTTP request in JavaScript.

### Quick Syntax Reference
**New Promise**
```
new Promise((reject, resolve) => {
  // Make your initial request
  // Promise is now PENDING 
})
```

**Resolved Promise Logic**
```
.then(data => {
  // Promise is now SETTLED and RESOLVED
  // Your logic here
  // Return a value you want to pass to the next then statement
})
```

**Rejected Promise Logic**
```
.catch(error => {
  // Promise is now SETTLED and REJECTED
  // handle the error
})
```

**Fetch**
```
fetch(url, options)
.then(data)
.catch(error)
```









