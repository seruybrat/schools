//Header
(function() {
  //Draw navigation
  const output = (arr, el) => {
    let out = "",
      i,
      active;

    for (i = 0; i < arr.length; i++) {
      if (i === 0) {
        // hardcore active link
        active = "active";
      } else {
        active = "";
      }

      out +=
        '<a class="link nav__item ' +
        active +
        '" href="' +
        arr[i].href +
        '">' +
        arr[i].name +
        "</a>";
    }

    for (let j = 0; j < el.length; j++) {
      el[j].innerHTML = out;
    }
  };

  document.addEventListener("DOMContentLoaded", function() {
    const $mobileMenu = document.querySelector(".hamburger"),
      $header = document.querySelector(".header"),
      $nav = document.querySelectorAll("nav");

    $mobileMenu.addEventListener("click", function() {
      $header.classList.toggle("open");
    });

    const XMLHTTP = new XMLHttpRequest(),
      URL = "data/navigation.json";

    XMLHTTP.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        output(myArr.links, $nav);
      }
    };

    XMLHTTP.open("GET", URL, true);

    XMLHTTP.send();
  });
})();
