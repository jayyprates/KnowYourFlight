let button = document.getElementById('search-btn')
let searchInput = document.getElementById('search-input')

class Flight {
    constructor(flightId) {
        this.flightId = flightId; 
        this.statusData = null; 
    }

    getDelay() {
        console.log('Searching delays: /flights/.../delays')
    }

    async getStatus() {
        const apiUrl =`https://api.magicapi.dev/api/v1/aedbx/aerodatabox/flights/Number/${this.flightId}?withAircraftImage=true&withLocation=false`;

        const data = await fetch(apiUrl, {
            headers: {
                'x-magicapi-key': 'cm35z0y7q0001l803rkcl3wiu' 
            }
        });

        if (data.status == 204) {
            alert('Flight not found. Try again'); 
            return;
        }

        const response = await data.json(); 
        this.statusData = response.pop(); 
        
        console.log(this.statusData)
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