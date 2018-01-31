function positionNav($) {
    var mainH = $(".scrollnav").outerHeight();
    var startH = 25;

    if ($(document).scrollTop() > startH) {
        $("header").addClass("fixed");
        $(".wrap").css("padding-top", mainH);
    } else {
        $("header").removeClass("fixed");
        $(".wrap").css("padding-top", 0);
    }
}