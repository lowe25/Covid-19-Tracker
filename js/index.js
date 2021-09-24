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
var txtSearch = document.getElementById("country-src").value;
var Countryconfirmed = document.getElementById("selected-confirmed");
var CountryconfirmednewCase = document.getElementById("selected-new-case");
var CountryconfirmedtotalCase = document.getElementById("selected-total-case");
var Countryconfirmedrecoveries = document.getElementById("selected-recoveries");
var CountryconfirmedtotalDeaths = document.getElementById(
  "selected-total-deaths"
);

var CountryconfirmednewDeaths = document.getElementById("selected-new-deaths");
var btn = document.getElementById("btn-search");
btn.addEventListener("click", getCountry);
/*
second api
		"x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
*/
const apiPostTbl = "https://covid-193.p.rapidapi.com/statistics";
const globalStatus = "https://covid-193.p.rapidapi.com/statistics?country=all";
const table = document.querySelector(".tbl-list");
var row;
//var txtSearch = "Canada";
const apiPostSearch = `https://covid-193.p.rapidapi.com/statistics?country=${txtSearch}`;
async function getCountry(){
  try{
    const response = await fetch(apiPostSearch,{
      method: "GET",
      headers: {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "568cd133bbmshb727f89d2da78d6p192e4djsnc6938c201e7d"
      }
    })
    if(response.ok){
      const jsonResponse = await response.json();
      printCountry(jsonResponse);
      return response;
    }
  }catch(error){
    console.log(error);
  }
}

function printCountry(response){
  for (const d of response.response) {
    Countryconfirmed.innerHTML = `${d.cases.active}`;
    CountryconfirmednewCase.innerHTML = `${d.cases.new}`;
    CountryconfirmedtotalCase.innerHTML = `${d.cases.total}`;
    Countryconfirmedrecoveries.innerHTML = `${d.cases.recovered}`;
    CountryconfirmedtotalDeaths.innerHTML = `${d.deaths.total}`;
    CountryconfirmednewDeaths.innerHTML = `${d.deaths.new}`;
  }
}

async function getglobalStatus() {
  try {
    const response = await fetch(globalStatus, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "568cd133bbmshb727f89d2da78d6p192e4djsnc6938c201e7d",
      },
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      printglobalStatus(jsonResponse);
      return response;
    }
  } catch (error) {
    console.log(error);
  }
}

function printglobalStatus(response) {
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
}


async function getCountryTbl() {
  try {
    const response = await fetch(apiPostTbl, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "568cd133bbmshb727f89d2da78d6p192e4djsnc6938c201e7d",
      },
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      printCountryTbl(jsonResponse);
      return response;
    }
  } catch (error) {
    console.log(error);
  }
}

function printCountryTbl(response) {
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
    `;
    table.innerHTML += row;
  }
}
getCountry();
getglobalStatus();
getCountryTbl();
