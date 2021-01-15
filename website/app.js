/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const ApiKey = "&appid=fad09a40d070b58c2a4d5dc0c97a805a&units=imperial"; // Personal API Key for OpenWeatherMap API
// Create a new date instance dynamically with JS
let d = new Date();
let newDate =  d.getMonth() +1+'.'+ d.getDate()+'.'+ d.getFullYear();


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click' , generateData);

/* Function called by event listener */
function generateData(){
    const Feelings = document.getElementById('feelings').value;
    const ZipCode = document.getElementById('zip').value;
    weatherData(baseURL, ZipCode , ApiKey)
    .then(function(data) {
        console.log(data);
        postData('/addData' , {date:newDate , temp:data.main.temp , content:Feelings})
        UpdateUI();
    })
};


/* Function to GET Web API Data*/
const weatherData = async (baseURL, zip, key)=> {
    const res = await fetch(baseURL+zip+key)
    try{
        const data = await res.json();
        return data;
    }catch(error) {
        console.log("There Is An Error" , error)
    }
}



/* Function to POST data */
const postData = async (url = '' , data = {})=>{
    console.log(data);
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin' ,
        headers: {
            'Content-Type' : 'application/json' ,
        },
        body: JSON.stringify(data),
    });
    try{
        const newData = await res.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log('Therre Is An Error' , error)
    }
}


/* Function to GET Project Data */
const UpdateUI = async ()=> {
    const request = await fetch('/getData');
    try{
        const alldata = await request.json();
        document.getElementById('date').innerHTML =alldata.date;
        document.getElementById('temp').innerHTML = alldata.temperature;
        document.getElementById('content').innerHTML =alldata.content;
    }catch(error) {
        console.log('There Is An Error' , error)
    }
};





