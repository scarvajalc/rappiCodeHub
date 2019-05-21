const mapFunctions = {
  convertToRad(coordinate) {
    return (coordinate * Math.PI) / 180;
  },

  getDistanceFromCoordinates(
    clientLatitude,
    clientLongitude,
    restaurantLatitude,
    restaurantLongitude
  ) {
    var earthRadiusInKM = 6371;
    var latitudeDifferences = restaurantLatitude - clientLatitude;
    var dLat = this.convertToRad(latitudeDifferences);
    var longitudeDifferences = restaurantLongitude - clientLongitude;
    var dLon = this.convertToRad(longitudeDifferences);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.convertToRad(restaurantLatitude)) *
        Math.cos(this.convertToRad(clientLatitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = earthRadiusInKM * c;
    return distance;
  }
};

module.exports = mapFunctions;
