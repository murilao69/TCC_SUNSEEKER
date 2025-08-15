//indow.onload = function() {
//   const loadingScreen = document.getElementById("loading-screen");
//   loadingScreen.classList.add("hide");
//;
//

// Simulação do progresso até o carregamento real
let progress = 0;
let fakeLoading = setInterval(() => {
    if (progress < 90) { // Vai até 90% antes de esperar o load real
        progress++;
        updateProgress(progress);
    }
}, 30);

// Quando a página terminar de carregar tudo (imagens, scripts, etc.)
window.onload = function() {
    clearInterval(fakeLoading);
    let realProgress = progress;

    let finishInterval = setInterval(() => {
        if (realProgress >= 100) {
            clearInterval(finishInterval);
            document.getElementById("loading-screen").classList.add("hide");
        } else {
            realProgress++;
            updateProgress(realProgress);
        }
    }, 20);
};

// Atualiza a barra e a porcentagem
function updateProgress(value) {
    document.querySelector(".loading-progress").style.width = value + "%";
    document.getElementById("loading-percent").innerText = value + "%";
}

//elemento de registro do Service Worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/TCC_SUNSEEKER/sw.js")
      .then(() => console.log("Service Worker registrado com sucesso!"))
      .catch(err => console.log("Falha ao registrar SW:", err));
  }