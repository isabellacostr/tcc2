const quizQuestions = {
    facil: [
        { question: "Qual é a tradução de 'cachorro' para o inglês?", answers: ["Cat", "Dog", "Mouse", "Bird"], correct: "Dog" },
        { question: "Qual dessas frases está correta?", answers: ["She goes to school every day.", "She go to school every day.", "She going to school every day.", "She gone to school every day."], correct: "She goes to school every day." },
        { question: "Como se diz 'obrigado' em inglês?", answers: ["Hello", "Goodbye", "Thank you", "Please"], correct: "Thank you" },
        { question: "Qual é o passado do verbo 'to be'?", answers: ["Is", "Am", "Are", "Was"], correct: "Was" },
        { question: "Complete a frase: 'I _ a book.'", answers: ["reads", "read", "reading", "readed"], correct: "read" },
    ],
    medio: [
        { question: "Qual é o sinônimo de 'happy'?", answers: ["Sad", "Angry", "Joyful", "Bored"], correct: "Joyful" },
        { question: "Qual é a forma correta do verbo na frase: 'If it _ rain, we will stay inside.'?", answers: ["rains", "rain", "raining", "rained"], correct: "rains" },
        { question: "Complete a frase: 'She has lived in London _ five years.'", answers: ["in", "since", "for", "during"], correct: "for" },
        { question: "Qual é o plural de 'child'?", answers: ["Childs", "Childrens", "Children", "Child"], correct: "Children" },
        { question: "Qual é a forma correta da frase: 'He didn't _ to the party.'?", answers: ["gone", "went", "go", "going"], correct: "go" },
    ],
    dificil: [
        { question: "Qual é o significado da expressão 'to beat around the bush'?", answers: ["Ir direto ao ponto", "Evitar o assunto", "Falar abertamente", "Interromper"], correct: "Evitar o assunto" },
        { question: "Complete a frase: 'Had I known you were coming, I _ a cake.'", answers: ["bake", "baked", "would bake", "would have baked"], correct: "would have baked" },
        { question: "Qual é o erro na frase: 'She suggested to go to the cinema.'?", answers: ["Suggested", "To go", "The cinema", "Não há erro"], correct: "To go" },
        { question: "Qual é a diferença de significado entre 'affect' e 'effect'?", answers: ["Affect é um verbo; effect é um substantivo.", "Affect é um substantivo; effect é um verbo.", "Ambos significam a mesma coisa.", "Effect é um adjetivo; affect é um substantivo."], correct: "Affect é um verbo; effect é um substantivo." },
        { question: "Qual é a forma correta do verbo na frase: 'Neither of the answers _ correct.'?", answers: ["are", "is", "were", "be"], correct: "is" },
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
