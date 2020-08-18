// from data.js

var queryUrl = "https://api.covidtracking.com/v1/states/daily.json";
// var countriesJson = "static/json/countries.json";
// console.log(queryUrl);

// This spits out the ten countries with the most confirmed cases
// ~~~~~~~~~~~~~~~~~ 
todaysData = [];

d3.json(queryUrl, function(data) {


// Everything day the API makes a daily list of cases for the 50 states and 6 territories
var i;
for (i =0; i < 56; i++){
  tempObject = {};
  tempObject = {state: data[i].state, 
                death: data[i].death, 
                hospitalizedCurrently: data[i].hospitalizedCurrently, 
                recovered: data[i].recovered,  
                totalTestResults: data[i].totalTestResults,
                positive: data[i].positive, 
                positiveIncrease: data[i].positiveIncrease
              };
                              
  todaysData.push(tempObject);
}
// console.log(todaysData);

var tbody = d3.select("tbody");
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Uncomment this first
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
todaysData.forEach((trimmedData) => {
  // console.log(trimmedData.death);
    let row = tbody.append("tr");
    Object.entries(trimmedData).forEach(([key, value]) => {
      var cell = row.append("th");
      cell.text(value);
      // console.log(value);
    });
  });
  // END OF THE FUNCTION
});


// Cull list based on date
  let button = d3.select("#filter-btn");
  let form = d3.select("#form");  
  button.on("click", runEnter);
  form.on("submit",runEnter); 

// added this Aug 18, 2020
// d3.event.preventDefault();



  

function runEnter() {
  // Prevent the page from refreshing
  d3.event.preventDefault();
  console.log("inside the function");
    
    
    
    // Select the input element and get the raw HTML node
    let inputElement = d3.select("#stateName");
    let inputValue = inputElement.property("value");
    
    console.log(inputValue);

    // Deleting init table
    let cleaningHouse = d3.select("tbody");
    cleaningHouse.html("");
    // var tbody = d3.select("tbody");

    let filteredState = todaysData.filter(stateData => stateData.state === inputValue);

    console.log(filteredState);

    filteredState.forEach((stateChoice) => {
      let row = cleaningHouse.append("tr");
      Object.entries(stateChoice).forEach(([key, value]) => {
        var cell = row.append("th");
        cell.text(value);
      });
    });

}