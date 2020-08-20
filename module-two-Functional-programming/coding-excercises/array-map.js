 
// 1. Write a map function to reverse this array:
//const start = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// your code

// const end = start.map(x => Math.abs(x - 11))
// console.log(end);

// expected output: Array [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

// ----------------------------------------------------------
// 2. Write a map function to print the Job: Name:
//const shipMates = [["Mal", "Captain"], ["Wash", "Pilot"], ["Zoey", "1st Mate"], ["Jayne", "Public Relations"]]

// your code

//const output = shipMates.map(ship => ship.reverse().join(': '))

// expected output: Array ["Captain: Mal", etc...]
//console.log(output);
// ----------------------------------------------------------
// 3. Write a map function that prints the name: even|odd even or odd index
// const awayTeam = ["Picard", "Riker", "Troy", "Data"]

// your code

//const newName = awayTeam.map((name, i) => `${name}: ${i % 2 === 0 ? 'even' : 'odd'}`)

// expected output: Array: ["Picard: even", "Riker: odd", etc...]
//console.log(newName);
// ----------------------------------------------------------
// 4. Create a multidimensional array of each item and its index in the original Array.

//const sci_fi_shows = ['Manedlorian', 'Enterprise', 'Firefly', 'Battlestar Galactica']

// your code
//const itemIndex = sci_fi_shows.map((show, index) => [show, index])

// expected output: Array [['Manedlorian', 0], ['Enterprise', 1], ['Firefly', 2], ['Battlestar Galactica', 3]]
//console.log(itemIndex);
// ----------------------------------------------------------
// 5. For each item in this array, create a multidimensional array containing the entire original array.

const numbers = [1, 2, 3, 4]

const result = numbers.map((num, index, wholeArray) => wholeArray)

// your code
console.log(result);
// expected output: Array [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]