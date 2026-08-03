# Requinte — Estúdio de Estética & Beleza

Uma landing page premium e sofisticada desenvolvida para o estúdio de estética e beleza **Requinte**. O projeto foi construído focando em alta performance, acessibilidade e uma experiência visual deslumbrante (com animações fluidas e design responsivo).

## 🚀 Tecnologias e Bibliotecas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- **[React](https://react.dev/)** (v19) - Biblioteca JavaScript para construção de interfaces.
- **[Vite](https://vitejs.dev/)** (v7) - Bundler super rápido para desenvolvimento web moderno.
- **[TypeScript](https://www.typescriptlang.org/)** - Superset de JavaScript que adiciona tipagem estática.
- **[Tailwind CSS](https://tailwindcss.com/)** (v4) - Framework CSS utilitário para estilização rápida e customizável.
- **[Framer Motion](https://www.framer.com/motion/)** - Biblioteca de animações poderosas para React.
- **[Lucide React](https://lucide.dev/)** - Pacote de ícones minimalistas e consistentes.
- **clsx** e **tailwind-merge** - Utilitários para concatenação e mesclagem inteligente de classes CSS.

## ✨ Funcionalidades em Destaque

- **Design Premium e Responsivo**: Layout que se adapta perfeitamente a dispositivos móveis, tablets e desktops.
- **Experiência Imersiva**: Utilização de cursor customizado (`CustomCursor`), barra de progresso de rolagem (`ScrollProgress`) e tela de carregamento inicial (`Preloader`).
- **Animações Fluidas**: Transições de entrada e interações de hover suaves implementadas com Framer Motion.
- **Acessibilidade**: Estrutura HTML semântica, suporte a navegação por teclado (link de pular para o conteúdo) e contraste adequado.
- **SEO Otimizado**: Meta tags, Open Graph e tags de idioma configuradas (`pt-BR`).
- **Suporte a Tema**: Arquitetura CSS preparada para temas dark/light.

## 📂 Estrutura Principal do Projeto

Abaixo estão os principais diretórios e arquivos do código-fonte:

```text
├── logos/                  # Logotipos e identidades visuais da marca
├── src/                    # Código-fonte principal da aplicação
│   ├── components/         # Componentes React reutilizáveis (Hero, Services, Testimonials, etc.)
│   ├── lib/                # Bibliotecas e configurações utilitárias
│   ├── utils/              # Funções auxiliares (helpers)
│   ├── App.tsx             # Componente raiz que estrutura a Landing Page
│   ├── index.css           # Estilos globais (incluindo variáveis e configurações do Tailwind)
│   └── main.tsx            # Ponto de entrada (entry point) da aplicação React
├── index.html              # Template HTML principal
├── package.json            # Dependências e scripts do projeto
├── tailwind.config.js      # (ou via Vite plugin) Configurações de design do Tailwind CSS
└── vite.config.ts          # Configuração do Vite
```

## 🛠️ Como Executar o Projeto Localmente

Siga os passos abaixo para rodar o projeto no seu ambiente de desenvolvimento:

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado (recomenda-se a versão LTS).

### 1. Clonar ou acessar a pasta do projeto
Navegue até o diretório do projeto no seu terminal:
```bash
cd premium-requinte-landing-page
```

### 2. Instalar as dependências
Execute o comando abaixo para instalar todas as bibliotecas necessárias:
```bash
npm install
```

### 3. Rodar o servidor de desenvolvimento
Inicie o Vite:
```bash
npm run dev
```
O terminal exibirá a URL local (geralmente `http://localhost:5173/`). Acesse-a no seu navegador.

## 📜 Scripts Disponíveis (package.json)

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila o projeto para produção.
- `npm run preview`: Inicia um servidor web local para visualizar o build de produção.
