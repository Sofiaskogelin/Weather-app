GetData()
async function GetData()
{
  let response = await FetchData ("http://api.openweathermap.org/data/2.5/weather?id=2673730&appid=8b78eb53ba658e637d033cde91d90d14&units=metric");
  let nextDays = await FetchData("http://api.openweathermap.org/data/2.5/forecast?id=2673730&appid=8b78eb53ba658e637d033cde91d90d14&units=metric");
  //console.log(response.main.temp);
  //console.log(response.name);
  console.log(response);

  //creating div that contains information about weather TODAY
    var article = document.createElement("div");
    article.className="articleDiv";

    //Få fram tid och datum nu
      var date = new Date();
      var now = date.getDate();
      //var rightNow = date.toLocaleString();
      //var now = rightNow.slice(0,16);
      console.log(now);

      //Hämta aktuell månad
      function getMonths(i){
      var date = new Date;
      let month = [
     "Januari",
     "Februari",
     "Mars",
     "April",
     "Maj",
     "Juni",
     "Juli",
     "Augusti",
     "September",
     "Oktober",
     "November",
     "December"
  ];
     return month[i];

  }
  //Creating div for next 5 days forecast
  var section = document.createElement("div");
  section.className="sectionDiv";

//creating all elements
  var placeH1 = document.createElement("h1");
  var placeText = document.createTextNode(response.name);
  placeH1.appendChild(placeText);
  article.appendChild(placeH1);

  var todaysTemp = document.createElement("p");
  var tempText = document.createTextNode("Temperaturen är " + Math.round(response.main.temp) +" °C");
  todaysTemp.appendChild(tempText);
  article.appendChild(todaysTemp);

  var time = document.createElement("h3");
  var timeText = document.createTextNode(now + " " + getMonths(date.getMonth()));
  console.log(timeText);
  time.appendChild(timeText);
  article.appendChild(time);
  document.body.appendChild(article);

  function getWeatherIconToday(code){
      var img = document.createElement("img");
      img.src = "http://openweathermap.org/img/w/" + code + ".png";
      article.appendChild(img);

      return document.body.appendChild(article);
      }

      var img = document.createElement("img");
      var image = getWeatherIconToday(response.weather[0].icon);
    //  img.appendChild(image);
    //  console.log(getWeatherIconToday());



  //FORECAST FOR NEXT 5 days
  var countingDates = 0;
  for (var i=7; i <= nextDays.list.length; i+=8) {

    //creating div for each of the 5 days
    var container = document.createElement("div");
    container.className="containerDiv";

    var date = nextDays.list[i].dt_txt;

    var getNewDate = new Date(date);
    var dates = getNewDate.getDate();
    countingDates ++;
    var tomorrow = dates;

      //Getting temperatures
      var mapTest= nextDays.list.map(temp => temp.main);
      var getTemperatures = mapTest.map((temp) => temp.temp);

      //creating elements for date
      var dayP = document.createElement("h3");
      var textDay = document.createTextNode(tomorrow + " " + getMonths(getNewDate.getMonth()));
      dayP.appendChild(textDay);
      container.appendChild(dayP);

      //creating elements for temperatures
      var tempP = document.createElement("p");
      var textP = document.createTextNode("Temperatur: " + Math.round(getTemperatures[i])+" °C");
      tempP.appendChild(textP);
      container.appendChild(tempP);

      //get min and max temp
      var minTemp=nextDays.list.map(min => min.main.temp_min);
      var maxTemp = nextDays.list.map(max => max.main.temp_max);

      var tempValues = document.createElement("p");
      var minTempValuesText = document.createTextNode("Min temperatur: " + Math.round(minTemp[i])+ "°C");
      var maxTempValuesText = document.createTextNode("Max temperatur: "+ Math.round(maxTemp[i])+ "°C");
      tempValues.appendChild(minTempValuesText);
      container.appendChild(tempValues);
      tempValues.appendChild(maxTempValuesText);

      //kopplar allt till bodyn
     section.appendChild(container);
      document.body.appendChild(container);
      document.body.appendChild(section);

      function getWeatherIcons(code){
          var img = document.createElement("img");
          img.src = "http://openweathermap.org/img/w/" + code + ".png";
          container.appendChild(img);
          return section.appendChild(container);
          }
          var img = document.createElement("img");
          var image = getWeatherIcons(nextDays.list[i].weather[0].icon);
        //  img.appendChild(image);
        //  console.log(getWeatherIcons());

    }
}

  async function FetchData(url)
  {
    let promise = await fetch (url);
    let data = await promise.json();
    return data;
  }
