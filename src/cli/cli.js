const readline = require('readline');
const chalk = require('chalk');
const CSVService = require('../services/csvService');

async function main() {
    const [,, filePath] = process.argv;

    if (!filePath) {
        console.log(chalk.red('Uso: node src/cli/cli.js <filePath>'));
        return;
    }

    const words = await CSVService.readCSV(filePath);

    if (words.length === 0) {
        console.log(chalk.red('O arquivo CSV está vazio ou inválido.'));
        return;
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const showMenu = () => {
        console.log(chalk.cyan('\nMenu:'));
        console.log(chalk.green('1 - Revelar significado'));
        console.log(chalk.green('2 - Próxima palavra'));
        console.log(chalk.red('3 - Sair\n'));
    };

    let currentWordIndex = 0;
    const wordCount = words.length;

    const nextWord = () => {
        currentWordIndex = Math.floor(Math.random() * wordCount);
        console.log(chalk.yellow.bold(`\nPalavra: ${words[currentWordIndex].word}`));
        showMenu();
    };

    const handleInput = (input) => {
        switch (input.trim()) {
            case '1': // Revelar significado
                console.log(chalk.green(`Significado: ${words[currentWordIndex].meaning}`));
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
                console.log(chalk.red('Opção inválida. Escolha 1, 2 ou 3.'));
                showMenu();
        }
    };

    console.log(chalk.blue('Bem-vindo ao Easy Flash Cards!'));
    nextWord();

    rl.on('line', handleInput);
}

main();
