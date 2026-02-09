# Vue 3 + Vite

Este projeto é um template para iniciar aplicações com **Vue 3** usando **Vite**. Ele já vem configurado para trabalhar com **Single File Components (SFC)** e o modo **`<script setup>`**, que simplifica a escrita de componentes.

A seguir está um passo a passo completo de instalação, execução e estrutura básica.

## ✅ Pré-requisitos

Antes de começar, verifique se você tem instalado:

- **Node.js** (recomendado: versão LTS)
- **npm** (vem junto com o Node) ou **yarn/pnpm**

Usaremos a versão v16.20.2 do nodejs.
Para verificar se está tudo instalado, rode:

```bash
node -v
npm -v
```

## 📦 Instalação do projeto

1. **Clone ou baixe o repositório**
    ```bash
    git clone https://github.com/debitcombr/aasp-trabalhista 
    cd aasp-trabalhista
    ```

2. **Instale as dependências**
    ```bash
    npm install
    ```
    > Isso baixa todas as bibliotecas necessárias listadas no `package.json`.

## ▶️ Executando em modo de desenvolvimento

Para iniciar o servidor local com hot reload:

```bash
npm run serve
```

O Vite vai informar uma URL local, geralmente:

```
http://localhost:8080
```

Sempre que você salvar um arquivo, o navegador será atualizado automaticamente.

## 🏗️ Build para produção

Para gerar os arquivos otimizados:

```bash
npm run build
```

Os arquivos finais ficam na pasta `dist/`.

## Configuração

Crie um arquivo `.env` na raiz do projeto definindo as variáveis de ambiente utilizadas. Segue um exemplo de configuração:

```ini


VUE_APP_SERVIDOR_WWW=http://mat.aasp.org
VUE_APP_SERVIDOR="http://t-api.aasp.org/trabalhista-w"
VUE_APP_SERVIDOR_API_GERAL=http://api.aasp.org
VUE_APP_FRONT=http://app.aasp.org
VUE_APP_SOCKET=http://t-api.fastbet.win




```

