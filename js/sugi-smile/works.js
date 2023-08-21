
document.addEventListener("DOMContentLoaded", function () {
    /* SP Accordion */
    var spAccor = document.querySelectorAll(".js-accor .accor-ttl");
    spAccor.forEach(function (accor) {
        accor.addEventListener("click", function () {
            this.parentNode.classList.toggle("active");
        });
    });
});