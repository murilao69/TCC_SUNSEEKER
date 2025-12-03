document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookieBtn = document.getElementById('acceptCookieBtn');

    // Se o consentimento ainda não foi dado, mostra o banner
    if (!localStorage.getItem('cookieConsent')) {
        // Usamos um pequeno timeout para a animação de entrada funcionar corretamente
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 500);
    }

    // Quando o usuário clica em aceitar
    acceptCookieBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'true');
        cookieBanner.classList.remove('show');
    });
});