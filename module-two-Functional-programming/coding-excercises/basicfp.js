// -----------------------------------------------------------------
// Exercise 1
// Directions: Write a pure function that prints "good afternoon" if
//       its afternoon and "good morning" any other time of the day.
// Hint - this will help with time of day: new Date().getHours()
// -----------------------------------------------------------------
function correctGreet(){
    const time = new Date().getHours();
    if ( time > 12 && time < 17){
        return 'Good Afternoon'
    } else {
        return 'Good Morning'
    }
    console.log(correctGreet());
};



// -----------------------------------------------------------------
// Exercise 2
// Directions: Write a pure function that takes in a number and  
//       returns an array of items counting down from that number to 
//       zero.
// -----------------------------------------------------------------
