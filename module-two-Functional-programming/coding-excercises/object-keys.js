// Use Object.keys with the map method to print "This character has a(n)
//[property-name]" for each property

const character = {
    id: '12mn18udcbv9823',
    name: 'Chewbacca',
    race: 'Wookie',
    planet: 'Kashyyyk',
    job: 'First Mate'
};


const keys = Object.keys(character);

keys.map(keys => {
    console.log('${keys}')
    return 'this character has a(n) ${keys}'
});
// Expected Output: 
// This character has a(n) id.
// This character has a(n) name.
// This character has a(n) race.
// This character has a(n) planet.
// This character has a(n) job.
// [ 'This character has a(n) id',  'This character has a(n) name', 
// 'This character has a(n) race', 'This character has a(n) planet', 
//'This character has a(n) job' ]

