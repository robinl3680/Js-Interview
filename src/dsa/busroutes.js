/**
 * @param {number[][]} routes
 * @param {number} source
 * @param {number} target
 * @return {number}
 */
var numBusesToDestination = function (routes, source, target) {
  if (source === target) return 0;
  let stopToBuses = new Map();

  for (let i = 0; i < routes.length; i++) {
    //first transform the routes arrays into  a map that represents a graph
    for (let stop of routes[i]) {
      if (!stopToBuses.has(stop)) {
        stopToBuses.set(stop, new Set());
      }
      stopToBuses.get(stop).add(i);
    }
  }
  if (!stopToBuses.has(source) || !stopToBuses.has(target)) return -1;

  let queue = [];
  let visitedBuses = new Set();
  let visitedStops = new Set();

  for (let bus of stopToBuses.get(source)) {
    queue.push([bus, 1]);
    visitedBuses.add(bus);
  }

  visitedStops.add(source);
  while (queue.length > 0) {
    let [bus, count] = queue.shift();

    for (let stop of routes[bus]) {
      if (target === stop) return count;
      if (!visitedStops.has(stop)) {
        visitedStops.add(stop);

        for (nextBus of stopToBuses.get(stop)) {
          if (!visitedBuses.has(nextBus)) {
            queue.push([nextBus, count + 1]);
            visitedBuses.add(nextBus);
          }
        }
      }
    }
  }

  return -1;
};
