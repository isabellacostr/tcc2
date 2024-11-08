const quizQuestions = {
    facil: [
      { question: "Qual é o símbolo químico do oxigênio?", answers: ["O", "O₂", "Ox", "Oy"], correct: "O" },
      { question: "Qual é a fórmula química da água?", answers: ["H₂O₂", "H₂O", "O₂H", "HO"], correct: "H₂O" },
      { question: "Qual é o pH da água pura?", answers: ["7", "0", "14", "3"], correct: "7" },
      { question: "Qual é o gás mais abundante na atmosfera da Terra?", answers: ["Oxigênio", "Nitrogênio", "Dióxido de carbono", "Hidrogênio"], correct: "Nitrogênio" },
      { question: "Qual é o processo pelo qual a água se transforma em vapor?", answers: ["Condensação", "Sublimação", "Evaporação", "Congelação"], correct: "Evaporação" },
    ],
    medio: [
      { question: "Qual é a fórmula química do ácido clorídrico?", answers: ["HCl", "H₂Cl", "ClH", "HClO"], correct: "HCl" },
      { question: "Qual é a diferença entre uma reação endotérmica e uma exotérmica?", answers: ["Endotérmica libera calor; exotérmica absorve calor.", "Endotérmica absorve calor; exotérmica libera calor.", "Ambas liberam calor.", "Ambas absorvem calor."], correct: "Endotérmica absorve calor; exotérmica libera calor." },
      { question: "Qual é o número atômico do carbono?", answers: ["6", "12", "14", "8"], correct: "6" },
      { question: "Qual é a unidade de medida da pressão em química?", answers: ["Pascal", "Joule", "Celsius", "Liter"], correct: "Pascal" },
      { question: "O que é uma solução?", answers: ["Uma mistura homogênea de duas ou mais substâncias.", "Uma mistura heterogênea de duas ou mais substâncias.", "Um tipo de reação química.", "Um estado da matéria."], correct: "Uma mistura homogênea de duas ou mais substâncias." },
    ],
    dificil: [
      { question: "Qual é a equação da reação de neutralização entre ácido clorídrico e hidróxido de sódio?", answers: ["HCl + NaOH → NaCl + H₂O", "H₂O + NaCl → HCl + NaOH", "HCl + H₂O → NaOH + Cl₂", "HCl + Na → NaCl + H₂"], correct: "HCl + NaOH → NaCl + H₂O" },
      { question: "Qual é a regra de octeto?", answers: ["Os átomos devem ter 8 elétrons na camada mais externa para serem estáveis.", "Os átomos não podem ter mais de 8 prótons.", "Os átomos devem ter 8 nêutrons para serem estáveis.", "Os átomos precisam de 8 ligações covalentes."], correct: "Os átomos devem ter 8 elétrons na camada mais externa para serem estáveis." },
      { question: "O que são isômeros?", answers: ["Substâncias que têm a mesma fórmula química, mas estruturas diferentes.", "Substâncias com diferentes fórmulas químicas e estruturas.", "Substâncias que reagem de maneira semelhante.", "Substâncias que não reagem entre si."], correct: "Substâncias que têm a mesma fórmula química, mas estruturas diferentes." },
      { question: "Qual é o princípio da conservação da massa?", answers: ["A massa dos reagentes é sempre maior que a massa dos produtos.", "A massa dos produtos é igual à massa dos reagentes em uma reação química.", "A massa não pode ser criada ou destruída em uma reação.", "A massa dos produtos é sempre menor que a dos reagentes."], correct: "A massa dos produtos é igual à massa dos reagentes em uma reação química." },
      { question: "Qual é a estrutura química do benzeno?", answers: ["Um anel de seis carbonos com ligações simples.", "Um anel de seis carbonos com ligações duplas alternadas.", "Um anel de cinco carbonos.", "Uma cadeia linear de carbonos."], correct: "Um anel de seis carbonos com ligações duplas alternadas." },
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
