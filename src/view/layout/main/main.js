//Main

let schools = [];

const heart =
  '<svg class="icon-heart">' + '<use xlink:href="#heart"></use>' + "</svg>";

const emptyHeart =
  '<svg class="icon-heart-empty">' +
  '<use xlink:href="#heart-empty"></use>' +
  "</svg>";

function likeToggle(e) {
  e.classList.toggle("active");

  if (e.classList.contains("active")) {
    e.innerHTML = heart;
  } else {
    e.innerHTML = emptyHeart;
  }
}

// Drawing schools array
const drawSchools = (arr, $output, $result) => {
  let out = "",
    i,
    active;

  if (arr.length) {
    for (i = 0; i < arr.length; i++) {
      let rating = Math.round(parseFloat(arr[i].rating));

      function getStars(rating) {
        // Round to nearest half
        rating = Math.round(rating * 2) / 2;
        let output = [];

        // Append all the filled whole stars
        for (var i = rating; i >= 1; i--)
          output.push(
            '<svg class="icon-star"><use xlink:href="#star"></use></svg>'
          );

        // Fill the empty stars
        for (let i = 5 - rating; i >= 1; i--)
          output.push(
            '<svg class="icon-star icon-star--empty"><use xlink:href="#star"></use></svg>'
          );

        return output.join("");
      }

      out +=
        '<div class="col-6 col-md-12">' +
        '<article class="article">' +
        '<figure class="figure">' +
        '<img class="article__thumbnail" src="' +
        arr[i].img +
        '" alt="">' +
        "</figure>" +
        '<div class="article__content">' +
        '<h2 class="article__title">' +
        arr[i].title +
        "</h2>" +
        '<div class="article__group article__group--accent">' +
        '<div class="article__rating">' +
        '<span class="article__rating-value">' +
        arr[i].rating +
        "</span>" +
        getStars(rating) +
        "</div>" +
        '<div class="article__private">' +
        arr[i].private +
        "</div>" +
        "</div>" +
        '<div class="article__category">' +
        arr[i].info +
        "</div>" +
        '<hr class="line">' +
        '<div class="article__field">' +
        arr[i].hours +
        "</div>" +
        '<div class="article__group">' +
        '<div class="article__address">' +
        arr[i].address +
        "</div>" +
        '<svg class="icon-direction">' +
        '<use xlink:href="#direction"></use>' +
        "</svg>" +
        "</div>" +
        '<div class="article__field article__group--main">' +
        arr[i].phone +
        "</div>" +
        '<div class="article__group">' +
        "<div>$" +
        arr[i].price +
        " " +
        arr[i].prices +
        "</div>" +
        '<div class="article__like" onclick="likeToggle(this)">' +
        emptyHeart +
        "</div>" +
        "</div>" +
        "</div>" +
        "</article>" +
        "</div>";
    }
  } else {
    out = '<div class="empty-result"> Not found </div>';
  }

  $output.innerHTML = out;
  $result.innerHTML = arr.length;
};

document.addEventListener("DOMContentLoaded", function() {
  const $schools = document.getElementById("schools"),
    $result = document.getElementById("result"),
    $like = document.querySelectorAll(".article__like"),
    $formElements = document.getElementById("filter").elements,
    $animEl = document.querySelectorAll(".left-appear, .right-appear");

  const XMLHTTP = new XMLHttpRequest(),
    URL = "data/schools.json";

  XMLHTTP.open("GET", URL, true);
  XMLHTTP.send();

  XMLHTTP.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      schools = data.schools;
      schoolsClone = schools.slice();
      filter($formElements);
      drawSchools(schoolsClone, $schools, $result);
    }
  };

  //Appear animation
  for (let i = 0; i < $animEl.length; i++) {
    $animEl[i].classList.add("active");
  }
});
