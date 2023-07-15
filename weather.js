const API_KEY = `3265874a2c77ae4a04bb96236a642d2f`
const form=document.querySelector('form');
const search=document.querySelector('#s1');
const weather=document.querySelector('.row');
const getBackground=()=>{
    let now = new Date();
    let isMorning   = now.getHours() > 5  && now.getHours() <= 12;
    let isEvening   = now.getHours() > 18 && now.getHours() <= 22;
    let isNight     = now.getHours() > 22 || now.getHours() <= 5;
    let afterNoon   =now.getHours() > 12 || now.getHours() <= 18;
   
  
   if(isMorning==true)
   {
   
    document.body.style.backgroundImage = "url('Images/morning.jpg')";
    document.body.style.backgroundSize="1700px 1200px"
  
   }
   else
   if(isEvening==true)
   {
    document.body.style.backgroundImage = "url('Images/evening.jpg')";
    document.body.style.backgroundSize="1700px 1000px"
  
   }
   else
   if(isNight==true)
   {
    document.body.style.backgroundImage = "url('Images/night2.jpg')";
    document.body.style.backgroundSize="1700px 800px"
   }
   else 
   if(afterNoon=true)
   {
    document.body.style.backgroundImage = "url('Images/morning.jpg')";
    document.body.style.backgroundSize="1700px 1200px"
   }
   

}
  
  

getBackground();
form.addEventListener('submit',
function(event)
{
    let currentDate = new Date () ; 
    event.preventDefault();
   if(search.value=='')
    {
    weather.innerHTML=``;
    weather.style=``; 
    location.reload();
    
    }
    
    getWeather(search.value);
})
const getWeather=async(city)=>{
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    
    const response= await fetch(url)
    const data=await response.json()
    if(search.value==null)
    {
        weather.innerHTML=``; 
    }
    console.log(data)
    return showWeather(data)
}
const showWeather=(data)=>
{   
   
    if (data.cod == "404") {
        weather.innerHTML = `<h2> City Not Found <h2>`
        return;
    }
    weather.innerHTML = `
    <div>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
    </div>
    <div>
       <h2>${data.main.temp} ℃</h2>
        <h4> ${data.weather[0].main} </h4>
    </div>
    <div>
    <br>
    <h4>Maximum Temp- ${data.main.temp_max}℃</h4>
    <h4>Minimum Temp- ${data.main.temp_min}℃</h4>
    </div>
    <div>
    <h4>Wind speed- ${data.wind.speed}km/h </h4>
     <h4>Humidity- ${data.main.humidity}% </h4>
     <h4>Sunset- ${data.main.pressure}mb </h4>
 </div>
    </div>
    </div>
`
weather.style.border="2px solid brown";
weather.style.color="brown";
weather.style.padding="34px 34px";
weather.style.margin="19px";
weather.style.height="320px";
weather.style.background="white";
const m=document.querySelector('#map');
m.style.display = 'none';

}

const findMyState= ()=>{
    
     const status=document.querySelector('.row');
    
    const success = (position) => {
             console.log(position)
             const latitude = position.coords.latitude;
             const longitude = position.coords.longitude;
             const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
             fetch(geoApiUrl)
             .then(res => res.json())
             .then(data => {
                console.log(data);
                search.value=data.city
                search.focus();
            })
}
    const error = () =>{
        status.textContent="Unable to retrieve location";
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
      

    
    }
    var map = L.map('map').setView([20.5937, 78.9629], 5);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
   var marker;

    map.on('click', function(e) {
      var lat = e.latlng.lat;
      var lng = e.latlng.lng;
  
      if (marker) {
        map.removeLayer(marker); // Remove previous marker if it exists
      }
  
      marker = L.marker([lat, lng]).addTo(map);
  
      // Fetch weather data for the clicked location
      fetchWeatherData(lat, lng)
  })
  function fetchWeatherData(lat, lng) {
    // Replace 'YOUR_API_KEY' with your actual API key
    var apiKey = `3265874a2c77ae4a04bb96236a642d2f`
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`;

    
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        weather.innerHTML = `
       <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        </div>
        <div>
           <h2>${(data.main.temp-273.15).toFixed(2)} ℃</h2>
            <h4> ${data.weather[0].main} </h4>
        </div>
        <div>
        <br>
        <h4>Maximum Temp- ${(data.main.temp_max-273.15).toFixed(2)}℃</h4>
        <h4>Minimum Temp- ${(data.main.temp_min-273.15).toFixed(2)}℃</h4>
        </div>
        <div>
        <h4>Wind speed- ${data.wind.speed}km/h </h4>
         <h4>Humidity- ${data.main.humidity}% </h4>
         <h4>Sunset- ${data.main.pressure}mb </h4>
     </div>
        </div>
        </div>
    `
    weather.style.border="2px solid brown";
    weather.style.color="brown";
    weather.style.padding="34px 34px";
    weather.style.margin="19px";
    weather.style.height="320px";
    weather.style.background="white";
    const m=document.querySelector('#map');
    m.style.display = 'none';
    
  })
      .catch(error => {
        console.log('Error fetching weather data:', error);
      });
  }
  function refreshPage() {
    location.reload();
  }
  

  
