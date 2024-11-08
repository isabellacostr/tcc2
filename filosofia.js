const quizQuestions = {
    facil: [
      { question: "Quem é considerado o pai da filosofia ocidental?", answers: ["Platão", "Aristóteles", "Sócrates", "Descartes"], correct: "Sócrates" },
      { question: "Qual é a obra mais famosa de Platão?", answers: ["A Metafísica", "O Príncipe", "A República", "A Ética a Nicômaco"], correct: "A República" },
      { question: "O que é ética?", answers: ["O estudo da beleza.", "O estudo dos direitos.", "O estudo da moral e do comportamento humano.", "O estudo da lógica."], correct: "O estudo da moral e do comportamento humano." },
      { question: "O que significa a expressão 'penso, logo existo'?", answers: ["A dúvida é a base do conhecimento.", "A razão é a única forma de conhecimento.", "A existência é confirmada pelo ato de pensar.", "O pensamento é irrelevante para a existência."], correct: "A existência é confirmada pelo ato de pensar." },
      { question: "Qual filósofo é conhecido por sua teoria do contrato social?", answers: ["Kant", "Rousseau", "Hegel", "Nietzsche"], correct: "Rousseau" },
    ],
    medio: [
      { question: "Qual é a principal ideia do estoicismo?", answers: ["A busca pela felicidade através dos prazeres.", "A aceitação do destino e a prática da virtude.", "A liberdade total do indivíduo.", "A rejeição das emoções."], correct: "A aceitação do destino e a prática da virtude." },
      { question: "O que significa 'dualismo' na filosofia?", answers: ["A crença em um único princípio.", "A ideia de que existem duas realidades distintas, como corpo e alma.", "A negação da existência de qualquer realidade.", "A ideia de que tudo é relativo."], correct: "A ideia de que existem duas realidades distintas, como corpo e alma." },
      { question: "Qual é a crítica de Nietzsche à moralidade tradicional?", answers: ["A moralidade é absoluta.", "A moralidade é uma construção social que reprime o indivíduo.", "A moralidade é irrelevante.", "A moralidade é essencial para a sociedade."], correct: "A moralidade é uma construção social que reprime o indivíduo." },
      { question: "Quem desenvolveu a ideia do 'imperativo categórico'?", answers: ["Hegel", "Kant", "Mill", "Marx"], correct: "Kant" },
      { question: "Qual é a diferença entre empirismo e racionalismo?", answers: ["O empirismo valoriza a razão; o racionalismo valoriza a experiência sensorial.", "O empirismo valoriza a experiência sensorial; o racionalismo valoriza a razão.", "Ambos acreditam na razão como fonte do conhecimento.", "Ambos acreditam na experiência sensorial como fonte do conhecimento."], correct: "O empirismo valoriza a experiência sensorial; o racionalismo valoriza a razão." },
    ],
    dificil: [
      { question: "O que é a dialética hegeliana?", answers: ["Um método de argumentação lógica.", "Um processo de desenvolvimento de ideias através de teses, antiteses e sínteses.", "Um sistema de crenças.", "Uma crítica à metafísica."], correct: "Um processo de desenvolvimento de ideias através de teses, antiteses e sínteses." },
      { question: "Como Descartes define a dúvida metódica?", answers: ["Uma técnica para adquirir conhecimento.", "Um método para desacreditar a ciência.", "Um processo de questionar todas as crenças até encontrar uma certeza indubitável.", "Um meio de provar a existência de Deus."], correct: "Um processo de questionar todas as crenças até encontrar uma certeza indubitável." },
      { question: "Qual é o conceito de 'nihilismo' em Nietzsche?", answers: ["A crença em um propósito absoluto.", "A negação de todos os valores e significados.", "A busca por uma verdade universal.", "A valorização da moralidade tradicional."], correct: "A negação de todos os valores e significados." },
      { question: "O que é 'fenomenologia' segundo Edmund Husserl?", answers: ["O estudo das condições materiais da existência.", "A análise das estruturas da experiência consciente.", "Um método científico para investigar a realidade.", "Uma forma de empirismo radical."], correct: "A análise das estruturas da experiência consciente." },
      { question: "Qual é a visão de Thomas Hobbes sobre a natureza humana?", answers: ["Os humanos são essencialmente bons e cooperativos.", "Os humanos são egoístas e competitivos, necessitando de um governo forte.", "A natureza humana é indiferente à moralidade.", "Os humanos são naturalmente racionais e pacíficos."], correct: "Os humanos são egoístas e competitivos, necessitando de um governo forte." },
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
