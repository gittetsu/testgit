
document.addEventListener("DOMContentLoaded", function (e) {
  if (window.location.hash) {
    let hash = decodeURIComponent(window.location.hash.trim());
    console.log(hash);
    document.querySelector(hash).scrollIntoView();
    if (hash === "#integrated-report") {
      const element = document
        .querySelector(".report #report-id")
        .classList.add("active");
      document.querySelectorAll(".js-tab")[
        document.querySelectorAll(".js-tab").length - 3
      ].style.display = "block";
    } else if (hash === "#nonfinancial-indicators") {
      // this.alert("true")
      const element = document
        .querySelector(".indicators #indicators")
        .classList.add("active");
      document.querySelectorAll(".js-tab")[
        document.querySelectorAll(".js-tab").length - 2
      ].style.display = "block";
    } else if (hash === "#GRI-std-comparison") {
      // this.alert("true")
      const element = document
        .querySelector(".comparison-table #comparison-table")
        .classList.add("active");
      document.querySelectorAll(".js-tab")[
        document.querySelectorAll(".js-tab").length - 1
      ].style.display = "block";
    }
  } else {
    document.querySelectorAll('.js-tab')[document.querySelectorAll('.js-tab').length - 3].style.display = 'block';
    document.querySelector('.sec-data-tab a:first-child').classList.add('active');
  }
  var tabLinks = document.querySelectorAll(".sec-data-tab li a");
  tabLinks.forEach(function (tabLink) {
    tabLink.addEventListener("click", function (event) {
      var currentTab = tabLink.getAttribute("href");
      console.log(currentTab);
      var currentRoute = window.location.pathname;
      var newUrl = currentRoute + currentTab;
      console.log(newUrl);
      history.pushState(null, null, newUrl);
      tabLinks.forEach(function (link) {
        link.classList.remove("active");
      });
      tabLink.classList.add("active");
      var tabContents = document.querySelectorAll(".js-tab");
      tabContents.forEach(function (content) {
        content.style.display = "none";
      });
      document.querySelector(currentTab).style.display = "block";
      event.preventDefault();
    });
  });
});

window.onload = function () {
  window.scrollTo(0, 0);
};