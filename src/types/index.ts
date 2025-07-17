// 📚 CONCEITO: Interface
// Interface define a "forma" de um objeto
// É como um contrato: "este objeto DEVE ter essas propriedades com esses tipos"

export interface Word {
  word: string;    // palavra em inglês
  meaning: string; // significado em português
}

// 📚 CONCEITO: Interface extendida
// Pode adicionar propriedades opcionais com ?
export interface WordWithStats extends Word {
  category?: string;     // ? = opcional
  studyCount?: number;   // ? = pode ser undefined
  correctCount?: number; // ? = pode não existir
}

// 📚 CONCEITO: Tipos de estatísticas
export interface Stats {
  totalWords: number;
  averageWordLength: number;
  averageMeaningLength: number;
} 