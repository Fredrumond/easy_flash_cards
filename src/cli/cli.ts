// 🖥️ CLI EASY FLASH CARDS - TYPESCRIPT
// Interface de linha de comando com tipagem robusta

import * as readline from 'readline';
import chalk from 'chalk';
import CSVService from '../services/csvService';
import { Word } from '../types';
import { CLIState, MenuOption, InputHandler } from '../types/cli';

// 📚 CONCEITO: Função main tipada
async function main(): Promise<void> {
    // 📚 CONCEITO: Tipagem de argumentos do processo
    const args: string[] = process.argv;
    const [,, filePath]: [string, string, string | undefined] = args as [string, string, string];

    if (!filePath) {
        console.log(chalk.red('Uso: node src/cli/cli.js <filePath>'));
        return;
    }

    try {
        // 📚 CONCEITO: Tipagem de dados carregados
        const words: Word[] = await CSVService.readCSV(filePath);

        if (words.length === 0) {
            console.log(chalk.red('O arquivo CSV está vazio ou inválido.'));
            return;
        }

        // 📚 CONCEITO: Interface tipada do readline
        const rl: readline.Interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        // 📚 CONCEITO: Estado da aplicação tipado
        const state: CLIState = {
            currentWordIndex: 0,
            words: words,
            wordCount: words.length
        };

        // 📚 CONCEITO: Função pura tipada
        const showMenu = (): void => {
            console.log(chalk.cyan('\nMenu:'));
            console.log(chalk.green('1 - Revelar significado'));
            console.log(chalk.green('2 - Próxima palavra'));
            console.log(chalk.red('3 - Sair\n'));
        };

        // 📚 CONCEITO: Função com side effects tipada
        const nextWord = (): void => {
            state.currentWordIndex = Math.floor(Math.random() * state.wordCount);
            const currentWord: Word = state.words[state.currentWordIndex];
            console.log(chalk.yellow.bold(`\nPalavra: ${currentWord.word}`));
            showMenu();
        };

        // 📚 CONCEITO: Function com type guards
        const isValidMenuOption = (input: string): input is MenuOption => {
            return ['1', '2', '3'].includes(input.trim());
        };

        // 📚 CONCEITO: Handler tipado com pattern matching
        const handleInput: InputHandler = (input: string): void => {
            const cleanInput: string = input.trim();
            
            if (!isValidMenuOption(cleanInput)) {
                console.log(chalk.red('Opção inválida. Escolha 1, 2 ou 3.'));
                showMenu();
                return;
            }

            const currentWord: Word = state.words[state.currentWordIndex];

            switch (cleanInput) {
                case '1': // Revelar significado
                    console.log(chalk.green(`Significado: ${currentWord.meaning}`));
                    showMenu();
                    break;
                
                case '2': // Próxima palavra
                    nextWord();
                    break;
                
                case '3': // Sair
                    console.log(chalk.red('Encerrando o programa. Até mais!'));
                    rl.close();
                    return;
                
                default:
                    // 📚 CONCEITO: TypeScript never type (nunca deveria chegar aqui)
                    const exhaustiveCheck: never = cleanInput;
                    console.log(chalk.red('Erro inesperado'));
                    return exhaustiveCheck;
            }
        };

        // 📚 CONCEITO: Inicialização da aplicação
        console.log(chalk.blue('Bem-vindo ao Easy Flash Cards!'));
        nextWord();

        // 📚 CONCEITO: Event listener tipado
        rl.on('line', handleInput);

        // 📚 CONCEITO: Cleanup tipado
        rl.on('close', (): void => {
            console.log(chalk.blue('Obrigado por usar o Easy Flash Cards!'));
            process.exit(0);
        });

    } catch (error) {
        // 📚 CONCEITO: Error handling tipado
        const errorMessage: string = error instanceof Error ? error.message : 'Erro desconhecido';
        console.log(chalk.red(`Erro: ${errorMessage}`));
        process.exit(1);
    }
}

// 📚 CONCEITO: IIFE (Immediately Invoked Function Expression) tipada
(async (): Promise<void> => {
    try {
        await main();
    } catch (error) {
        const errorMessage: string = error instanceof Error ? error.message : 'Erro crítico';
        console.error(chalk.red(`Erro fatal: ${errorMessage}`));
        process.exit(1);
    }
})(); 