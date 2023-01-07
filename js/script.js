let city="Tokyo"; // ใช้ let เพราะไม่ใช่ค่าคงที่
const apiKey="3d96c7e53c8b01cef3a7668614c2dc9b";

const form = document.getElementById('form');
const search = document.getElementById('search');

function setData(){
    showWeather();
}

async function showWeather(){
    try {
        const Url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; //* ได่ค่าเมืองจาก search แล้วมาใส่ใน $city
        const response = await fetch(Url);
        const data = await response.json();
        showDataToUI(data);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

function showDataToUI(data){
    const city = document.getElementById('city');
    const state = document.getElementById('state');
    const weather = document.getElementById('weather');
    const status = document.getElementById('status');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');


    //* status
    city.innerText = data.name;
    state.innerText = data.sys.country;
    weather.children[0].innerHTML = calculateTemp(parseInt(data.main.temp))+" C&deg;";
    weather.children[1].innerHTML = "Max : "+calculateTemp(parseInt(data.main.temp_max))+"C&deg;"+" Min : "+calculateTemp(parseInt(data.main.temp_min))+"C&deg;";
    status.innerText = data.weather[0].description
    humidity.innerText = "Humidity : "+data.main.humidity
    wind.innerText = "Wind : "+data.wind.speed
}

function calculateTemp(k){
    return k-273;
}

function callDataAPI(e){
    e.preventDefault(); // ไม่เคลียข้อมูลในหน้าและไม่กระพิบ
    console.log(search.value);
    
    city = search.value; // search ค่าได้ค่าไหน เก็บไว้ใน city มาแล้วเริ่มทำงาน showweather
    showWeather();
}

form.addEventListener('submit',callDataAPI);
setData();