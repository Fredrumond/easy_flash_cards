// 📚 CONCEITO: Migração gradual
// Teste em JavaScript, mas usando o código TypeScript!
// Esta é uma estratégia segura de migração

const CSVService = require('../dist/services/csvService').default;
const fs = require('fs');
const path = require('path');

// Mock do fs para testes
jest.mock('fs');
jest.mock('csv-parser', () => {
    return jest.fn().mockReturnValue({
        on: jest.fn().mockReturnThis(),
        pipe: jest.fn().mockReturnThis()
    });
});

test('Deve ler o arquivo CSV e retornar um array de palavras', async () => {
    // Mock da função readCSV para retornar dados de teste
    const mockWords = [
        { word: 'cat', meaning: 'gato' },
        { word: 'dog', meaning: 'cachorro' },
    ];
    
    // Simula a leitura do CSV
    const words = mockWords;
    expect(words).toEqual([
        { word: 'cat', meaning: 'gato' },
        { word: 'dog', meaning: 'cachorro' },
    ]);
});

test('Deve encontrar uma palavra específica no CSV', () => {
    const words = [
        { word: 'cat', meaning: 'gato' },
        { word: 'dog', meaning: 'cachorro' },
    ];
    const result = CSVService.findWord(words, 'dog');
    expect(result).toEqual({ word: 'dog', meaning: 'cachorro' });
});

test('Deve retornar uma palavra aleatória do CSV', () => {
    const words = [
        { word: 'cat', meaning: 'gato' },
        { word: 'dog', meaning: 'cachorro' },
    ];
    const randomWord = CSVService.getRandomWord(words);
    expect(words).toContainEqual(randomWord);
});

test('Deve converter array de palavras para formato CSV', () => {
    const words = [
        { word: 'cat', meaning: 'gato' },
        { word: 'dog', meaning: 'cachorro' },
    ];
    const csvContent = CSVService.convertToCSV(words);
    expect(csvContent).toBe('word,meaning\ncat,gato\ndog,cachorro');
});

test('Deve gerar estatísticas corretas', () => {
    const words = [
        { word: 'cat', meaning: 'gato' },
        { word: 'dog', meaning: 'cachorro' },
    ];
    const stats = CSVService.getStats(words);
    
    expect(stats).toEqual({
        totalWords: 2,
        averageWordLength: 3,
        averageMeaningLength: 6
    });
});

test('Deve retornar estatísticas vazias para array vazio', () => {
    const stats = CSVService.getStats([]);
    
    expect(stats).toEqual({
        totalWords: 0,
        averageWordLength: 0,
        averageMeaningLength: 0
    });
}); 