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
  //generateCityDom(result);
  //generateHtml(result);
  creatingPage.createCurrentWeatherDOM(result);
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
