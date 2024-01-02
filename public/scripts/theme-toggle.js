
const currentTheme = localStorage.getItem("theme");

function getPreferredTheme() {
  if (currentTheme) return currentTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "auto";
}
let themeValue = getPreferredTheme();

function reflectPreference() {
  document.firstElementChild?.setAttribute("data-theme", themeValue);

  document.querySelector("#theme-btn")?.setAttribute("aria-label", themeValue);
}

function setPreference() {
  localStorage.setItem("theme", themeValue);
  reflectPreference();
}

// avoids flippin
setPreference();

window.onload = () => {
  // set on load so screen readers can get the latest value on the button
  reflectPreference();

  document.querySelector("#theme-btn")?.addEventListener("click", () => {
    themeValue = themeValue === "light" ? "dark" : "light";
    setPreference();
  });
};

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    themeValue = isDark ? "dark" : "light";
    setPreference();
  });
