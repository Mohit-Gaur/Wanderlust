// Foursquare API Info
const clientId = '';
const clientSecret = '';
const url = '';

// OpenWeather Info
const openWeatherKey = '';
const weatherUrl = '';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20180101`;
  try {
    const response = await fetch(urlToFetch);
    if(response.ok)
    {
      console.log(response);
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
      console.log(venues)
      return venues;
    }
    else
    {
      throw new Error('Request Failed');
    }
} 
catch (error) {
  console.log(error.message);  
}
};

const getForecast = async () => {
  const  urlToFetch = `${forecastUrl}${apikey}&q = ${$input.val()}&days=4&hour=11`;
  try{
    const response = await fetch(utlToFetch);
    if(response.ok){
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const days = jsonResponse.forecast.forecastday;
      return days;
    }
    else{
      throw new Error('Request Failed')
    }
  }
  catch(error){
    console.log(error.message);
  }

}


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
    const venue = venues.[index]
    const venueIcon = venue.categories[0].icon
    const venueImgsrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (days) => {
  $weatherDivs.forEach($day, index) => {
    const currentDay = days[index];
    let weatherContent = createWeatherHTML(currentDay);
    $day.append(weatherContent);
  }
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(forecasat => renderForecast(forecast));
  return false;
}

$submit.click(executeSearch)
