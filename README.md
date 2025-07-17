# 🎯 Easy Flash Cards

[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/Tests-Jest-yellow.svg)](https://jestjs.io/)

> Uma aplicação CLI interativa para estudo de vocabulário através de flashcards, desenvolvida com TypeScript

## 📖 Sobre o Projeto

Easy Flash Cards é uma ferramenta de linha de comando desenvolvida em Node.js que permite estudar vocabulário de forma interativa. O aplicativo carrega palavras e suas traduções de arquivos CSV e apresenta um sistema de flashcards com interface amigável no terminal.

### 🔧 TypeScript

Este projeto utiliza **TypeScript** para maior segurança de tipos e melhor experiência de desenvolvimento:

- ✅ **Type Safety** - Detecção de erros em tempo de compilação
- ✅ **IntelliSense** - Melhor autocomplete e navegação no código
- ✅ **Refactoring Seguro** - Mudanças estruturais com confiança
- ✅ **Self-Documenting** - Tipos servem como documentação

#### 🎓 Para Iniciantes em TypeScript

```typescript
// Exemplo de interface (estrutura de dados)
interface Word {
  word: string;     // palavra em inglês
  meaning: string;  // significado em português
}

// Exemplo de função tipada
function findWord(words: Word[], search: string): Word | undefined {
  return words.find(word => word.word === search);
}
```

O código TypeScript é compilado para JavaScript antes da execução, garantindo compatibilidade total com Node.js.

### ✨ Funcionalidades

- 📚 **Leitura de arquivos CSV** com palavras e significados
- 🎲 **Seleção aleatória** de palavras para estudo
- 🎨 **Interface colorida** no terminal com Chalk
- 📋 **Menu interativo** com opções claras
- 🧪 **Testes unitários** com Jest
- 🔄 **Navegação simples** entre palavras
- 🌐 **API REST** para integração com outros sistemas
- 📊 **Estatísticas** do vocabulário
- ➕ **Adição de palavras** via API

## 🚀 Instalação

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- TypeScript (instalado automaticamente como dependência de desenvolvimento)

### Passos para instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/easy_flash_cards.git
   cd easy_flash_cards
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute os testes para verificar a instalação**
   ```bash
   npm test
   ```

4. **Compile o TypeScript (opcional - feito automaticamente)**
   ```bash
   npm run build
   ```

5. **Verifique os tipos TypeScript**
   ```bash
   npm run type-check
   ```

## 📖 Como Usar

### 🖥️ Interface CLI

#### Executando o aplicativo

```bash
# JavaScript compilado (método padrão)
node src/cli/cli.js <caminho-do-arquivo-csv>

# TypeScript direto (desenvolvimento)
npm run cli:ts <caminho-do-arquivo-csv>
```

#### Exemplo de uso

```bash
# Usando o arquivo principal de vocabulário
node src/cli/cli.js cards.csv

# Usando o arquivo de teste
node src/cli/cli.js words.csv

# Usando npm script (JavaScript)
npm run cli cards.csv

# Usando npm script (TypeScript direto)
npm run cli:ts cards.csv
```

### 🌐 API REST

#### Iniciando a API

```bash
# JavaScript compilado (produção)
npm start

# TypeScript direto (desenvolvimento)
npm run start:ts

# Desenvolvimento com auto-reload (JavaScript)
npm run dev

# Desenvolvimento com auto-reload (TypeScript)
npm run dev:ts
```

#### Endpoints disponíveis

- `GET /` - Informações da API
- `GET /api/words` - Lista todas as palavras
- `GET /api/words/random` - Palavra aleatória
- `GET /api/words/:word` - Busca palavra específica
- `POST /api/words` - Adiciona nova palavra
- `GET /api/stats` - Estatísticas do vocabulário

#### Exemplo de uso da API

```bash
# Buscar palavra aleatória
curl http://localhost:3000/api/words/random

# Adicionar nova palavra
curl -X POST http://localhost:3000/api/words \
  -H "Content-Type: application/json" \
  -d '{"word": "hello", "meaning": "olá"}'

# Ver estatísticas
curl http://localhost:3000/api/stats
```

📖 **Documentação completa da API:** [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

### Interface do usuário

Após executar o comando, você verá um menu interativo:

```
Bem-vindo ao Easy Flash Cards!

Palavra: interesting

Menu:
1 - Revelar significado
2 - Próxima palavra
3 - Sair
```

### Opções disponíveis

- **1** - Revela o significado da palavra atual
- **2** - Seleciona uma nova palavra aleatória
- **3** - Sai do aplicativo

## 📁 Estrutura do Projeto

```
easy_flash_cards/
├── src/                         # Código-fonte TypeScript
│   ├── api/
│   │   └── server.ts           # Servidor da API REST
│   ├── cli/
│   │   └── cli.js              # Interface de linha de comando
│   ├── services/
│   │   └── csvService.ts       # Serviço para manipulação de CSV (TypeScript)
│   └── types/
│       ├── index.ts            # Definições de tipos
│       └── csv-parser.d.ts     # Tipos customizados para csv-parser
├── dist/                       # JavaScript compilado (gerado automaticamente)
│   ├── services/
│   │   └── csvService.js       # csvService compilado
│   └── types/
│       └── index.js            # Tipos compilados
├── tests/
│   └── csvService.test.js      # Testes unitários
├── cards.csv                   # Arquivo principal de vocabulário
├── words.csv                   # Arquivo de teste
├── tsconfig.json               # Configuração do TypeScript
├── package.json                # Configurações do projeto
└── README.md                   # Este arquivo
```

### 📋 Convenções de Arquivos

- **`.ts`** - Arquivos TypeScript (código-fonte)
- **`.js`** - Arquivos JavaScript (compilados ou legados)
- **`.d.ts`** - Arquivos de definição de tipos TypeScript
- **`dist/`** - Diretório com código JavaScript compilado

## 📊 Formato dos Arquivos CSV

Os arquivos CSV devem seguir o formato:

```csv
word,meaning
interesting,interessante
funny,engraçado
especially,especialmente
```

### Colunas obrigatórias:
- `word`: Palavra em inglês
- `meaning`: Tradução em português

## 🔧 Desenvolvimento

### 📜 Scripts Disponíveis

#### 🏗️ Build e Compilação
```bash
npm run build         # Compila TypeScript para JavaScript
npm run build:watch   # Compila automaticamente quando arquivos mudam
npm run type-check    # Verifica tipos sem gerar arquivos
```

#### 🚀 Execução
```bash
# CLI
npm run cli           # Executa CLI em JavaScript
npm run cli:ts        # Executa CLI em TypeScript direto

# API
npm start             # Inicia API em JavaScript (produção)
npm run start:ts      # Inicia API em TypeScript direto
npm run dev           # Desenvolvimento com auto-reload (JavaScript)
npm run dev:ts        # Desenvolvimento com auto-reload (TypeScript)
```

#### 🧪 Testes
```bash
npm test              # Executa todos os testes (compila automaticamente)
npm run test:watch    # Executa testes em modo watch
```

### 🔄 Workflow de Desenvolvimento

#### Para desenvolvimento com TypeScript:
```bash
# Terminal 1: Compilação automática
npm run build:watch

# Terminal 2: Desenvolvimento
npm run dev:ts        # ou npm run cli:ts

# Terminal 3: Testes automáticos
npm run test:watch
```

#### Para execução rápida:
```bash
npm test              # Compila e testa automaticamente
npm run start:ts      # Executa direto sem compilar
```

## 🧪 Testes

### Executando os testes

```bash
npm test
```

### Cobertura de testes

O projeto inclui testes para:
- ✅ Leitura de arquivos CSV
- ✅ Busca de palavras específicas
- ✅ Seleção aleatória de palavras

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Jest** - Framework de testes
- **Express** - Framework web para API REST
- **Chalk** - Biblioteca para cores no terminal
- **csv-parser** - Parser para arquivos CSV

## 📦 Dependências

### Produção
- `chalk` ^4.1.2 - Cores no terminal
- `cors` ^2.8.5 - Middleware CORS para API
- `csv-parser` ^3.0.0 - Parser CSV
- `express` ^4.21.1 - Framework web para API REST

### Desenvolvimento
- `typescript` ^5.0.0 - Compilador TypeScript
- `ts-node` ^10.9.0 - Execução direta de TypeScript
- `ts-jest` ^29.0.0 - Preprocessor TypeScript para Jest
- `jest` ^29.7.0 - Framework de testes
- `@types/node` ^20.0.0 - Tipos do Node.js
- `@types/express` ^4.17.17 - Tipos do Express
- `@types/cors` ^2.8.13 - Tipos do CORS
- `@types/jest` ^29.0.0 - Tipos do Jest

## 🤝 Contribuindo

### 💡 Para Contribuidores

Este projeto está em **migração ativa para TypeScript**. Ao contribuir:

- ✅ **Novos arquivos**: Sempre em TypeScript (`.ts`)
- ✅ **Código existente**: Pode manter JavaScript ou migrar para TS
- ✅ **Testes**: Execute `npm run type-check` antes do commit
- ✅ **Build**: Execute `npm test` para garantir que compila

### 🔄 Processo de Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Importante**: Execute `npm run type-check` e `npm test`
4. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
5. Push para a branch (`git push origin feature/AmazingFeature`)
6. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🚀 Roadmap

### 🎯 Em Desenvolvimento
- [x] **Migração para TypeScript** - ✅ Concluído
- [x] **Build automático nos testes** - ✅ Concluído
- [ ] Migrar CLI e API para TypeScript
- [ ] Sistema de usuários com SQLite
- [ ] Autenticação JWT

### 🔮 Futuras Features
- [ ] Sistema de progresso e estatísticas avançadas
- [ ] Persistência de histórico de estudo
- [ ] Spaced repetition algorithm
- [ ] Sistema de categorias e dificuldade
- [ ] Interface web React/Vue
- [ ] Suporte a múltiplos idiomas
- [ ] Mobile app React Native
- [ ] Gamificação e rankings

## 📞 Contato

Frederico Drumond - [@seu-usuario](https://github.com/seu-usuario)

Link do projeto: [https://github.com/seu-usuario/easy_flash_cards](https://github.com/seu-usuario/easy_flash_cards)

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
