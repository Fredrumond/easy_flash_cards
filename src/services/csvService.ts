// 📚 IMPORTS com TypeScript
import * as fs from 'fs';
import * as path from 'path';
const ROOT_DIR = path.resolve(__dirname, '../../data');
import csvParser from 'csv-parser';
import { Word, Stats } from '../types';

// 📚 CONCEITO: Classe tipada
// Cada método tem tipos nos parâmetros e retorno
class CSVService {
    
    // 📚 ANTES (JavaScript):
    // static async readCSV(filePath) {
    
    // 📚 DEPOIS (TypeScript):
    // filePath: string = parâmetro deve ser string
    // Promise<Word[]> = retorna uma Promise com array de Words
    static async readCSV(filePath: string): Promise<Word[]> {
        filePath = path.resolve(ROOT_DIR, filePath);
        if (!filePath.startsWith(ROOT_DIR)) {
            throw new Error('Invalid file path');
        }
        return new Promise((resolve, reject) => {
            const results: Word[] = []; // 📚 results é um array de Word
            
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on('data', (data: any) => { // 📚 data vem como any do CSV
                    // 📚 Convertemos any para Word (type assertion)
                    results.push(data as Word);
                })
                .on('end', () => resolve(results))
                .on('error', (err: Error) => reject(err)); // 📚 err é um Error
        });
    }

    // 📚 CONCEITO: Função tipada simples
    static async writeCSV(filePath: string, words: Word[]): Promise<void> {
        filePath = path.resolve(ROOT_DIR, filePath);
        if (!filePath.startsWith(ROOT_DIR)) {
            throw new Error('Invalid file path');
        }
        // Promise<void> = não retorna nada, apenas resolve
        return new Promise((resolve, reject) => {
            const csvContent: string = this.convertToCSV(words);
            
            fs.writeFile(filePath, csvContent, 'utf8', (err) => {
                if (err) reject(err);
                else resolve(); // void = sem retorno
            });
        });
    }

    // 📚 CONCEITO: Retorno tipado
    static async addWord(filePath: string, word: string, meaning: string): Promise<Word> {
        try {
            const words: Word[] = await this.readCSV(filePath);
            
            // 📚 find retorna Word | undefined (pode não encontrar)
            const existingWord: Word | undefined = words.find(
                w => w.word.toLowerCase() === word.toLowerCase()
            );
            
            if (existingWord) {
                throw new Error('Palavra já existe no vocabulário');
            }
            
            // 📚 Criando objeto tipado
            const newWord: Word = { word, meaning };
            words.push(newWord);
            
            await this.writeCSV(filePath, words);
            
            return newWord; // 📚 Garantido ser Word
        } catch (error) {
            throw error;
        }
    }

    // 📚 CONCEITO: Função pura tipada
    static convertToCSV(words: Word[]): string {
        const header = 'word,meaning\n';
        const rows = words.map(word => `${word.word},${word.meaning}`).join('\n');
        return header + rows;
    }

    // 📚 CONCEITO: Busca com tipo de retorno preciso
    static findWord(words: Word[], search: string): Word | undefined {
        // Retorna Word se encontrou, undefined se não encontrou
        return words.find((word) => word.word === search);
    }

    // 📚 CONCEITO: Função que sempre retorna algo
    static getRandomWord(words: Word[]): Word {
        const randomIndex = Math.floor(Math.random() * words.length);
        return {
            word: words[randomIndex].word,
            meaning: words[randomIndex].meaning
        };
    }

    // 📚 CONCEITO: Interface como retorno
    static getStats(words: Word[]): Stats {
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

export default CSVService; 