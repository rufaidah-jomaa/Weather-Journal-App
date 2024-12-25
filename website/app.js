/*Rufaidah Jomaa*/
// Base URL and API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = '13978db1571a03be700790f9f3af055d';

/* Function to GET Web API Data*/
const getWeatherData = async (newZip) => {
   const url = `${baseURL}?zip=${newZip}&appid=${apiKey}`
  // Fetch weather data from API
  const response = await fetch(url);
  try {
     return  await response.json();// Convert response to JSON  // Return the JSON data
  } catch (error) { // Handle errors
    console.log("Error fetching weather data:", error);
  }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const request = await fetch(url, {
    method: "POST", // POST method
    credentials: "same-origin",// Ensure credentials are sent with the request
    headers: {
      "Content-Type": "application/json" // Specify content type as JSON
    },
    body: JSON.stringify({// Convert data object to JSON string
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  })

  try {
    const responseData = await request.json(); 
    return responseData; // Return the JSON response from the server
  
  }
  catch (error) {// Handle errors
    console.log("Error posting data:",error);
  }
};

const updateUI = async () => {
  const request = await fetch('http://localhost:3000/all');// Get data from local server
  try {
    const allData = await request.json();// Convert response to JSON
 // Update the DOM with the new data
    document.getElementById('tempreture').innerHTML = Math.round(allData.temp)+ ' degrees';
    document.getElementById('content').innerHTML = allData.content;
    document.getElementById("date").innerHTML =allData.date;
  }
  catch (error) {//Handle errors
    console.log("error", error);
  }
};

//Get the date
let today = new Date();

//select form element
const form = document.querySelector('form');

//event listener to an existing HTML button from DOM using Vanilla JS.
document.getElementById('generate').addEventListener('click', performFunction);


/* Function called by event listener */
function performFunction(event) {
  event.preventDefault();
  // get user input values
  const content = document.getElementById('feelings').value;
  const newZip = document.getElementById('zip').value; 
try{
  getWeatherData(newZip) //get data from OpenWeatherMap API
    .then(function (apiData) {
      // add data to POST request
    postData('http://localhost:3000/add', //url
     { //js Object
      date: today.toLocaleDateString('en-GB'), 
       temp: apiData.main.temp, 
       content: content 
      })
    }).then(function (updatedData) {
      // update UI content
      updateUI()
    })
  }catch(error){
    console.log("Error during performFunction:",error);
  }
  // reset form
  form.reset();
}