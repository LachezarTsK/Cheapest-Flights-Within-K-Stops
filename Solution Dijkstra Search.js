
/**
 * @param {number} numberOfCities
 * @param {number[][]} flights
 * @param {number} start
 * @param {number} goal
 * @param {number} maxNumberOfStops
 * @return {number}
 */
var findCheapestPrice = function (numberOfCities, flights, start, goal, maxNumberOfStops) {
    this.graph = new Map(); //Map<number, City[]>
    this.NO_SUCH_ROUTE = -1;
    initializeGraph(flights);
    return dijkstraSearchForCheapestPriceWithMaxStops(start, goal, numberOfCities, maxNumberOfStops);
};

/**
 * @param {number} ID
 * @param {number} priceOfFlight
 */
function City(ID, priceOfFlight) {
    this.ID = ID;
    this.priceOfFlight = priceOfFlight;
}

/**
 * @param {number} cityID
 * @param {number} priceFromStart
 * @param {number} stopsFromStart 
 */
function Flight(cityID, priceFromStart, stopsFromStart) {
    this.cityID = cityID;
    this.priceFromStart = priceFromStart;
    this.stopsFromStart = stopsFromStart;
}

/**
 * @param {number} start
 * @param {number} goal
 * @param {number} numberOfCities
 * @param {number} maxNumberOfStops
 * @return {number}
 */
function dijkstraSearchForCheapestPriceWithMaxStops(start, goal, numberOfCities, maxNumberOfStops) {
    //const {MinPriorityQueue} = require('@datastructures-js/priority-queue');
    //MinPriorityQueue<Flight>
    const minHeap = new MinPriorityQueue({compare: (x, y) => x.priceFromStart - y.priceFromStart});
    minHeap.enqueue(new Flight(start, 0, 0));

    const stopsFromStart = new Array(numberOfCities).fill(Number.MAX_SAFE_INTEGER);

    while (!minHeap.isEmpty()) {

        const flight = minHeap.dequeue();
        if (flight.cityID === goal) {
            return flight.priceFromStart;
        }
        if (flight.stopsFromStart > stopsFromStart[flight.cityID] || flight.stopsFromStart > maxNumberOfStops) {
            continue;
        }
        stopsFromStart[flight.cityID] = flight.stopsFromStart;
        if (!this.graph.has(flight.cityID)) {
            continue;
        }
        const nextCities = this.graph.get(flight.cityID);
        for (let nextCity of nextCities) {
            minHeap.enqueue(new Flight(nextCity.ID, flight.priceFromStart + nextCity.priceOfFlight, 1 + flight.stopsFromStart));
        }
    }
    return this.NO_SUCH_ROUTE;
}

/**
 * @param {number[][]} flights
 * @return {void}
 */
function initializeGraph(flights) {
    for (let [from, to, price] of flights) {
        if (!this.graph.has(from)) {
            this.graph.set(from, []);
        }
        this.graph.get(from).push(new City(to, price));
    }
}
