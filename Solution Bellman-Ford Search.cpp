
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

class Solution {
    
    static const int NO_SUCH_ROUTE = -1;

public:
    int findCheapestPrice(int numberOfCities, const vector<vector<int>>& flights, int start, int goal, int maxNumberOfStops) const {
        return bellmanFordSearchForCheapestPriceWithMaxStops(numberOfCities, flights, start, goal, maxNumberOfStops);
    }

private:
    int bellmanFordSearchForCheapestPriceWithMaxStops(int numberOfCities, const vector<vector<int>>& flights, int start, int goal, int maxNumberOfStops) const {
        vector<int> minDistanceFromStart(numberOfCities, INT_MAX);
        minDistanceFromStart[start] = 0;

        for (int i = 0; i <= maxNumberOfStops; ++i) {
            vector<int> temp = minDistanceFromStart;

            for (const auto& flight : flights) {
                int from = flight[0];
                int to = flight[1];
                int price = flight[2];

                if (minDistanceFromStart[from] != INT_MAX) {
                    temp[to] = min(temp[to], minDistanceFromStart[from] + price);
                }
            }
            minDistanceFromStart = temp;
        }
        return minDistanceFromStart[goal] != INT_MAX ? minDistanceFromStart[goal] : NO_SUCH_ROUTE;
    }
};
