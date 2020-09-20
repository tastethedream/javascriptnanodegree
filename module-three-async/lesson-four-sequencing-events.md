# Lesson 4: Sequencing Events - Async/Await

Concepts
In this lesson we will cover the following:

* Review of JavaScript Try/Catch blocks
* Introduction to Async/await
* Using Async/await with promises
* Async/await error handling
* When (and when not) to use Async/await

## Try/Catch

Try/Catch blocks are the vanilla JavaScript syntax for **exception handling**. Exception handling means writing code in such a way as to allow programs to handle errors without crashing or becoming unusable. Try/Catch blocks can be used as often as needed and can be nested inside of each other to achieve the level of detail required for your program. The pieces of a try/catch block include:

**Try**
The try block is the code you want to run. If the code wrapped in a try block generates an error, it triggers the catch clause.
```
try {
    // your code here
}
```

**Catch**
The catch clause runs if an error is generated in the try clause. It takes an argument which is the error thrown in the try above.
```
catch(err) {
    console.log(err)
}
```

**Finally**
The finally clause runs after the try and catch clauses are done, no matter which of them runs or how long. It is a way to ensure an action will take place in either circumstance.
```
finally {
    // this code runs no matter what
}
```
So all together it might look something like this:
```
try {
   // undeclared variable being used in an operation causes an error
   foo/2
} catch (err) {
   console.error(err.message);
} finally {
   console.log('I run last');
}
```

## Try/catch practice

### Challenge 1
```
const printStatusMessage = (status) => {
    try {
        const animalsList = animalsByConservationStatus(status);
        let names = animalsList.map(animal => animal.common_name);
        message = `Animals listed as ${status} are: ${names.join(', ')}`;
        console.log(message);
    } catch(error) {
        console.error(error);
        console.log(`There are no animals with status: ${status}`);
    };
};

printStatusMessage("critical");
printStatusMessage("extinct");
```

### Challenge 2
```
endangeredAnimals = ["saola", "green turtle", "amur leopard", "deer"];

const printAnimalMessage = (animal) => {
    try {
        const info = fetchAnimalByName(animal);
        const message = `The ${info.common_name} is ${info.conservation_status} on the endangered list`;
        console.log(message);
    } catch(error) {
        console.error(`There was a problem fetching: ${animal}`);
    };
};

endangeredAnimals.forEach(animal => printAnimalMessage(animal));
```

### Challenge 3
```
animal1 = "vaquita";
animal2 = "mouse";

const printAnimalFacts = (animal) => {
    try {
        const info = fetchAnimalByName(animal);
        const message = `The ${info.common_name} (${info.species}) is an endangered animal with ${info.population !== null ? info.population : "an unkown number of"} individuals in the wild in their home region of ${info.region}`;
        console.log(message);
    } catch(error) {
        console.error(error)
    } finally {
        console.log(`The ${animal} was searched.`)
    }
};

printAnimalFacts(animal1);
printAnimalFacts(animal2);
```

## Async/Await 

Here is an example of the Async/Await syntax.

```
const promise1 = () => new Promise((resolve, reject) => {
   setTimeout(resolve, 3000, 100);
});

async function exampleAsync() {
   const value1 = await promise1();
   console.log("waited for the value to be ready", value1);

   return value1;
}

exampleAsync();
```
Some things I want you to notice here are that:

we are still using Promises
the `async` word before the function declaration
the `await` word before the function call that returns a Promise

## Async/Await Intro Recap
So we now have two new keywords: `async` and `await`.

* `async` goes **before** a function declaration and allows us to use the `await` keyword in that scope. It also forces that function to return a **promise**.
await can be put before a Promise call to make the program treat it as a blocking operation.
Async/Await gives us the ability to make our program wait for certain values we need so that they are available in the next step. This can make timing much easier.

## Compare and Contrast Async/Await

We've learned about **nested callbacks**, **Promise chains**, and now **Async/Await,** here is a familiar example to let you compare and contrast all the patterns we've learned up to this point.

### Nested Callbacks
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

### Flat Callbacks
```
const mockAPI = (returnValue) => (arg, cb) => {
    setTimeout(() => cb(returnValue), 2000);
};

const fetchSession = mockAPI({ id: "123765" });
const fetchUser = mockAPI({ firstname: "Bob" });
const fetchUserFavorites = mockAPI([ "lions", "tigers", "bears" ]);

const runCallbacksFlat = () => {
    const handleFavorites = (favorites) => {
        console.log(favorites);
    };

    const handleUser = (user) => {
        fetchUserFavorites(user, handleFavorites);
    };

    const handleSession = (session) => {
        fetchUser(session, handleUser);
    };

    fetchSession("session-id", handleSession);
};
```

### Promises
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

### Async/Await
```
const mockAPI = (returnValue) => (arg, cb) => {
    setTimeout(() => cb(returnValue), 2000);
};

const fetchSession = mockAPI({ id: "123765" });
const fetchUser = mockAPI({ firstname: "Bob" });
const fetchUserFavorites = mockAPI([ "lions", "tigers", "bears" ]);

const runAsync = async () => {
    try {
        const session = await fetchSession("session-id");
        const user = await fetchUser(session);
        const favorites = await fetchUserFavorites(user);
        console.log(favorites);
    } catch (error) {
        console.log("oops!");
    }
}
```

## Challenge Solutions
### Challenge 1

In the first example you were tasked with using Promise syntax to perform an operation that required the results of two Promises to be present. There are many ways you could have done this , but here is one example:
```
promise1().then(num1 => {
    promise2().then(num2 => {
        console.log(`The answer to life, the universe, and everything is: ${num1 + num2}`);
    })
    .catch(error => {
        console.log(error)
    });
})
.catch(error => {
    console.log(error)
});
```
This example achieves the goal of making sure both Promises are resolved at the time the console message is created by nesting the Promise chains. This is a good example of how you would achieve this effect with Promises. If you achieved this same effect by wrapping a `setTimeout` around the entire operation, consider that in real life, you wouldn't know how long each Promise would take to resolve. In fact each Promise might resolve in a different amount of time each time it was run. So you are then forced to make the `setTimeout` wait the **maximum** amount of time either Promise might take to resolve. And if you do that, the program must wait for the   `setTimeout` to complete, even if both Promises have already resolved, so you are tying yourself to the slowest allowable time, which is not ideal. This is why you might want to consider the syntax above as a better alternative.

### Challenge 2

The second challenge was the same as the the first, except this time you wrote your solution using `Async/Await`. This was mostly so that you would get the opportunity to compare and contrast this syntax first hand. Here is an example of a solution using Async/Await.
```
const theQuestion = async () => {
    const num1 = await promise1();
    const num2 = await promise2();
    console.log(`The answer to life, the universe, and everything is: ${num1 + num2}`)
};

theQuestion();
```

The big thing to notice here is that we don't have to nest anything. The two values we want are stored in variables in the same way we have always stored values in variables.

## Error handling with Async/Await

### Code Example

Here are the code examples from the video.

#### Try/Catch Version
```
const promise1 = () => new Promise((resolve, reject) => {
    setTimeout(resolve, 3000, 5);
});

const promise2 = () => new Promise((resolve, reject) => {
    setTimeout(reject, 3000, "Could not get value");
});

async function handleManyThings() {
    try {
        const value1 = await promise1();
        console.log("waiting on first promise", value1);

        const value2 = await promise2();
        console.log("waiting on second promise", value2);

        console.log("Solution:", value1 + value2);
        return value1 + value2;
    } catch(error) {
        console.log(error)
    }
}

handleManyThings();
```

#### Promise Catch Version
```
const promise1 = () => new Promise((resolve, reject) => {
    setTimeout(resolve, 3000, 5);
});

const promise2 = () => new Promise((resolve, reject) => {
    setTimeout(reject, 3000, "Could not get value");
});

async function handleManyThings() {
    const value1 = await promise1();
    console.log("waiting on first promise", value1);

    const value2 = await promise2();
    console.log("waiting on second promise", value2);

    console.log("Solution:", value1 + value2);
    return value1 + value2;
}

handleManyThings().catch(err => console.log(err));
```

### Error Handling in Async/await Recap

Another benefit of the synchronous behavior we get when using Async/await, is that it allows us to use the `try`/`catch` exception handling syntax we learned at the beginning of this lesson. You can also handle `async` functions with the`.catch` style error handling we saw with Promises, but it is more common to see the `try`/`catch` syntax used with Async/await. This means that all of the principles we learned about custom error handling with synchronous JavaScript can now apply to our asynchronous flows as well!

## When (and when not) to use Async/Await

### You should use Async/Await when:

* The results from multiple Promises will be used together.
* You need perform a lot of logic after one or multiple Promises resolve
* Logic in a synchronous-style function would be cleaner than in a .then chain (this is mostly personal preference)

### You shouldn't use Async/Await if:

* You don't need to use the await word in the function
* You just want the function to return a promise (instead use Promise.new from the promises lesson)

### Think carefully about using Async/Await because:

It will change the output of the function. If other parts of the program rely on the output of that function, changing it to `async` will have unexpected consequences

## Excercise Aysnc/Await II

### starter code

```
let endangeredAnimalsDB = [
    {
        common_name: "saola",
        conservation_status: "critical",
        species: "Pseudoryx nghetinhensis",
        region: "Greater Mekong",
        population: null,
    },
    {
        common_name: "amur leopard",
        conservation_status: "critical",
        species: "Panthera pardus orientalis",
        region: "Amur-Heilong",
        population: "more than 84",
    },
    {
        common_name: "vaquita",
        conservation_status: "critical",
        species: "Phocoena sinus",
        region: "Gulf of California",
        population: null,
    },
    {
        common_name: "Javan rhino",
        conservation_status: "critical",
        species: "Rhinoceros sondaicus",
        region: "Java, Indonesia",
        population: "58-68",
    },
    {
        common_name: "green turtle",
        conservation_status: null,
        species: "Chelonia mydas",
        region: [ "Mesoamerican Reef", "Coastal East Africa", "Gulf of California", "The Galápagos", "Coral Triangle"],
        population: null,
    }
];

const animalsByConservationStatus = (status) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const results = endangeredAnimalsDB.filter(a => a.conservation_status === status).map(a => a.common_name);

            if (results.length > 0) {
                resolve(results);
            } else {
                reject(`no animals found with status: ${status}`);
            };
        }, 1500);
    });
};

const fetchAnimalByName = (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const results = endangeredAnimalsDB.find(a => a.name === name);

            if (results !== undefined) {
                resolve(results);
            } else {
                reject(`no animal found with name: ${name}`);
            };
        }, 1500);
    });
};
```

### Challenge 1

```
const printStatusMessage = async (status) => {
    try {
        const animalsList = await animalsByConservationStatus(status);
        console.log(animalsList)
        message = `Animals listed as ${status} are: ${animalsList.join(', ')}`;
        console.log(message);
    } catch(error) {
        console.error(error);
        console.log(`There are no animals with status: ${status}`)
    }
}

printStatusMessage("critical");
printStatusMessage("extinct");
```

### Challenge 2

```
endangeredAnimals = ["saola", "green turtle", "amur leopard", "deer"];

const printAnimalMessage = async (animal) => {
    try {
        const info = await fetchAnimalByName(animal);
        const message = `The ${info.common_name} is ${info.conservation_status} on the endangered list`;
        console.log(message);
    } catch(error) {
        console.error(`There was a problem fetching: ${animal}`)
    };
};

endangeredAnimals.forEach(animal => printAnimalMessage(animal));
```

### Challenge 3

```
animal1 = "vaquita";
animal2 = "mouse";

const printAnimalFacts = async (animal) => {
    try {
        const data = await fetchAnimalByName(animal);
        const message = `The ${data.common_name} (${data.species}) is an endangered animal with ${data.population !== null ? data.population : "an unkown number of"} individuals in the wild in their home region of ${data.region}`;
        console.log(message);
    } catch(error) {
        console.error(error)
    } finally {
        console.log(`The ${animal} was searched.`)
    }
};

printAnimalFacts(animal1);
printAnimalFacts(animal2);
```
`Finally` statements work with Async/await too!

### Challenge 4 - advanced 

```
const printAnimalRegions = async (status) => {
    try {
        const animalsList = await animalsByConservationStatus(status);
        const getAnimals = animalsList.map((animal) => {
            return fetchAnimalByName(animal).catch(err => console.log(err));
        });

        const regions = await Promise.allSettled(getAnimals)
        .then(results => {
            const regions = results.map(result => result.value.region);
            return regions;
        })
        .catch(error => console.log(error));

        const message = `Animals with an endangered status of ${status} can be found in the following regions: ${regions.join(', ')}`;

        console.log(message);
    } catch(error) {
        console.log(error);
    } finally {
        console.log(`Search complete for regions with animals of status: ${status}`);
    };
};

printAnimalRegions("critical");
printAnimalRegions("threatened");
```
There is a lot going on here, so I'm going to break down the most important lines. First off, notice that this is a situation where we need one Promise to resolve before we have the information we need to start the second. In this case, we need to have the list of animals with the requested endangered status back from the API (animalsByConservationStatus), because our second action is to request the specific information for each animal by name (fetchAnimalByName).

So we await the result of `animalsByConservationStatus` so that `animalsList` is an array of animal names. Now, we need to request the information for each animal in that list. To do this, we have to **map** over the list of names, and for each animal we make a request to get its information. So take a look at the variable `getAnimals`, it is the result of a map function, therefore it is an array. But an array of what? Promises!

And here is where this example takes the difficulty to a new level, we now have one Promise per animal in `animalsList` stored in an array (`getAnimals`)! That might trigger your memory from the Promises lesson - there are Promise methods specifically for handling multiple Promises. In this case, `Promise.allSettled` is the one we want and we are going to pass it the array of the Promises `getAnimals`.

But lets take it a little further. `Promise.allSettled` itself returns a what? A Promise. A single Promise. That means that we can await the result of `Promise.allSettled`. Take a look at the `.then` clause of the `Promise.allSettled` and notice that we are returning only the region value of each result. So, `Promise.allSettled` waits for each `getAnimal` Promise to resolve, then takes the data and pulls out the region. The resulting array is stored in the constant regions.


## Quiz

1. Try/Catch is the traditional way to handle errors, Promise chains also handle errors too and uses slightly different syntax to cover the same situations. Match the Try/Catch syntax with the Promise syntax that performs the same function

**` try` ..... `.then`**

** `catch` ..... `.catch`**

** `finally` ..... `.finally`**

2. When the logic of an async function is wrapped in Try/catch blocks and one of the awaited Promises rejects, Try/catch treats the rejected Promise:

**In the same way as try/catch blocks treat errors throen by JS meaning the `catch` statement will run.**

3. What will the following code output?

```
try {
  console.log("A");
  try {
    console.log("B");
    throw new Error("C");
    console.log("D");
  } catch(error) {
    console.log("E");
  } finally {
    console.log("F");
  };
} catch(error){
  console.log("G");
};
```
**This example shows a nested Try/Catch statement, but it works the same way as any other Try/Catch. Lets walk through what happened. First we log A in the outer try. Then we move into the inner try and log B. Then we throw an error and pass C as the error, and we move into the catch statement, but the catch statement doesn't log the error, instead it logs a separate message E. The catch is then done and we move to the finally clause. The finally logs F and then we are out of the inner try. In the outer try there is a catch but no error triggered it, so we are done with the program.**


4. benefits of using Async/await syntax from the list below.

* Allows us to select promises to be treated as blocking actions with the await word

* Allows the developer to use the results of many promises and be confident that the promises have been resolved.

5. Practice interview questions

Explain when you would use Async/await in JavaScript.

**When you are doing an action that requires using the results of many Promises. When you are doing an action with many Promises and it does not fit to use the Promise methods like Promise.all or Promise.race.When you need to be confident you are working the result value of a Promise, and not a pending Promise object.**

6. What will the following code output?
```
const p1 = new Promise((resolve, reject) => {
    console.log('A');
    resolve(['B', 'C']);
})
const p2 = new Promise((resolve, reject) => {
    resolve(['D']);
})
const test = async () => {
  try {
    const d = await p1;
    const d2 = await p2;
    console.log(d.join(" "), d2.join(" "));
  } catch(err) {
    console.log(err)
  };
};

test();
```
**The letters show in order because p1 is called first, which logs A and returns B and C. The p2 is run which logs nothing and returns D. When the results of both Promises are logged, we log them in order of p1 then p2, which gets us the letters in the order A, B, C, D.**

7. What would the following code output?

```
const p1 = new Promise((resolve, reject) => {
    console.log('A');
    resolve('B');
})
const p2 = new Promise((resolve, reject) => {
    resolve(['D']);
});
const test = async () => {
  try {
    const d = await p1.then(data => console.log(data));
    const d2 = await p2;
    console.log(d, d2.join(""));
  } catch(err) {
    console.log(err);
  };
};
```
**First, we call p1 and it logs A and returns B. We have a then clause off of p1 in the async function test that console logs the data returned by p1 - which is B, so B is logged. Then we save the result of p2 - which is D in the variable d2.Now we come to the slightly nuanced part of this example. When we log d in the last line of the try - what does it hold? Well, it holds nothing, because the last then statement of p1 didn't return anything. If you updated this code to add a return "C" to the then statement off of p1, this code would output A, B, C, D. But as it is, d is empty, so it logs undefined, followed by d2 which is D.**


## Lesson Glossary

### Terms

**Exception Handling**
Exception handling means writing code that expects errors to occur and handles them gracefully. Programs with good exception handling can handle errors without crashing or becoming unusable, and instead give their users and developers helpful insight into what went wrong.

### Code Examples

**Try/Catch**
```
try {
   // undeclared variable being used in an operation causes an error
   foo/2
} catch (err) {
   console.error(err.message);
} finally {
   console.log('I run last');
};
```

**Async**
```
// arrow function example
const myAsyncFunction = async ( ) => {
  // ...
};

// named function example

async function myAsyncFunction() {
  // ...
};
```

The async keyword before a function means two things:

* The function must return a promise
* The `await` keyword can be used in the function

**Await**
```
const myAsyncFunction = async ( ) => {
    const myVal = await promise1();
};
```
The `await `keyword forces the program to block until `promise1` has fulfilled and the value returned has been saved to` myVal`.

**Try/catch in Async/await**

Here is an example of using Try/catch for error handling inside an async function.
```
const myAsyncFunction = async ( ) => {
    try {
         const myVal = await promise1();
    } catch(error) {
         console.log(error);
    }
};
```



