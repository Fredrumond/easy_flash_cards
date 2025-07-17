// Arquivo de tipos customizados para csv-parser
// .d.ts = arquivo apenas de tipos (não tem código executável)

declare module 'csv-parser' {
  import { Transform } from 'stream';
  
  // csv-parser é uma função que retorna um Transform stream
  function csvParser(): Transform;
  
  export = csvParser;
} 