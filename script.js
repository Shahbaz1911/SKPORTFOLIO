function toggleMenu() {
  const menu = document.getElementById("top-menu");
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  menu.classList.toggle("open");
  hamburgerBtn.classList.toggle("open");
}

// Loading Animation
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".loader");
  const mainContent = document.querySelector(".main-content");
  const words = document.querySelectorAll(".loader-name .word");
  const hindiLetters = document.querySelectorAll(".hindi .letter");
  const englishLetters = document.querySelectorAll(".english .letter");
  const loadingProgress = document.querySelector(".loading-progress");
  const loadingPercentage = document.querySelector(".loading-percentage");

  // Animation sequence
  const languages = [
    "hindi",
    "urdu",
    "arabic",
    "punjabi",
    "turkish",
    "russian",
    "english",
  ];

  // Percentage values for each language (0%, 14%, 29%, ..., 100%)
  const percentages = [0, 14, 29, 43, 57, 71, 86, 100];

  // Start with Hindi: reveal letters
  setTimeout(() => {
    words[0].classList.add("visible"); // Show Hindi
    loadingProgress.style.width = "14%"; // 1/7 progress
    loadingPercentage.textContent = "14%";
    // Reveal Hindi letters
    hindiLetters.forEach((letter, index) => {
      setTimeout(() => {
        letter.classList.add("visible");
      }, 1100 + index * 50); // Start after 1.1s delay, 50ms per letter
    });
    // Transition to other languages
    languages.slice(1).forEach((lang, index) => {
      setTimeout(() => {
        // Hide previous language
        words[index].classList.remove("visible");
        // Show current language
        words[index + 1].classList.add("visible");
        // Update loading bar and percentage
        loadingProgress.style.width = `${(index + 2) * 14}%`;
        loadingPercentage.textContent = `${percentages[index + 2]}%`;
        // Reveal English letters if last language
        if (lang === "english") {
          englishLetters.forEach((letter, idx) => {
            setTimeout(() => {
              letter.classList.add("visible");
            }, 50 * idx); // 50ms per letter, no additional delay
          });
        }
      }, 1500 + index * 500); // Start after Hindi (1.5s), 500ms per language
    });
    // Hide loader and show main content
    setTimeout(() => {
      loader.classList.add("hidden");
      mainContent.style.display = "block";
      // Trigger profile section visibility
      const profileSection = document.getElementById("profile");
      if (profileSection) {
        profileSection.classList.add("visible");
      }
    }, 1500 + (languages.length - 1) * 500 + 500); // Wait for all languages + 500ms buffer
  }, 0);
});

// Intersection Observer to add .visible class to sections when they come into view
const sections = document.querySelectorAll(
  "section, #about-detail, #projects-detail"
);

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

// Click Animation for Sidebar Links
document.querySelectorAll(".sidebar-link").forEach((link) => {
  link.addEventListener("click", () => {
    // Remove clicked class from all links
    document
      .querySelectorAll(".sidebar-link")
      .forEach((l) => l.classList.remove("clicked"));
    // Add clicked class to the clicked link
    link.classList.add("clicked");
    // Remove clicked class after animation
    setTimeout(() => {
      link.classList.remove("clicked");
    }, 200); // Match animation duration
  });
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
function toggleTheme() {
  const currentTheme = document.body.dataset.theme;
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.body.dataset.theme = newTheme;
  
  // Update sidebar theme toggle icon
  const themeToggleSidebar = document.getElementById("theme-toggle-sidebar");
  const themeIconSidebar = themeToggleSidebar?.querySelector(".theme-icon-sidebar");
  
  // Update sidebar theme toggle icon
  if (themeIconSidebar) {
    themeIconSidebar.className = newTheme === "dark" ? "fas fa-sun sidebar-icon theme-icon-sidebar" : "fas fa-moon sidebar-icon theme-icon-sidebar";
  }
}

// Add event listener for sidebar theme toggle button
const themeToggleSidebar = document.getElementById("theme-toggle-sidebar");
if (themeToggleSidebar) {
  themeToggleSidebar.addEventListener("click", toggleTheme);
}
