# Lesson 3 : Sequencing Events With Promises

## Concepts
In this lesson we will cover the following:

* Introduction to Promises
* Promise chaining
* Promises best practices and error handling
* Promise implementations with Fetch
* Advanced Promise syntax

## Basic Syntax

```
new Promise((resolve, reject) => {
    console.log('A')

    resolve();
    // reject();
})
.then(() => {
    console.log('B');
})
.catch(() => {
    console.log('C');
})
```
There are a few things I want you to get out of seeing this code right now:

1. You can run this code and see that A always happens, this base functionality always runs.
2. B or C display based on whether you comment in the resolve or reject cases - interesting right?
3. There are some new words here, the ones to pay attention to are: **resolve**, **reject**, then, and **catch**

`.then()` - handles sucsess (resolved)

`.catch()` -handles faliure (rejected)

## Promise States Recap

A promise starts off with an initial request for something - data, a webpage, or any action that will take place off the main thread. Once we make the request, the promise is in a state called **Pending**. In other words, whether the request will be successful or fail is unknown and the program is waiting for a response. **Promises are asynchronous**, so during the pending state, the program will continue on from the promise to complete the rest of the program.

When a response comes back from the request, it will either have succeeded or failed. If it failed, (for example an API response came back with a 500 error) the promise moves into a state called **Rejected** and the logic held in the .`catch()` clause will run. If the request succeeds, the promise state is called **Resolved** or **fulfilled**, and the logic held in the `.then()` statement is run. When a promise is no longer pending, whether it is rejected or resolved, it is **settled**.

These three **states of a promise** describe the life cycle of a promise and allow us to sequence events in our programs and handle the potential responses from a request.

![promise image](https://video.udacity-data.com/topher/2020/June/5ee15686_jsndc3-l2-promise-states/jsndc3-l2-promise-states.jpg)

## Promise Chaining

`.then()` clauses always run in order and we can create as many as we want.

Whater is **returned** from a `.then()` clause becomes the **argument** to the next clause in the chain.

If an error is encountered the chain stops and fires a `.catch()`

```
// ---------------- PROMISE CHAINING WITH DATA & ERRORS 

new Promise((resolve, reject) => {
    alert('A')
    resolve(['B', 'C', 'D']);
    // reject();
})
.then((data) => {
    // throw new Error('Error at B');
    alert(data.shift());
    return data;
})
.then((data) => {
    throw new Error('Error at C');
    alert(data.shift());
    return data
})
.then((data) => {
    // throw new Error('Error at D');
    alert(data.shift());
    return data
})
.catch((error) => {
    console.log(error)
    alert(error);
})
```
## Promises as the anser to callbacks

### Benefits of promises

Callbacks start to get difficult with more complex asynchronous flows. Heavily nested callbacks lead to callback hell, but with promises we have a much cleaner syntax - promise chaining!

What makes promise chaining so appealing? It might not be obvious at first just how big of an advantage it can be. Promise chaining drastically cleans up the syntax of complex asynchronous flows. But rather than explaining, lets show an example. Here is the callback example code you saw in the previous lesson, re-written here with a promises version so you can compare.

#### Nested callback chain
```
const mockAPI = (returnValue) => (arg, cb) => {
    setTimeout(() => cb(returnValue), 2000);
};

const fetchSession = mockAPI({ id: "123765" });
const fetchUser = mockAPI({ firstname: "Bob" });
const fetchUserFavorites = mockAPI([ "lions", "tigers", "bears" ]);

const runCallbacks = () => {
    fetchSession("session-id", (session) => {
        fetchUser(session, (user) => {
            fetchUserFavorites(user, (favorites) => {
                console.log(favorites);
            });
        });
    });
};
```

#### Promise chain

```
const mockAPI = (returnValue) => (arg, cb) => {
    setTimeout(() => cb(returnValue), 2000);
};

const fetchSession = mockAPI({ id: "123765" });
const fetchUser = mockAPI({ firstname: "Bob" });
const fetchUserFavorites = mockAPI([ "lions", "tigers", "bears" ]);

const runPromises = () => {
    return fetchSession("session-id")
        .then(session => fetchUser(session))
        .then(user => fetchUserFavorites(user))
        .then(favorites => console.log(favorites))
        .catch(error => console.log("oops!"));
};
```
### Do I Still Need Callbacks?

With all this discussion of how Promises solve the pain points of callbacks, you might begin to wonder if we need callbacks anymore. But we absolutely do! Remember that callbacks are a primary way to chain functionality in JavaScript, so you will still see callbacks around all the time. Like the ES6 Array Methods we discussed in depth in the Functional JavaScript course, or to make use of `setTimeout` and other built in JavaScript methods, callbacks are an essential part of the language and are not going anywhere. Promises are simply `syntactic sugar` - meaning that they are just a convenient set of key words that do not add anything fundamentally new to the language. So, where we used to reach for callbacks for everything, we now have another option for longer asynchronous flows.

**But are callbacks still a good option for asynchronous code?** This comes down mostly to personal taste, but I would say yes. For short and simple asynchronous logic, I think callbacks are still an option. But I think it is safe to say that callbacks should no longer be used for long, complex, or multi-step asynchronous logic chains. That is what Promises were made for, so to not use them would be missing out on the perfect opportunity for cleaner syntax.

### Excercise - Promises 1

#### Problem
```
// In this challenge, the promise will resolve with a given data set.
// Create a promise chain of four steps to do the following

// Step 1: Return only the unread alerts, if there are none, trigger an error that says there are no unread alerts
// Step 2: If the alert is a system alert, call the printSystemAlert function on it and remove it from the list
// Step 3: Create a console.error message for the critical alerts that prints the alert message, if there are no ciritical alerts, do nothing and proceed to step 4
// Step 4: Console log all other types of alerts with the message, severity, and type properties

const alerts = [
    {
        type: "system",
        severity: "critical",
        timestamp: "",
        message: "System has experienced an error and must be restarted",
        user_id: null,
        short_code: "VDN877",
        readStatus: true
    },
    {
        type: "users",
        severity: "critical",
        timestamp: "",
        message: "Unauthorized access to the system has been logged",
        user_id: null,
        short_code: "VDN077",
        readStatus: false
    },
    {
        type: "system",
        severity: "informational",
        timestamp: "",
        message: "There are new updates available",
        user_id: null,
        short_code: "VDN827",
        readStatus: false
    },
    {
        type: "users",
        severity: "warning",
        timestamp: "",
        message: "Some users on this system have not updated their passwords",
        user_id: null,
        short_code: "HDN877",
        readStatus: false
    }
]

const printSystemAlert = (alert) => {
    console.info(alert, `This is a ${alert.severity} system wide alert: ${alert.message}`)
}

new Promise((resolve, reject) => {
    // your code here
  
})
```

#### Solution
```
new Promise((resolve, reject) => {
    resolve(alerts)
})
.then(data => {
    const unread = data.filter(d => d.readStatus === false);

    if (unread.length === 0) {
        throw new Error('There are no unread alerts');
    }
    return unread;
})
// you can name this whatever you want, so make it descriptive!
.then(unreadAlerts => {
    // might be tempted to save this into a variable, but you don't have to
    return unreadAlerts.filter(alert => {
        if(alert.type === "system") {
            printSystemAlert(alert)
        } else {
            return true
        }
    })
})
.then(filteredAlerts => filteredAlerts.map(alert => {
    if(alert.severity === "critical") {
        console.error(alert.message)
    } else {
        console.log(`${alert.severity} ${alert.type} alert: ${alert.message}`)
    }
}))
```

### Excercise - Promises 2

#### Problem
```
// Something is wrong with this promise chain!

// This promise chain catch clause always runs. Figure out why and get the console.log at the last then clause to run.
const setCategory = (category, id) => {
    // imagine we are assiging a category to an item...
    console.log("Category assigned!")
}
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
    const { intVal } = data
    if(intVal > 0 && intVal !== null) {
        const category = data.intVal.toString().split()[0];
        setCategory(category, data.id)
    } else {
        throw new Error('No integer value was provided');
    }
})
.then(data => console.log(data.id, data.message))
.catch((error) => {
    console.log(error)
})
```

#### Solution
```
new Promise((resolve, reject) => {
    resolve(data)
})
.then(data => {
    // Spelling matters! 
    // But just as an extra, watch out for this other potential problem in JavaScript
    // if (data.soucreId !== null) {
    if (data.soucreId && data.soucreId !== null) {
        return data;
    }
    // when the if statement returns something, there is no need for an else statement
    throw new Error('No source was defined');
})
.then(data => {
    const { intVal } = data
    if (intVal > 0 && intVal !== null) {
        const category = data.intVal.toString().split()[0];
        setCategory(category, data.id);
        return data;
    } else {
        throw new Error('No integer value was provided');
    }
})
.then(data => console.log(data.id, data.message))
.catch((error) => {
    console.log(error)
})
```
#### Errors in problem code

* source spelt incorrectly

* No data returned in the 2nd `.then()`

#### Practice Interview Question

**What are the advantages of using Promises over Callbacks?**



*Promises allow for cleaner syntax in long asynchronous flows Promises avoid callback hell Promises more explicit error handling Promise states make it easier to control the entire timeline of an asynchronous flow
*


