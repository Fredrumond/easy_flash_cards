// 🌐 SERVER API REST - TYPESCRIPT
// Migração completa com tipagem robusta

import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import CSVService from '../services/csvService';
import { 
    WordsResponse, 
    RandomWordResponse, 
    FindWordResponse, 
    AddWordResponse, 
    StatsResponse, 
    ErrorResponse, 
    RootResponse,
    AddWordRequest,
    FileQueryParams 
} from '../types/api';

// 📚 CONCEITO: Tipagem de Express
// Request<Params, ResBody, ReqBody, ReqQuery>
// Response<ResBody>

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// 🔧 Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📝 Middleware de logging tipado
app.use((req: Request, res: Response, next: NextFunction): void => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// 📖 Rota raiz tipada
app.get('/', (req: Request, res: Response<RootResponse>): void => {
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

// 📚 GET /api/words - Lista todas as palavras
// 📚 CONCEITO: Request com query params tipados
app.get('/api/words', async (
    req: Request<{}, WordsResponse | ErrorResponse, {}, FileQueryParams>, 
    res: Response<WordsResponse | ErrorResponse>
): Promise<void> => {
    try {
        const filePath: string = req.query.file || 'cards.csv';
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
            message: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
});

// 🎲 GET /api/words/random - Retorna uma palavra aleatória
app.get('/api/words/random', async (
    req: Request<{}, RandomWordResponse | ErrorResponse, {}, FileQueryParams>,
    res: Response<RandomWordResponse | ErrorResponse>
): Promise<void> => {
    try {
        const filePath: string = req.query.file || 'cards.csv';
        const words = await CSVService.readCSV(filePath);
        
        if (words.length === 0) {
            res.status(404).json({
                success: false,
                error: 'Nenhuma palavra encontrada'
            });
            return;
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
            message: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
});

// 🔍 GET /api/words/:word - Busca uma palavra específica
// 📚 CONCEITO: Route params tipados
interface WordParams {
    word: string;
}

app.get('/api/words/:word', async (
    req: Request<WordParams, FindWordResponse | ErrorResponse, {}, FileQueryParams>,
    res: Response<FindWordResponse | ErrorResponse>
): Promise<void> => {
    try {
        const { word }: WordParams = req.params;
        const filePath: string = req.query.file || 'cards.csv';
        const words = await CSVService.readCSV(filePath);
        
        const foundWord = CSVService.findWord(words, word);
        
        if (!foundWord) {
            res.status(404).json({
                success: false,
                error: 'Palavra não encontrada',
                searchedWord: word
            });
            return;
        }
        
        res.json({
            success: true,
            word: foundWord
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Erro ao buscar palavra',
            message: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
});

// ➕ POST /api/words - Adiciona uma nova palavra
// 📚 CONCEITO: Request body tipado
app.post('/api/words', async (
    req: Request<{}, AddWordResponse | ErrorResponse, AddWordRequest, FileQueryParams>,
    res: Response<AddWordResponse | ErrorResponse>
): Promise<void> => {
    try {
        const { word, meaning }: AddWordRequest = req.body;
        const filePath: string = req.query.file || 'cards.csv';
        
        if (!word || !meaning) {
            res.status(400).json({
                success: false,
                error: 'Campos "word" e "meaning" são obrigatórios'
            });
            return;
        }
        
        const newWord = await CSVService.addWord(filePath, word, meaning);
        
        res.status(201).json({
            success: true,
            message: 'Palavra adicionada com sucesso',
            word: newWord
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        const statusCode = errorMessage.includes('já existe') ? 409 : 500;
        
        res.status(statusCode).json({
            success: false,
            error: 'Erro ao adicionar palavra',
            message: errorMessage
        });
    }
});

// 📊 GET /api/stats - Estatísticas do vocabulário
app.get('/api/stats', async (
    req: Request<{}, StatsResponse | ErrorResponse, {}, FileQueryParams>,
    res: Response<StatsResponse | ErrorResponse>
): Promise<void> => {
    try {
        const filePath: string = req.query.file || 'cards.csv';
        const words = await CSVService.readCSV(filePath);
        
        const stats = CSVService.getStats(words);
        
        res.json({
            success: true,
            stats: {
                ...stats,
                filePath: filePath
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Erro ao gerar estatísticas',
            message: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
});

// 🚨 Middleware de tratamento de erros tipado
// 📚 CONCEITO: Error middleware tem 4 parâmetros
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
        message: err.message
    });
});

// 🚫 Middleware para rotas não encontradas
app.use('*', (req: Request, res: Response<ErrorResponse>): void => {
    res.status(404).json({
        success: false,
        error: 'Endpoint não encontrado',
        message: `A rota ${req.originalUrl} não existe`
    });
});

// 🚀 Função para iniciar servidor (apenas se executado diretamente)
export function startServer() {
    return app.listen(PORT, () => {
        console.log(`🚀 Easy Flash Cards API rodando na porta ${PORT}`);
        console.log(`📖 Documentação: http://localhost:${PORT}`);
        console.log(`🎯 Endpoints disponíveis:`);
        console.log(`    GET  /api/words`);
        console.log(`    GET  /api/words/random`);
        console.log(`    GET  /api/words/:word`);
        console.log(`    POST /api/words`);
        console.log(`    GET  /api/stats`);
    });
}

// 🚀 Iniciar servidor apenas se executado diretamente
if (require.main === module) {
    startServer();
}

// Exportar app para testes
export default app; 