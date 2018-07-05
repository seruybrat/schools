// schools buffer
let schoolsClone;

//Filter
let filter = els => {
  schoolsClone = schools.slice();
  for (let i = 0, max = els.length; i < max; i++) {
    if (els[i].checked) {
      let $this = els[i];

      schoolsClone = schoolsClone.filter(
        arr => arr[$this.name].indexOf($this.value) > -1
      );
    }
  }
};

document.addEventListener("DOMContentLoaded", function() {
  const $form = document.getElementById("filter"),
    $rangeLocation = document.getElementById("range-location"),
    $mobileFilter = document.querySelector(".mobile-filter"),
    $filterMenu = document.querySelector(".filter-menu"),
    $filterBack = document.querySelector(".filter-back"),
    $schools = document.getElementById("schools"),
    $result = document.getElementById("result");

  //Form elements
  const $formElements = $form.elements;

  //Mobile filter trigger
  $filterMenu.addEventListener("click", () => {
    $mobileFilter.classList.add("open");
  });

  $filterBack.addEventListener("click", () => {
    $mobileFilter.classList.remove("open");
  });

  //Redrow schools list by changing filter
  for (let i = 0, max = $formElements.length; i < max; i++) {
    $formElements[i].addEventListener("click", function() {
      filter($formElements);
      drawSchools(schoolsClone, $schools, $result);
      initMap();
    });
  }
});
