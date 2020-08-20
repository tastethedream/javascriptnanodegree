// 1. Take this disjointed sentence and turn it into a single string
// const text = ['The ships', 'hung in the sky,', 'much the way', 'that bricks don`t']

// const string = text.reduce((runningTotal, currentValue) => {
//     console.log(runningTotal, currentValue);
//     return runningTotal + currentValue
// })

// Your Code Here

// expected output: "The ships hung in the sky, much the way that bricks don't"

// ----------------------------------------------------------

// 2. Return the winning team
// const scores = [
//     {
//         team: 'A',
//         score: 20
//     },
//     {
//         team: 'B',
//         score: 17
//     },
//     {
//         team: 'C',
//         score: 23
//     },
//     {
//         team: 'D',
//         score: 13
//     }
// ]
// const winner = scores.reduce((highValue, currentValue) => {
//     if (currentValue.score > highValue.score){
//     return currentValue;
//     } else {
//         return highValue;
// }

// });


// console.log(winner.team);
// Your Code Here

// expected output: "C"

// ----------------------------------------------------------
//    REAL LIFE EXAMPLE
// Reduce can sometimes save us a lot of time -- if we remember to use it.
// Instead of writing a complicated map or filter method and then calling the
// name of the ship out of the retuned array, Return the name of the fastest
// star ship

const ships = [
    {
        name: 'Serenity',
        speed: '4.2G',
    },
    {
        name: 'Cylon Raider',
        speed: '7.5G',
    },
    {
        name: 'Swordfish II',
        speed: '50G',
    },
    {
        name: 'Tie Fighters',
        speed: '4100G',
    }
]

const fastest = ships.reduce((previous, current) => {
    const speed = parseInt(current.speed.slice(0,-1))
    const prevSpeed = parseInt(previous.speed.slice(0,-1))
    if(speed > prevSpeed){
        return current;
    } else {
        return previous
    }

})

console.log(fastest.name);

// Your Code Here

// Expected output: Tie Fighters