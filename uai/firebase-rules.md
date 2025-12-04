Regras recomendadas para Realtime Database

Arquivos:
- `realtime-db-rules.json`: regras de exemplo para aplicar no Firebase Console.

Como aplicar as regras (Console do Firebase):
1. Abra o Firebase Console e selecione seu projeto.
2. Vá para Realtime Database → Rules.
3. Substitua o conteúdo atual pelas regras do arquivo `realtime-db-rules.json`.
4. Clique em `Publicar`.

Descrição das regras:
- `users/$uid`: cada usuário autenticado pode ler e escrever somente no seu próprio nó (`users/{uid}`).
- `esp32/readings`: validação mínima para garantir os campos `tensao`, `corrente`, `potencia` e `timestamp` como números.
- `public`: leitura pública permitida (útil para dados demonstrativos), escrita desabilitada por padrão.

Notas de segurança:
- Não deixe as regras com `".write": true` em produção.
- Para permitir que apenas dispositivos específicos (ex.: ESP32) escrevam, considere usar tokens de servidor ou Cloud Functions para mediar gravações.
- Se for necessário que o ESP32 envie dados diretamente sem autenticação do usuário, crie um mecanismo seguro (ex.: credenciais restritas, Cloud Function que valide e grave em nome do usuário, ou use Authentication com contas de serviço).
