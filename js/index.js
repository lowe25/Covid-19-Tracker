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
var Countryconfirmed = document.getElementById("selected-confirmed");
var CountryconfirmednewCase = document.getElementById("selected-new-case");
var CountryconfirmedtotalCase = document.getElementById("selected-total-case");
var Countryconfirmedrecoveries = document.getElementById("selected-recoveries");
var CountryconfirmedtotalDeaths = document.getElementById("selected-total-deaths");
var CountryconfirmednewDeaths = document.getElementById("selected-new-deaths");

//TextBoxes
var txtSearch = document.getElementById("country-src").value;
//Buttons
var btn = document.getElementById("btn-search");
btn.addEventListener("click", searchCountryFetch);

const apiPostTbl = "https://covid-193.p.rapidapi.com/statistics";
const globalStatus = "https://covid-193.p.rapidapi.com/statistics?country=all";
const table = document.querySelector(".tbl-list");
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
      for (const d of response.response) {
        var det = d.deaths.total;
        //Total Cases
        let t = d.cases.total;
        //Total Cases
        const casesTotal = t.toLocaleString();
       row = `<tr>
              <td>${d.country}</td>
              <td>${casesTotal}</td>
              <td>${d.deaths.total}</td>
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

//Search Countr
function searchCountryFetch() {
  const apiPostSearch = `https://covid-193.p.rapidapi.com/statistics?country=${txtSearch}`;
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
      console.log(response)
      searchResults(response);
    })
    .catch((err) => {
      console.error(err);
    });
}

function searchResults(data){
  for (const d of data.response) {
    Countryconfirmed.innerHTML = `${d.cases.active}`;
    CountryconfirmednewCase.innerHTML = `${d.cases.new}`;
    CountryconfirmedtotalCase.innerHTML = `${d.cases.total}`;
    Countryconfirmedrecoveries.innerHTML = `${d.cases.recovered}`;
    CountryconfirmedtotalDeaths.innerHTML = `${d.deaths.total}`;
    CountryconfirmednewDeaths.innerHTML = `${d.deaths.new}`;
  }
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
        let t = d.cases.active;
        let nc = d.cases.new;
        let tc = d.cases.total;
        let rec = d.cases.recovered;
        let td = d.deaths.total;
        let nd = d.deaths.new;
        const confirmedCases = t.toLocaleString();
        const newCases = nc.toLocaleString();
        const totalCases = tc.toLocaleString();
        const recovered = rec.toLocaleString();
        const totalDeaths = td.toLocaleString();
        const newDeaths = nd.toLocaleString();
        
        Globalconfirmed.innerHTML = `${confirmedCases}`;
        GlobalconfirmednewCase.innerHTML = `${newCases}`;
        GlobalconfirmedtotalCase.innerHTML = `${totalCases}`;
        Globalconfirmedrecoveries.innerHTML = `${recovered}`;
        GlobalconfirmedtotalDeaths.innerHTML = `${totalDeaths}`;
        GlobalconfirmednewDeaths.innerHTML = `${newDeaths}`;
      }
    })
    .catch((err) => {
      console.error(err);
    });
}


tblFill();
searchCountryFetch();
globalStatusFunc();