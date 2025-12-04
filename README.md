# Sunseeker - Dashboard de Monitoramento de Energia Solar

## Resumo das Modificações Realizadas

### 1. **Integração com Firebase Realtime Database**
- Adicionado script `firebase-database-compat.js` para acesso ao banco de dados em tempo real
- Inicialização da referência `database` para operações CRUD
- Configuração do Firebase já existente reutilizada (credenciais do projeto `sunseeker-11685`)

### 2. **Envio de Leituras do ESP32 ao Firebase**
- Criada função `writeReadingToFirebase(dados)` que grava:
  - Tensão, corrente, potência e timestamp
  - Em `users/{uid}/esp32/readings` (novo registro cada leitura)
  - Em `users/{uid}/esp32/last` (último valor do usuário)
- Fallback para `public/esp32` quando usuário não está autenticado
- Integração com `atualizarDados()` para enviar dados a cada segundo do ESP32

### 3. **Indicador Visual de Status**
- Badge `#firebase-status` no header que mostra:
  - ✅ "Enviado" (verde) quando leitura é gravada com sucesso
  - ❌ "Erro ao enviar" (vermelho) em caso de falha
  - Auto-esconde após 4 segundos
- Função `setFirebaseStatus(message, success)` para controlar feedback visual

### 4. **Cálculo de Energia Acumulada por Período (Opção A)**
- Função `calculateEnergyMetrics(rows)` que:
  - Integra potência ao longo do tempo usando método trapezoidal
  - Calcula energia em kWh para: hoje, semana, mês
  - Calcula potência média (W) para cada período
- Nova tabela **"Energia Calculada"** exibindo:
  - Energia (kWh)
  - Potência Média (W)
  - Para os 3 períodos (hoje, semana, mês)

### 5. **Tooltip Interativo no Gráfico (Opção B)**
- Gráfico `#grafico-energia` agora exibe tooltip ao passar o mouse com:
  - Data/hora formatada em português (PT-BR)
  - Potência em Watts
  - Tensão em Volts
  - Corrente em Amperes
- Configurado com `tooltip: { isHtml: true, trigger: 'focus' }`

### 6. **Gráfico Comparativo entre Usuários (Opção C)**
- Novo gráfico em barra horizontal `#grafico-comparativo` mostrando:
  - Potência Atual (W) de cada usuário
  - Energia Gerada Hoje (kWh)
- Marca o usuário atual com asterisco e "(você)"
- Carrega dados de `users/{uid}/esp32/last` de todos os usuários
- Atualiza automaticamente a cada 10 segundos

### 7. **Regras de Segurança do Realtime Database**
- Arquivo `uai/realtime-db-rules.json` com regras que:
  - Limitam leitura/escrita ao próprio nó do usuário (`users/{uid}`)
  - Validam estrutura das leituras (campos obrigatórios e tipos)
  - Mantêm `public` somente leitura
- Arquivo `uai/firebase-rules.md` com instruções de aplicação e notas de segurança

### 8. **Estrutura de Dados no Firebase**

```
users/
  {uid}/
    esp32/
      readings/     (push de cada leitura)
        -LxxxxxReadingId
          tensao: 220.5
          corrente: 5.2
          potencia: 1050
          timestamp: 1733272800000
      last/         (último valor)
        tensao: 220.5
        corrente: 5.2
        potencia: 1050
        timestamp: 1733272800000

public/
  esp32/
    readings/       (dados de teste)
    last/           (último valor público)
```

## Fluxo Completo Implementado

1. **Coleta de Dados**: ESP32 envia dados a cada segundo via HTTP para `192.168.0.104/dados`
2. **Persistência**: JavaScript grava leitura no Firebase (organizada por usuário autenticado)
3. **Feedback Visual**: Badge mostra status (sucesso ✅ / erro ❌)
4. **Visualização em Tempo Real**: 
   - Gráfico de linha atualiza com novo ponto
   - Tooltip exibe detalhes (tensão, corrente, potência, data/hora)
5. **Cálculos Automáticos**: Tabelas atualizam energia acumulada por período
6. **Comparativo**: Gráfico renderiza comparação entre todos os usuários a cada 10 segundos

## Arquivos Modificados

### Principal
- **`inicio.html`**: Adicionados scripts de integração Firebase, cálculo de energia, gráficos e tooltips

### Novos Arquivos
- **`uai/realtime-db-rules.json`**: Regras de segurança do Realtime Database
- **`uai/firebase-rules.md`**: Instruções para aplicar as regras no Firebase Console

## Como Usar

### Configuração Inicial (Firebase Console)

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Selecione o projeto `sunseeker-11685`
3. Vá para **Realtime Database** → **Rules**
4. Substitua o conteúdo pelas regras do arquivo `uai/realtime-db-rules.json`
5. Clique em **Publicar**

### Testando a Aplicação

1. **Faça login** no site (ou confirme em DevTools com `firebase.auth().currentUser`)
2. Acesse `inicio.html` e aguarde carregar
3. Verifique:
   - **Gráfico de linha**: dados com tooltip ao passar o mouse
   - **Tabela "Energia Calculada"**: valores em kWh e potência média
   - **Gráfico comparativo**: todos os usuários registrados no Firebase
4. **No Firebase Console** → **Realtime Database**:
   - Verifique se dados aparecem em `users/{uid}/esp32/readings` e `users/{uid}/esp32/last`

## Notas Técnicas

- **Cálculo de Energia**: Usa integração trapezoidal (média entre dois pontos × intervalo de tempo)
- **Último Registro**: O gráfico carrega até 200 últimos registros de cada usuário
- **Autenticação**: Dados são associados ao UID do usuário autenticado
- **Fallback**: Se não autenticado, dados vão para `public/esp32` (útil para testes)
- **Atualização de Comparativo**: A cada 10 segundos, nova busca de dados de todos os usuários

## Segurança

### Recomendações para Produção

1. **NÃO** deixar as regras com `.write: true` em aberto
2. Configurar autenticação obrigatória para escrita
3. Para o ESP32 enviar dados diretamente, considerar:
   - Credenciais restritas (service account)
   - Cloud Function que valida e grava em nome do usuário
   - Token de acesso com permissões limitadas

### Exemplo de Regra Restritiva

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid === $uid",
        ".write": "auth != null && auth.uid === $uid"
      }
    },
    "public": {
      ".read": true,
      ".write": false
    }
  }
}
```

## Dependências

- **Firebase SDK (compat)** v10.12.0
- **Google Charts** (CDN)
- **Bootstrap** v5.3.3
- **Font Awesome** v6.0.0

## Próximos Passos Sugeridos

- [ ] Adicionar exportação de dados em CSV
- [ ] Implementar gráficos de comparação de consumo (com vs sem painel)
- [ ] Criar dashboard admin para visualizar todos os usuários
- [ ] Implementar alertas quando potência excede limite
- [ ] Adicionar previsão de economia mensal baseada em dados históricos

---

**Projeto Acadêmico Sunseeker**  
Data: Dezembro 2024  
Versão: 1.0
