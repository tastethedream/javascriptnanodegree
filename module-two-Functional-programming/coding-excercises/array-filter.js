 
// 1. Find all the words with more than 7 characters
//const words = ['tardis', 'grok', 'frak', 'blaster', 'klingon', 'shepherd']

// expected output: Array ['shepherd']
//const seven = words.filter(w => w.length > 7 )

//console.log(seven);
// ----------------------------------------------------------
// 2. Find all even values
 //const words = [12, 13, 14, 15, 16, 17]

//const even = words.filter(w => w % 2 === 0);

 //console.log(even);

// expected output: Array [12, 14, 16]

// ----------------------------------------------------------
// REAL LIFE EXAMPLES

// We often use filter to quickly pull all the items that share a status or other 
//characteristic. For instance, create a list of all the active bounty hunters
// from the array below:

const hunters = [
    {
        name: 'Greedo',
        universe: 'Star Wars',
        status: 'active',
    },
    {
        name: 'Boba Fett',
        universe: 'Star Wars',
        status: 'inactive',
    },
    {
        name: 'Asajj Ventress',
        universe: 'Star Wars',
        status: 'unknown',
    },
    {
        name: 'Zam Wesell',
        universe: 'Star Wars',
        status: 'inactive',
    },
    {
        name: 'Jango Fett',
        universe: 'Star Wars',
        status: 'active',
    },
]

const share = hunters.filter(hunter => hunter.status === 'active');
console.log(share);

// expected output: Array [
//     {
//         name: 'Greedo',
//         universe: 'Star Wars',
//         status: 'active',
//     },
//     {
//         name: 'Jango Fett',
//         universe: 'Star Wars',
//         status: 'active',
//     },
// ]