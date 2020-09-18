# Lesson 2: Synchronous concepts and asynchronous callbacks

## Concepts

In this lesson we will cover the following:

* Introduction to threads
* Blocking vs. Non-Blocking code
* Callbacks for asynchronous functionality

## what is synchronous programming?

### An Analogy

Understanding the synchronous process is easiest when you see it in comparison with an asynchronous process. There are a lot of really good analogies for synchronous/asynchronous programming, you might have heard some of them already. Listen to the video above to hear the coffee shop analogy.

### Analogy Takeaways

So what is synchronous programming? It is programming in a way that doesn't try to be efficient with time. Like the barista who waits for the coffee machine as it makes coffee instead of moving on to other tasks, synchronous code will not move on from a task even if it is just waiting for a response from something else.

You can see how the asynchronous approach is **more efficient**, but also can be more complicated. Another important thing to notice in this analogy is that there is only ever one barista, we haven't sped up the process by adding another worker, instead the barista is effectively using their time by continuing with work they can do, while waiting for another task to complete.


## Introduction To Threads

### Threads Summary

Threads are where computers do work, they can do one thing at a time. Modern computers achieve work quickly by spreading tasks across multiple threads.

But **JavaScript is single-threaded**, we only get one thread on which to do work (with exceptions...but we'll get to that later). Only one thing can happen at a time, so we have to learn to use our single thread as efficiently as possible.

**Synchronous programs** don't try to use the thread efficiently, they just program tasks to be done and if one task takes a long time - even if it is just waiting for something to happen - the thread is blocked and cannot move onto the next task until the current one is completely finished.

The inverse of this shows us that **Asynchronous programs** use clever methods and syntax to their advantage with a goal of getting as much usefulness out of the single thread as possible.

## The Concept Of Blocking And Non-Blocking

**Blocking** refers to a task that stops all work on the thread until it is complete. A **non-blocking** task allows the program to go on with other tasks while waiting for something to finish. For instance, if my application makes a blocking request to an API, the entire thread is stuck while it is just waiting for that information to come back. If we change it to use a non-blocking request our program can continue on to complete other tasks and deal with the API response when it becomes available.

**Synchronous** programs use **blocking** code. **Asynchronous programs** use **non-blocking** code when it is beneficial. By learning to write non-blocking code to create asynchronous programs, we can reduce inefficiencies and make better use of the computing power available to us.

## Blocking vs Non-Blocking Code

The important thing is that we saw some asynchronous syntax in JavaScript. We learned that JavaScript moves I/O operations to a new thread via an internal API, which is why using the timer in our example was automatically non-blocking. This is what is meant when JavaScript is described as a "**single threaded programming language with asynchronous non-blocking I/O(input/output)**".

`setTimeout()`, `setInterval()` and ``fetch()` - happens on another thread

### Blocking example

```
// This function takes a long time!
const longFunction = (ms) => {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
};

console.log("One");

longFunction(3000);

console.log("Two");

// Notice how each of the lines above happen in order. Each one "blocks" this thread until it is completed
```

### Non-blocking example

```
const nonBlocking = () => {
  // setTimeout is part of the JavaScript window/browswer API, the counter is actually being run outside of our main thread
  setTimeout(console.log, 3000, "Two");
};

console.log("One");

nonBlocking();

// Notice in the console that Three logs immediately after One
// This is because setTimeout is not happening here! We're running that function on another process in the Browser API
console.log("Three");
```
### Excercise 1

```
// Task 1 - write a program that acheives the following sequence

// log "A"

const wait = (ms) => {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
};

console.log("A");

// wait 2s
wait(2000);
// log "B"
console.log("B");
// wait 3s
wait(3000);
// log "C"
console.log("C");
// log "D" immediately 
console.log("D");
```

or

```
const logB = () => {
    console.log("B")
}

const logC = () => {
    console.log("C")
    console.log("D")
}

console.log("A")
setTimeout(logB, 2000);
setTimeout(logC, 3000);
```

### Excercise 2

```
// Task 2 - print each word of this quote every second using built javascript method setInterval. Print the quote source all at once afterwards

// Tip: To stop a setInterval - call clearInterval() 
// Tip: To pass arguments to the function setInterval is calling, add them as a 3rd (and 4th if you need it) argument to setInterval, after the milliseconds 

const quote = "The art of programming is the skill of controlling complexity.";
const reference = "-- Marijn Haverbeke, Eloquent JavaScript";


const printWordClosure = () => {
    let index = 0

    return (quotation) => {
        console.log(quotation[index])
        if (index === quotation.length-1) {
            clearInterval(quoteInterval)
            console.log(reference)
        }
        index++
    }
}

const quoteInterval = setInterval(printWordClosure(), 1000, quote.split(' '));
```

## Asynchronous, Concurrent, Or Parallel?

### Asynchronous - single thread
Refers to the management of a single thread that can move past tasks that are waiting to complete the rest of the program. Synonymous with non-blocking.

### Parallel - multiple threads
Running two processes on two separate threads simultaneously

### Concurrent - multiple threads
Achieving the appearance of simultaneous computation by switching between tasks on an active thread

### Practice Interview Question
**What is the difference between Asynchronous and Parallel programming?**


**Asynchronous** is for single-threaded programs and is concerned with using non-blocking code to make the most efficient use of a single thread as possible.

**Parallel** is a means of managing multi-threaded programs in which tasks are split between completely separate threads and execute simultaneously.

### Practice Interview Question

**In your own words, explain the difference between blocking and non-blocking code. You might use an example from life or a tech example like an API request.**


