In this course we will start with an overview of Lambda Calculus and how ideas from it came to form the Functional Programming paradigm. In the next lesson we will go over specifics of the Functional paradigm, and the last lessons will all be on implementing the Functional paradigm in Javascript.

## Course Overview
### Lesson 1: Course Introduction
The lesson you are currently going through introduces the Functional Programming in JavaScript to prepare you for the rest of this course.

### Lesson 2: Understanding Functional Programming

This lesson will be slightly more theory-heavy, going in the details of paradigms and Lambda Calculus to develop a core understanding that will help the rest of the course content hold together.

### Lesson 3: Functional JS Syntax

Javascript gives us many tools to write in a functional way, but they might not be all the ways you are used to. This will also give a good tour of ES6 syntax that will come in handy in any Javascript you write and help you study up for potential interview questions.

### Lesson 4: Building a Functional Program with JS

This lesson will take all the syntax practiced in lesson 2 and teach you to combine them into powerful, Functional programs. This lesson will also give you clarity into how React works behind the scenes.

### Lesson 5: Libraries and Other Functional Tools for JS

The final lesson is all about going further with Functional Programming and the tools you are likely to come across. It will pay special attention to showing how Functional Programming concepts we learned in lesson 1 are being used to solve traditional problems in web development.

### Project: NASA Mars Rover Dashboard
Using the Functional Programming tools learned in the course, you will build a web page that consumes the NASA API to display information about the various Mars rovers.

### Tools

The nice thing about working with Functional JS is that we need very few tools! Just pull up your text editor of choice and you’ll be able to follow along. I will use repl.it for early code walkthroughs but as we progress to more complex programs, I will switch over to using the Visual Studio (VS) Code text editor. If you want to install VS Code yourself you can go here and follow the instructions for your OS.

One thing to remember, browsers don’t support all the ES6 syntax, so if you are used to testing your JavaScript by pulling up Inspect Element and throwing code in the console - that won’t work here. Instead, you’ll have to run a .js file through Node in your terminal or find an online ES6 sandbox.

Local Machine
The command to clone the entire exercises repo will be as follows:

$ git clone -exercises https://github.com/udacity/nd032-c2-functional-programming-with-javascript-starter.git
The general organization of the repo is that each lesson has its own folder and programs are named according to the subject matter. For example, the first exercise is located in Exercise: Compare Paradigms Concept and the corresponding exercise will be found here:

.../exercises/intro_to_fp/compare_paradigms.js
Note: Spend some time to set up your environment now, this will make going through the rest of the lessons much easier.

Workspaces
Another option will be working through the workspaces embedded in the classroom. These are already setup environments with the relevant code for the particular exercise.

**Excercise - Compare Paradigms**

**Question**
```
// compare_paradigms.js

// Directions: Rewrite the **imperative code** below as Object-Oriented 

let status = 'active'
let warp = 2
let type = 'Dilithium Crystal'
let status_report = 'Captain, '

if(status === 'active' && warp <= 4) {
    status_report += 'the engines are active and we could be going faster.'
} else if (status === 'active' && warp > 4) {
    status_report += 'the engines are active and we are going ' + warp + '.'
} else if (status === 'down') {
    status_report += 'the engines are down.'
} else {
    status_report += 'the comms are down and we can`t reach engineering.'
}

console.log(status_report)
```
**Answer**
```

