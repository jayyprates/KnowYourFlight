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

button.addEventListener('click', (e) => {
    const searchInputValue = searchInput.value; 
    if (!searchInputValue) {
        return
    }

    const newFlight = new Flight(searchInputValue); 
    console.log(newFlight)

    newFlight.getDelay()
    newFlight.getStatus()
})