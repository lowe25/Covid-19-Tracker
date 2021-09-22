//For Table
var tbl = document.querySelector(".tbl-list");
var div = document.querySelector(".tbl-country");
var country = document.querySelector(".country");
var totalCase = document.querySelector(".total-cases");
var newCase = document.querySelector(".new-cases");
var totalDeaths = document.querySelector(".total-deaths");
var newDeaths = document.querySelector(".new-deaths");
var totalReco = document.querySelector(".total-recover");
var newReco = document.querySelector(".new-reco");

//Global Box
var Globalconfirmed = document.getElementById("confirmed");
var GlobalconfirmednewCase = document.getElementById("new-case");
var GlobalconfirmedtotalCase = document.getElementById("total-case");
var Globalconfirmedrecoveries = document.getElementById("recoveries");
var GlobalconfirmedtotalDeaths = document.getElementById("total-deaths");
var GlobalconfirmednewDeaths = document.getElementById("new-deaths");

//Country Box
//var txtSearch = document.getElementById("country-src").value;
var Countryconfirmed = document.getElementById("selected-confirmed");
var CountryconfirmednewCase = document.getElementById("selected-new-case");
var CountryconfirmedtotalCase = document.getElementById("selected-total-case");
var Countryconfirmedrecoveries = document.getElementById("selected-recoveries");
var CountryconfirmedtotalDeaths = document.getElementById(
  "selected-total-deaths"
);
var CountryconfirmednewDeaths = document.getElementById("selected-new-deaths");
var txtSearch ="Canada";
const apiPostTbl = "https://covid-193.p.rapidapi.com/statistics";
const apiPostSearch = `https://covid-193.p.rapidapi.com/statistics?country=${txtSearch}`;
const globalStatus = "https://covid-193.p.rapidapi.com/statistics?country=all";
const table = document.querySelector(".betlog");
var row;
function tblFill() {
  fetch(apiPostTbl, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
      "x-rapidapi-key": "568cd133bbmshb727f89d2da78d6p192e4djsnc6938c201e7d",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((response) => {
      // console.log(response);
      /*       
      console.log(response)
        country.innerHTML = `${d.country}`;
        totalCase.innerHTML = `${d.cases.total}`;
        newCase.innerHTML = `${d.cases.new}`;
        totalDeaths.innerHTML = `${d.deaths.total}`;
        newDeaths.innerHTML = `${d.deaths.new}`;
        totalReco.innerHTML = `${d.cases.total}`;
        newReco.innerHTML = `${d.cases.new}`;
      */
      for (const d of response.response) {
        console.log(response)
       row = `<tr>
              <td>${d.country}</td>
              <td>${d.cases.total}</td>
              <td>${d.cases.new}</td>
              <td>${d.deaths.total}</td>
              <td>${d.deaths.new}</td>
              <td>${d.cases.recovered}</td>
              </tr>
        `
        table.innerHTML += row;
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

//Search Country
function searchCountryFetch() {
  fetch(apiPostSearch, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
      "x-rapidapi-key": "568cd133bbmshb727f89d2da78d6p192e4djsnc6938c201e7d",
    },
  })
    .then((response1) => {
      if (response1.ok) {
        return response1.json();
      }
    })
    .then((response) => {
      console.log(response);
      for (const d of response.response) {
        Countryconfirmed.innerHTML = `${d.cases.active}`;
        CountryconfirmednewCase.innerHTML = `${d.cases.new}`;
        CountryconfirmedtotalCase.innerHTML = `${d.cases.total}`;
        Countryconfirmedrecoveries.innerHTML = `${d.cases.recovered}`;
        CountryconfirmedtotalDeaths.innerHTML = `${d.deaths.total}`;
        CountryconfirmednewDeaths.innerHTML = `${d.deaths.new}`;
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
//Global Status Box
function globalStatusFunc() {
  fetch(globalStatus, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
      "x-rapidapi-key": "568cd133bbmshb727f89d2da78d6p192e4djsnc6938c201e7d",
    },
  })
    .then((response1) => {
      if (response1.ok) {
        return response1.json();
      }
    })
    .then((response) => {
      // console.log(response);
      for (const d of response.response) {
        Globalconfirmed.innerHTML = `${d.cases.active}`;
        GlobalconfirmednewCase.innerHTML = `${d.cases.new}`;
        GlobalconfirmedtotalCase.innerHTML = `${d.cases.total}`;
        Globalconfirmedrecoveries.innerHTML = `${d.cases.recovered}`;
        GlobalconfirmedtotalDeaths.innerHTML = `${d.deaths.total}`;
        GlobalconfirmednewDeaths.innerHTML = `${d.deaths.new}`;
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

tblFill();
searchCountryFetch();
globalStatusFunc();
