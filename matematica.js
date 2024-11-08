const quizQuestions = {
    facil: [
      { question: "Qual é o valor de 2 + 2 × 3?", answers: ["5", "8", "10", "12"], correct: "8" },
      { question: "Quanto é 25% de 200?", answers: ["25", "50", "100", "75"], correct: "50" },
      { question: "Qual é o valor de 5^2?", answers: ["10", "15", "20", "25"], correct: "25" },
      { question: "Se uma pizza tem 8 fatias e você comeu 3, qual fração da pizza você comeu?", answers: ["1/2", "1/3", "3/8", "3/5"], correct: "3/8" },
      { question: "Qual é o valor de √49?", answers: ["5", "6", "7", "8"], correct: "7" },
    ],
    medio: [
      { question: "Resolva a equação: 2x + 5 = 15.", answers: ["x = 2", "x = 5", "x = 7", "x = 10"], correct: "x = 5" },
      { question: "Qual é o valor de 1/3 + 1/6?", answers: ["1/6", "1/2", "2/3", "1"], correct: "1/2" },
      { question: "Uma loja está oferecendo um desconto de 20% em um produto que custa R$ 150. Qual é o valor final do produto?", answers: ["R$ 100", "R$ 120", "R$ 130", "R$ 140"], correct: "R$ 120" },
      { question: "Qual é a área de um triângulo com base de 10 cm e altura de 5 cm?", answers: ["20 cm²", "25 cm²", "30 cm²", "50 cm²"], correct: "25 cm²" },
      { question: "Qual é a fórmula para o perímetro de um círculo?", answers: ["πr²", "2πr", "πd", "d/2"], correct: "2πr" },
    ],
    dificil: [
      { question: "Qual é a solução da equação quadrática x² - 5x + 6 = 0?", answers: ["x = 1 ou x = 2", "x = 2 ou x = 3", "x = 3 ou x = 4", "x = 4 ou x = 5"], correct: "x = 2 ou x = 3" },
      { question: "Seja a função f(x) = 2x³ - x + 4. Qual é o valor de f(2)?", answers: ["10", "12", "14", "16"], correct: "14" },
      { question: "Qual é a soma dos ângulos internos de um polígono com 8 lados (octógono)?", answers: ["720°", "900°", "1080°", "1260°"], correct: "1080°" },
      { question: "Encontre o valor da derivada de f(x) = x² + 3x - 5 no ponto x = 1.", answers: ["3", "4", "5", "6"], correct: "5" },
      { question: "Qual é a solução do sistema de equações lineares: 2x + y = 5 e 3x - y = 4?", answers: ["x = 1, y = 2", "x = 2, y = 1", "x = 3, y = -1", "x = 4, y = 0"], correct: "x = 2, y = 1" },
    ],
};

let currentLevel = '';
let currentQuestionIndex = 0;
let correctAnswers = 0;

function startQuiz(level) {
  currentLevel = level;
  currentQuestionIndex = 0;
  correctAnswers = 0;

  // Esconder o contêiner de nível e habilitar apenas o nível atual
  document.getElementById('level-container').style.display = 'none';
  document.getElementById('quiz').style.display = 'block';
  
  loadQuestion();
}

function loadQuestion() {
  const questionObj = quizQuestions[currentLevel][currentQuestionIndex];
  document.getElementById('question').innerText = questionObj.question;

  const answerButtons = document.getElementById('answer-buttons');
  answerButtons.innerHTML = '';

  questionObj.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer;
    button.classList.add('answer-btn');
    button.onclick = () => selectAnswer(answer, questionObj.correct);
    answerButtons.appendChild(button);
  });

  document.getElementById('next-btn').style.display = 'none';
  document.getElementById('feedback').innerHTML = '';
}

function selectAnswer(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
      correctAnswers++;
      document.getElementById('feedback').innerHTML = `<p class="correct">Resposta correta!</p>`;
  } else {
      document.getElementById('feedback').innerHTML = `<p class="wrong">Resposta errada! Quiz reiniciado.</p>`;
      setTimeout(() => restartQuiz(), 2000);
      return;
  }

  document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions[currentLevel].length) {
      loadQuestion();
  } else {
      if (correctAnswers === quizQuestions[currentLevel].length) {
          advanceToNextLevel();
      } else {
          showResults();
      }
  }
}

function showResults() {
  document.getElementById('quiz').innerHTML = `
      <h2>Você acertou ${correctAnswers} de 5 perguntas!</h2>
      <button class="level-btn" onclick="restartQuiz()">Recomeçar</button>
  `;
}

function restartQuiz() {
  document.getElementById('quiz').style.display = 'none';
  document.getElementById('level-container').style.display = 'block';
  resetLevelButtons();
}

function resetLevelButtons() {
  document.querySelectorAll('.level-btn').forEach(button => button.disabled = true);
  document.getElementById('btn-facil').disabled = false; // O botão Fácil deve sempre estar habilitado

  // Os botões dos outros níveis devem ser desabilitados por padrão
  document.getElementById('btn-medio').disabled = true;
  document.getElementById('btn-dificil').disabled = true;
}

function advanceToNextLevel() {
  const quizContainer = document.getElementById('quiz');
  const levelContainer = document.getElementById('level-container');

  // Esconder o quiz atual e exibir o contêiner de nível
  quizContainer.style.display = 'none';
  levelContainer.style.display = 'block';

  // Habilitar o próximo nível baseado no nível atual
  if (currentLevel === 'facil') {
      document.getElementById('btn-medio').disabled = false;
      alert('Parabéns! Você avançou para o nível Médio.');
  } else if (currentLevel === 'medio') {
      document.getElementById('btn-dificil').disabled = false;
      alert('Parabéns! Você avançou para o nível Difícil.');
  } else {
      alert('Parabéns! Você concluiu o quiz.');
      // Recomeçar ou finalizar
      document.getElementById('btn-facil').disabled = false; // Habilita o botão Fácil novamente
  }
}

// Inicialização
resetLevelButtons();
