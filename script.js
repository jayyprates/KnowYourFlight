let button = document.getElementById('search-btn')
let searchInput = document.getElementById('search-input')
let aircraftImage = document.getElementById('aircraft-img')
let aircraftName = document.getElementById('aircraft-name')
let airportName = document.getElementById('airport-name')
let airportCity = document.getElementById('city-name') 
let airportIcao = document.getElementById('airport-icao')
let airportIata = document.getElementById('aiport-iata')
let airportTimezone = document.getElementById('airport-timezone')
let mapWidget = document.getElementById('map-widget')
let displayData = document.getElementById('flight-data')
let displayLoading = document.getElementById('loading'); 

class Flight {
    constructor(flightId) {
        this.flightId = flightId; 
    }

    async getFlightData () {
        const apiFlightUrl = `https://api.magicapi.dev/api/v1/aedbx/aerodatabox/flights/Number/${this.flightId}?withAircraftImage=true&withLocation=false`
        
        const flightData = await fetch (apiFlightUrl, {
            headers: {
                'x-magicapi-key': 'cm35z0y7q0001l803rkcl3wiu' 
            }
        });
        if (flightData.status == 204) {
            alert('Flight not found. Try again'); 
            return;
        }

        const response = await flightData.json();
        return response.pop(); 
    }

    async getAirportData (airportIcao) {
        const apiAirportUrl = `https://api.magicapi.dev/api/v1/aedbx/aerodatabox/airports/Icao/${airportIcao}?withRunways=false&withTime=false`

        const airportData = await fetch (apiAirportUrl, {
            headers: {
                'x-magicapi-key': 'cm35z0y7q0001l803rkcl3wiu' 
            }
        }); 

        const response = await airportData.json();
        return response; 
    }

}

let lastFlight = undefined; 

button.addEventListener('click', async (e) => {
    const searchInputValue = searchInput.value; 
    if (!searchInputValue) {
        return
    }

    lastFlight = new Flight(searchInputValue); 

    displayLoading.style.display = 'block'; 
    displayData.style.display = 'none';

    const flightData = await lastFlight.getFlightData();
    const airportData = await lastFlight.getAirportData(flightData.arrival.airport.icao); 

    console.log(flightData)
    console.log('Airport Data', airportData)

    mapWidget.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBqTuC8p22-RnMW9NLvb9QMKQisnYU-Pl8&q=${airportData.fullName}&zoom=14&language=en`

    aircraftImage.src = flightData.aircraft.image.url; 
    aircraftName.innerHTML = flightData.aircraft.model; 
    airportName.innerHTML = airportData.shortName; 
    airportCity.innerHTML = airportData.municipalityName; 
    airportIcao.innerHTML = airportData.icao; 
    airportIata.innerHTML = airportData.iata; 
    airportTimezone.innerHTML = airportData.timeZone; 

    displayLoading.style.display = 'none'; 
    displayData.style.display = 'flex'; 
})