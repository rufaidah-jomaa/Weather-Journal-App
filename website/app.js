/*Rufaidah Jomaa*/
// Base URL and API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=13978db1571a03be700790f9f3af055d';

/* Function to GET Web API Data*/
const getWeather = async (baseURL, newZip, apiKey) => {
  // res equals to the result of fetch function
  const res = await fetch(baseURL + newZip + apiKey);
  try {
    // userData equals to the result of fetch function
    const apiData = await res.json();
    return apiData;
  } catch (error) {
    console.log("error", error);
  }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  })

  try {
    const newData = await req.json();
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};

const icons = document.querySelectorAll('.entry__icon');
const updateUI = async () => {
  const request = await fetch('http://localhost:3000/all');
  try {
     // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    // show icons on the page
    icons.forEach(icon => icon.style.opacity = '1');
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
    document.getElementById('content').innerHTML = allData.content;
    document.getElementById("date").innerHTML =allData.date;
  }
  catch (error) {
    console.log("error", error);
  }
};

//Get the date
let today = new Date();
let DateOfTod = today.getDate() + '.' + today.getMonth() + '.' + today.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

//select form by class name
const form = document.querySelector('.app__form');

/* Function called by event listener */
function performAction(event) {
  event.preventDefault();
  // get user input values
  const newZip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;

  getWeather(baseURL, newZip, apiKey)
    .then(function (apiData) {
      // add data to POST request
      postData('http://localhost:3000/add', { date: DateOfTod, temp: apiData.main.temp, content: content })
    }).then(function (newData) {
      // update browser content
      updateUI()
    })
  // reset form
  form.reset();
}