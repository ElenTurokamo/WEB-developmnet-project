window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scrollToTopButton").style.display = "block";
    } else {
        document.getElementById("scrollToTopButton").style.display = "none";
    }
};

document.getElementById("scrollToTopButton").onclick = function() {
    scrollTop();
};

function scrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}