const quizQuestions = {
    facil: [
        { question: "O que é sociologia?", answers: ["O estudo das estrelas", "O estudo da sociedade e das interações sociais", "O estudo das leis", "O estudo dos fenômenos naturais"], correct: "O estudo da sociedade e das interações sociais" },
        { question: "Qual é o fundador da sociologia moderna?", answers: ["Karl Marx", "Emile Durkheim", "Max Weber", "Auguste Comte"], correct: "Auguste Comte" },
        { question: "O que é um grupo social?", answers: ["Um conjunto de pessoas com interesses e objetivos diferentes", "Um conjunto de pessoas que se comunicam e interagem regularmente", "Um conjunto de pessoas que vivem em locais diferentes", "Um conjunto de pessoas que não têm relação entre si"], correct: "Um conjunto de pessoas que se comunicam e interagem regularmente" },
        { question: "Qual é o principal objetivo da pesquisa sociológica?", answers: ["Descrever fenômenos naturais", "Compreender e explicar comportamentos e relações sociais", "Propor novas leis", "Encontrar soluções para problemas matemáticos"], correct: "Compreender e explicar comportamentos e relações sociais" },
        { question: "O que é cultura?", answers: ["O conhecimento científico", "A totalidade de comportamentos, costumes, valores e símbolos de um grupo social", "Apenas as tradições artísticas", "O sistema econômico de uma sociedade"], correct: "A totalidade de comportamentos, costumes, valores e símbolos de um grupo social" },
    ],
    medio: [
        { question: "Qual é a diferença entre sociedade e comunidade?", answers: ["Sociedade é um grupo pequeno; comunidade é um grupo grande", "Sociedade é uma rede de relações complexas; comunidade é um grupo mais íntimo e coeso", "Não há diferença; os termos são sinônimos", "Sociedade é uma organização formal; comunidade é informal"], correct: "Sociedade é uma rede de relações complexas; comunidade é um grupo mais íntimo e coeso" },
        { question: "O que é estratificação social?", answers: ["O processo de integração de grupos sociais", "A divisão da sociedade em classes ou camadas sociais", "A uniformidade cultural de uma sociedade", "A dinâmica das interações entre grupos sociais"], correct: "A divisão da sociedade em classes ou camadas sociais" },
        { question: "Qual é o conceito de anomia, segundo Durkheim?", answers: ["Um estado de estabilidade social", "Uma condição de desorganização social devido à falta de normas claras", "Um processo de integração social", "Uma forma de controle social"], correct: "Uma condição de desorganização social devido à falta de normas claras" },
        { question: "O que caracteriza uma cultura subalterna?", answers: ["Uma cultura dominante na sociedade", "Uma cultura que é imposta a outros grupos", "Uma cultura marginalizada ou oprimida por uma cultura dominante", "Uma cultura que não possui tradições"], correct: "Uma cultura marginalizada ou oprimida por uma cultura dominante" },
        { question: "Qual é a principal crítica ao funcionalismo na sociologia?", answers: ["Ele ignora as mudanças sociais", "Ele não considera a cultura", "Ele é muito complexo", "Ele é muito simplista"], correct: "Ele ignora as mudanças sociais" },
    ],
    dificil: [
        { question: "O que é capital social, segundo Pierre Bourdieu?", answers: ["A riqueza econômica de um indivíduo", "As relações e redes sociais que proporcionam apoio e recursos", "O conhecimento técnico e acadêmico de um indivíduo", "A habilidade de um indivíduo de se comunicar"], correct: "As relações e redes sociais que proporcionam apoio e recursos" },
        { question: "Como Karl Marx definiu a relação entre base econômica e superestrutura?", answers: ["A base econômica é irrelevante para a superestrutura", "A superestrutura é mais importante que a base econômica", "A base econômica influencia a superestrutura, que inclui cultura, política e ideologia", "Não há relação entre base econômica e superestrutura"], correct: "A base econômica influencia a superestrutura, que inclui cultura, política e ideologia" },
        { question: "Qual é o conceito de multiculturalismo?", answers: ["A ideia de que todas as culturas são iguais", "A promoção da homogeneização cultural", "O reconhecimento e a valorização da diversidade cultural dentro de uma sociedade", "A rejeição de culturas estrangeiras"], correct: "O reconhecimento e a valorização da diversidade cultural dentro de uma sociedade" },
        { question: "O que é um modelo de sociedade em rede?", answers: ["Uma sociedade que se organiza em torno de instituições tradicionais", "Uma sociedade caracterizada pela interconexão e interdependência entre indivíduos e grupos, especialmente na era digital", "Uma sociedade que é isolada e não interage com o exterior", "Uma sociedade que não possui normas sociais"], correct: "Uma sociedade caracterizada pela interconexão e interdependência entre indivíduos e grupos, especialmente na era digital" },
        { question: "O que significa a expressão 'teoria do habitus' de Pierre Bourdieu?", answers: ["A ideia de que a cultura é fixa e imutável", "A maneira como os indivíduos internalizam e reproduzem normas e práticas sociais em suas vidas cotidianas", "A teoria de que as sociedades são sempre conflituosas", "A noção de que a cultura é apenas um produto econômico"], correct: "A maneira como os indivíduos internalizam e reproduzem normas e práticas sociais em suas vidas cotidianas" },
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
