
/**
 * @param {number} numberOfCities
 * @param {number[][]} flights
 * @param {number} start
 * @param {number} goal
 * @param {number} maxNumberOfStops
 * @return {number}
 */
var findCheapestPrice = function (numberOfCities, flights, start, goal, maxNumberOfStops) {
    this.NO_SUCH_ROUTE = -1;
    return bellmanFordSearchForCheapestPriceWithMaxStops(numberOfCities, flights, start, goal, maxNumberOfStops);
};

/**
 * @param {number} numberOfCities
 * @param {number[][]} flights
 * @param {number} start
 * @param {number} goal
 * @param {number} maxNumberOfStops
 * @return {number}
 */
function bellmanFordSearchForCheapestPriceWithMaxStops(numberOfCities, flights, start, goal, maxNumberOfStops) {
    let minDistanceFromStart = new Array(numberOfCities).fill(Number.MAX_SAFE_INTEGER);
    minDistanceFromStart[start] = 0;

    for (let i = 0; i <= maxNumberOfStops; ++i) {
        const temp = Array.from(minDistanceFromStart);

        for (let [from, to, price] of flights) {
            if (minDistanceFromStart[from] !== Number.MAX_SAFE_INTEGER) {
                temp[to] = Math.min(temp[to], minDistanceFromStart[from] + price);
            }
        }
        minDistanceFromStart = temp;
    }
    return minDistanceFromStart[goal] !== Number.MAX_SAFE_INTEGER ? minDistanceFromStart[goal] : this.NO_SUCH_ROUTE;
}
