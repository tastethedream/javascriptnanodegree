const map = Immutable.Map({
  apod: '',
  rovers: ['Curiosity', 'Opportunity', 'Spirit'],
  welcome: 'pod',
  roverData: null,
  roverPhotos: [],
});

const root = document.getElementById('root');

const render = async (rootParam, state) => {
  rootParam.innerHTML = App(state);
};

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
  render(root, map);
});


function RoverImages(imgArray) {
  const output = imgArray.map(
    img => `<img src="${img}" height="150px" width="100%"/>`
  );
  return output.join('');
}

const updateStore = (storeParam, newState) => {
  const newMap = storeParam.merge(newState);
  render(root, newMap);
};


function setTab(welcome) {
  const newMap = map.set('welcome', welcome);
  render(root, newMap);
}


// ------------------------------------------------------  API CALLS 
const getImageOfTheDay = state => {
  const stateObj = state.toJS();
  const { apod } = stateObj;

  fetch(`http://localhost:8080/apod`)
    .then(res => res.json())
    .then(apod => {
      updateStore(state, { apod });
    });
};

const getRoverData = (rover, state) => {
  fetch(`http://localhost:8080/rover`)
    .then(response => response.json())
    .then(r => {
      const roversByName = {
      };

      r.rovers.forEach(roverPram => {
        roversByName[roverPram.name.toLowerCase()] = roverPram;
      });

      const { max_date: maxDate } = roversByName[rover];
      fetch(`http://localhost:8080/rover/${rover}/${maxDate}`)
        .then(response => response.json())
        .then(roverPhotos => {
          updateStore(state, {
            roverData: roversByName[rover],
            roverPhotos: roverPhotos.photos.map(photo => photo.img_src),
          });
        });
    });
};
// ------------------------------------------------------  API CALLS ABOVE

// ------------------------------------------------- COMPONENTS BELOW
const ImageOfTheDay = apod => {
  // If image does not already exist, or it is not from today -- request it again
  const today = new Date();
  const photodate = new Date(apod.date);
  if (
    (!apod || photodate === today.getDate()) &&
    !ImageOfTheDay._imagesRequested
  ) {
    ImageOfTheDay._imagesRequested = true;
    getImageOfTheDay(map);
  }

  if (!apod) {
    return `<h1>Loading...</h1>`;
  }
  // check if the photo of the day is actually type video!
  if (apod.media_type === 'video') {
    return `
        
      <div id="pod" class="tabcontent">
        <p>See today's featured video <a href="${apod.image.url}">here</a></p>
        <p>${apod.title}</p>
        <p>${apod.explanation}</p>
      </div>
      `;
  }
  return `
      <div id="pod" class="tabcontent">
          <img src="${apod.image.url}" height="150px" width="100%"/>
          <p>${apod.image.explanation}</p>
      </div>            
      `;
};

const RoverData = (rover, state) => {
  if (RoverData._called !== rover) {
    RoverData._called = rover;
    getRoverData(rover, state);
  }
  if (!state.get('roverData') || !state.get('roverPhotos').size) {
    return `<h1>Loading...</h1>`;
  }
  return `
    <div class="tabcontent">
      <h1>Rover Name: ${state.getIn(['roverData', 'name'])}</h1>
      <ul>
        <li>Launch date ${state.getIn(['roverData', 'launch_date'])}</li>
        <li>Landing date  ${state.getIn(['roverData', 'landing_date'])}</li>
        <li>Status ${state.getIn(['roverData', 'status'])}</li>
        <li>Most recent photos taken on ${state.getIn(['roverData', 'max_date'])}</li>
      </ul>
      ${RoverImages(state.get('roverPhotos').toJS())}
      </div>
      `;
};
// ------------------------------------------------- COMPONENTS ABOVE

// create content
const App = state => {
  const stateObj = state.toJS();
  const { rovers, apod, welcome } = stateObj;
  const activeRoverArr = rovers.filter(name => welcome === name.toLowerCase());
  return `
  <h1 id="mainHeader"> Mars Rover Dashboard</h1>
    <button class="navBar" onclick=" setTab('welcome')">About Mars Rover</button>
    <button class="navBar" onclick="setTab('curiosity')">Curiosity</button>
    <button class="navBar" onclick="setTab('opportunity')">Opportunity</button>
    <button class="navBar" onclick="setTab('spirit')">Spirit</button>
   
    ${
      activeRoverArr[0]
        ? RoverData(activeRoverArr[0].toLowerCase(), state)
        : ImageOfTheDay(apod)
    }
    `
};