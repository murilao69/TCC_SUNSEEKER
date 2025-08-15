// este arquivo é o Service Worker, ele serve para gerenciar o cache de recursos da aplicação
// e otimizar o desempenho do carregamento do site

const CACHE_NAME = "sunseeker-v1"; // Mude a versão quando atualizar
const FILES_TO_CACHE = [
  "/TCC_SUNSEEKER/",            // Página inicial
  "/TCC_SUNSEEKER/index.html",
   "/TCC_SUNSEEKER/inicio.html",
  "/TCC_SUNSEEKER/style.css",
  "/TCC_SUNSEEKER/CSS/index.css",
  "/TCC_SUNSEEKER/CSS/loading.css",
  "/TCC_SUNSEEKER/CSS/mobile.css",
  "/TCC_SUNSEEKER/CSS/pagina_padrao.css",
  "/TCC_SUNSEEKER/JS/loading.js",
  "/TCC_SUNSEEKER/JS/cabeçalho.js",
  "/TCC_SUNSEEKER/imagens/logo.png",
  "/TCC_SUNSEEKER/imagens/index_foto.jpg",
  "/TCC_SUNSEEKER/imagens/painelSolar.jpg",
  "/TCC_SUNSEEKER/imagens/solar_panel.png",

];

// Instala e guarda arquivos no cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Ativa e remove caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Busca no cache primeiro, depois na rede
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
