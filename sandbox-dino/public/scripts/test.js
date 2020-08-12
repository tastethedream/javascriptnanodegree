// Create Dino Constructor
function Dino(species, weight, height, diet, where, when, fact, image) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
    this.image = image;
}
// Create pigeon Constructor
function Nondino(species, weight, height, diet, where, when, fact, image) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
    this.image = image;
}

// Create Dino Objects

const pigeon = new Nondino(
    "Pigeon",
    0.5,
    9,
    "herbavor",
    "World Wide",
    "Holocene",
    ["All birds are living dinosaurs."],
    "images/pigeon.png"
);

const triceratops = new Dino(
    "Triceratops",
    13000,
    114,
    "herbavor",
    "North America",
    "Late Cretaceous",
    ["First discovered in 1889 by Othniel Charles Marsh"],
    "images/triceratops.png"
);
const tyrannosaurusRex = new Dino(
    "Tyrannosaurus Rex",
    11905,
    144,
    "carnivor",
    "North America",
    "Late Cretaceous",
    ["The largest known skull measures in at 5 feet long."],
    "images/tyrannosaurus rex.png"
);
const anklyosaurus = new Dino(
    "Anklyosaurus",
    10500,
    55,
    "herbavor",
    "North America",
    "Late Cretaceous",
    ["Anklyosaurus survived for approximately 135 million years."],
    "images/anklyosaurus.png"
);
const brachiosaurus = new Dino(
    "Brachiosaurus",
    70000,
    372,
    "herbavor",
    "North America",
    "Late Jurasic",
    ["An asteroid was named 9954 Brachiosaurus in 1991."],
    "images/brachiosaurus.png"
);
const stegosaurus = new Dino(
    "Stegosaurus",
    11600,
    79,
    "herbavor",
    "North America, Europe, Asia",
    "Late Jurasic to Early Cretaceous",
    ["The Stegosaurus had between 17 and 22 seperate places and flat spines."],
    "images/stegosaurus.png"
);
const elasmosaurus = new Dino(
    "Elasmosaurus",
    16000,
    59,
    "carnivor",
    "North America",
    "Late Cretaceous",
    ["Elasmosaurus was a marine reptile first discovered in Kansas."],
    "images/elasmosaurus.png"
);
const pteranodon = new Dino(
    "Pteranodon",
    44,
    20,
    "carnivor",
    "North America",
    "Late Cretaceous",
    ["Actually a flying reptile, the Pteranodon is not a dinosaur."],
    "images/pteranodon.png"
);

// Create Human Object
// Use IIFE to get human data from form
let human = new Dino("", "", "", "", "", "", [""], "./images/human.png");



// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
// Only compare with dino so pigeon will keep a static fact and human will not display a fact
// compare human height with dino height and create a new fact

//  function compHeight (dino) {
//     if (dino.species !== human.species) {
//         if (human.height < dino.height) {
//             dino.fact.push(`${dino.species} is taller than a ${human.species}`);
//         } else {
//             dino.fact.push(`${human.species} is shorter than a ${dino.species}`);
//         }
//     }
// };


function compHeight (dino) {
    if (dino.species !== human.species) {

        const heightCalc = dino.height / human.height
        const roundHeight = heightCalc.toFixed(1)
    
            dino.fact.push(`${dino.species} is ${roundHeight} times taller than ${human.species}`);
        } 
    
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
// compare human weight with dino weight and create a new fact

function compWeight (dino) {
    if (dino.species !== human.species) {

        const weightCalc = dino.weight / human.weight
        const roundWeight = weightCalc.toFixed(1)
    
            dino.fact.push(`${dino.species} is ${roundWeight} times heavier than ${human.species}`);
        } 
    
};


// function compWeight (dino) {
//     if (dino.species !== human.species) {
//         if (human.weight < dino.weight) {
//             dino.fact.push(`${human.species} weighs less than a ${dino.species}`);
//         } else {
//             dino.fact.push(`${human.species} weighs more than a ${dino.species}`);
//         }
//     }
// };

// Create Dino Compare Method 3
// compare human diet with dino diet and create a new fact
function compDiet (dino) {
    if (dino.species !== human.species) {
        if (human.diet === dino.diet) {
            dino.fact.push(`${human.species} has the same diet as a ${dino.species}`);
        } else {
            dino.fact.push(`${human.species}'s diet differs from that of a  ${dino.species}`);
        }
    }
};

//create array for dino data to use in the grid

function generateArray() {
    return [
        triceratops,
        tyrannosaurusRex,
        anklyosaurus,
        brachiosaurus,
        human,
        stegosaurus,
        elasmosaurus,
        pteranodon,
        pigeon,
    ];
};

// Generate Tiles for each Dino in Array

generateTiles = () => {
    const creatureList = generateArray();
    return creatureList.map((creature) => {
            compHeight(creature);
            compWeight(creature);
            compDiet(creature);
            return `
                <div class="grid-item">
                    <h3>${creature.species}</h3>
                    <img src="${creature.image}" />
                    <p> 
                        ${  creature instanceof Dino
                            ? creature.fact[Math.floor(Math.random() *creature.fact.length)]
                            : creature.fact[0]
                        }
                    </p>
                </div>
                `;
        })

    // return array as a string
        .join("");
};

// Add tiles to DOM

 function addTilesToDom() {
    document.getElementById("grid").innerHTML = generateTiles();
};

// Remove form from screen

function hideForm(){
    document.getElementById('dino-compare').style.display='none';
};

//On button click, prepare and display infographic

document.getElementById("btn").onclick = () => {
    human.species = document.getElementById("name").value;
    human.weight = document.getElementById("weight").value;
//make value of height in inches
    human.height = document.getElementById("feet").value * 12 + document.getElementById("inches").value;
    human.diet = document.getElementById("diet").value;
    hideForm();
    addTilesToDom();
};
