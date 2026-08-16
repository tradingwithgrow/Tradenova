document.addEventListener("DOMContentLoaded", () => {
  const pages = ["home", "learn", "practice", "progress", "profile"];

  const titles = {
    home: "Good morning, Trader 👋",
    learn: "Trading Academy",
    practice: "Practice Mode",
    progress: "Your Progress",
    profile: "Your Profile"
  };

  function showPage(name, updateUrl = true) {
    if (!pages.includes(name)) {
      name = "home";
    }

    // Show selected page
    pages.forEach(page => {
      const section = document.getElementById("page-" + page);

      if (section) {
        section.classList.toggle("active", page === name);
      }
    });

    // Update navigation buttons
    document.querySelectorAll("[data-page]").forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.page === name
      );
    });

    // Update page title
    const title = document.getElementById("pageTitle");

    if (title) {
      title.textContent = titles[name];
    }

    // Update browser URL
    if (updateUrl) {
      history.pushState(
        { page: name },
        "",
        "#" + name
      );
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // Main navigation
  document.addEventListener("click", event => {
    const button = event.target.closest("[data-page]");

    if (!button) return;

    event.preventDefault();

    const page = button.dataset.page;

    if (page) {
      showPage(page);
    }
  });

  // Continue Learning button
  document.querySelectorAll("button, a").forEach(element => {
    const text = element.textContent.trim().toLowerCase();

    if (
      text.includes("continue learning") ||
      text.includes("view all")
    ) {
      element.addEventListener("click", event => {
        event.preventDefault();
        showPage("learn");
      });
    }
  });

  // Course cards
  document.querySelectorAll("button, a, .course-card, .course").forEach(element => {
    const text = element.textContent.trim().toLowerCase();

    if (
      text.includes("technical analysis") ||
      text.includes("risk management") ||
      text.includes("trading psychology")
    ) {
      element.addEventListener("click", event => {
        event.preventDefault();
        showPage("learn");
      });
    }
  });

  // Browser back/forward
  window.addEventListener("popstate", () => {
    const page = location.hash.replace("#", "") || "home";
    showPage(page, false);
  });

  // Open correct page when website loads
  const initialPage = location.hash.replace("#", "") || "home";

  showPage(initialPage, false);
});
