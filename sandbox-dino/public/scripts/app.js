
    // Create Dino Constructor
    // function Dinosaur(species, weight, height, diet, where, when, fact, image ){
    //   this.species = species;
    //   this.weight = weight;
    //   this.height = height;
    //   this.diet = diet;
    //   this.where = where;
    //   this.when = when;
    //   this.fact = fact;
    //   this.image = image;
    // };

    const dino ={
        species: 'test',
        weight: 10,
        height: 10,
        diet: 'Carnivore',
        image: '',
        facts: ['for test purpose only']
    };
  
      // Create Dino Objects
    
    //   const pigeon = new dino(
    //     'Pigeon',
    //     0.5,
    //     9,
    //     'herbevor',
    //     ['all birds are considered dinosaurs'],
    //     'images/pigeon.png'
    //   );

//   function showDinoFact(fact){
//       alert('fact');
//   };
  
//   const pteranadon = new Dinosaur(
//       'Pteranodon',
//        44,
//        20, 
//        'carnivor',
//        'North America',
//        'Late Cretaceous',
//        ['fact missing'],
//        'images/pteranodon.png'
//   );

  
//   const elasmosaurus = new Dinosaur(
//       'Elasmosaurus',
//        16000,
//         59, 
//       'carnivor',
//       'North America',
//       'Late Cretaceous',
//       ['A marine repltile, first discovered in kansas'],
//      'images/elasmosaurus.png'
//   );
  
//   const stegosaurus = new Dinosaur(
//       'Stegosaurus',
//        11600,
//        79, 
//        'herbevor',
//        'North America, Europe, Asia',
//        'Late Jurasic to Early Cretaceous',
//        ['The Stegosaurus had between 17 and 22 seperate places and flat spines.'], 
//        'images/stegosaurus.png'
//   );
  
//   const brachiosaurus = new Dinosaur(
//       'Brachiosaurus',
//        70000,
//        372, 
//        'herbevor', 
//        'North America',
//        'Late Jurasic',
//        ['An asteroid was named 9954 Brachiosaurus in 1991'],
//        'images/brachiosaurus.png'
//   );
  
//   const tyrannosaurus = new Dinosaur(
//       'Tyrannosaurus Rex',
//        11905,
//        144, 
//        'carnivor',
//        'North America',
//        'Late Cretaceous',
//         ['It has a skull measuring 5 feet long'],
//        'images/tyrannosaurus rex.png'
//   );
  
//   const  triceratops = new Dinosaur(
//       'Triceratops',
//        13000, 
//        114, 
//        'herbevor', 
//        'North America',
//        'Late Cretaceous',
//        ['First discovered in 1889 by Othanial Charles Marsh'],
//        'images/triceratops.png'
//   );
  
//   const anklyosaurus = new Dinosaur(
//       'Anklyosaurus',
//        10500,
//        55, 
//        'herbevor',
//        'North America',
//        'Late Cretaceous',
//        ['Survived for approximately 135 million years'],
//        'images/anklyosaurus.png'
//   );
  

  // Create Human Object

  //let human = new dino("", "", "", "", "", "", [""], "./images/human.png");

    
  // Use IIFE to get human data from form

  
function Human(name, weight, feet, inches, diet){
    this.name = name;
    this.weight = weight;
    this.feet = feet;
    this.inches = inches;
    this.diet = diet;
}

function getName(){
    let name = document.getElementById('name').value;
    return name;
}

function getWeight(){
    let weight = document.getElementById('weight').value;
    return weight;
}

 function getFeet(){
    const feet = document.getElementById('feet').value;
    return feet;
 }

function getInches(){
    const inches = document.getElementById('inches').value;
    return inches;
}

 function getHeight(feet, inches){    
    let height =  (parseInt(feet) * 12) + parseInt(inches);
    return height;
}

function getDiet(){
    let diet = document.getElementById('diet').value;
    return diet;
}

  // Create Dino Compare Method 1
  // NOTE: Weight in JSON file is in lbs, height in inches. 
  // Compare diet


  // Create Dino Compare Method 2
  // NOTE: Weight in JSON file is in lbs, height in inches.
  // compare weight



  
  // Create Dino Compare Method 3
  // NOTE: Weight in JSON file is in lbs, height in inches.
  //compare 1 dino height with human height height to begin with

// do not know which value to add for the weight of the dinosaur

  function compWeight (dino, weight){
    const weightFact =  dino.weight /weight;
    return weightFact;
//}
   


  // Generate Tiles for each Dino in Array
  // map()???


combinedArray = () => {
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
  function generateArray(){
    const gridData = combinedArray();
    return gridData;


   //alert('tiles will be displayed here')

  };
function showTiles(){
  document.getElementById('grid');
}

 // Add tiles to DOM

  // Remove form from screen
   function hideForm(){
        document.getElementById('dino-compare').style.display='none';
    }

// On button click, prepare and display infographic

btn.addEventListener('click', (e) => {
    // let weight = document.getElementById('weight').value;
    // document.getElementById('dino-compare').innerHTML = weight;
  
    //const humanName = 'button click complete ' + getName();
    //alert(humanName);

    const testComp = 'This dino is ' + compWeight()  +'times heavier than ' + getName();
    alert(testComp);
      
    //const humanWeight = 'button click complete and you are' + getWeight() + 'lbs';
    //alert(humanWeight);

    //const humanDiet = 'button click complete and you are a  ' + getDiet();
    //alert(humanDiet);
 
    //const tempValue1 = getFeet();
    //alert(tempValue2);

    //const tempValue2 = getInches();
    //alert(tempValue1);



    //const tempValue3 = getHeight(tempValue1, tempValue2);
    //alert(tempValue3);
   
    //const showWeightFact = 'This dinosaur is ' + compWeight() + 'heavier than you.'
    //alert(showWeightFact);

    hideForm();

    //showDinoFact();
    //generateArray();
       

    //showTiles();

});