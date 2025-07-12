// Epic Fitness Website JavaScript - Enhanced Mobile Menu
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu elements
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
  const mobileAboutToggle = document.getElementById("mobile-about-toggle");
  const mobileAboutMenu = document.getElementById("mobile-about-menu");
  const body = document.body;

  // Mobile menu toggle functionality
  if (mobileToggle && mobileMenu && mobileMenuOverlay) {
    // Toggle mobile menu
    function toggleMobileMenu() {
      const isOpen = mobileMenu.classList.contains("active");

      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    }

    // Enhanced open mobile menu
    function openMobileMenu() {
      // Add epic opening sequence
      mobileToggle.classList.add("loading");

      setTimeout(() => {
        mobileToggle.classList.remove("loading");
        mobileToggle.classList.add("active");
        mobileMenu.classList.add("active");
        mobileMenuOverlay.classList.add("active");
        body.classList.add("mobile-menu-open");
        mobileToggle.setAttribute("aria-expanded", "true");

        // Optional: Haptic feedback for mobile devices
        if ("vibrate" in navigator) {
          navigator.vibrate(50);
        }
      }, 100);
    }

    // Enhanced close mobile menu
    function closeMobileMenu() {
      mobileToggle.classList.add("loading");

      setTimeout(() => {
        mobileToggle.classList.remove("loading");
        mobileToggle.classList.remove("active");
        mobileMenu.classList.remove("active");
        mobileMenuOverlay.classList.remove("active");
        body.classList.remove("mobile-menu-open");
        mobileToggle.setAttribute("aria-expanded", "false");

        // Close any open dropdowns
        const activeDropdown = document.querySelector(
          ".mobile-dropdown.active",
        );
        if (activeDropdown) {
          activeDropdown.classList.remove("active");
        }
      }, 100);
    }

    // Event listeners
    mobileToggle.addEventListener("click", toggleMobileMenu);
    mobileMenuOverlay.addEventListener("click", closeMobileMenu);

    // Close menu when clicking on navigation links
    const mobileNavLinks = document.querySelectorAll(
      ".mobile-nav-link:not(.mobile-dropdown-toggle)",
    );
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    // Close menu when clicking on dropdown links
    const mobileDropdownLinks = document.querySelectorAll(
      ".mobile-dropdown-link",
    );
    mobileDropdownLinks.forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    // Close menu on escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
        closeMobileMenu();
      }
    });
  }

  // Mobile dropdown functionality
  if (mobileAboutToggle && mobileAboutMenu) {
    mobileAboutToggle.addEventListener("click", function () {
      const dropdown = this.closest(".mobile-dropdown");
      dropdown.classList.toggle("active");
    });
  }

  // Desktop dropdown functionality (existing)
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    const menu = dropdown.querySelector(".dropdown-menu");

    if (toggle && menu) {
      // Show dropdown on hover for desktop
      dropdown.addEventListener("mouseenter", function () {
        if (window.innerWidth > 768) {
          menu.style.opacity = "1";
          menu.style.visibility = "visible";
          menu.style.transform = "translateY(0)";
        }
      });

      dropdown.addEventListener("mouseleave", function () {
        if (window.innerWidth > 768) {
          menu.style.opacity = "0";
          menu.style.visibility = "hidden";
          menu.style.transform = "translateY(-10px)";
        }
      });
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        // Close mobile menu if open
        if (mobileMenu && mobileMenu.classList.contains("active")) {
          closeMobileMenu();
        }

        // Smooth scroll to target
        setTimeout(() => {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 300); // Delay to allow menu to close
      }
    });
  });

  // Add scroll effect to navbar
  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add/remove scrolled class
    if (scrollTop > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Hide navbar on scroll down, show on scroll up (optional)
    // Uncomment if you want this behavior
    /*
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        */

    lastScrollTop = scrollTop;
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    if (
      window.innerWidth > 768 &&
      mobileMenu &&
      mobileMenu.classList.contains("active")
    ) {
      closeMobileMenu();
    }
  });
});
