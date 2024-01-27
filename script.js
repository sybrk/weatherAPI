//https://www.weatherapi.com/
//todo: tahmin -> ileri yönelik
//todo: favori şehir eklemek (arge).
//todo: api.weatherapi.com burdaki başka bir endpoint i eklemek.
//todo: ilk yüklendiği zaman favori şehri gösterme
//todo: ilk yüklendiği zaman querystringden ilgili şehri gösterme -> http://localhost:5500/?city=istanbul
//todo: css ekleyelim... güzelleştirelim.
//todo: open-meteo apisinden veri çekip başka bir div de gösterelim.

//globals
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
    lastUpdateDOM.textContent = cityData.last_update;
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
  }
}

async function btnClick(event) {
  await utils.loadJSAsync("dataHelper.js");

  let domTxtCity = document.getElementById("txtCity");
  let city = domTxtCity.value;
  if (city === "") {
    alert("boş şehir ismi girilemez");
    return;
  }
  let result = await weather_api.dtoFunctions.getCurrentWeather(city);
  let table = await weather_api.getForcastDataWeather(city, 10);
  //generateCityDom(result);
  //generateHtml(result);
  creatingPage.createCurrentWeatherDOM(result);
  creatingPage.createTable(table);
}




// function loadDataHelper(){
//   if(typeof weather_api === 'undefined'){
//     loadJS('dataHelper.js');
//   }
// }

document.addEventListener("DOMContentLoaded", async function () {
  console.log("Dom loaded");
  derece_dom = document.getElementById("derece");
  lastUpdate_dom = document.getElementById("lastUpdate");
  img_dom = document.getElementById("img");
  imgText_dom = document.getElementById("imgText");

  // let responseData = await openMeteo.getCurrrentIstanbulWeather();
  // console.log(responseData);

  // weather_api.uzunluk => 10
  //  let response_data = await weather_api.getForcastDataWeather("maltepe",3);
  //  let json_weather_data = JSON.parse(response_data);
  //  console.log(json_weather_data);
});
