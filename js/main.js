jQuery(document).ready(function ($) {
  "use strict";

  $(function () {
    // Vars
    var modBtn = $("#modBtn"),
      modal = $("#modal"),
      close = modal.find(".close-btn img"),
      modContent = modal.find(".modal-content");

    // open modal when click on open modal button
    modBtn.on("click", function () {
      modal.css("display", "block");
      modContent
        .removeClass("modal-animated-out")
        .addClass("modal-animated-in");
    });

    // close modal when click on close button or somewhere out the modal content
    $(document).on("click", function (e) {
      var target = $(e.target);
      if (target.is(modal) || target.is(close)) {
        modContent
          .removeClass("modal-animated-in")
          .addClass("modal-animated-out")
          .delay(300)
          .queue(function (next) {
            modal.css("display", "none");
            next();
          });
      }
    });
  });

  // on click event on all anchors with a class of scrollTo
  $("a.scrollTo").on("click", function () {
    // data-scrollTo = section scrolling to name
    var scrollTo = $(this).attr("data-scrollTo");

    // toggle active class on and off. added 1/24/17
    $("a.scrollTo").each(function () {
      if (scrollTo == $(this).attr("data-scrollTo")) {
        $(this).addClass("active");
      } else {
        $(this).removeClass("active");
      }
    });

    // animate and scroll to the sectin
    $("body, html").animate(
      {
        // the magic - scroll to section
        scrollTop: $("#" + scrollTo).offset().top,
      },
      1000
    );
    return false;
  });

  $(".menu-icon").click(function () {
    $(this).toggleClass("active");
    $(".overlay-menu").toggleClass("open");
  });

  $("#signin").click(function () {
    if ($("#signin-form").is(":visible")) {
      $("#signin-form").slideUp("slow");
      $("#signin").html("Sign-In <i class='fas fa-sign-in-alt'></i>");
    } else {
      $("#signin-form").slideDown("slow");
      $("#signin").html("<i class='fas fa-arrow-up'></i>");
    }
  });
  $("#signup").click(function () {
    if ($("#signup-form").is(":visible")) {
      $("#signup-form").slideUp("slow");
      $("#signup").html("Sign-Up <i class='fas fa-user-plus'></i>");
    } else {
      $("#signup-form").slideDown("slow");
      $("#signup").html("<i class='fas fa-arrow-up'></i>");
    }
  });

  //If the user types anythin into the search bar
  $("#search-bar").keyup(function () {
    $("#video-container").slideUp("slow");
    $("#grid-latest").slideUp("slow");
    $("#grid-popular").slideUp("slow");
    $("footer").slideUp("slow");
    $("#search-result").slideDown("slow");
    if (!$("#search-bar").val()) {
      $("#video-container").slideDown("slow");
      $("#grid-latest").slideDown("slow");
      $("#grid-popular").slideDown("slow");
      $("footer").slideDown("slow");
      $("#search-result").slideUp("slow");
    }
  });


  $(":radio[name=avatar]").change(function() {
    var src = $(this).next('img').attr('src');
    $(this).val(src);    
    console.log($(this).val());
});

$(".img-fluid").addClass("wow fadeIn z-depth-1-half");

new WOW().init();


});
