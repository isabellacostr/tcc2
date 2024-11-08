document.getElementById('reveal-more').addEventListener('click', function() {
    const descricao = document.getElementById('descricao');
    descricao.innerHTML += ' Com mais de 10 anos no mercado, nossa empresa está sempre atualizada com as tendências e as melhores práticas do setor. Nossa visão é tornar o mundo digital mais acessível para todos.';
    this.style.display = 'none';
});

// Captura todas as imagens da galeria
const fotos = document.querySelectorAll('.foto');
const modal = document.getElementById('modal');
const imgModal = document.getElementById('imgModal');
const closeModal = document.getElementById('closeModal');

// Adiciona evento de clique para abrir o modal com a imagem selecionada
fotos.forEach(foto => {
    foto.addEventListener('click', function() {
        modal.style.display = "block";
        imgModal.src = this.dataset.foto; // Define a imagem no modal
    });
});

// Fecha o modal quando o botão "x" é clicado
closeModal.addEventListener('click', function() {
    modal.style.display = "none";
});

// Fecha o modal se o usuário clicar fora da imagem
modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
