// Einfache Konsolenausgabe für den Anfang
console.log("Info-Website geladen!");

// Cookie-Banner Logik
document.addEventListener("DOMContentLoaded", function() {
  const banner = document.getElementById("cookie-banner");
  const btn = banner?.querySelector("button");
  
  // Prüfen, ob der Nutzer bereits akzeptiert hat
  if (localStorage.getItem("cookiesAccepted") === "true") {
    if (banner) banner.style.display = "none";
  } else {
    if (banner) banner.style.display = "block";
  }
  
  // Bei Klick auf Akzeptieren
  btn?.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    if (banner) banner.style.display = "none";
  });
});