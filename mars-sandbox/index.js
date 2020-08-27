

const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')
const hbs = require('hbs');

const dotenv = require('dotenv');
dotenv.config();

const app = express()
const port = process.env.Port || 8080;
const pathPublicDirectory = path.join(__dirname, './public'); 
const pathViews = path.join(__dirname, '/views');
const pathPartials = path.join(__dirname, '/partials');
//const pathScripts = path.join(__dirname, '/scripts');



app.set('view engine', 'hbs');
app.set('views', pathViews);
//app.set('scripts', pathScripts);
hbs.registerPartials(pathPartials);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//app.use('/', express.static(path.join(__dirname, '../public')))

// Set the location of the html templates
app.use(express.static(pathPublicDirectory));  

// your API calls

// example API call
app.get('/apod', async (req, res) => {
    try {
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})

// Render the web page with parameters
app.get('', (req, res) => {
    res.render('mars');
  })
  
    console.log(`your key:${process.env.API}`);
  

app.listen(port, () => console.log(`Listening on port ${port}!`));