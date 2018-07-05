//Sort
const sortByMin = property => {
  let sortOrder = 1;
  return (a, b) => {
    let result =
      a[property] > b[property] ? -1 : a[property] < b[property] ? 1 : 0;
    return result * sortOrder;
  };
};

const sortByMax = property => {
  let sortOrder = 1;
  return (a, b) => {
    let result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};

document.addEventListener("DOMContentLoaded", function() {
  const $selectBy = document.querySelectorAll(".select-by"),
    $schools = document.getElementById("schools"),
    $result = document.getElementById("result");

  // Sort toggle flag
  let helper = false;

  for (let i = 0; i < $selectBy.length; i++) {
    $selectBy[i].addEventListener("click", function() {
      this.classList.toggle("active");
      let sortValue = this.innerHTML;
      if (helper) {
        schoolsClone.sort(sortByMax(sortValue));
        helper = false;
      } else {
        schoolsClone.sort(sortByMin(sortValue));
        helper = true;
      }
      drawSchools(schoolsClone, $schools, $result);
    });
  }
});
