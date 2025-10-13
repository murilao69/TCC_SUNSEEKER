// =========================
// ACESSIBILIDADE
// =========================

// Carrega as preferências do localStorage ou define valores padrão.
let accessibilitySettings = {
    fontSize: parseFloat(localStorage.getItem('accessibility-fontSize')) || 1,
    letterSpacing: localStorage.getItem('accessibility-letterSpacing') === 'true'
};

/**
 * Exibe uma notificação toast simples na tela.
 * @param {string} message - A mensagem a ser exibida.
 */
function showToast(message) {
    // Remove qualquer toast existente
    const existingToast = document.querySelector('.accessibility-toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'accessibility-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Adiciona estilos dinamicamente
    const style = document.createElement('style');
    style.innerHTML = `
        .accessibility-toast {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: #fff;
            padding: 10px 20px;
            border-radius: 25px;
            z-index: 1060; /* Acima da maioria dos elementos */
            opacity: 0;
            transition: opacity 0.5s ease;
        }
    `;
    document.head.appendChild(style);

    // Animação de fade in e fade out
    setTimeout(() => { toast.style.opacity = 1; }, 100);
    setTimeout(() => {
        toast.style.opacity = 0;
        setTimeout(() => {
            toast.remove();
            style.remove();
        }, 500);
    }, 2500);
}

/**
 * Aumenta ou diminui o espaçamento entre letras no corpo do documento.
 */
function toggleLetterSpacing() {
    accessibilitySettings.letterSpacing = !accessibilitySettings.letterSpacing;
    localStorage.setItem('accessibility-letterSpacing', accessibilitySettings.letterSpacing);
    applyLetterSpacing();
    showToast(`Espaçamento de letras ${accessibilitySettings.letterSpacing ? 'ativado' : 'desativado'}`);
}

function applyLetterSpacing() {
    if (accessibilitySettings.letterSpacing) {
        document.body.classList.add('increase-letter-spacing');
    } else {
        document.body.classList.remove('increase-letter-spacing');
    }
}

/**
 * Altera o tamanho da fonte do corpo do documento.
 * @param {'increase' | 'decrease' | 'reset'} action - A ação a ser executada.
 */
function changeFontSize(action) {
    const step = 0.1;
    let message = '';
    if (action === 'increase') {
        accessibilitySettings.fontSize = Math.min(accessibilitySettings.fontSize + step, 2.0); // Limite máximo de 2rem
        message = `Fonte aumentada: ${Math.round(accessibilitySettings.fontSize * 100)}%`;
    } else if (action === 'decrease') {
        accessibilitySettings.fontSize = Math.max(accessibilitySettings.fontSize - step, 0.7); // Limite mínimo de 0.7rem
        message = `Fonte diminuída: ${Math.round(accessibilitySettings.fontSize * 100)}%`;
    } else { // reset
        accessibilitySettings.fontSize = 1;
        message = 'Tamanho da fonte resetado';
    }
    localStorage.setItem('accessibility-fontSize', accessibilitySettings.fontSize);
    applyFontSize();
    showToast(message);
}

function applyFontSize() {
    document.body.style.fontSize = `${accessibilitySettings.fontSize}rem`;
}

/**
 * Reseta as configurações de acessibilidade para o padrão.
 */
function resetAccessibility() {
    changeFontSize('reset');
    
    if (accessibilitySettings.letterSpacing) {
        toggleLetterSpacing(); // Desativa se estiver ativo
    }
    showToast('Acessibilidade resetada');
}

/**
 * Lê o conteúdo principal da página em voz alta.
 */
function readPageAloud() {
    const synth = window.speechSynthesis;

    if (synth.speaking) {
        synth.cancel();
        showToast('Leitura interrompida');
        return;
    }

    const mainContent = document.querySelector('main');
    if (!mainContent || mainContent.innerText.trim().length === 0) {
        showToast('Nenhum conteúdo para ler.');
        return;
    }

    const textToRead = mainContent.innerText;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'pt-BR';
    synth.speak(utterance);
    showToast('Iniciando leitura da página...');
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
                toggleLetterSpacing();
                break;
            case 'r':
            case 'R':
                event.preventDefault();
                readPageAloud();
                break;
        }
    }
});

// Aplica as configurações salvas assim que o DOM for carregado.
document.addEventListener('DOMContentLoaded', () => {
    applyFontSize();
    applyLetterSpacing();
});