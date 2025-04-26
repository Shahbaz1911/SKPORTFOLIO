function toggleMenu() {
  const menu = document.getElementById("top-menu");
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  menu.classList.toggle("open");
  hamburgerBtn.classList.toggle("open");
}

// Intersection Observer to add .visible class to sections when they come into view
const sections = document.querySelectorAll("section");

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1, // Trigger when 10% of the section is visible
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach((section) => {
  observer.observe(section);
});

// Update active sidebar link based on scroll position
function updateActiveLink() {
  const scrollPosition = window.scrollY;
  const sidebarLinks = document.querySelectorAll(".sidebar-link");

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop - 100; // Offset to account for navbar
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      sidebarLinks.forEach((link) => link.classList.remove("active"));
      sidebarLinks[index].classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);

// Theme Toggle Functionality
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector(".theme-icon");

themeToggle.addEventListener("click", () => {
  document.body.dataset.theme =
    document.body.dataset.theme === "dark" ? "light" : "dark";
  themeIcon.textContent = document.body.dataset.theme === "dark" ? "☀️" : "🌙";
});
