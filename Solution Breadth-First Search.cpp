
#include <queue>
#include <vector>
#include <climits>
#include <unordered_map>
using namespace std;

class Solution {

    struct City {
        int ID{};
        int priceOfFlight{};
        City(int ID, int priceOfFlight) : ID{ID}, priceOfFlight{priceOfFlight}{}
    };

    struct Flight {
        int cityID{};
        int priceFromStart{};
        Flight(int cityID, int priceFromStart) : cityID{cityID}, priceFromStart{priceFromStart}{}
    };

    unordered_map<int, vector<City>> graph;
    static const int NO_SUCH_ROUTE = -1;

public:
    int findCheapestPrice(int numberOfCities, const vector<vector<int>>& flights, int start, int goal, int maxNumberOfStops) {
        initializeGraph(flights);
        return breadthFirstSearchForCheapestPriceWithMaxStops(start, goal, numberOfCities, maxNumberOfStops);
    }

private:
    int breadthFirstSearchForCheapestPriceWithMaxStops(int start, int goal, int numberOfCities, int maxNumberOfStops) {
        vector<int> minDistanceFromStart(numberOfCities, INT_MAX);
        minDistanceFromStart[start] = 0;

        queue<Flight> queue;
        queue.emplace(start, 0);

        int stopsFromStart = 0;

        while (stopsFromStart <= maxNumberOfStops && !queue.empty()) {
            int stepsInCurrentRound = queue.size();
            while (stepsInCurrentRound-- > 0) {
                Flight current = queue.front();
                queue.pop();
                
                //C++20: !graph.contains(current.cityID)
                if (graph.find(current.cityID) == graph.end()) {
                    continue;
                }
                const vector<City>& nextCities = graph[current.cityID];
                for (const auto& nextCity : nextCities) {
                    if (minDistanceFromStart[nextCity.ID] > current.priceFromStart + nextCity.priceOfFlight) {
                        minDistanceFromStart[nextCity.ID] = current.priceFromStart + nextCity.priceOfFlight;
                        queue.emplace(nextCity.ID, current.priceFromStart + nextCity.priceOfFlight);
                    }
                }
            }
            ++stopsFromStart;
        }
        return (minDistanceFromStart[goal] != INT_MAX) ? minDistanceFromStart[goal] : NO_SUCH_ROUTE;
    }

    void initializeGraph(const vector<vector<int>>& flights) {
        for (const auto& flight : flights) {
            int from = flight[0];
            int to = flight[1];
            int price = flight[2];
            graph[from].emplace_back(to, price);
        }
    }
};
