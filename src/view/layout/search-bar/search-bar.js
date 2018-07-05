(function() {
  document.addEventListener("DOMContentLoaded", function() {
    const $input = document.getElementById("search-input");
    let prevText;

    $input.addEventListener("focus", function() {
      prevText = this.value;
      this.value = "";
      this.placeholder = "Search for location, street, bus stop, etc.";
    });

    $input.addEventListener("blur", function() {
      if (!this.value) {
        this.value = prevText;
      }
      this.placeholder = "";
    });
  });
})();
