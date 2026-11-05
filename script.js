const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function toggleMenu() {
  const isOpen = navLinks.classList.toggle("active");
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", isOpen);
}

menuToggle.addEventListener("click", toggleMenu);

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) toggleMenu();
  });
});

const themeToggle = document.getElementById("themeToggle");

function loadTheme() {
  try {
    if (localStorage.getItem("theme") === "light") document.body.classList.add("light");
  } catch (e) {  }
}

themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light");
  try { localStorage.setItem("theme", isLight ? "light" : "dark"); } catch (e) {}
});

loadTheme();

const typedEl = document.getElementById("typed");
const roles = ["Web Developer", "Front-End Designer", "IT Student", "Problem Solver"];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  typedEl.textContent = current.substring(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex++;
    setTimeout(typeLoop, 90);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeLoop, 45);
  } else {
    deleting = !deleting;
    if (!deleting) roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeLoop, deleting ? 1600 : 300);
  }
}

typeLoop();

const header = document.getElementById("header");
const sections = document.querySelectorAll("main section[id]");
const toTop = document.getElementById("toTop");

function onScroll() {
  const y = window.scrollY;
  header.classList.toggle("scrolled", y > 20);
  toTop.classList.toggle("show", y > 500);

  let currentId = "home";
  sections.forEach(section => {
    if (y >= section.offsetTop - 120) currentId = section.id;
  });
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
  });
}

window.addEventListener("scroll", onScroll);
onScroll();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");

    entry.target.querySelectorAll(".fill").forEach(bar => {
      bar.style.width = bar.dataset.level + "%";
    });
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    projectCards.forEach(card => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hide", !show);
    });
  });
});

const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

function setError(inputId, message) {
  const field = document.getElementById(inputId).parentElement;
  document.getElementById(inputId + "Error").textContent = message;
  field.classList.toggle("invalid", message !== "");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(e) {
  e.preventDefault();
  formStatus.textContent = "";

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  let valid = true;

  if (name.length < 2) { setError("name", "Please enter your name."); valid = false; }
  else setError("name", "");

  if (!isValidEmail(email)) { setError("email", "Please enter a valid email address."); valid = false; }
  else setError("email", "");

  if (message.length < 10) { setError("message", "Message must be at least 10 characters."); valid = false; }
  else setError("message", "");

  if (!valid) return false;

  const subject = encodeURIComponent("Portfolio message from " + name);
  const body = encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")");
  window.location.href = "mailto:xyrusbanal6@gmail.com?subject=" + subject + "&body=" + body;

  formStatus.textContent = "Thank you, " + name + "! Your email app is opening so you can send the message.";
  form.reset();
  return true;
}

form.addEventListener("submit", validateForm);

const copyBtn = document.getElementById("copyEmail");

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("xyrusbanal6@gmail.com");
    copyBtn.textContent = "Copied! ✓";
  } catch (e) {
    copyBtn.textContent = "xyrusbanal6@gmail.com";
  }
  setTimeout(() => (copyBtn.textContent = "Copy Email"), 2000);
});

toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

document.getElementById("year").textContent = new Date().getFullYear();
