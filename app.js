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


function runEnter() {
  // Prevent the page from refreshing
  d3.event.preventDefault();
  
    // Select the input element and get the raw HTML node
    let inputElement = d3.select("#stateName");
    let inputLess = d3.select("#lessDeaths");
    let inputMore = d3.select("#moreDeaths");

    let inputValue = inputElement.property("value");
    let inputLessValue = inputLess.property("value");
    let inputMoreValue = inputMore.property("value");

    // console.log(inputValue);
    // console.log(inputLessValue);
    // console.log(inputMoreValue);
    
    let filteredState;
    let filteredInputLessValue;
    let filteredInputMoreValue;
    

    console.log(typeof parseInt(inputLessValue));
    console.log(parseInt(inputLessValue));

    // Deleting init table
    let cleaningHouse = d3.select("tbody");
    cleaningHouse.html("");

    // Requires exact match
    // let filteredState = todaysData.filter(stateData => stateData.state === inputValue);

    // Only needs to contain letters
    
    if(inputValue==""){
      filteredState = todaysData;
    }else{
     filteredState = todaysData.filter(stateData => stateData.state.toString().includes(inputValue.toString()));
    }

    if(inputLessValue==""){
      filteredInputLessValue = filteredState;
    }else{
      filteredInputLessValue = filteredState.filter(stateData => parseInt(stateData.death) < parseInt(inputLessValue));
    }

    if(inputMoreValue==""){
      filteredInputMoreValue = filteredInputLessValue;
    }else{
      filteredInputMoreValue = filteredInputLessValue.filter(stateData => parseInt(stateData.death) > parseInt(inputMoreValue));
    }



    // console.log(filteredState);

    filteredInputMoreValue.forEach((stateChoice) => {
      let row = cleaningHouse.append("tr");
      Object.entries(stateChoice).forEach(([key, value]) => {
        var cell = row.append("th");
        cell.text(value);
      });
    });

}