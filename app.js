const pages = ["home", "learn", "practice", "progress", "profile"];

const titleMap = {
  home: "Good morning, Trader 👋",
  learn: "Trading Academy",
  practice: "Practice Mode",
  progress: "Your Progress",
  profile: "Your Profile"
};

function showPage(name) {
  pages.forEach(function (page) {
    const el = document.getElementById("page-" + page);
    if (el) {
      el.classList.toggle("active", page === name);
    }
  });

  document.querySelectorAll("[data-page]").forEach(function (button) {
    button.classList.toggle("active", button.dataset.page === name);
  });

  const title = document.getElementById("pageTitle");

  if (title) {
    title.textContent = titleMap[name] || "TradeNova";
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

document.addEventListener("click", function (event) {
  const button = event.target.closest("[data-page]");

  if (button) {
    event.preventDefault();
    showPage(button.dataset.page);
  }
});

document.querySelectorAll(".tab").forEach(function (tab) {
  tab.addEventListener("click", function () {
    document.querySelectorAll(".tab").forEach(function (item) {
      item.classList.remove("active");
    });

    tab.classList.add("active");
  });
});
