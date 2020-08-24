// The object in the nasa_near_earth_object_API.txt is a copy of real API response from the NASA Near-Earth Object API. 
// Find the following from the API:

// 1. How many near-earth objects did NASA register for the date of the search? Return the asteroid count

const asteroids = api_sample_data.near_earth_objects['2019-12-02']
const averageAbsoluteMagnitude = asteroids.reduce((acc, curr, i, arr) => {
    // at the very last item, we take the sum of all absolute magnitudes and divide by the total number of items
   if (i + 1 == arr.length) {
     return acc / arr.length
   }

   // averages are a great use case for the reduce method, because we need to find the sum of a value of all items in a group
   return acc += curr['absolute_magnitude_h']
}, 0)

 console.log(averageAbsoluteMagnitude)


// Hazardous -----------------------------------------------
// 2. A list of all objects (their id, name, max size in miles, and closest approach in miles) that are labeled potentially hazardous

const hazardous = api_sample_data['near_earth_objects']['2019-12-02'].filter(asteroid => asteroid['is_potentially_hazardous_asteroid'] === true)

console.log(hazardous[0])

const hazardousFmt = hazardous.map(asteroid => {
    const closeApproach = asteroid['close_approach_data']

    return {
       id: asteroid['id'],
       name: asteroid['name'],
       maxSize: asteroid['estimated_diameter']['miles']['estimated_diameter_max'],
       closestApproach: closeApproach[0]['miss_distance']['miles']
    }
})
// expected output: [{"id":"3797749","name":"(2018 BO1)","maxSize":0.2933532873,"closestApproach":"30311929.3487318204"},{"id":"3740494","name":"(2016 AF193)","maxSize":0.1539539936,"closestApproach":"9930345.1795315036"}]

// OR - you could use destructuring:

const { id, name, estimated_diameter: { miles: { estimatedDiameterMax } }, closeApproachData } = asteroid

return {
   id: id,
   name: name,
   maxSize: estimatedDiameterMax,
   closestApproach: closeApproachData[0].missDistance.miles
}


// Too Close for Comfort -----------------------------------
// 3. A list of all objects (their id, name, max size in miles, and closest approach in miles) that have a miss_distance of less than 900,000 miles

const tooClose = api_sample_data['near_earth_objects']['2019-12-02'].filter(asteroid => {
  const closeApproach = asteroid['close_approach_data']
  return closeApproach[0].miss_distance.miles < 900000
})

const tooCloseResults = tooClose.map(asteroid => {
  const closeApproach = asteroid['close_approach_data']
return {
     id: asteroid['id'],
     name: asteroid['name'],
     maxSize: asteroid['estimated_diameter']['miles']['estimated_diameter_max'],
     closestApproach: closeApproach[0]['miss_distance']['miles']
  }

})


// Alert ---------------------------------------------------
// 4. Of all the near-earth objects for this date, find the time that the asteroid with the nearest miss will be closest to earth. 

const closest = apiSampleData.nearEarthObjects['2019-12-02'].reduce((closest, curr) => {
  const currDist = parseFloat(curr.closeApproachData[0].missDistance.miles)
  const closestDist = parseFloat(closest.closeApproachData[0].missDstance.miles)

  if (currDist > closestDist) {
    return closest
  } else {
    return curr
  }
})

console.log(closest.closeApproachData[0].missDistance.miles)