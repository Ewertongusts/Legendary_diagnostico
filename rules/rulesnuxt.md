---
trigger: always_on
---

---
applyTo: '**'
---

Nuxt 4 — Directory Structure (Estrutura de Pastas)

⚠️ Atenção  
Este documento é um guia baseado na **documentação oficial do Nuxt 4** e boas práticas de organização.  
Use este modelo como referência para manter consistência, legibilidade e escalabilidade.

---

01) Diretório Raiz (root)

A raiz do projeto contém os arquivos principais de configuração e dependências:

  nuxt.config.ts        → configuração principal do Nuxt  
  tsconfig.json         → configuração TypeScript  
  package.json          → dependências e scripts  
  .env                  → variáveis de ambiente  
  .gitignore            → arquivos ignorados pelo Git  
  .nuxtignore           → padrões ignorados pelo Nuxt  
  .nuxtrc               → alternativa de configuração global  
  node_modules/         → dependências instaladas  

---

02) app/ — Core da Aplicação (Frontend)

Use este diretório para tudo que é parte do **front-end e da lógica de componentes**:

  app/assets/       → assets que serão processados pela build (CSS, imagens, fontes)
  app/components/   → componentes Vue UI reutilizáveis (auto-importados)
  app/composables/  → funções e estados reativos (useX) auto-importados
  app/layouts/      → layouts de páginas (define estrutura comum)
  app/middleware/   → middlewares de navegação client-side
  app/pages/        → páginas com **rotas baseadas em arquivos**
  app/plugins/      → registros de plugins Vue e integrações
  app/utils/        → helpers e funções puras sem reatividade

Arquivos do app:

  app.vue           → Root component da aplicação
  app.config.ts     → configuração específica do app
  error.vue         → página de erro global

---

03) public/ — Arquivos Públicos

Conteúdos estáticos servidos diretamente, **sem processamento da build**:

  favicon.ico  
  robots.txt  
  imagens ou arquivos que precisam manter o nome de arquivo

Esses arquivos são acessíveis diretamente via URL.

---

04) server/ — Backend & API (Nitro)

Use este diretório para lógica server-side (full-stack com Nitro):

  server/api/        → endpoints de API (ex: server/api/users.ts)
  server/routes/     → rotas customizadas de servidor (ex: sitemap.xml)
  server/middleware/ → middlewares de servidor
  server/plugins/    → plugins server-side
  server/utils/      → helpers server-side

---

05) shared/ — Código Compartilhado

Diretório para **código reutilizável** entre frontend e backend:

  shared/           → funções, tipos ou helpers usados por ambos

---

06) layers/ — Camadas Reutilizáveis

Permite organizar código, configuração e lógica que será **auto-registrada**:

  layers/           → componentes, lógica ou features isoladas

---

07) modules/ — Módulos Locais

Use para **módulos customizados** que estendem a aplicação Nuxt:

  modules/          → módulos auto-registrados (não precisa configurar no nuxt.config.ts)

---

08) content/ — CMS de Conteúdo (Opcional)

Quando o módulo Nuxt Content está habilitado:

  content/          → conteúdo baseado em arquivos (MD, YML, JSON)

---

09) .output/ — Build de Produção

Diretório gerado pelo Nuxt após build (produção):

  .output/          → saída da build (deploy), deve estar no .gitignore

---

10) Outros Arquivos

  .env              → variáveis de ambiente carregadas na build/dev
  .gitignore        → ignore padrões Git
  .nuxtignore       → ignore padrões Nuxt
  .nuxtrc           → configuração alternativa
  nuxt.config.ts    → configuração central Nuxt

---

Resumo da estrutura recomendada:

  /
  ├── app/
  ├── public/
  ├── server/
  ├── shared/
  ├── modules/
  ├── layers/
  ├── content/
  ├── .output/
  ├── nuxt.config.ts
  ├── .env
  ├── .gitignore
  ├── .nuxtignore
  ├── .nuxtrc
  └── package.json

---

💡 **Dica:** Esta organização é baseada diretamente na estrutura oficial do Nuxt 4. Sempre que criar novas pastas ou arquivos, vincule-as ao propósito correto (frontend, backend, compartilhado, módulos ou conteúdo).
