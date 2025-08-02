# SUNSEEKER Loading Component

Um componente de loading elegante e responsivo com a logo SUNSEEKER, criado com HTML, CSS e JavaScript puro.

## Características

- ✨ Animações suaves e profissionais
- 📱 Totalmente responsivo
- 🎨 Design moderno com gradientes
- ⚡ Fácil de integrar
- 🔧 Altamente personalizável
- 🚀 Sem dependências externas

## Arquivos Incluídos

- `loading-component.html` - Exemplo completo standalone
- `sunseeker-loading.css` - Estilos do componente
- `sunseeker-loading.js` - Lógica JavaScript
- `exemplo-uso.html` - Demonstração de uso
- `logo_nitida.png` - Logo SUNSEEKER em alta qualidade

## Instalação

1. Baixe os arquivos do componente
2. Inclua os arquivos CSS e JS no seu projeto:

```html
<link rel="stylesheet" href="sunseeker-loading.css">
<script src="sunseeker-loading.js"></script>
```

## Uso Básico

### Método 1: Loading Automático

Adicione este elemento ao seu HTML para loading automático:

```html
<div id="sunseeker-loading-auto"></div>
```

### Método 2: Controle Manual

```javascript
// Mostrar loading simples
const loading = showSunseekerLoading();

// Esconder manualmente
loading.hide();
```

### Método 3: Instância Personalizada

```javascript
const loading = new SunseekerLoading({
    duration: 5000,           // 5 segundos
    logoPath: 'minha-logo.png',
    autoHide: true,
    fadeOutDuration: 800
});

loading.show();
```

## Opções de Configuração

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `duration` | number | 3000 | Duração em milissegundos |
| `logoPath` | string | 'logo_nitida.png' | Caminho para a logo |
| `autoHide` | boolean | true | Esconder automaticamente |
| `fadeOutDuration` | number | 500 | Duração do fade out |

## Métodos Disponíveis

### `show()`
Mostra o loading na tela.

### `hide()`
Esconde o loading com animação de fade out.

### `destroy()`
Remove completamente o loading do DOM.

### `isShowing()`
Retorna `true` se o loading estiver visível.

## Personalização

### Cores e Gradientes

Edite o arquivo `sunseeker-loading.css` para personalizar as cores:

```css
.sunseeker-loading-overlay {
    background: linear-gradient(135deg, #sua-cor-1, #sua-cor-2);
}
```

### Tamanho da Logo

```css
.sunseeker-logo {
    width: 150px;  /* Ajuste conforme necessário */
    height: 150px;
}
```

### Velocidade das Animações

```css
.sunseeker-logo {
    animation-duration: 3s; /* Mais lento */
}
```

## Responsividade

O componente é totalmente responsivo e se adapta automaticamente a diferentes tamanhos de tela:

- Desktop: Logo 120px
- Mobile: Logo 80px
- Texto e elementos proporcionais

## Compatibilidade

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers

## Exemplos de Integração

### React

```jsx
useEffect(() => {
    const loading = new SunseekerLoading();
    loading.show();
    
    // Simular carregamento
    setTimeout(() => {
        loading.hide();
    }, 3000);
    
    return () => loading.destroy();
}, []);
```

### Vue.js

```javascript
mounted() {
    this.loading = new SunseekerLoading();
    this.loading.show();
},
beforeDestroy() {
    if (this.loading) {
        this.loading.destroy();
    }
}
```

### Angular

```typescript
ngOnInit() {
    this.loading = new (window as any).SunseekerLoading();
    this.loading.show();
}

ngOnDestroy() {
    if (this.loading) {
        this.loading.destroy();
    }
}
```

## Licença

Este componente foi criado especificamente para o projeto SUNSEEKER.

## Suporte

Para dúvidas ou sugestões sobre o componente, entre em contato com a equipe de desenvolvimento.

