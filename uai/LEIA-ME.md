TCC 


user

https://murilao69.github.io/TCC_SUNSEEKER/

O projeto Sunseeker é um sistema web desenvolvido como Trabalho de Conclusão de Curso (TCC) com o objetivo de oferecer soluções de energia solar para residências e empresas. Ele apresenta uma interface moderna e responsiva, com diversas funcionalidades voltadas para monitoramento, simulação e apresentação de informações sobre energia solar. Abaixo está um resumo detalhado das funcionalidades do projeto:

1. Estrutura Geral
O projeto é composto por várias páginas HTML, arquivos CSS para estilização, scripts JavaScript para interatividade e um Service Worker para otimização de desempenho.
Ele utiliza bibliotecas externas como Bootstrap para layout responsivo e Font Awesome para ícones.
O projeto também integra o Firebase para autenticação de usuários.
2. Funcionalidades Principais
2.1. Páginas do Sistema
Página Inicial (index.html)

Apresenta uma introdução ao sistema com um design moderno.
Contém links para login e cadastro.
Destaques:
Indicadores de benefícios como "Economia Garantida", "Monitoramento 24/7" e "Sustentabilidade".
Imagem de fundo dinâmica e animações.
Página de Login (login.html)

Permite que usuários façam login com e-mail e senha.
Integração com Google Login.
Verificação de e-mail antes de permitir o acesso.
Opção de "Esqueceu a senha?" para recuperação.
Página de Cadastro (cadastro.html)

Permite que novos usuários criem uma conta.
Validação de senha e confirmação de senha.
Envio de e-mail de verificação após o cadastro.
Página de Recuperação de Senha (recuperar-senha.html)

Envia um link de redefinição de senha para o e-mail do usuário.
Integração com o Firebase para gerenciamento de autenticação.
Página Inicial do Sistema (inicio.html)

Apresenta gráficos interativos gerados com Google Charts para monitoramento de economia de energia.
Tipos de gráficos:
Gráfico de linha para economia mensal.
Gráfico de pizza para tipos de instalações.
Gráfico de colunas para consumo com e sem painel solar.
Gráfico de barras para histórico de consumo.
Página de Soluções (solucoes.html)

Apresenta as soluções oferecidas, como:
Soluções residenciais.
Sistemas fotovoltaicos.
Simulador de economia.
Página de Produtos (produtos.html)

Lista produtos relacionados à energia solar, como:
Painéis solares.
Inversores.
Baterias de armazenamento.
Acessórios (cabos e conectores).
Suporte técnico.
Página Sobre Nós (sobre.html)

Explica o propósito do projeto como TCC.
Lista os integrantes do projeto.
Apresenta a missão e visão da empresa fictícia.
Página do Simulador (simulador.html)

Permite que o usuário insira dados como consumo médio mensal e valor da conta de luz.
Calcula a economia mensal e anual estimada com energia solar.
Exibe os resultados em um gráfico interativo.
2.2. Funcionalidades Técnicas
Service Worker (sw.js)

Implementa cache para melhorar o desempenho offline.
Garante que os arquivos principais sejam armazenados no cache.
Atualiza o cache automaticamente quando uma nova versão é lançada.
Tema Escuro/Claro

Alternância entre temas claro e escuro.
Preferência do tema é salva no localStorage.
Tela de Loading

Tela de carregamento com animação enquanto os recursos são carregados.
Responsividade

O design é responsivo, adaptando-se a diferentes tamanhos de tela.
Arquivo mobile.css contém ajustes específicos para dispositivos móveis.
Autenticação Firebase

Login, cadastro e recuperação de senha são gerenciados pelo Firebase.
Suporte para autenticação com Google.
3. Tecnologias Utilizadas
HTML5: Estrutura das páginas.
CSS3: Estilização, incluindo animações e responsividade.
JavaScript: Interatividade e integração com APIs.
Bootstrap: Layout responsivo.
Font Awesome: Ícones.
Google Charts: Gráficos interativos.
Firebase: Autenticação e envio de e-mails.
Service Worker: Cache e suporte offline.
4. Público-Alvo
Usuários interessados em soluções de energia solar.
Empresas e residências que desejam monitorar e economizar energia.
Estudantes e profissionais que desejam aprender sobre integração de tecnologias web.
5. Conclusão
O projeto Sunseeker é um sistema completo que combina design moderno, funcionalidades interativas e tecnologias avançadas para oferecer uma experiência rica e educativa sobre energia solar. Ele é ideal para demonstrar a viabilidade de sistemas de monitoramento e economia de energia, além de ser um excelente exemplo de aplicação prática de conceitos de desenvolvimento web.
