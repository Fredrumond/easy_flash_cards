# 🎯 Easy Flash Cards

[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/Tests-Jest-yellow.svg)](https://jestjs.io/)

> Uma aplicação CLI interativa para estudo de vocabulário através de flashcards

## 📖 Sobre o Projeto

Easy Flash Cards é uma ferramenta de linha de comando desenvolvida em Node.js que permite estudar vocabulário de forma interativa. O aplicativo carrega palavras e suas traduções de arquivos CSV e apresenta um sistema de flashcards com interface amigável no terminal.

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

## 📖 Como Usar

### 🖥️ Interface CLI

#### Executando o aplicativo

```bash
node src/cli/cli.js <caminho-do-arquivo-csv>
```

#### Exemplo de uso

```bash
# Usando o arquivo principal de vocabulário
node src/cli/cli.js cards.csv

# Usando o arquivo de teste
node src/cli/cli.js words.csv

# Usando npm script
npm run cli cards.csv
```

### 🌐 API REST

#### Iniciando a API

```bash
# Produção
npm start

# Desenvolvimento (com auto-reload)
npm run dev
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
├── src/
│   ├── cli/
│   │   └── cli.js              # Interface de linha de comando
│   └── services/
│       └── csvService.js        # Serviço para manipulação de CSV
├── tests/
│   └── csvService.test.js       # Testes unitários
├── cards.csv                    # Arquivo principal de vocabulário
├── words.csv                    # Arquivo de teste
├── package.json                 # Configurações do projeto
└── README.md                    # Este arquivo
```

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
- **Jest** - Framework de testes
- **Chalk** - Biblioteca para cores no terminal
- **csv-parser** - Parser para arquivos CSV

## 📦 Dependências

### Produção
- `chalk` ^4.1.2 - Cores no terminal
- `cors` ^2.8.5 - Middleware CORS para API
- `csv-parser` ^3.0.0 - Parser CSV
- `express` ^4.21.1 - Framework web para API REST

### Desenvolvimento
- `jest` ^29.7.0 - Framework de testes

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🚀 Roadmap

- [ ] Sistema de progresso e estatísticas
- [ ] Persistência de histórico de estudo
- [ ] Validação de entrada do usuário
- [ ] Sistema de logging
- [ ] Interface web
- [ ] Suporte a múltiplos idiomas

## 📞 Contato

Frederico Drumond - [@seu-usuario](https://github.com/seu-usuario)

Link do projeto: [https://github.com/seu-usuario/easy_flash_cards](https://github.com/seu-usuario/easy_flash_cards)

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
