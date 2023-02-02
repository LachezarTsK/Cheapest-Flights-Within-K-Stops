
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

public class Solution {

    private record City(int ID, int priceOfFlight) {}
    private record Flight(int cityID, int priceFromStart, int stopsFromStart) {}
    private Map<Integer, List<City>> graph;
    private static final int NO_SUCH_ROUTE = -1;

    public int findCheapestPrice(int numberOfCities, int[][] flights, int start, int goal, int maxNumberOfStops) {
        initializeGraph(flights);
        return dijkstraSearchForCheapestPriceWithMaxStops(start, goal, numberOfCities, maxNumberOfStops);
    }

    private int dijkstraSearchForCheapestPriceWithMaxStops(int start, int goal, int numberOfCities, int maxNumberOfStops) {
        PriorityQueue<Flight> minHeap = new PriorityQueue<>((x, y) -> x.priceFromStart - y.priceFromStart);
        minHeap.add(new Flight(start, 0, 0));

        int[] stopsFromStart = new int[numberOfCities];
        Arrays.fill(stopsFromStart, Integer.MAX_VALUE);

        while (!minHeap.isEmpty()) {
            Flight flight = minHeap.poll();
            if (flight.cityID == goal) {
                return flight.priceFromStart;
            }
            if (flight.stopsFromStart > stopsFromStart[flight.cityID] || flight.stopsFromStart > maxNumberOfStops) {
                continue;
            }
            stopsFromStart[flight.cityID] = flight.stopsFromStart;
            if (!graph.containsKey(flight.cityID)) {
                continue;
            }
            List<City> nextCities = graph.get(flight.cityID);
            for (City nextCity : nextCities) {
                minHeap.add(new Flight(nextCity.ID, flight.priceFromStart + nextCity.priceOfFlight, 1 + flight.stopsFromStart));
            }
        }
        return NO_SUCH_ROUTE;
    }

    private void initializeGraph(int[][] flights) {
        graph = new HashMap<>();
        for (int[] flight : flights) {
            int from = flight[0];
            int to = flight[1];
            int price = flight[2];
            graph.putIfAbsent(from, new ArrayList<>());
            graph.get(from).add(new City(to, price));
        }
    }
}
