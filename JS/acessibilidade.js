// =========================
// ACESSIBILIDADE
// =========================
let currentFontSize = 1; // 1 = normal, >1 = aumentado, <1 = diminuído
let letterSpacingEnabled = false;

/**
 * Aumenta ou diminui o espaçamento entre letras no corpo do documento.
 * @param {boolean} increase - `true` para aumentar, `false` para diminuir/remover.
 */
function toggleLetterSpacing(increase) {
    if (increase) { 
        document.body.classList.add('increase-letter-spacing');
    } else {
        document.body.classList.remove('increase-letter-spacing');
    }



}

/**
 * Reseta as configurações de acessibilidade para o padrão.
 */
function resetAccessibility() {
    changeFontSize('reset');
    toggleLetterSpacing(false);
    letterSpacingEnabled = false;
}

/**
 * Lê o conteúdo principal da página em voz alta.
 */
function readPageAloud() {
    const synth = window.speechSynthesis;

    // Cancela qualquer fala anterior para evitar sobreposição
    if (synth.speaking) {
        synth.cancel();
        return;
    }

    // Seleciona o conteúdo principal da página para leitura
    const mainContent = document.querySelector('main');
    if (!mainContent) {
        console.error('Elemento <main> não encontrado para leitura.');
        return;
    }

    const textToRead = mainContent.innerText;

    if (textToRead.trim().length === 0) {
        console.warn('Nenhum texto para ler no elemento <main>.');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    
    // Opcional: Configura a voz e o idioma
    utterance.lang = 'pt-BR'; // Define o idioma para português do Brasil

    // Inicia a leitura
    synth.speak(utterance);
}

/**
 * Altera o tamanho da fonte do corpo do documento.
 * @param {'increase' | 'decrease' | 'reset'} action - A ação a ser executada.
 */
function changeFontSize(action) {
    const step = 0.1;
    if (action === 'increase') {
        currentFontSize = Math.min(currentFontSize + step, 3.0); // Limite máximo de 150%
    } else if (action === 'decrease') {
        currentFontSize = Math.max(currentFontSize - step, 0.5); // Limite mínimo de 70%
    } else { // reset
        currentFontSize = 1;
    }
    document.body.style.fontSize = `${currentFontSize}rem`;
}


// =========================
// ATALHOS DE TECLADO
// =========================
document.addEventListener('keydown', (event) => {
    // Verifica se a tecla Alt foi pressionada junto com + ou -
    if (event.altKey) {
        switch (event.key) {
            case '+':
            case '=': // O + geralmente é a mesma tecla do =
                event.preventDefault();
                changeFontSize('increase');
                break;
            case '-':
                event.preventDefault();
                changeFontSize('decrease');
                break;
            case '0':
                event.preventDefault();
                resetAccessibility();
                break;
            case 'l':
            case 'L':
                event.preventDefault();
                letterSpacingEnabled = !letterSpacingEnabled;
                toggleLetterSpacing(letterSpacingEnabled);
                break;
            case 'r':
            case 'R':
                event.preventDefault();
                readPageAloud();
                break;
        }
    }
});