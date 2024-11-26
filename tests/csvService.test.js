const CSVService = require('../src/services/csvService');

test('Deve ler o arquivo CSV e retornar um array de palavras', async () => {
    const words = await CSVService.readCSV('./words.csv');
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