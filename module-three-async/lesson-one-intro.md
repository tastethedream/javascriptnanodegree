# Intermediate Javascript Nano degree Module 4 

## Lesson 1: Introduction To Asynchronous Programming

## Learning Objectives

By the end of this course you should be able to:

* Understand asynchronous programs and their logic flows
* Write asynchronous programs with modern, idiomatic JavaScript Syntax
* Be aware of potential issues with asynchronous flows
* Give good answers to asynchronous interview questions

## Lesson Summaries

### Synchronous Concepts and Asynchronous Callbacks

First off, we’ll spend some time with the basics. We’ll start talking about synchronous programs and some of the most common terms that often get mixed up. At the end of the lesson, we’ll do a recap of callbacks that will leave you in a great place to get started with **Promises**.

### Sequencing Events - Promises

Lesson 2 will be an introduction to **Promises** and how they solved some of the issues with callbacks in asynchronous programs. We'll cover the general syntax with lots of hands-on practice. Promises are where we’ll spend the bulk of this course since they are the most common form of handling asynchronicity in modern JavaScript. We will also cover many practical applications of Promises. First with `Fetch`, the modern promise-based syntax for XHTTP requests, and then with promise chaining methods to handle more advanced asynchronous actions. Once you have these under your belt, you’ll have a firm understanding of Promises and be ready for the next layer on top of that syntax - **Async/Await**.

### Sequencing Events - Async/Await

The final lesson of this course will be an introduction to the **Async/Await** syntax introduced in ES6. In reality, this is just some convenient syntax packed around Promises that can help us reason about asynchronous functions in a synchronous way.

### Project: Racing Simulation Game

At the end of the course you'll demonstrate your mastery of Asynchronous JavaScript by creating a racing game called UdaciRacer Sim, which allows a user to race a simulated racer!


### Excercise: Asynchronous Programming

#### Challenge 2
```
const printHelloWorld = () => {
  
   setTimeout(console.log, 2000, "async");
   setTimeout(console.log, 4000, "hronous");
  
  console.log("I'm ");
 
}

printHelloWorld();
```
#### Challenge 3

```
const printMessage = (message) => {
    setTimeout(console.log, 4000, "...hronous!")
}

const printHelloWorld = () => {
  console.log("I'm ");
  setTimeout(printMessage, 2000, "Async");
}

printHelloWorld();
```

### Key Points To Remember About Asynchronous Programming

* Asynchronous patterns are used for tasks like API requests, file reading and writing, and in general for requests to external processes
* Asynchronous programming will help us write code that runs faster by being more efficient with the computing power available
* Writing asynchronous programs is a necessary skill for intermediate level programming jobs
* Asynchronous syntax is now available in every modern programming language, so these concepts translate well to any language you may find yourself working with

