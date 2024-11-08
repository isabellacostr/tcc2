//Botão modo claro e modo escuro
document.addEventListener('DOMContentLoaded', () => {
  const themeSwitch = document.getElementById('theme-switch');

  // Check if the user has previously selected a theme
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    document.body.classList.add(currentTheme);
    if (currentTheme === 'dark-mode') {
      themeSwitch.checked = true;
    }
  }

  themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light-mode');
    }
  });
});
// script.js

// Exibir o modal de cookies ao carregar a página
window.onload = function() {
  showCookieModal();
};

// Função para mostrar o modal de cookies
function showCookieModal() {
  const cookieModal = document.getElementById("cookie-modal");
  cookieModal.classList.add("show");
}

// Função para aceitar cookies
function acceptCookies() {
  localStorage.setItem("cookieConsent", "accepted");
  closeCookieModal();
  alert("Você aceitou os cookies.");
}

// Função para recusar cookies
function declineCookies() {
  localStorage.setItem("cookieConsent", "declined");
  closeCookieModal();
  alert("Você recusou os cookies.");
}

// Função para fechar o modal
function closeCookieModal() {
  const cookieModal = document.getElementById("cookie-modal");
  cookieModal.classList.remove("show");
  document.getElementById("cookie-modal").style.display = "none";
}
