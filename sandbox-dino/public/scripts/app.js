
    // Create Dino Constructor
    function Dinosaur(species, weight, height, diet, where, when, fact, image ){
      this.species = species;
      this.weight = weight;
      this.height = height;
      this.diet = diet;
      this.where = where;
      this.when = when;
      this.fact = fact;
      this.image = image;
  
  };
  
      // Create Dino Objects
      // should the facts be in an array with some empty ones ??//
     
  const pigeon = new Dinosaur(
      'Pigeon',
       0.5,
        9,
      'herbevor',
      'World Wide', 
      'Holocene',
      'all birds are considered dinosaurs',
      'images/pigeon.png'
  );
  
  const pteranadon = new Dinosaur(
      'Pteranodon',
       44,
       20, 
       'carnivor',
       'North America',
       'Late Cretaceous',
       'images/pteranodon.png'
  );

  
  const elasmosaurus = new Dinosaur(
      'Elasmosaurus',
       16000,
        59, 
      'carnivor',
      'North America',
      'Late Cretaceous',
      'A marine repltile, first discovered in kansas',
     'images/elasmosaurus.png'
  );
  
  const stegosaurus = new Dinosaur(
      'Stegosaurus',
       11600,
       79, 
       'herbevor',
      'North America, Europe, Asia',
      'Late Jurasic to Early Cretaceous',
      'The Stegosaurus had between 17 and 22 seperate places and flat spines.', 
      'images/stegosaurus.png'
  );
  
  const brachiosaurus = new Dinosaur(
      'Brachiosaurus',
       70000,
       372, 
       'herbevor', 
       'North America',
       'Late Jurasic',
       'An asteroid was named 9954 Brachiosaurus in 1991',
       'images/brachiosaurus.png'
  );
  
  const tyrannosaurus = new Dinosaur(
      'Tyrannosaurus Rex',
       11905,
       144, 
       'carnivor',
       'North America',
       'Late Cretaceous',
       'It has a skull measuring 5 feet long',
       'images/tyrannosaurus rex.png'
  );
  
  const  triceratops = new Dinosaur(
      'Triceratops',
       13000, 
       114, 
       'herbevor', 
       'North America',
       'Late Cretaceous',
       'First discovered in 1889 by Othanial Charles Marsh',
       'images/triceratops.png'
  );
  
  const anklyosaurus = new Dinosaur(
      'Anklyosaurus',
       10500,
       55, 
       'herbevor',
       'North America',
       'Late Cretaceous',
       'Survived for approximately 135 million years',
       'images/anklyosaurus.png'
  );
  



  // Create Human Object
  // not sure if i need this????

  
function Human(name, weight, feet, inches, diet){
    this.name = name;
    this.weight = weight;
    this.feet = feet;
    this.inches = inches;
    this.diet = diet;
}

function getName(){
    let name = document.getElementById('name').value;
//    document.getElementById('dino-compare').innerHTML = name;
    return name;
}

function getWeight(){
    let weight = document.getElementById('weight').value;
//    document.getElementById('dino-compare').innerHTML = weight;
    return weight;
}

 function getFeet(){
    const feet = document.getElementById('feet').value;
//    document.getElementById('dino-compare').innerHTML = feet; 
    return feet;
 }

function getInches(){
    const inches = document.getElementById('inches').value;
//    document.getElementById('dino-compare').innerHTML = inches;
   
    return inches;
}


 function getHeight(feet, inches){    
    let height =  (parseInt(feet) * 12) + parseInt(inches);
  
   return height;
}

// function getHeight(){


     
//     let height =  parseFloat((feet) * 12) + parseFloat(inches);
//     // document.getElementById('height').value;
//     // document.getElementById('dino-compare').innerHTML = height;
   
//     return height;
//}

function getDiet(){
    let diet = document.getElementById('diet').value;
    document.getElementById('dino-compare').innerHTML = diet;
    return diet;
}


  
  // Use IIFE to get human data from form

//   function humanData(){
//       const human =(function(){
//           let name = document.getElementById('name').value;
//           let weight = document.getElementById('weight').value;
//           let feet = document.getElementById('feet').value;
//           let inches = document.getElementById('inches').value;
//           let diet = document.getElementById('diet').value;
//           let image = 'images/human.png';

//           function getName(){
//            return name;
//           }

//           function getWeight(){
//               return weight;
//              }

//           function getHeight(){
//               return parseFloat((feet) * 12) + parseFloat(inches);;
//              }   

//           function getDiet(){
//               return diet;
//              }

//              function getImage(){
//               return image;
//              }

//              return {
//                  name: getName(),
//                  weight: getWeight(),
//                  height: getHeight(),
//                  diet: getDiet(),
//                  image: getImage()
//              };
//       })();

//       return human;
    
//   }

 // console.log(Human);

  

  // Create Dino Compare Method 1
  // NOTE: Weight in JSON file is in lbs, height in inches. 
  // Compare diet
  // will this.name show human name or dino name???
  // not sure about humanDiet how to point to that????
  Dinosaur.prototype.compareDiet = function(humanDiet){
      if (this.diet === humanDiet){
          this.dietFact = 'This dinosaur has the same diet as ${this.name}';
      } else {
          this.dietFact = 'This dinosaur was a ${this.diet}';
      }
   };
  


  
  // Create Dino Compare Method 2
  // NOTE: Weight in JSON file is in lbs, height in inches.
  // compare weight
  Dinosaur.prototype.compareWeight = function(humanWeight){
      this.weightFact = 'This dinosaur was ${math.floor(this.weight/humanWeight)} times heavier than you';      
   };
  


  
  // Create Dino Compare Method 3
  // NOTE: Weight in JSON file is in lbs, height in inches.
  //compare height
  Dinosaur.prototype.compareHeight = function(humanHeight){
      this.heightFact = 'This dinosaur was ${math.floor(this.height/humanheight)} times taller than you';      
   };
  


  // Generate Tiles for each Dino in Array
  // map()????

      // Add tiles to DOM

  // Remove form from screen
   function hideForm(){
       //dinoCompare.style.display = 'none';
        document.getElementById('dino-compare').style.display='none';
      
   }

// On button click, prepare and display infographic

btn.addEventListener('click', (e) => {
    // let weight = document.getElementById('weight').value;
    // document.getElementById('dino-compare').innerHTML = weight;
  
    //const humanName = 'button click complete ' + getName();
    //alert(humanName);

      
    //const humanWeight = 'button click complete and you are' + getWeight() + 'lbs';
    //alert(humanWeight);

    //const humanDiet = 'button click complete and you are a  ' + getDiet();
    //alert(humanDiet);
 
    const tempValue1 = getFeet();
    //alert(tempValue2);

    const tempValue2 = getInches();
    //alert(tempValue1);

 

    const tempValue3 = getHeight(tempValue1, tempValue2);
    alert(tempValue3);


    hideForm();

   

});