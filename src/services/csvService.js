const fs = require('fs');
const csvParser = require('csv-parser');

class CSVService {
    static async readCSV(filePath) {
        return new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (err) => reject(err));
        });
    }

    static async writeCSV(filePath, words) {
        return new Promise((resolve, reject) => {
            const csvContent = this.convertToCSV(words);
            fs.writeFile(filePath, csvContent, 'utf8', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    static async addWord(filePath, word, meaning) {
        try {
            const words = await this.readCSV(filePath);
            
            // Verifica se a palavra já existe
            const existingWord = words.find(w => w.word.toLowerCase() === word.toLowerCase());
            if (existingWord) {
                throw new Error('Palavra já existe no vocabulário');
            }
            
            // Adiciona nova palavra
            words.push({ word, meaning });
            
            // Salva no arquivo
            await this.writeCSV(filePath, words);
            
            return { word, meaning };
        } catch (error) {
            throw error;
        }
    }

    static convertToCSV(words) {
        const header = 'word,meaning\n';
        const rows = words.map(word => `${word.word},${word.meaning}`).join('\n');
        return header + rows;
    }

    static findWord(words, search) {
        return words.find((word) => word.word === search);
    }

    static getRandomWord(words) {
        const randomIndex = Math.floor(Math.random() * words.length);
        return {
            word: words[randomIndex].word,
            meaning: words[randomIndex].meaning
        };
    }

    static getStats(words) {
        if (words.length === 0) {
            return {
                totalWords: 0,
                averageWordLength: 0,
                averageMeaningLength: 0
            };
        }

        const totalWordLength = words.reduce((acc, word) => acc + word.word.length, 0);
        const totalMeaningLength = words.reduce((acc, word) => acc + word.meaning.length, 0);

        return {
            totalWords: words.length,
            averageWordLength: Math.round((totalWordLength / words.length) * 100) / 100,
            averageMeaningLength: Math.round((totalMeaningLength / words.length) * 100) / 100
        };
    }
}

module.exports = CSVService;