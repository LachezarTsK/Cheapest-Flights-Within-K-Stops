
import java.util.Arrays;

public class Solution {

    private static final int NO_SUCH_ROUTE = -1;

    public int findCheapestPrice(int numberOfCities, int[][] flights, int start, int goal, int maxNumberOfStops) {
        return bellmanFordSearchForCheapestPriceWithMaxStops(numberOfCities, flights, start, goal, maxNumberOfStops);
    }

    private int bellmanFordSearchForCheapestPriceWithMaxStops(int numberOfCities, int[][] flights, int start, int goal, int maxNumberOfStops) {
        int[] minDistanceFromStart = new int[numberOfCities];
        Arrays.fill(minDistanceFromStart, Integer.MAX_VALUE);
        minDistanceFromStart[start] = 0;

        for (int i = 0; i <= maxNumberOfStops; ++i) {
            int[] temp = Arrays.copyOf(minDistanceFromStart, numberOfCities);

            for (int[] flight : flights) {
                int from = flight[0];
                int to = flight[1];
                int price = flight[2];

                if (minDistanceFromStart[from] != Integer.MAX_VALUE) {
                    temp[to] = Math.min(temp[to], minDistanceFromStart[from] + price);
                }
            }
            minDistanceFromStart = temp;
        }
        return minDistanceFromStart[goal] != Integer.MAX_VALUE ? minDistanceFromStart[goal] : NO_SUCH_ROUTE;
    }
}
