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

    static findWord(words, search) {
        return words.find((word) => word.word === search);
    }

    static getRandomWord(words) {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    }
}

module.exports = CSVService;