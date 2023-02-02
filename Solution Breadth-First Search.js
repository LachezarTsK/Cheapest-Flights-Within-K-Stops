
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
    return breadthFirstSearchForCheapestPriceWithMaxStops(start, goal, numberOfCities, maxNumberOfStops);
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
 */
function Flight(cityID, priceFromStart) {
    this.cityID = cityID;
    this.priceFromStart = priceFromStart;
}

/**
 * @param {number} start
 * @param {number} goal
 * @param {number} numberOfCities
 * @param {number} maxNumberOfStops
 * @return {number}
 */
function breadthFirstSearchForCheapestPriceWithMaxStops(start, goal, numberOfCities, maxNumberOfStops) {
    const minDistanceFromStart = new Array(numberOfCities).fill(Number.MAX_SAFE_INTEGER);
    minDistanceFromStart[start] = 0;

    // const {Queue} = require('@datastructures-js/queue');
    // Queue<Flight>
    const queue = new Queue();
    queue.enqueue(new Flight(start, 0));

    let stopsFromStart = 0;

    while (stopsFromStart <= maxNumberOfStops && !queue.isEmpty()) {
        let stepsInCurrentRound = queue.size();
        while (stepsInCurrentRound-- > 0) {
            const current = queue.dequeue();
            if (!this.graph.has(current.cityID)) {
                continue;
            }
            const nextCities = this.graph.get(current.cityID);
            for (let nextCity of nextCities) {
                if (minDistanceFromStart[nextCity.ID] > current.priceFromStart + nextCity.priceOfFlight) {
                    minDistanceFromStart[nextCity.ID] = current.priceFromStart + nextCity.priceOfFlight;
                    queue.enqueue(new Flight(nextCity.ID, current.priceFromStart + nextCity.priceOfFlight));
                }
            }
        }
        ++stopsFromStart;
    }
    return (minDistanceFromStart[goal] !== Number.MAX_SAFE_INTEGER) ? minDistanceFromStart[goal] : this.NO_SUCH_ROUTE;
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
