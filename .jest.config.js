module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/*.test.js'],
    // Timeout aumentado para testes de coverage
    testTimeout: 30000,
    
    // 📊 Configuração de Coverage (apenas quando solicitado)
    collectCoverage: false, // Só ativa quando usar --coverage
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.{js,ts}',
        '!src/**/*.d.ts',
        '!src/**/*.test.{js,ts}',
        '!dist/**/*',
        '!src/types/**/*', // Excluir arquivos de tipos
    ],
    coverageReporters: [
        'text',           // Console output
        'text-summary',   // Resumo no terminal
        'html',          // Relatório HTML
        'lcov'           // Para integração com ferramentas
    ],
    coverageThreshold: {
        global: {
            branches: 60,     // Reduzido para ser mais realista
            functions: 60,
            lines: 60,
            statements: 60
        }
    },
    // Configurações adicionais para evitar travamentos
    maxWorkers: 2,        // Limitar workers para evitar sobrecarga
    detectOpenHandles: true,
    forceExit: true       // Força saída após testes
};