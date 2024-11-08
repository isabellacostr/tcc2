const quizQuestions = {
    facil: [
      { question: "Qual é a unidade de medida da força no Sistema Internacional (SI)?", answers: ["Joule", "Newton", "Pascal", "Watt"], correct: "Newton" },
      { question: "Qual é a fórmula para calcular a velocidade?", answers: ["A = F / m", "V = d / t", "F = m × a", "P = m × g"], correct: "V = d / t" },
      { question: "O que é gravidade?", answers: ["A força que atrai objetos para o centro da Terra.", "A força que empurra os objetos para longe da Terra.", "A força que mantém os elétrons em órbita ao redor do núcleo.", "A força responsável pela resistência do ar."], correct: "A força que atrai objetos para o centro da Terra." },
      { question: "Qual é a fórmula da energia cinética?", answers: ["E = mc²", "E = 1/2 mv²", "E = Fd", "E = mgh"], correct: "E = 1/2 mv²" },
      { question: "Qual é o estado da matéria em que as partículas estão mais próximas umas das outras?", answers: ["Sólido", "Líquido", "Gasoso", "Plasma"], correct: "Sólido" },
    ],
    medio: [
      { question: "Qual é a lei de Newton que afirma que um objeto em repouso permanece em repouso a menos que uma força externa atue sobre ele?", answers: ["Primeira Lei", "Segunda Lei", "Terceira Lei", "Lei da Gravitação Universal"], correct: "Primeira Lei" },
      { question: "O que é trabalho em física?", answers: ["A quantidade de movimento de um corpo.", "A energia transferida quando uma força é aplicada sobre um objeto ao longo de uma distância.", "A energia armazenada em um objeto.", "A força necessária para mover um objeto."], correct: "A energia transferida quando uma força é aplicada sobre um objeto ao longo de uma distância." },
      { question: "Qual é a fórmula para calcular a pressão?", answers: ["P = F × d", "P = F / A", "P = m × g", "P = E / t"], correct: "P = F / A" },
      { question: "Qual é a unidade de medida da energia?", answers: ["Joule", "Newton", "Watt", "Pascal"], correct: "Joule" },
      { question: "O que acontece com a pressão de um gás quando a temperatura aumenta, mantendo o volume constante?", answers: ["Aumenta", "Diminui", "Permanece constante", "Não é possível determinar"], correct: "Aumenta" },
    ],
    dificil: [
      { question: "Qual é a equação da conservação da energia mecânica?", answers: ["E = U + K", "E = F × d", "E = mgh", "E = P × t"], correct: "E = U + K" },
      { question: "O que é um sistema isolado?", answers: ["Um sistema que não troca energia com o ambiente.", "Um sistema que troca calor com o ambiente.", "Um sistema que está em equilíbrio térmico.", "Um sistema que realiza trabalho."], correct: "Um sistema que não troca energia com o ambiente." },
      { question: "Qual é a relação entre a frequência e o período de uma onda?", answers: ["f = 1/T", "T = 1/f", "f = T²", "T = f²"], correct: "f = 1/T" },
      { question: "Qual é a fórmula da lei de Ohm?", answers: ["V = I × R", "P = I / R", "R = V / I", "P = V × I"], correct: "V = I × R" },
      { question: "O que afirma a Teoria da Relatividade de Einstein sobre a velocidade da luz?", answers: ["É constante e não depende do movimento do observador.", "Pode ser ultrapassada por objetos em movimento.", "Diminui com a gravidade.", "Aumenta com a velocidade do observador."], correct: "É constante e não depende do movimento do observador." },
    ],
  };

  let currentLevel = '';
let currentQuestionIndex = 0;
let correctAnswers = 0;

function startQuiz(level) {
  currentLevel = level;
  currentQuestionIndex = 0;
  correctAnswers = 0;

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
  document.getElementById('btn-facil').disabled = false;

  document.getElementById('btn-medio').disabled = true;
  document.getElementById('btn-dificil').disabled = true;
}

function advanceToNextLevel() {
  const quizContainer = document.getElementById('quiz');
  const levelContainer = document.getElementById('level-container');

  quizContainer.style.display = 'none';
  levelContainer.style.display = 'block';

  if (currentLevel === 'facil') {
      document.getElementById('btn-medio').disabled = false;
      alert('Parabéns! Você avançou para o nível Médio.');
  } else if (currentLevel === 'medio') {
      document.getElementById('btn-dificil').disabled = false;
      alert('Parabéns! Você avançou para o nível Difícil.');
  } else {
      alert('Parabéns! Você concluiu o quiz.');
      document.getElementById('btn-facil').disabled = false;
  }
}

resetLevelButtons();
