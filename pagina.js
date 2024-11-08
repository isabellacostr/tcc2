
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

// Fontes

// Definindo o tamanho de fonte inicial
let fontSize = 16; // tamanho inicial da fonte (em pixels)
const defaultFontSize = 16; // Tamanho de fonte padrão

// Pegando os botões de ajuste de fonte
const increaseFontButton = document.getElementById('increase-font');
const decreaseFontButton = document.getElementById('decrease-font');
const resetFontButton = document.getElementById('reset-font');

// Função para aumentar a fonte
increaseFontButton.addEventListener('click', () => {
    fontSize += 2; // Aumenta o tamanho da fonte em 2px
    document.body.style.fontSize = fontSize + 'px';
});

// Função para diminuir a fonte
decreaseFontButton.addEventListener('click', () => {
    fontSize -= 2; // Diminui o tamanho da fonte em 2px
    document.body.style.fontSize = fontSize + 'px';
});

// Função para restaurar o tamanho da fonte ao padrão
resetFontButton.addEventListener('click', () => {
    fontSize = defaultFontSize; // Restaura o tamanho de fonte padrão
    document.body.style.fontSize = fontSize + 'px';
});
