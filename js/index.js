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

/*
second api
		"x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
*/
const apiPostTbl = "https://covid-193.p.rapidapi.com/statistics";
const globalStatus = "https://covid-193.p.rapidapi.com/statistics?country=all";
const table = document.querySelector(".tbl-list");



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
      console.log(jsonResponse)
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
//FOR Tables 
//Sort Table Alphabet
function sortCountry(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.querySelector(".tbl-list");
  switching = true;
  dir = "asc"; 
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;      
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
getglobalStatus();
getCountryTbl();

