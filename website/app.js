/* Global Variables */

const personalKey='f4172577cf684a1dbfb184de46059874';
// here by default the country code is US(United States)
//zip codes should be related to the chosen country

let baseURL=`https://api.openweathermap.org/data/2.5/weather?zip=`;
const apiKey=`,us&appid=${personalKey}&units=imperial`;



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();



document.getElementById('generate').addEventListener('click',performAction);

function performAction(e){
  
    const zipCode=document.getElementById('zip').value;
    const userin=document.getElementById('feelings').value;
    getWeather(baseURL,zipCode,apiKey)
    .then(function(data){
        // console.log(data);
        postData('/addweather',{temperature:data.main.temp, date:newDate, feeling:userin})
        .then(
            updateUI()
          )
    

    });
    
}
const getWeather= async (baseURL,zipCode,apiKey)=>{


    const res = await fetch(baseURL+zipCode+apiKey)
    try{

        const data = await res.json();
        return data;
    }
    catch(error){

        console.log("error", error);
    }


};

const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};


const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    console.log(allData)
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = Math.round(allData.temperature)+'degrees';
    document.getElementById('content').innerHTML = allData.feeling;

  }catch(error){
    console.log("error", error);
  }
}