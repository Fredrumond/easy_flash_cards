module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/*.test.js'],
    // Timeout maior para testes de API
    testTimeout: 10000,
    
    // 📊 Configuração de Coverage
    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.{js,ts}',
        '!src/**/*.d.ts',
        '!src/**/*.test.{js,ts}',
        '!dist/**/*',
    ],
    coverageReporters: [
        'text',           // Console output
        'text-summary',   // Resumo no terminal
        'html',          // Relatório HTML
        'lcov'           // Para integração com ferramentas
    ],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70
        }
    }
};