const quizQuestions = {
    facil: [
      { question: "Em que ano o Brasil declarou sua independência de Portugal?", answers: ["1822", "1889", "1500", "1808"], correct: "1822" },
      { question: "Quem foi o primeiro presidente dos Estados Unidos?", answers: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "Theodore Roosevelt"], correct: "George Washington" },
      { question: "O que foi a Revolução Industrial?", answers: ["Um conflito militar", "Um período de mudanças tecnológicas", "Um movimento cultural", "Uma expansão territorial"], correct: "Um período de grandes mudanças tecnológicas e produtivas nos séculos XVIII e XIX" },
      { question: "Quem foi o responsável pela unificação da Itália em 1870?", answers: ["Napoleão Bonaparte", "Giuseppe Garibaldi", "Victor Emmanuel II", "Giuseppe Mazzini"], correct: "Giuseppe Garibaldi" },
      { question: "Qual civilização construiu as pirâmides de Gizé?", answers: ["Maias", "Romanos", "Egípcios", "Babilônios"], correct: "Egípcios" }
    ],
    medio: [
      { question: "O Tratado de Versalhes, assinado após a Primeira Guerra Mundial, impôs duras sanções a qual país?", answers: ["Rússia", "Inglaterra", "Alemanha", "França"], correct: "Alemanha" },
      { question: "Qual foi o evento que marcou o início da Segunda Guerra Mundial em 1939?", answers: ["A invasão da Polônia pela Alemanha", "O ataque a Pearl Harbor", "A queda de Berlim", "A Revolução Russa"], correct: "A invasão da Polônia pela Alemanha" },
      { question: "Quem foi o líder da Revolução Russa de 1917?", answers: ["Leon Trotsky", "Josef Stalin", "Vladimir Lenin", "Nikita Khrushchev"], correct: "Vladimir Lenin" },
      { question: "Qual foi o marco inicial da Idade Média?", answers: ["A queda do Império Romano do Ocidente", "A Revolução Industrial", "A invasão da América", "O Renascimento"], correct: "A queda do Império Romano do Ocidente" },
      { question: "Qual foi a principal causa da Revolução Francesa de 1789?", answers: ["A crise financeira e os altos impostos", "A invasão de Napoleão", "O avanço do comunismo", "A fome e a peste negra"], correct: "A crise financeira e os altos impostos" }
    ],
    dificil: [
      { question: "Qual foi o impacto das reformas protestantes no cenário político e religioso da Europa no século XVI?", answers: ["Unificou a Europa sob o catolicismo", "Levou ao absolutismo monárquico", "Dividiu a Europa entre católicos e protestantes", "Fortaleceu o Sacro Império Romano-Germânico"], correct: "Dividiu a Europa entre católicos e protestantes, levando a guerras religiosas e mudanças políticas" },
      { question: "Como o Tratado de Tordesilhas, de 1494, afetou a colonização da América?", answers: ["Criou uma aliança entre Portugal e Espanha", "Dividiu a América entre Portugal e França", "Dividiu o continente sul-americano entre Portugal e Espanha", "Deu o controle total do continente à Espanha"], correct: "Dividiu o continente sul-americano entre Portugal e Espanha, estabelecendo as fronteiras coloniais" },
      { question: "Qual foi a importância da Guerra dos Trinta Anos (1618-1648) para a geopolítica europeia?", answers: ["Fortaleceu o Sacro Império Romano-Germânico", "Reforçou a aliança entre Inglaterra e França", "Enfraqueceu a influência do Sacro Império Romano-Germânico", "Promoveu a união da Alemanha"], correct: "Enfraqueceu a influência do Sacro Império Romano-Germânico e reforçou a soberania dos estados-nação" },
      { question: "Qual foi o objetivo da Doutrina Truman, lançada após a Segunda Guerra Mundial?", answers: ["Expandir o comunismo", "Conter a expansão do comunismo", "Garantir recursos petrolíferos", "Isolar os Estados Unidos"], correct: "Conter a expansão do comunismo e prestar ajuda a países que enfrentavam pressões comunistas" },
      { question: "Quais foram os principais fatores que contribuíram para a crise do Império Romano no século III d.C.?", answers: ["A invasão de bárbaros, crises econômicas e a corrupção interna", "O crescimento do cristianismo e a perseguição religiosa", "A aliança com o Império Bizantino", "A unificação política e militar"], correct: "A invasão de bárbaros, crises econômicas e a corrupção interna" }
    ]
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
