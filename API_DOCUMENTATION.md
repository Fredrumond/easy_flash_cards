# 📚 Easy Flash Cards API Documentation

## 🚀 Visão Geral

A API REST do Easy Flash Cards permite acessar e gerenciar vocabulário através de endpoints HTTP. A API é construída com Express.js e oferece funcionalidades completas para estudo de vocabulário.

## 🔗 Base URL

```
http://localhost:3000
```

## 📋 Endpoints

### 1. Informações da API

**GET /** - Informações gerais da API

```bash
curl http://localhost:3000/
```

**Resposta:**
```json
{
  "message": "Easy Flash Cards API",
  "version": "1.0.0",
  "endpoints": {
    "GET /api/words": "Lista todas as palavras",
    "GET /api/words/random": "Retorna uma palavra aleatória",
    "GET /api/words/:word": "Busca uma palavra específica",
    "POST /api/words": "Adiciona uma nova palavra",
    "GET /api/stats": "Estatísticas do vocabulário"
  }
}
```

### 2. Listar Todas as Palavras

**GET /api/words** - Retorna todas as palavras do arquivo CSV

**Parâmetros de Query:**
- `file` (opcional): Caminho do arquivo CSV (padrão: `cards.csv`)

```bash
curl http://localhost:3000/api/words
curl http://localhost:3000/api/words?file=words.csv
```

**Resposta:**
```json
{
  "success": true,
  "count": 25,
  "words": [
    {
      "word": "interesting",
      "meaning": "interessante"
    },
    {
      "word": "funny",
      "meaning": "engraçado"
    }
  ]
}
```

### 3. Palavra Aleatória

**GET /api/words/random** - Retorna uma palavra aleatória

**Parâmetros de Query:**
- `file` (opcional): Caminho do arquivo CSV (padrão: `cards.csv`)

```bash
curl http://localhost:3000/api/words/random
```

**Resposta:**
```json
{
  "success": true,
  "word": {
    "word": "beautiful",
    "meaning": "bonito"
  }
}
```

### 4. Buscar Palavra Específica

**GET /api/words/:word** - Busca uma palavra específica

**Parâmetros:**
- `word`: Palavra a ser buscada
- `file` (query opcional): Caminho do arquivo CSV

```bash
curl http://localhost:3000/api/words/interesting
```

**Resposta (Sucesso):**
```json
{
  "success": true,
  "word": {
    "word": "interesting",
    "meaning": "interessante"
  }
}
```

**Resposta (Não encontrada):**
```json
{
  "success": false,
  "error": "Palavra não encontrada",
  "searchedWord": "nonexistent"
}
```

### 5. Adicionar Nova Palavra

**POST /api/words** - Adiciona uma nova palavra ao vocabulário

**Parâmetros de Query:**
- `file` (opcional): Caminho do arquivo CSV (padrão: `cards.csv`)

**Body (JSON):**
```json
{
  "word": "hello",
  "meaning": "olá"
}
```

```bash
curl -X POST http://localhost:3000/api/words \
  -H "Content-Type: application/json" \
  -d '{"word": "hello", "meaning": "olá"}'
```

**Resposta (Sucesso):**
```json
{
  "success": true,
  "message": "Palavra adicionada com sucesso",
  "word": {
    "word": "hello",
    "meaning": "olá"
  }
}
```

**Resposta (Palavra já existe):**
```json
{
  "success": false,
  "error": "Erro ao adicionar palavra",
  "message": "Palavra já existe no vocabulário"
}
```

### 6. Estatísticas

**GET /api/stats** - Retorna estatísticas do vocabulário

**Parâmetros de Query:**
- `file` (opcional): Caminho do arquivo CSV (padrão: `cards.csv`)

```bash
curl http://localhost:3000/api/stats
```

**Resposta:**
```json
{
  "success": true,
  "stats": {
    "totalWords": 25,
    "averageWordLength": 7.2,
    "averageMeaningLength": 8.5,
    "filePath": "cards.csv"
  }
}
```

## 🔧 Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso |
| 201 | Criado com sucesso |
| 400 | Requisição inválida |
| 404 | Recurso não encontrado |
| 409 | Conflito (palavra já existe) |
| 500 | Erro interno do servidor |

## 📝 Exemplos de Uso

### JavaScript (Fetch API)

```javascript
// Buscar palavra aleatória
const response = await fetch('http://localhost:3000/api/words/random');
const data = await response.json();
console.log(data.word);

// Adicionar nova palavra
const newWord = await fetch('http://localhost:3000/api/words', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    word: 'computer',
    meaning: 'computador'
  })
});
```

### Python (requests)

```python
import requests

# Buscar estatísticas
response = requests.get('http://localhost:3000/api/stats')
stats = response.json()
print(f"Total de palavras: {stats['stats']['totalWords']}")

# Adicionar palavra
new_word = requests.post('http://localhost:3000/api/words', json={
    'word': 'python',
    'meaning': 'píton'
})
```

### cURL

```bash
# Listar todas as palavras
curl http://localhost:3000/api/words

# Buscar palavra específica
curl http://localhost:3000/api/words/beautiful

# Adicionar nova palavra
curl -X POST http://localhost:3000/api/words \
  -H "Content-Type: application/json" \
  -d '{"word": "api", "meaning": "interface de programação"}'
```

## 🚀 Como Executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Iniciar a API:**
   ```bash
   npm start
   ```

3. **Modo desenvolvimento (com nodemon):**
   ```bash
   npm run dev
   ```

## 🔒 Segurança

- A API aceita requisições CORS de qualquer origem
- Validação de entrada em todos os endpoints
- Tratamento de erros robusto
- Logs de todas as requisições

## 📊 Monitoramento

A API registra automaticamente:
- Todas as requisições HTTP
- Timestamps de cada requisição
- Método HTTP e caminho
- Erros e exceções

## 🤝 Contribuindo

Para adicionar novos endpoints ou funcionalidades:

1. Adicione a rota em `src/api/server.js`
2. Crie testes em `tests/`
3. Atualize esta documentação
4. Teste com diferentes cenários

---

📖 **Documentação criada para facilitar a integração e uso da API Easy Flash Cards** 