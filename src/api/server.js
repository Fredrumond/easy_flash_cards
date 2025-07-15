const express = require('express');
const cors = require('cors');
const CSVService = require('../services/csvService');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Rota raiz
app.get('/', (req, res) => {
    res.json({
        message: 'Easy Flash Cards API',
        version: '1.0.0',
        endpoints: {
            'GET /api/words': 'Lista todas as palavras',
            'GET /api/words/random': 'Retorna uma palavra aleatória',
            'GET /api/words/:word': 'Busca uma palavra específica',
            'POST /api/words': 'Adiciona uma nova palavra',
            'GET /api/stats': 'Estatísticas do vocabulário'
        }
    });
});

// GET /api/words - Lista todas as palavras
app.get('/api/words', async (req, res) => {
    try {
        const filePath = req.query.file || 'cards.csv';
        const words = await CSVService.readCSV(filePath);
        
        res.json({
            success: true,
            count: words.length,
            words: words
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Erro ao ler arquivo CSV',
            message: error.message
        });
    }
});

// GET /api/words/random - Retorna uma palavra aleatória
app.get('/api/words/random', async (req, res) => {
    try {
        const filePath = req.query.file || 'cards.csv';
        const words = await CSVService.readCSV(filePath);
        
        if (words.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Nenhuma palavra encontrada'
            });
        }
        
        const randomWord = CSVService.getRandomWord(words);
        
        res.json({
            success: true,
            word: randomWord
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Erro ao buscar palavra aleatória',
            message: error.message
        });
    }
});

// GET /api/words/:word - Busca uma palavra específica
app.get('/api/words/:word', async (req, res) => {
    try {
        const { word } = req.params;
        const filePath = req.query.file || 'cards.csv';
        const words = await CSVService.readCSV(filePath);
        
        const foundWord = CSVService.findWord(words, word);
        
        if (!foundWord) {
            return res.status(404).json({
                success: false,
                error: 'Palavra não encontrada',
                searchedWord: word
            });
        }
        
        res.json({
            success: true,
            word: foundWord
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Erro ao buscar palavra',
            message: error.message
        });
    }
});

// POST /api/words - Adiciona uma nova palavra
app.post('/api/words', async (req, res) => {
    try {
        const { word, meaning } = req.body;
        const filePath = req.query.file || 'cards.csv';
        
        if (!word || !meaning) {
            return res.status(400).json({
                success: false,
                error: 'Campos "word" e "meaning" são obrigatórios'
            });
        }
        
        const newWord = await CSVService.addWord(filePath, word, meaning);
        
        res.status(201).json({
            success: true,
            message: 'Palavra adicionada com sucesso',
            word: newWord
        });
    } catch (error) {
        const statusCode = error.message.includes('já existe') ? 409 : 500;
        res.status(statusCode).json({
            success: false,
            error: 'Erro ao adicionar palavra',
            message: error.message
        });
    }
});

// GET /api/stats - Estatísticas do vocabulário
app.get('/api/stats', async (req, res) => {
    try {
        const filePath = req.query.file || 'cards.csv';
        const words = await CSVService.readCSV(filePath);
        
        const stats = CSVService.getStats(words);
        stats.filePath = filePath;
        
        res.json({
            success: true,
            stats: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Erro ao gerar estatísticas',
            message: error.message
        });
    }
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
        message: err.message
    });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint não encontrado',
        message: `A rota ${req.originalUrl} não existe`
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Easy Flash Cards API rodando na porta ${PORT}`);
    console.log(`📖 Documentação: http://localhost:${PORT}`);
    console.log(`🎯 Endpoints disponíveis:`);
    console.log(`   GET  /api/words`);
    console.log(`   GET  /api/words/random`);
    console.log(`   GET  /api/words/:word`);
    console.log(`   POST /api/words`);
    console.log(`   GET  /api/stats`);
});

module.exports = app; 