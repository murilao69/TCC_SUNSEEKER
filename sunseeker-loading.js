/**
 * SUNSEEKER Loading Component
 * Componente de loading reutilizável com a logo SUNSEEKER
 */

class SunseekerLoading {
    constructor(options = {}) {
        this.options = {
            duration: options.duration || 3000,
            logoPath: options.logoPath || 'logo_nitida.png',
            autoHide: options.autoHide !== false,
            fadeOutDuration: options.fadeOutDuration || 500,
            ...options
        };
        
        this.loadingElement = null;
        this.isVisible = false;
    }

    /**
     * Cria o HTML do componente de loading
     */
    createLoadingHTML() {
        return `
            <div class="sunseeker-logo-container">
                <img src="${this.options.logoPath}" alt="SUNSEEKER Logo" class="sunseeker-logo">
            </div>
            
            <div class="sunseeker-loading-text">SUNSEEKER</div>
            
            <div class="sunseeker-loading-spinner">
                <div class="sunseeker-spinner-ring"></div>
                <div class="sunseeker-spinner-ring"></div>
                <div class="sunseeker-spinner-ring"></div>
            </div>
            
            <div class="sunseeker-loading-progress">
                <div class="sunseeker-progress-bar"></div>
            </div>
            
            <div class="sunseeker-loading-dots">
                <div class="sunseeker-dot"></div>
                <div class="sunseeker-dot"></div>
                <div class="sunseeker-dot"></div>
            </div>
        `;
    }

    /**
     * Mostra o loading
     */
    show() {
        if (this.isVisible) return;

        // Cria o elemento se não existir
        if (!this.loadingElement) {
            this.loadingElement = document.createElement('div');
            this.loadingElement.className = 'sunseeker-loading-overlay';
            this.loadingElement.innerHTML = this.createLoadingHTML();
            document.body.appendChild(this.loadingElement);
        }

        // Mostra o loading
        this.loadingElement.style.display = 'flex';
        this.loadingElement.classList.remove('fade-out');
        this.isVisible = true;

        // Auto-hide se configurado
        if (this.options.autoHide) {
            setTimeout(() => {
                this.hide();
            }, this.options.duration);
        }
    }

    /**
     * Esconde o loading
     */
    hide() {
        if (!this.isVisible || !this.loadingElement) return;

        this.loadingElement.classList.add('fade-out');
        this.isVisible = false;

        setTimeout(() => {
            if (this.loadingElement) {
                this.loadingElement.style.display = 'none';
            }
        }, this.options.fadeOutDuration);
    }

    /**
     * Remove o loading do DOM
     */
    destroy() {
        if (this.loadingElement) {
            this.loadingElement.remove();
            this.loadingElement = null;
            this.isVisible = false;
        }
    }

    /**
     * Verifica se o loading está visível
     */
    isShowing() {
        return this.isVisible;
    }
}

/**
 * Função utilitária para criar e mostrar rapidamente um loading
 */
function showSunseekerLoading(options = {}) {
    const loading = new SunseekerLoading(options);
    loading.show();
    return loading;
}

/**
 * Inicialização automática quando a página carrega
 */
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se existe um elemento com ID 'sunseeker-loading-auto'
    const autoLoadingElement = document.getElementById('sunseeker-loading-auto');
    if (autoLoadingElement) {
        const loading = new SunseekerLoading();
        loading.show();
        
        // Esconde quando a página termina de carregar
        window.addEventListener('load', function() {
            setTimeout(() => {
                loading.hide();
            }, 1000);
        });
    }
});

// Exporta para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SunseekerLoading, showSunseekerLoading };
}

// Disponibiliza globalmente
if (typeof window !== 'undefined') {
    window.SunseekerLoading = SunseekerLoading;
    window.showSunseekerLoading = showSunseekerLoading;
}

