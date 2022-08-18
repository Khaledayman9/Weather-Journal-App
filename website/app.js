/* Global Variables */

// The API Key for the openWeatherMap Website
// Personal API Key for OpenWeatherMap API
const apiKey = ',&appid=18e4f9e83a09e91010c5dfad4af3fb3c&units=metric';
// The URL for the informations regarding the weather  
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


/* Function called by event listener */
function findWeather() {
    let zipCodeValue = document.getElementById('zip').value;
    let feelingsValue = document.getElementById('feelings').value;
    findWeatherInformation(zipCodeValue).then((weatherInfo) => {
        if (weatherInfo) {
            const {
                main: { temp }
            } = weatherInfo;
            const allWeatherInfo = {
                temp,
                newDate,
                feelingsValue
            };
            //const serverURL = server + "/addWeather";
            postData('/addWeather', allWeatherInfo);
        }
        retrieveData();
    });

}

/* Function to GET Web API Data*/

const findWeatherInformation = async(zipCode) => {
    const response = await fetch(baseURL + zipCode + apiKey);
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}



/* Function to POST data */
const postData = async(url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}


/* Function to GET Project Data and Update UI */
const retrieveData = async() => {
    const request = await fetch('/allWeather');
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log(allData)
            // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degrees';
        document.getElementById('content').innerHTML = allData.feelingsValue;
        document.getElementById("date").innerHTML = allData.newDate;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', findWeather);