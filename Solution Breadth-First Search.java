
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

public class Solution {

    private record City(int ID, int priceOfFlight) {}
    private record Flight(int cityID, int priceFromStart) {}
    private Map<Integer, List<City>> graph;
    private static final int NO_SUCH_ROUTE = -1;

    public int findCheapestPrice(int numberOfCities, int[][] flights, int start, int goal, int maxNumberOfStops) {
        initializeGraph(flights);
        return breadthFirstSearchForCheapestPriceWithMaxStops(start, goal, numberOfCities, maxNumberOfStops);
    }

    private int breadthFirstSearchForCheapestPriceWithMaxStops(int start, int goal, int numberOfCities, int maxNumberOfStops) {
        int[] minDistanceFromStart = new int[numberOfCities];
        Arrays.fill(minDistanceFromStart, Integer.MAX_VALUE);
        minDistanceFromStart[start] = 0;

        Queue<Flight> queue = new LinkedList<>();
        queue.add(new Flight(start, 0));

        int stopsFromStart = 0;

        while (stopsFromStart <= maxNumberOfStops && !queue.isEmpty()) {
            int stepsInCurrentRound = queue.size();
            while (stepsInCurrentRound-- > 0) {
                Flight current = queue.poll();
                if (!graph.containsKey(current.cityID)) {
                    continue;
                }
                List<City> nextCities = graph.get(current.cityID);
                for (City nextCity : nextCities) {
                    if (minDistanceFromStart[nextCity.ID] > current.priceFromStart + nextCity.priceOfFlight) {
                        minDistanceFromStart[nextCity.ID] = current.priceFromStart + nextCity.priceOfFlight;
                        queue.add(new Flight(nextCity.ID, current.priceFromStart + nextCity.priceOfFlight));
                    }
                }
            }
            ++stopsFromStart;
        }
        return (minDistanceFromStart[goal] != Integer.MAX_VALUE) ? minDistanceFromStart[goal] : NO_SUCH_ROUTE;
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
