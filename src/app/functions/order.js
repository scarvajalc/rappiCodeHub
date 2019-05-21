const mapFunctions = require("./map");

const orderFunctions = {
  getClosestRappiT(branchCoordinates, availableRappiTenderos) {
    let rappiTenderoDistances = [];

    for (var i = 0; i < availableRappiTenderos.length; i++) {
      let rappiTenderoLatitude = availableRappiTenderos[i].latitude;
      let rappiTenderoLongitude = availableRappiTenderos[i].longitude;
      let rappiTenderoRestaurantDistance = mapFunctions.getDistanceFromCoordinates(
        branchCoordinates.latitude,
        branchCoordinates.longitude,
        rappiTenderoLatitude,
        rappiTenderoLongitude
      );
      rappiTenderoDistances.push({
        rappiTenderoId: availableRappiTenderos[i].id,
        distance: rappiTenderoRestaurantDistance
      });
    }

    const orderedRappiTenderosByDistance = rappiTenderoDistances.sort(
      (a, b) => {
        return a.distance - b.distance;
      }
    );

    return orderedRappiTenderosByDistance;
  }
};

module.exports = orderFunctions;
