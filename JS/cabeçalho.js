   
        // Efeito de scroll no cabeçalho
        window.addEventListener('scroll', function() {
            const header = document.getElementById('mainHeader');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });



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
// ...existing code...

// =========================
// INTEGRAÇÃO DO SWEETALERT2
// =========================
if (typeof Swal === 'undefined') {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    script.onload = () => {
        console.log('SweetAlert2 carregado!');
    };
    document.head.appendChild(script);
}

// ...existing code...
function logout() {
    // Usar SweetAlert para confirmação
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: 'Sair da conta?',
            text: 'Tem certeza que deseja sair da sua conta?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, sair',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                realizarLogout();
            }
        });
    } else {
        // Fallback para confirm padrão
        if (confirm('Tem certeza que deseja sair da sua conta?')) {
            realizarLogout();
        }
    }
}

function realizarLogout() {
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
    // Não fecha o menu mobile aqui

    // Redirecionar para a página de login
    window.location.href = 'login.html';
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


//elemento de registro do Service Worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/TCC_SUNSEEKER/sw.js")
      .then(() => console.log("Service Worker registrado com sucesso!"))
      .catch(err => console.log("Falha ao registrar SW:", err));
  }
