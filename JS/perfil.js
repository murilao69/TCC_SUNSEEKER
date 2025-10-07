document.addEventListener('DOMContentLoaded', () => {
    const auth = firebase.auth();

    const modalProfilePic = document.getElementById('modalProfilePic');
    const modalUserName = document.getElementById('modalUserName');
    const modalUserEmail = document.getElementById('modalUserEmail');
    const userNameDisplay = document.getElementById('userNameDisplay'); // Para a página inicial

    // Observador do estado de autenticação
    auth.onAuthStateChanged(user => {
        if (user) {
            // Usuário está logado
            console.log("Usuário logado:", user.displayName, user.email, user.photoURL);

            const displayName = user.displayName || 'Usuário';

            // Atualiza o nome do usuário no modal
            if (modalUserName) {
                modalUserName.textContent = displayName;
            }

            // Atualiza o e-mail do usuário no modal
            if (modalUserEmail) {
                modalUserEmail.textContent = user.email;
            }

            // Atualiza a foto de perfil no modal
            if (modalProfilePic) {
                if (user.photoURL) {
                    modalProfilePic.src = user.photoURL;
                } else {
                    // Se não houver foto, usa um avatar padrão
                    modalProfilePic.src = 'imagens/avatar_padrao.png'; 
                }
            }

            // Atualiza o nome do usuário no título do Dashboard (página inicial)
            if (userNameDisplay) {
                userNameDisplay.textContent = displayName.split(' ')[0]; // Exibe apenas o primeiro nome
            }

        } else {
            // Usuário não está logado
            console.log("Nenhum usuário logado.");
            // Opcional: redirecionar para a página de login se o usuário não estiver logado
            // e tentar acessar uma página protegida.
            // if (!window.location.pathname.endsWith('login.html') && !window.location.pathname.endsWith('cadastro.html')) {
            //     window.location.href = 'login.html';
            // }
        }
    });

    // Adiciona o evento de logout ao botão dentro do modal
    const modalLogoutButton = document.getElementById('modalLogoutButton');
    if (modalLogoutButton) {
        modalLogoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            // Fecha o modal antes de deslogar
            const userModal = bootstrap.Modal.getInstance(document.getElementById('userProfileModal'));
            userModal.hide();
            logout(); // Chama a função de logout que já existe em cabeçalho.js
        });
    }
});