# Intermediate JavaScript NanoDegree

## Module 3 Functional Programming

### Lesson 2 Introduction to functional programming

#### Section 1 Programming Paradigms


**Introduction to Programming Paradigms**

What are **programming paradigms**  anyway? The word “paradigm” always felt 
ephemeral and for a long time I did not feel like I understood what it was all about. 
Paradigms are styles of programming that are tried and true at helping you write clean,
 readable, and effective programs, so they are definitely worth learning! In this lesson, 
 we will start with an overview of paradigms in general, look at three in particular, 
 and then move into the specific benefits and structure of the Functional Programming paradigm.



- **Programming Paradigm** is a philosophy, style, or general approach to writing code.
Most programming paradigms differ in how they deal with state.
- The **Imperative Paradigm** solves problems with an explicit sequence of commands to get from point A to point B. If the code or comments read like a recipe or handbook, it's likely to be imperative. Many programming languages, especially dynamic ones, including Javascript, PHP, and Python can be used to write imperative programs.
- The **Functional Paradigm** solves problems with functions that hold simple pieces of logic and can be chained together to accomplish more complex actions.
- The **Object-Oriented Paradigm** solves problems by defining objects that can hold both values (properties) and functionality (methods).

**How do you choose a programming paradigm?**

This can be a daunting question. When you start thinking about a new project, without a single line of code even written yet, how can you have confidence you’re choosing the right paradigm for the job?

Here are some things to consider. If your application is inherently **state-based**, like maybe a simple game, a blog, or a GUI, it is likely a good candidate for **Object Oriented programming**, because the entities in an Object Oriented program are easier to reason about.

On the other hand, if you have a **large** program that needs to have a high degree of **reliability**, or if you need to manage lots of user interactions and fast updates, then it might be a good sign that you could write a **Functional program**. Functional programs shine especially when you need to leverage concurrency. As chips have become about as fast as we can make them, the way to get faster computers has been to add more cores. But those cores are useless to make our programs faster unless we can use them well. For a program that manages concurrency well, you probably would want to rethink your decision to use JavaScript, but the Functional Paradigm would be the best choice.

It turns out though, that the choice of programming paradigm is quite personal and subjective among developers. Many people will learn a paradigm and more or less stick to it. For instance, a person who is comfortable with Object Oriented programs will trend towards creating more Object Oriented programs, because at the end of the day, we want to build things more than we want to think about building things.

Another way to go about it is to know the strengths and weaknesses of the various paradigms and try to choose one based on which is the best fit for the thing you are trying to build. This might mean you choose a paradigm you are less familiar with, meaning that development of your project will take longer initially.

Neither of these approaches is bad, and you will find what works for you. I lean towards the second option and it's my personal opinion that over time trying to choose the best paradigm for the problem will make you a more well rounded developer. The only time I go away from that is prototyping. When you just need to get a rough idea of an app working, use the paradigm you are most familiar with as this will help you move quickly and with confidence before motivation for the project fizzles out. Once the idea has proven itself a little bit, and you have good visibility into the tricky parts of your particular program, you can re-evaluate which paradigm would be best. Of course, this requires re-writing your program at some point.

**Further Research**
I would highly recommend the article, An Introduction to Programming Paradigms, from Digital Fellows by Patrick Smyth, especially the sections following sections:

- A Simpler Program, is a great perspective on how to think about your programs.
- Which Paradigm to Choose?, which gives more information on choosing a programming paradigm.

#### Section 3 Comparing paradigms

see compare-paradigms.js for working code

#### Section 6 Foundations of FP

##### Pure Functions

**Pure functions** are a simple concept with big implications. And to start off with, I’m pretty sure you have already written a pure function! If you started off learning to write functions like this:
```
function add(x,y) {
    return x + y
}
```
Then you have written a pure function! So what makes this pure, and why is this simple idea the foundation for a powerful paradigm like functional programming?

One thing that is obvious in this case, but incredibly important, is that if given the same arguments, this function will return the same value. You can run `add(2, 2)` as many times as you want, and the only thing you will get is` 4.` Brian Lonsdorf's definition definition of a pure function in the GitBook, ["Professor Frisby's Mostly Adequate Guide to Functional Programming"] (https://mostly-adequate.gitbooks.io/mostly-adequate-guide/ch03.html) is this:

>A pure function is a function that, given the same input, will always return the same output and does not have any observable side effect.

##### Code Review - Side Effects
```
let galaxy_ship = {
    torpedo_balance: 0,
    id: 123456,
}

function stock_arsenal(amount, id) {
    if (galaxy_ship.id === id) {
      // SIDE EFFECT
      // Galaxy_ship’s values are being updated, but it is not a part of the return of this function
      galaxy_ship.torpedo_balance += amount 

      console.log('arsenal successfully stocked')
      console.log(galaxy_ship.torpedo_balance)

      // return value is just a message
      return 'arsenal successfully stocked'
    }

    console.log(`invalid account id`)
    return `invalid account id`
}

stock_arsenal(40, 123456)
// expected output: 
// arsenal successfully stocked
// 40
```
##### Summary on Pure Functions

We just learned about **side effects**, which modify state and don't come from the return statement of that function. So now we have everything we need to understand pure functions. **Same inputs get the same output and the return value is the total effect of running the function.**

What do we get from writing pure functions? To sum it up in one word, I would say confidence. But there is a lot more to it than that. Here are some last points to consider:

- If we can count on a function to produce the same result no matter where in the program it runs, then we don’t have to be afraid of calling it anywhere. It makes my functions easy to reuse.
- If a function has no side effects, then we remove the mental load of needing to remember them. I have confidence about what my functions do, and the effect they will have on my app. That confidence means that I can scale things more easily and alter programs with less fear.

##### Immutability

Another major tenant of functional programming is that we do not “edit” things; we make new things.

For instance, if I had a set of notes for a class, and you wanted to borrow them, when you see something that you wanted to edit or add, you wouldn’t make those edits on my notes...hopefully. Instead, you would make a fresh copy of my notes and make your changes there. That would preserve my copy and let you have your new notes; in essence, that is what functional programming wants.

Editing - more commonly referred to in development as *“mutating”* the same thing over and over again makes it hard to know what copy you are looking at, and is prone to errors. At multiple points later in the course, we will take a look into how we can create **immutable values** in our JavaScript programs. For now though, this will hopefully explain why we favor ‘const’ variables over ‘let’ variables in this course.

##### New Terms

**Pure Functions** - A function that will always return the same output if given the same input, and which has no side effects.
**Side effects** - An effect on your overall program from running a function, that did not come from the return statement of that function.
**Immutable** - Unchanging. Immutable values are ones which, once declared, cannot be changed.


**see foundation-concepts.js for pure code example**

##### Summary

The content we learned in this section has an amazing ability to improve your everyday coding skills, even if you aren’t writing a Functional program.

You learned that pure functions are completely predictable in their outcome, and as a developer, predictable is exactly what you want your programs to be.

Avoiding side effects is partly what makes pure functions predictable, and they also make code easier to read, and reduce the interdependence of programs and functions.

We also covered a little bit of how immutable values make it easier to track changes over time, and that it is preferable to make a copy of a value before editing it, rather than making changes to the original.

We have now covered the core concepts of Functional Programming. There will be a few more throughout the course, but even using and understanding just these have the power to improve the quality and clarity of your programs.

#### Section 9 Why FP?

##### Functional Pros and Cons

It can be difficult to evaluate the pros and cons of a programming paradigm, and it can be hard to keep each paradigm straight. But one key that can really help is to remember that what typically differentiates paradigms is how they deal with application state - or put more simply - **how they keep track of stuff** (values and entities) and how those things change while the program runs. How does Functional Programming deal with application state? Very carefully. Functional Programming believes that values shouldn’t be sloppily edited, but rather replaced with fresh values every time. It also ensures that state changes in very predictable places -- the return values of functions. You’ll see that a lot of these pros and cons have to do with how state is handled.

###### Pros
- **Easier to test**
Because every function is pure, we know that the return value is the sum of the function, and is the only part that needs to be tested. Functions that avoid side effects are easier to test.

- **More predictable code**
Functions that avoid side effects and the use of immutable values makes changes in the programs more visible. By definition, pure functions always return the same value when given the same inputs. This predictability is the backbone of success with Functional Programming

- **Easier to edit and expand**
Because pure functions return the same value every time, and perfectly encapsulate their logic in the return statement, it means that a function could be copied and pasted to a new part of a program, or moved to an entirely different program, and it would still always produce the same result. Functions with side effects cannot be moved without the possibility of breaking something.

###### Cons

- **More difficult to write in some languages**
While most modern dynamic languages have the ability to write in a Functional style, it can go against the grain with some. Even JavaScript, for instance, does not have a way to make values truly immutable. Writing programs without classes goes against the grain of Ruby, and PHP does not have all the array methods JavaScript has that follow a Functional methodology.

- **Will never be able to implement completely**
There is a big difference between pure academic Functional programming and practical Functional-inspired programming for the web. Unless you are using a language that was built to be Functional, like Haskell, there will be times you have to work within the limits of the language to do the best you can at writing functional programs.

- **Few libraries to speed progress (though this is changing)**
Functional programming for the web is still fairly new, and there are not as many helpful libraries or tutorials for getting started or writing efficiency as there are for say Object Oriented programs, for which we have prebuilt ORMs, tons of tutorials, frameworks, etc..



![Paradigms compared table](https://github.com/tastethedream/javascriptnanodegree/blob/master/images/paradigmscompared.png "paradigm comparisson table")

**Resources**


- Digital Fellows Article - Introduction to Programming Paradigms
- Programming Paradigms Overview

**Glossary**

**Programming Paradigm** - An overarching approach or style to problem-solving or ...

A philosophy, style, or general approach to writing code.

**Pure Functions** - A function that will always return the same output if given the same input, and which has no side effects.

**Side effects** - An effect on your overall program from running a function, that did not come from the return statement of that function.
**Immutable** - Unchanging. Immutable values are ones which, once declared, cannot be changed.
