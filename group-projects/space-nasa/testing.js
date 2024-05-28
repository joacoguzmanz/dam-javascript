const axios = require('axios');

const API_KEY = 'rm8o0iKwtP4rXd7i68aPu1dAHkQfuoe0TCkT7oYZ'

// Fetching data from NASA API
axios(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=2021-10-10`)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error(error);
    });

