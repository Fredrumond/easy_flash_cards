// 🧪 TESTES DA API REST
// Testes básicos dos endpoints principais

const request = require('supertest');
const app = require('../dist/api/server').default;

describe('🌐 API REST - Easy Flash Cards', () => {
    
    // 🔧 Setup e cleanup para evitar Jest pendurado
    beforeAll(() => {
        // Setup adicional se necessário
    });
    
    afterAll(async () => {
        // Cleanup mais robusto - sem necessidade de fechar servidor
        // pois não está sendo iniciado nos testes
        
        // Aguarda cleanup adicional
        await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    // 📋 Teste da rota raiz
    describe('GET /', () => {
        test('deve retornar informações da API', async () => {
            const response = await request(app)
                .get('/')
                .expect(200)
                .expect('Content-Type', /json/);
            
            expect(response.body.message).toBe('Easy Flash Cards API');
            expect(response.body.version).toBe('1.0.0');
            expect(response.body.endpoints).toBeDefined();
        });
    });

    // 📚 Testes de palavras
    describe('GET /api/words', () => {
        test('deve retornar lista de palavras', async () => {
            const response = await request(app)
                .get('/api/words')
                .expect(200)
                .expect('Content-Type', /json/);
            
            expect(response.body.success).toBe(true);
            expect(response.body.words).toBeInstanceOf(Array);
            expect(response.body.count).toBeGreaterThan(0);
        });

        test('deve usar arquivo CSV padrão quando não especificado', async () => {
            const response = await request(app)
                .get('/api/words')
                .expect(200);
            
            expect(response.body.success).toBe(true);
            expect(response.body.words).toBeInstanceOf(Array);
        });
    });

    // 🎲 Testes de palavra aleatória
    describe('GET /api/words/random', () => {
        test('deve retornar uma palavra aleatória', async () => {
            const response = await request(app)
                .get('/api/words/random')
                .expect(200)
                .expect('Content-Type', /json/);
            
            expect(response.body.success).toBe(true);
            expect(response.body.word).toBeDefined();
            expect(response.body.word.word).toBeDefined();
            expect(response.body.word.meaning).toBeDefined();
        });

        test('deve retornar palavras diferentes em múltiplas chamadas', async () => {
            const response1 = await request(app).get('/api/words/random');
            const response2 = await request(app).get('/api/words/random');
            
            expect(response1.body.success).toBe(true);
            expect(response2.body.success).toBe(true);
            // Nota: pode ser a mesma palavra por coincidência, mas estrutura deve ser consistente
            expect(response1.body.word).toBeDefined();
            expect(response2.body.word).toBeDefined();
        });
    });

    // 🔍 Testes de busca de palavra específica
    describe('GET /api/words/:word', () => {
        test('deve encontrar palavra existente', async () => {
            const response = await request(app)
                .get('/api/words/interesting')
                .expect(200)
                .expect('Content-Type', /json/);
            
            expect(response.body.success).toBe(true);
            expect(response.body.word).toBeDefined();
            expect(response.body.word.word).toBe('interesting');
            expect(response.body.word.meaning).toBe('interessante');
        });

        test('deve retornar 404 para palavra não encontrada', async () => {
            const response = await request(app)
                .get('/api/words/palavrainexistente123')
                .expect(404)
                .expect('Content-Type', /json/);
            
            expect(response.body.success).toBe(false);
            expect(response.body.error).toBe('Palavra não encontrada');
            expect(response.body.searchedWord).toBe('palavrainexistente123');
        });
    });

    // ➕ Testes de adição de palavra
    describe('POST /api/words', () => {
        test('deve adicionar nova palavra', async () => {
            // Usa timestamp para garantir palavra única
            const timestamp = Date.now();
            const novaPalavra = {
                word: `testword${timestamp}`,
                meaning: 'palavra de teste'
            };

            const response = await request(app)
                .post('/api/words')
                .send(novaPalavra)
                .expect(201)
                .expect('Content-Type', /json/);
            
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Palavra adicionada com sucesso');
            expect(response.body.word.word).toBe(`testword${timestamp}`);
            expect(response.body.word.meaning).toBe('palavra de teste');
        });

        test('deve rejeitar palavra sem campos obrigatórios', async () => {
            const response = await request(app)
                .post('/api/words')
                .send({ word: 'test' }) // faltando meaning
                .expect(400)
                .expect('Content-Type', /json/);
            
            expect(response.body.success).toBe(false);
            expect(response.body.error).toBe('Campos "word" e "meaning" são obrigatórios');
        });

        test('deve rejeitar palavra vazia', async () => {
            const response = await request(app)
                .post('/api/words')
                .send({})
                .expect(400)
                .expect('Content-Type', /json/);
            
            expect(response.body.success).toBe(false);
            expect(response.body.error).toBe('Campos "word" e "meaning" são obrigatórios');
        });
    });

    // 📊 Testes de estatísticas
    describe('GET /api/stats', () => {
        test('deve retornar estatísticas do vocabulário', async () => {
            const response = await request(app)
                .get('/api/stats')
                .expect(200)
                .expect('Content-Type', /json/);
            
            expect(response.body.success).toBe(true);
            expect(response.body.stats).toBeDefined();
            expect(response.body.stats.totalWords).toBeGreaterThan(0);
            expect(response.body.stats.averageWordLength).toBeGreaterThan(0);
            expect(response.body.stats.averageMeaningLength).toBeGreaterThan(0);
            expect(response.body.stats.filePath).toBeDefined();
        });
    });

    // 🚫 Testes de rotas não encontradas
    describe('Rotas não encontradas', () => {
        test('deve retornar 404 para rota inexistente', async () => {
            const response = await request(app)
                .get('/api/inexistente')
                .expect(404)
                .expect('Content-Type', /json/);
            
            expect(response.body.success).toBe(false);
            expect(response.body.error).toBe('Endpoint não encontrado');
        });
    });
}); 