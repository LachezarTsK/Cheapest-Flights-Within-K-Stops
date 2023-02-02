
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
        int stopsFromStart{};
        Flight(int cityID, int priceFromStart, int stopsFromStart) : cityID{cityID}, priceFromStart{priceFromStart}, stopsFromStart{stopsFromStart}{}
    };

    struct Comparator {
        bool operator()(const Flight& x, const Flight& y) const {
            return x.priceFromStart > y.priceFromStart;
        }
    };

    unordered_map<int, vector<City>> graph;
    static const int NO_SUCH_ROUTE = -1;

public:
    int findCheapestPrice(int numberOfCities, const vector<vector<int>>& flights, int start, int goal, int maxNumberOfStops) {
        initializeGraph(flights);
        return dijkstraSearchForCheapestPriceWithMaxStops(start, goal, numberOfCities, maxNumberOfStops);
    }

private:
    int dijkstraSearchForCheapestPriceWithMaxStops(int start, int goal, int numberOfCities, int maxNumberOfStops) {
        priority_queue < Flight, vector<Flight>, Comparator> minHeap;
        minHeap.emplace(start, 0, 0);

        vector<int> stopsFromStart(numberOfCities, INT_MAX);

        while (!minHeap.empty()) {

            Flight flight = minHeap.top();
            minHeap.pop();
            if (flight.cityID == goal) {
                return flight.priceFromStart;
            }
            if (flight.stopsFromStart > stopsFromStart[flight.cityID] || flight.stopsFromStart > maxNumberOfStops) {
                continue;
            }
            stopsFromStart[flight.cityID] = flight.stopsFromStart;
            
            //C++20: !graph.contains(flight.cityID)
            if (graph.find(flight.cityID) == graph.end()) {
                continue;
            }
            const vector<City>& nextCities = graph[flight.cityID];
            for (City nextCity : nextCities) {
                minHeap.emplace(nextCity.ID, flight.priceFromStart + nextCity.priceOfFlight, 1 + flight.stopsFromStart);
            }
        }
        return NO_SUCH_ROUTE;
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
