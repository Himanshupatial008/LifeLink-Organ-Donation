const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav");
menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

const form = document.querySelector("#donorForm");
const message = document.querySelector("#formMessage");
form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form).entries());
  // Demo only: save non-sensitive sample information in this browser.
  const entries = JSON.parse(localStorage.getItem("lifelink_demo_entries") || "[]");
  entries.push({ ...data, savedAt: new Date().toISOString() });
  localStorage.setItem("lifelink_demo_entries", JSON.stringify(entries));
  message.textContent = "Thank you, " + data.name + ". Your demo interest entry has been saved in this browser.";
  form.reset();
});
