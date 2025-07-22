// 🌐 TIPOS DA API REST
// Interfaces para tipagem das respostas e requests da API

import { Word, Stats } from './index';

// 📡 Base Response
export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    error?: string;
}

// 📋 Response para lista de palavras
export interface WordsResponse extends ApiResponse {
    count: number;
    words: Word[];
}

// 🎲 Response para palavra aleatória  
export interface RandomWordResponse extends ApiResponse {
    word: Word;
}

// 🔍 Response para busca de palavra específica
export interface FindWordResponse extends ApiResponse {
    word?: Word;
    searchedWord?: string;
}

// ➕ Response para adicionar palavra
export interface AddWordResponse extends ApiResponse {
    word: Word;
}

// 📊 Response para estatísticas
export interface StatsResponse extends ApiResponse {
    stats: Stats & {
        filePath: string;
    };
}

// 🚫 Response para erros
export interface ErrorResponse extends ApiResponse {
    success: false;
    error: string;
    message?: string;
}

// 📖 Response da rota raiz
export interface RootResponse {
    message: string;
    version: string;
    endpoints: Record<string, string>;
}

// 📝 Request body para adicionar palavra
export interface AddWordRequest {
    word: string;
    meaning: string;
}

// 🔧 Query parameters
export interface FileQueryParams {
    file?: string;
} 