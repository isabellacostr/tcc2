const quizQuestions = {
    facil: [
      { question: "Qual é o maior continente em termos de área?", answers: ["África", "América do Norte", " Ásia", "Europa"], correct: "Adjetivo" },
      { question: "Qual é o plural de 'cão'?", answers: ["Cãos", "Cães", "Cões", "Cãoses"], correct: "Cães" },
      { question: "Qual é o sujeito da frase 'O gato dorme na cadeira'?", answers: ["Gato", "Dorme", "Na cadeira", "O"], correct: "Gato" },
      { question: "Qual a forma correta: 'mau' ou 'mal', em 'Ele é um __ aluno'?", answers: ["Mau", "Mal"], correct: "Mau" },
      { question: "Qual o sinônimo de 'rápido'?", answers: ["Devagar", "Veloz", "Lento", "Triste"], correct: "Veloz" },
    ],
    medio: [
      { question: "Qual a função da vírgula na frase: 'João, venha aqui.'?", answers: ["Separar palavras", "Indicar pausa", "Vocativo", "Nenhuma"], correct: "Vocativo" },
      { question: "Qual a forma correta: 'Por que' ou 'Porque', em '_ você saiu tão cedo?'?", answers: ["Porque", "Por que"], correct: "Por que" },
      { question: "O que é uma oração subordinada adjetiva?", answers: ["Frase sem verbo", "Adjetivo de um sujeito", "Oração que qualifica o sujeito", "Oração sem sentido completo"], correct: "Oração que qualifica o sujeito" },
      { question: "Qual o antônimo de 'benevolente'?", answers: ["Malvado", "Benevolência", "Benigno", "Malevolente"], correct: "Malevolente" },
      { question: "O que é um verbo intransitivo?", answers: ["Verbo que exige complemento", "Verbo que não exige complemento", "Verbo reflexivo", "Verbo impessoal"], correct: "Verbo que não exige complemento" },
    ],
    dificil: [
      { question: "O que é uma oração subordinada substantiva completiva nominal?", answers: ["Complementa o sentido de um substantivo", "É uma frase completa", "É uma oração sem sujeito", "Oração subordinada de um adjetivo"], correct: "Complementa o sentido de um substantivo" },
      { question: "O que caracteriza a próclise?", answers: ["Pronome antes do verbo", "Pronome depois do verbo", "Pronome no meio do verbo", "Verbo sem pronome"], correct: "Pronome antes do verbo" },
      { question: "O que é paronomásia?", answers: ["Figura de linguagem com palavras parecidas", "Palavras com sentido oposto", "Repetição de ideias", "Substituição de palavras"], correct: "Figura de linguagem com palavras parecidas" },
      { question: "Qual a função do hífen em palavras compostas?", answers: ["Indicar ligação entre elementos", "Separar sílabas", "Marcar pausa", "Separar orações"], correct: "Indicar ligação entre elementos" },
      { question: "O que é uma figura etimológica?", answers: ["Repetição de palavras de mesma raiz", "Palavras de origem desconhecida", "Palavras com a mesma etimologia", "Uso de palavras estrangeiras"], correct: "Repetição de palavras de mesma raiz" },
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
  