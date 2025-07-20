/**
 * WEBSITE: https://ahmedmaher-portfolio.vercel.app/
 * TWITTER: https://twitter.com/AhmedMa77068093
 * FACEBOOK: https://web.facebook.com/profile.php?id=100012154268952
 * GITHUB: https://github.com/Ahmed-Maher77
 */

// Preloader js - Robust solution with fallbacks
(function () {
  function hidePreloader() {
    var preloader = document.querySelector(".preloader");
    if (preloader) {
      preloader.style.transition = "opacity 0.3s ease-out";
      preloader.style.opacity = "0";
      setTimeout(function () {
        preloader.style.display = "none";
      }, 300);
    }
  }

  // Try multiple approaches to hide preloader
  function initPreloader() {
    // Method 1: Hide immediately after DOM ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        setTimeout(hidePreloader, 500);
      });
    } else {
      setTimeout(hidePreloader, 500);
    }

    // Method 2: Fallback with jQuery if available
    if (typeof $ !== "undefined") {
      $(document).ready(function () {
        setTimeout(function () {
          $(".preloader").fadeOut(300);
        }, 500);
      });
    }

    // Method 3: Ultimate fallback - hide after 2 seconds
    setTimeout(hidePreloader, 2000);
  }

  // Start the preloader hiding process
  initPreloader();
})();

(function ($) {
  "use strict";

  // navbarDropdown
  if ($(window).width() < 992) {
    $(".navigation .dropdown-toggle").on("click", function () {
      $(this).siblings(".dropdown-menu").animate(
        {
          height: "toggle",
        },
        300
      );
    });
  }

  // Ensure navbar toggle works properly
  $(document).ready(function () {
    // Custom mobile menu toggle - more reliable than Bootstrap's
    $(".navbar-toggler").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      var target = $(this).data("target");
      var $target = $(target);

      if ($target.length > 0) {
        // Toggle the show class
        $target.toggleClass("show");

        // Update aria-expanded attribute
        var isExpanded = $target.hasClass("show");
        $(this).attr("aria-expanded", isExpanded);

        // Add/remove body class to prevent scrolling when menu is open
        if (isExpanded) {
          $("body").addClass("menu-open");
        } else {
          $("body").removeClass("menu-open");
        }

        console.log("Mobile menu toggled:", isExpanded ? "open" : "closed");
      } else {
        console.log("Target not found:", target);
      }
    });

    // Close menu when clicking outside
    $(document).on("click", function (e) {
      if (!$(e.target).closest(".navbar").length) {
        $(".navbar-collapse").removeClass("show");
        $(".navbar-toggler").attr("aria-expanded", "false");
        $("body").removeClass("menu-open");
      }
    });

    // Close menu when clicking on a nav link (for mobile)
    $(".navbar-nav .nav-link").on("click", function () {
      if ($(window).width() < 992) {
        $(".navbar-collapse").removeClass("show");
        $(".navbar-toggler").attr("aria-expanded", "false");
        $("body").removeClass("menu-open");
      }
    });
  });

  // product Slider - only initialize if element exists
  if ($(".product-image-slider").length > 0) {
    $(".product-image-slider").slick({
      autoplay: false,
      infinite: true,
      arrows: false,
      dots: true,
      customPaging: function (slider, i) {
        var image = $(slider.$slides[i]).data("image");
        return (
          '<img class="img-fluid" src="' + image + '" alt="product-image">'
        );
      },
    });
  }

  // Product slider - optimized for performance
  $(".product-slider").slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Increased from default for better performance
    dots: false,
    arrows: false,
    lazyLoad: "ondemand", // Enable lazy loading
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          autoplaySpeed: 4000,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          autoplaySpeed: 5000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          autoplaySpeed: 6000,
        },
      },
    ],
  });

  // Pause autoplay when tab is not visible
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      $(".product-slider").slick("slickPause");
    } else {
      $(".product-slider").slick("slickPlay");
    }
  });
})(jQuery);
