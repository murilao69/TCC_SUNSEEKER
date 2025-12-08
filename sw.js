// este arquivo é o Service Worker, ele serve para gerenciar o cache de recursos da aplicação
// e otimizar o desempenho do carregamento do site
const CACHE_NAME = "sunseeker-v16";//Não esquecer de mudar as versão antes de cada commit
const FILES_TO_CACHE = [
  "/TCC_SUNSEEKER/",
  "/TCC_SUNSEEKER/index.html",
  "/TCC_SUNSEEKER/inicio.html",
  "/TCC_SUNSEEKER/login.html",
  "/TCC_SUNSEEKER/cadastro.html",
  "/TCC_SUNSEEKER/sobre.html",
  "/TCC_SUNSEEKER/recuperar-senha.html",
  "/TCC_SUNSEEKER/solucoes.html",
  "/TCC_SUNSEEKER/produtos.html",
  "/TCC_SUNSEEKER/simulador.html",
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
  "/TCC_SUNSEEKER/imagens/solar_panel.png"
];


// Instala e guarda arquivos no cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .catch(err => console.warn("Algum arquivo não foi cacheado:", err))
  );
  self.skipWaiting();
});

// Ativa e remove caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)
      )
    )
  );
  self.clients.claim();
});

// Busca no cache primeiro, depois na rede
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchRes => {
        return caches.open(CACHE_NAME).then(cache => {
          // Atualiza o cache em background
          cache.put(event.request, fetchRes.clone());
          return fetchRes;
        });
      });
    }).catch(() => {
      // Opcional: aqui dá pra retornar uma página offline padrão
      return caches.match("/TCC_SUNSEEKER/index.html");
    })
  );
});
