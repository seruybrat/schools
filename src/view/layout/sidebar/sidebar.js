(function() {
  document.addEventListener("DOMContentLoaded", function() {
    const $rangePrice = document.getElementById("range-price"),
      $rangePriceValue1 = document.getElementById("range-price-value1"),
      $rangePriceValue2 = document.getElementById("range-price-value2"),
      $rangeHours = document.getElementById("range-hours"),
      $rangeHoursValue1 = document.getElementById("range-hours-value1"),
      $rangeHoursValue2 = document.getElementById("range-hours-value2"),
      $rangeLocation = document.getElementById("range-location"),
      $rangeLocationValue = document.getElementById("range-location-value"),
      $rangeLocationTime = document.getElementById("range-location-time"),
      $rangeAge = document.getElementById("range-age"),
      $rangeAgeValue = document.getElementById("range-age-value"),
      $collapse = document.querySelector(".collapse");

    //Collapse implement
    let open = true,
      initHeight = $collapse.nextElementSibling.offsetHeight;

    $collapse.nextElementSibling.style.height = initHeight + "px";

    function slideToggle() {
      this.classList.toggle("collapsed");

      if (open) {
        open = false;
        $collapse.nextElementSibling.style.height = "0px";
      } else {
        open = true;
        $collapse.nextElementSibling.style.height = initHeight + "px";
      }
    }

    $collapse.addEventListener("click", slideToggle);

    //Input type range(noUiSlider)
    noUiSlider.create($rangePrice, {
      start: [300, 500],
      connect: true,
      range: {
        min: 0,
        max: 1000
      }
    });

    noUiSlider.create($rangeHours, {
      start: [8, 17],
      connect: true,
      range: {
        min: 0,
        max: 24
      }
    });

    noUiSlider.create($rangeLocation, {
      start: 3,

      // Disable animation on value-setting,
      // so the sliders respond immediately.
      animate: false,
      connect: [true, false],
      snap: false,
      range: {
        min: 0,
        max: 100
      }
    });

    noUiSlider.create($rangeAge, {
      start: 4,

      // Disable animation on value-setting,
      // so the sliders respond immediately.
      animate: false,
      connect: [true, false],
      snap: false,
      range: {
        min: 0,
        max: 14
      }
    });

    //Input type range(noUiSlider) value outup
    $rangeAge.noUiSlider.on("update", (values, handle) => {
      $rangeAgeValue.innerHTML = Math.round(values[handle]);
    });

    $rangeLocation.noUiSlider.on("update", (values, handle) => {
      $rangeLocationValue.innerHTML = Math.round(values[handle]);
      $rangeLocationTime.innerHTML = Math.round(values[handle]) * 3;
    });

    const nodesRangeHours = [
      $rangeHoursValue1, // 0
      $rangeHoursValue2 // 1
    ];

    $rangeHours.noUiSlider.on("update", (values, handle) => {
      if (Math.round(values[handle]) > 12) {
        nodesRangeHours[handle].innerHTML =
          Math.round(values[handle]) - 12 + ":00 PM";
      } else {
        nodesRangeHours[handle].innerHTML =
          Math.round(values[handle]) + ":00 AM";
      }
    });

    const nodesRangePrice = [
      $rangePriceValue1, // 0
      $rangePriceValue2 // 1
    ];

    $rangePrice.noUiSlider.on("update", (values, handle) => {
      nodesRangePrice[handle].innerHTML = Math.round(values[handle]);
    });
  });
})();
