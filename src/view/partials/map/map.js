//Google initGeoLocation
let initGeoLocation = () => {
  let map = new google.maps.Map(document.getElementById("google-map"), {
    center: { lat: 50.5025888, lng: 30.600366500000064 },
    zoom: 10
  });
  var infoWindow = new google.maps.InfoWindow({ map: map });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent("Location found.");
        map.setCenter(pos);
      },
      function() {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
  }
};

//Google initMap
let initMap = () => {
  let map = new google.maps.Map(document.getElementById("google-map"), {
    center: { lat: 50.5025888, lng: 30.600366500000064 },
    zoom: 1
  });

  //Loading schools
  setTimeout(() => {
    for (let i = 0; i < schoolsClone.length; i++) {
      // Current object
      let obj = schoolsClone[i];

      // Adding a new marker for the object
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(obj.lat, obj.lng),
        map: map,
        title: obj.title // this works, giving the marker a title with the correct title
      });
    } // end loop
  }, 1000);
};

document.addEventListener("DOMContentLoaded", function() {
  const $searchInput = document.getElementById("search-input");

  //Search select
  $searchInput.addEventListener("click", function(e) {
    this.classList.toggle("focus");
    e.stopPropagation();
  });

  document
    .getElementById("geolocation-trigger")
    .addEventListener("click", () => {
      initGeoLocation();
      $searchInput.classList.remove("focus");
    });

  document.addEventListener("click", () => {
    $searchInput.classList.remove("focus");
  });
});
