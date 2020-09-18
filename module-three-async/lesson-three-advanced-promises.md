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

## Advanced Promise Syntax










