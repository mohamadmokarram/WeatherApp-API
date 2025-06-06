const input = document.querySelector("#search input");
const btn = document.querySelector("button");
const searchBox = document.querySelector("#search");
const loader = document.querySelector(".loader");
const responseElm = document.querySelector(".response");

const apiKey = "0fa29c8d06834378a63145631250506";

let cityData;
let fileName = "sunny";

function clearData() {
  responseElm.querySelector(".city-name").textContent = "";
  responseElm.querySelector(".country").textContent = "";
  responseElm.querySelector("img").src = "";
  responseElm.querySelector(".temp").innerHTML = "";
  responseElm.querySelector(".txt").textContent = "";
}

//group weather conditions based on condition code
//to set background
function setBackgroundImage() {
  const conditionTxt = cityData.current.condition.text.toLowerCase();

  if (conditionTxt.includes("sunny")) {
    fileName = "sunny";
  } else if (conditionTxt.includes("rain")) {
    fileName = "rainy";
  } else if (conditionTxt.includes("snow")) {
    fileName = "snow";
  } else if (conditionTxt.includes("mist") || conditionTxt.includes("fog")) {
    fileName = "mist";
  } else if (
    conditionTxt.includes("cloudy") ||
    conditionTxt.includes("overcast")
  ) {
    fileName = "cloudy";
  } else if (conditionTxt.includes("partly cloudy")) {
    fileName = "partlycloudy";
  } else if (conditionTxt.includes("drizzle")) {
    fileName = "drizzle";
  } else if (conditionTxt.includes("sleet")) {
    fileName = "sleet";
  } else if (conditionTxt.includes("clear") && cityData.current.is_day === 0) {
    fileName = "clear";
  } else {
    fileName = "good-weather";
  }

  //changing background
  searchBox.style["background-image"] = `url(./assets/img/${fileName}.webp)`;
}

function showWeatherInfo() {
  if (responseElm.classList.contains("d-none")) {
    responseElm.classList.remove("d-none");
  }

  const cityName = cityData.location.name;
  const countryName = cityData.location.country;
  const iconSrc = cityData.current.condition.icon;
  const temp = cityData.current.temp_c;
  const conditionText = cityData.current.condition.text;

  //set data into tags
  responseElm.querySelector(".city-name").textContent = cityName;
  responseElm.querySelector(".country").textContent = countryName;
  responseElm.querySelector("img").src = iconSrc;
  responseElm.querySelector(".temp").innerHTML = `${temp}&deg;C`;
  responseElm.querySelector(".txt").textContent = conditionText;
}
//we have cityData
//access to template

const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=`;

function getWeatherData() {
  const city = input.value;
  //show loader
  loader.classList.remove("d-none");

  fetch(`${url}${city}&aqi=no`)
    .then(res => res.json())
    .then(data => {
      //hide loader
      loader.classList.add("d-none");
      cityData = data;
      //change background
      setBackgroundImage();
      //show info
      showWeatherInfo();
      input.value = "";
    })
    .catch(err => {
      console.log(err);
      if (responseElm.classList.contains("d-none")) {
        responseElm.classList.remove("d-none");
      }
      clearData();
      //display none to response box and show not found box
      responseElm.querySelector("h3").textContent = "City not found.";
    });
}

//working with enter key
btn.addEventListener("click", getWeatherData);
window.addEventListener("keyup", event => {
  if (event.key === "Enter" && input.value !== "") {
    getWeatherData();
  }
});
