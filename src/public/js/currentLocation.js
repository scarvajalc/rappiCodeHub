if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(async function(position) {
    $.ajax({
      url: "/rappiTenderoUpdateCurrentAddress",
      type: "PUT",
      data: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    });
  });
}
