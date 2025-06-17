   
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
