// 🖥️ TIPOS DO CLI
// Interfaces para tipagem da aplicação de linha de comando

import { Word } from './index';

// 📋 Menu Options
export type MenuOption = '1' | '2' | '3';

// 🎯 CLI State
export interface CLIState {
    currentWordIndex: number;
    words: Word[];
    wordCount: number;
}

// ⌨️ User Input Handler
export type InputHandler = (input: string) => void;

// 🎨 Menu Actions
export interface MenuActions {
    showMeaning: () => void;
    nextWord: () => void;
    exit: () => void;
    showInvalidOption: () => void;
} 