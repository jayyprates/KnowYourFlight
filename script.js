let button = document.getElementById('search-btn')
let searchInput = document.getElementById('search-input')

class Flight {
    constructor(flightId) {
        this.flightId = flightId; 
    }

    getDelay() {
        console.log('Searching delays: /flights/.../delays')
    }

    getStatus() {
        console.log('Searching delays: /flights/.../...')
    }
}

let lastFlight = undefined; 

button.addEventListener('click', (e) => {
    const searchInputValue = searchInput.value; 
    if (!searchInputValue) {
        return
    }

    lastFlight = new Flight(searchInputValue); 
    console.log(lastFlight)

    lastFlight.getDelay()
    lastFlight.getStatus()
})