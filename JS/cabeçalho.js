   
        // Efeito de scroll no cabeçalho
        window.addEventListener('scroll', function() {
            const header = document.getElementById('mainHeader');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Fechar menu mobile ao clicar em um link
        document.querySelectorAll('.mobile-nav .nav-button').forEach(link => {
            link.addEventListener('click', () => {
                const mobileNav = document.getElementById('mobileNav');
                const bsCollapse = new bootstrap.Collapse(mobileNav, {
                    hide: true
                });
            });
        });
// Bloquear o botão de voltar do navegador
function bloquearBotaoVoltar() {
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.pushState(null, null, location.href);
        alert('Ação bloqueada: Você não pode voltar para a página anterior.');
    };
}

// Chamar a função ao carregar a página
document.addEventListener('DOMContentLoaded', bloquearBotaoVoltar);

// =========================
// FUNCIONALIDADE DE ALTERNÂNCIA DE TEMA
// =========================
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Aplicar o novo tema
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Salvar preferência no localStorage
    localStorage.setItem('theme', newTheme);
    
    // Atualizar ícones e textos (desktop)
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    
    // Atualizar ícones e textos (mobile)
    const themeIconMobile = document.getElementById('themeIconMobile');
    const themeTextMobile = document.getElementById('themeTextMobile');
    
    if (newTheme === 'dark') {
        // Modo escuro ativado
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun me-2';
        }
        if (themeText) {
            themeText.textContent = 'Modo Claro';
        }
        if (themeIconMobile) {
            themeIconMobile.className = 'fas fa-sun me-2';
        }
        if (themeTextMobile) {
            themeTextMobile.textContent = 'Modo Claro';
        }
    } else {
        // Modo claro ativado
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon me-2';
        }
        if (themeText) {
            themeText.textContent = 'Modo Escuro';
        }
        if (themeIconMobile) {
            themeIconMobile.className = 'fas fa-moon me-2';
        }
        if (themeTextMobile) {
            themeTextMobile.textContent = 'Modo Escuro';
        }
    }
}

// =========================
// FUNCIONALIDADE DE LOGOUT
// =========================
function logout() {
    // Confirmar logout
    if (confirm('Tem certeza que deseja sair da sua conta?')) {
        // Limpar dados do usuário (localStorage, sessionStorage, etc.)
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        sessionStorage.clear();
        
        // Se estiver usando Firebase Auth
        if (typeof firebase !== 'undefined' && firebase.auth) {
            firebase.auth().signOut().then(() => {
                console.log('Usuário deslogado do Firebase');
            }).catch((error) => {
                console.error('Erro ao deslogar do Firebase:', error);
            });
        }
        
        // Redirecionar para a página de login
        window.location.href = 'login.html';
    }
}

// =========================
// INICIALIZAÇÃO DO TEMA
// =========================
document.addEventListener('DOMContentLoaded', function() {
    // Carregar tema salvo ou usar tema claro como padrão
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Atualizar ícones e textos baseado no tema inicial
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    const themeIconMobile = document.getElementById('themeIconMobile');
    const themeTextMobile = document.getElementById('themeTextMobile');
    
    if (savedTheme === 'dark') {
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun me-2';
        }
        if (themeText) {
            themeText.textContent = 'Modo Claro';
        }
        if (themeIconMobile) {
            themeIconMobile.className = 'fas fa-sun me-2';
        }
        if (themeTextMobile) {
            themeTextMobile.textContent = 'Modo Claro';
        }
    } else {
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon me-2';
        }
        if (themeText) {
            themeText.textContent = 'Modo Escuro';
        }
        if (themeIconMobile) {
            themeIconMobile.className = 'fas fa-moon me-2';
        }
        if (themeTextMobile) {
            themeTextMobile.textContent = 'Modo Escuro';
        }
    }


});


