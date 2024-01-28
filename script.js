//https://www.weatherapi.com/
//todo: tahmin -> ileri yönelik
//todo: favori şehir eklemek (arge).
//todo: api.weatherapi.com burdaki başka bir endpoint i eklemek.
//todo: ilk yüklendiği zaman favori şehri gösterme
//todo: ilk yüklendiği zaman querystringden ilgili şehri gösterme -> http://localhost:5500/?city=istanbul
//todo: css ekleyelim... güzelleştirelim.
//todo: open-meteo apisinden veri çekip başka bir div de gösterelim.


let domHelper = {
  createDOMElement: function (tagname, className, id) {
      let createElement = document.createElement(tagname);
      if (className !== undefined) {
          createElement.classList.add(className);
      }
      if (id !== undefined) {
          createElement.id = id;
      }
      return createElement;
  },
  appendElement: function (parent, child) {
      parent.appendChild(child);
  }
}

let creatingPage = {
  createCurrentWeatherDOM: function(cityData) {
    let cityDiv = document.getElementById("citycontainer")
    // clean citynew before adding new elements
    cityDiv.innerHTML = ""
  
    let temperatureDOM = domHelper.createDOMElement("p",undefined,"temperature");
    temperatureDOM.textContent = cityData.temp + "°C";
    let imageDOM = domHelper.createDOMElement("img",undefined, "weatherimage");
    imageDOM.src = cityData.img;
    let imagetxt = domHelper.createDOMElement("p",undefined, "imagetext");
    imagetxt.textContent = cityData.img_text;
    let lastUpdateDOM = domHelper.createDOMElement("p",undefined, "lastupdate");
    lastUpdateDOM.textContent = "Last Update: " + cityData.last_update;
    domHelper.appendElement(cityDiv,temperatureDOM);
    domHelper.appendElement(cityDiv,imageDOM);
    domHelper.appendElement(cityDiv,imagetxt,);
    domHelper.appendElement(cityDiv,lastUpdateDOM);
  },
  createTable: function(apiResult) {
   
    let current = apiResult.current
    let location = apiResult.location.name;
    let hour = [...apiResult.forecast.forecastday[0].hour];
    let day = [...apiResult.forecast.forecastday];
    // hourlyTable start
    let hourlyTable = document.getElementById("forecasttablehour");
    hourlyTable.innerHTML = "";
    let tableHeadRow = domHelper.createDOMElement("tr",undefined);
    domHelper.appendElement(hourlyTable,tableHeadRow);
    let headingCurrent = domHelper.createDOMElement("th","tableheading");
    headingCurrent.textContent = "Current";
    domHelper.appendElement(tableHeadRow, headingCurrent);
    for (let i = 0; i < hour.length; i++) {
      let hourItem = hour[i];
      let hourHeading = domHelper.createDOMElement("th","tableheading")
      hourHeading.textContent = hourItem.time.split(" ")[1].split(":")[0];
      domHelper.appendElement(tableHeadRow, hourHeading);
    }
    let tableDataRow = domHelper.createDOMElement("tr",undefined);
    domHelper.appendElement(hourlyTable,tableDataRow);
    let dataCurrent = domHelper.createDOMElement("td","tabledata");
    dataCurrent.textContent = current.temp_c + "°C";
    domHelper.appendElement(tableDataRow, dataCurrent);

    for (let i = 0; i < hour.length; i++) {
      let hourItem = hour[i];
      let hourData = domHelper.createDOMElement("td","tableheading")
      hourData.textContent = hourItem.temp_c + "°C";
      domHelper.appendElement(tableDataRow, hourData);
    }

    let tableImageRow = domHelper.createDOMElement("tr",undefined);
    domHelper.appendElement(hourlyTable,tableImageRow);
    let imageCurrent = domHelper.createDOMElement("td","tabledata");
    let imageDOM = domHelper.createDOMElement("img","cdnimage")
    imageDOM.src = current.condition.icon;
    domHelper.appendElement(tableImageRow, imageCurrent);
    domHelper.appendElement(imageCurrent, imageDOM);

    for (let i = 0; i < hour.length; i++) {
      let hourItem = hour[i];
      let hourData = domHelper.createDOMElement("td","tabledata")
      let imageDOM = domHelper.createDOMElement("img","cdnimage")
      imageDOM.src = hourItem.condition.icon;
      domHelper.appendElement(tableImageRow, hourData);
      domHelper.appendElement(hourData, imageDOM);
    }
    // hourlTableend

    // dailyTableStart
    let dailyTable = document.getElementById("forecasttableday");
    dailyTable.innerHTML = ""
    let dailyHeadingRow = domHelper.createDOMElement("tr",undefined)
    let dailyDataRow = domHelper.createDOMElement("tr",undefined)
    domHelper.appendElement(dailyTable, dailyHeadingRow);
    domHelper.appendElement(dailyTable, dailyDataRow);


    for (let i = 0; i < day.length; i++) {
      let dayItem = day[i];
      let dayHeading = domHelper.createDOMElement("th","tableheading")
      dayHeading.textContent = dayItem.date.split("-")[2];
      domHelper.appendElement(dailyHeadingRow, dayHeading);
      let dayImageData = domHelper.createDOMElement("td","tabledata")
      let imageDOM = domHelper.createDOMElement("img","cdnimage")
      imageDOM.src = dayItem.day.condition.icon;
      domHelper.appendElement(dailyDataRow, dayImageData);
      domHelper.appendElement(dayImageData, imageDOM);

    }
  },
  createPageDiv: function(apiResult) {
    
    let location = apiResult.location.name;
    let hour = [...apiResult.forecast.forecastday[0].hour];
    let day = [...apiResult.forecast.forecastday];

    let getlocationName = document.getElementById("locationname");
    getlocationName.textContent = location

    // hourly divs
    let divHours = document.getElementById("divhours");
    divHours.innerHTML = ""
    let divDegrees = document.getElementById("divdegrees");
    divDegrees.innerHTML = ""
    let divHourImages = document.getElementById("divhourimages");
    divHourImages.innerHTML = ""

    
    // add hourly data
    for (let i = 0; i < hour.length; i++) {
      let hourItem = hour[i];
      // create hour info and add to div
      let hourData = domHelper.createDOMElement("div","divheadings")
      hourData.textContent = hourItem.time.split(" ")[1].split(":")[0];
      domHelper.appendElement(divHours, hourData);
      // create temparature info and add to div
      let tempData = domHelper.createDOMElement("div","temp_c");
      tempData.textContent = hourItem.temp_c + "°C";
      domHelper.appendElement(divDegrees, tempData);
      // create image info and add to div
      let hourImageData = domHelper.createDOMElement("div","image_icon");
      let imageDOM = domHelper.createDOMElement("img","cdnimage")
      imageDOM.src = hourItem.condition.icon;
      imageDOM.setAttribute("title", hourItem.condition.text)
      domHelper.appendElement(divHourImages, hourImageData);
      domHelper.appendElement(hourImageData, imageDOM);
    }

    // daily divs
    let divDays = document.getElementById("divdays");
    divDays.innerHTML = ""
    let divDayDegrees = document.getElementById("divdaydegrees");
    divDayDegrees.innerHTML = ""
    let divDayImages = document.getElementById("divdayimages");
    divDayImages.innerHTML = ""
    // add daily data
    for (let i = 0; i < day.length; i++) {
      let dayItem = day[i];
      // create day info and add to div
      let dayData = domHelper.createDOMElement("div","divheadings")
      dayData.textContent = dayItem.date.split("-")[2];
      domHelper.appendElement(divDays, dayData);
      // create temparature info and add to div
      let tempData = domHelper.createDOMElement("div","temp_c");
      tempData.textContent = dayItem.day.avgtemp_c + "°C";
      domHelper.appendElement(divDayDegrees, tempData);
      // create image info and add to div
      let dayImageData = domHelper.createDOMElement("div","image_icon");
      let imageDOM = domHelper.createDOMElement("img","cdnimage")
      imageDOM.src = dayItem.day.condition.icon;
      imageDOM.setAttribute("title", dayItem.day.condition.text)
      domHelper.appendElement(divDayImages, dayImageData);
      domHelper.appendElement(dayImageData, imageDOM);
    }
  },
  openMeteoDiv: function(apiResult) {
    
    let days = apiResult.daily.time;
    let temperaturesMax = apiResult.daily.temperature_2m_max;
    let temperaturesMin = apiResult.daily.temperature_2m_min;

    let meteoDays = document.getElementById("meteodays");
    meteoDays.innerHTML = ""
    let meteoDegrees = document.getElementById("meteodegrees");
    meteoDegrees.innerHTML = ""

    for (let i = 0; i < days.length; i++) {
      let dayItem = days[i].split("-")[2];
      // create day info and add to div
      let dayData = domHelper.createDOMElement("div","divheadings")
      dayData.textContent = dayItem;
      domHelper.appendElement(meteoDays, dayData);

      // create temparature info and add to div
      let tempData = domHelper.createDOMElement("div","temp_c");
      tempData.textContent = ((temperaturesMax[i] + temperaturesMin[i]) / 2).toFixed(1) + "°C";
      domHelper.appendElement(meteoDegrees, tempData);
    }
  }
}

async function getResult(cityName) {
  // if there is city searchString return that.
  let paramCity = utils.queryString.getParam('city');
  if (paramCity !== undefined) {
    cityName = paramCity
  }
  
  await utils.loadJSAsync("dataHelper.js");
  let result = await weather_api.dtoFunctions.getCurrentWeather(cityName);
  let forecastResult = await weather_api.getForcastDataWeather(cityName, 10);
  let latitude = forecastResult.location.lat;
  let longitude = forecastResult.location.lon;
  let meteoResult = await openMeteo.getForecastData(latitude, longitude);
  
  creatingPage.createCurrentWeatherDOM(result);
  creatingPage.createPageDiv(forecastResult);
  creatingPage.openMeteoDiv(meteoResult);
}

async function btnClick(event) {
  

  let domTxtCity = document.getElementById("txtCity");
  let city = domTxtCity.value;
  if (city === "") {
    alert("boş şehir ismi girilemez");
    return;
  }
  await getResult(city);
  domTxtCity.value = ""
}

function addToFavorites() {
  let cityName = document.getElementById("locationname").textContent;
  let myCookie = JSON.stringify({myFavorites: [cityName]});
  if (utils.cookie.getCookie("favorites").length === 0) {
    utils.cookie.setCookie("favorites", myCookie);
  } else {
    myCookie = JSON.parse(utils.cookie.getCookie("favorites"));
    if (myCookie.myFavorites.includes(cityName)) {
      return;
    }
    myCookie.myFavorites.push(cityName);
    myCookie = JSON.stringify(myCookie);
    utils.cookie.setCookie("favorites", myCookie);
  }
  loadFavoritesList();
}

function removeFromFavorites() {
  let favoritesDom = document.getElementById("selectfavorites");
  if (utils.cookie.getCookie("favorites").length > 0) {
    favoritesDom.innerHTML = "";
    let favorites = JSON.parse(utils.cookie.getCookie("favorites")).myFavorites;
    for (let i = 0; i < favorites.length; i++) {
      let favorite = favorites[i];
      let optionDOM = domHelper.createDOMElement("option", "favoriteoptions");
      optionDOM.textContent = favorite;
      optionDOM.value = favorite;
      domHelper.appendElement(favoritesDom,optionDOM);
    }
  }
}

function loadFavoritesList() {
  let favoritesDom = document.getElementById("selectfavorites");
  let favoritesFromCookie = utils.cookie.getCookie("favorites")
  if (favoritesFromCookie.length > 0) {
    favoritesDom.innerHTML = "";
    let favorites = JSON.parse(favoritesFromCookie).myFavorites;
    for (let i = 0; i < favorites.length; i++) {
      let favorite = favorites[i];
      let optionDOM = domHelper.createDOMElement("option", "favoriteoptions");
      optionDOM.textContent = favorite;
      optionDOM.value = favorite;
      domHelper.appendElement(favoritesDom,optionDOM);
    }
  }
}

async function changeFavorite() {
  let favoritesDom = document.getElementById("selectfavorites");
  let selectedOption = favoritesDom.value;
  await getResult(selectedOption);
}

document.addEventListener("DOMContentLoaded", async function () {
  console.log("Dom loaded");
  let defaultCity = "Istanbul";
  if (utils.cookie.getCookie("favorites").length !== 0) {
    // get first favorite city
    defaultCity = JSON.parse(utils.cookie.getCookie("favorites")).myFavorites[0]
  }
  await getResult(defaultCity)
  loadFavoritesList();
});
