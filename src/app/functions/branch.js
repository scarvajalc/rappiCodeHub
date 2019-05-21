const mapFunctions = require("./map");

const branchFunctions = {
  orderBranchesByDistance(openBranches, clientCoordinates) {
    let openBranchesDistances = [];

    for (var i = 0; i < openBranches.length; i++) {
      let restaurantLatitude = openBranches[i].latitude;
      let restaurantLongitude = openBranches[i].longitude;
      let clientRestaurantDistance = mapFunctions.getDistanceFromCoordinates(
        clientCoordinates.latitude,
        clientCoordinates.longitude,
        restaurantLatitude,
        restaurantLongitude
      );
      openBranchesDistances.push({
        branch: openBranches[i],
        distance: clientRestaurantDistance
      });
    }

    const orderedOpenBranches = openBranchesDistances.sort((a, b) => {
      return a.distance - b.distance;
    });

    return orderedOpenBranches;
  }
};

module.exports = branchFunctions;
