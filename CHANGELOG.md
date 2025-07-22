# 📋 Changelog

Todas as mudanças notáveis do projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.3] - 2025-07-22

### 🎯 **ULTRA MINIMALISTA**

#### ⚡ **Honestidade Técnica**
- **✅ Realidade aceita** - 610 linhas = pipeline ultra simples
- **✅ Over-engineering removido** - De 250 linhas YAML para 12 linhas
- **✅ Foco no essencial** - Apenas `npm test`
- **✅ Proporção correta** - Pipeline adequada ao tamanho

#### 📦 **Pipeline Final (12 linhas):**
```yaml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci  
      - run: npm test
```

### 🧹 **Removido (porque era desnecessário):**
- ❌ **Múltiplas versões Node** - 610 linhas não precisam
- ❌ **Security audit** - `npm audit` local é suficiente  
- ❌ **Type check separado** - Jest já compila
- ❌ **Artifacts** - Para quê?
- ❌ **Coverage upload** - Overkill total
- ❌ **Dependabot** - Atualizações manuais são ok
- ❌ **Jobs paralelos** - Complexidade desnecessária

### 🎓 **Lição Aprendida**
- **Engineering adequado** > Over-engineering
- **610 linhas** de código ≠ **pipeline enterprise**
- **Simplicidade** é uma virtude técnica
- **Projeto de estudo** ≠ **projeto crítico de produção**

### ⏱️ **Performance**
- **Tempo**: ~1-2 minutos (era 8-10 min)
- **Complexidade**: Qualquer dev entende em 30s
- **Manutenção**: Zero esforço

---

## [1.1.2] - 2025-07-22

### 🎯 **PIPELINE SIMPLIFICATION**

#### ⚡ **Complexidade Reduzida**
- **✅ Single job pipeline** - De 6 jobs para 1 job otimizado
- **✅ Matriz removida** - Teste apenas no Node.js 20 (padrão)
- **✅ Artifacts eliminados** - Sem uploads desnecessários
- **✅ Deploy pipeline removida** - Desnecessária para projeto pequeno
- **✅ CodeQL removida** - Security scan integrado ao CI principal

#### 🛠️ **O que mantivemos (essencial):**
- **✅ Type checking** - Verificação de tipos TypeScript
- **✅ Unit tests** - Todos os 18 testes funcionais
- **✅ Security audit** - Auto-fix de vulnerabilidades
- **✅ Node.js 20** - Versão LTS estável

#### 📦 **Dependabot Simplificado**
- **✅ Apenas NPM** - Removido Docker e GitHub Actions
- **✅ Weekly updates** - Frequência adequada
- **✅ 5 PRs max** - Limite realista

### 🚀 **Benefícios**
- **Tempo de execução** - De ~8-10 minutos para ~3-4 minutos
- **Recursos menores** - Menos consumo de GitHub Actions
- **Manutenção simples** - Pipeline fácil de entender e modificar
- **Adequado ao projeto** - Proporcional ao tamanho (600 linhas)

### 📊 **Comparação**

| Aspecto | Antes | Depois |
|---------|-------|--------|
| Jobs | 6 paralelos | 1 único |
| Node versions | 3 (18,20,21) | 1 (20) |
| Artifacts | 4 diferentes | 0 |
| Tempo estimado | 8-10 min | 3-4 min |
| Linhas de YAML | ~250 | ~35 |

---

## [1.1.1] - 2025-07-22

### 🎉 MAJOR IMPROVEMENTS

#### 🔄 **TypeScript Migration (100% Complete)**
- **✅ Complete migration** from JavaScript to TypeScript
- **✅ Type-safe API** - All endpoints with proper typing
- **✅ Type-safe CLI** - Interactive interface with robust types  
- **✅ Type definitions** - Custom interfaces for all data structures

#### 🚀 **Enhanced CI/CD Pipeline**
- **✅ Professional pipeline** with 6 parallel jobs
- **✅ Multi-Node testing** - Node.js 18, 20, 21 support
- **✅ Security scanning** - CodeQL integration
- **✅ Automated deployments** - Docker + GitHub Container Registry
- **✅ Dependabot integration** - Automatic dependency updates

#### 🧪 **Improved Testing**
- **✅ API endpoint tests** - 18 comprehensive tests
- **✅ Coverage reporting** - Automated coverage analysis  
- **✅ Performance testing** - Build and execution metrics
- **✅ Type checking** - Compile-time error detection

### 📚 **Added**
- **TypeScript Configuration** - Complete setup with strict mode
- **API Types** - Request/Response interfaces
- **CLI Types** - Menu options and state management
- **Build System** - Automated TS → JS compilation
- **Docker Support** - Automated Dockerfile generation
- **Security Scanning** - Weekly CodeQL analysis
- **Release Automation** - Automated packaging and documentation

### 🔧 **Changed**
- **API Server** - Migrated from `server.js` to `server.ts`
- **CLI Application** - Migrated from `cli.js` to `cli.ts`  
- **CSV Service** - Migrated from `csvService.js` to `csvService.ts`
- **Build Process** - Now requires TypeScript compilation
- **Test Execution** - Automatic build before testing
- **Error Handling** - Type-safe error management

### 🏗️ **Infrastructure**
- **GitHub Actions** - 4 professional pipelines
- **Dependabot** - Automated dependency management
- **Code Quality** - Type checking in CI/CD
- **Security** - Vulnerability scanning and reporting
- **Documentation** - Comprehensive pipeline documentation

### 🔒 **Security**
- **Dependency Auditing** - Automated npm audit in CI
- **Vulnerability Scanning** - CodeQL security analysis
- **Type Safety** - Compile-time error prevention
- **Container Security** - Secure Docker image generation

### 📊 **Performance**
- **Build Optimization** - Efficient TypeScript compilation
- **Cache Strategy** - npm cache in CI/CD pipelines
- **Parallel Execution** - Multiple Node.js versions tested simultaneously
- **Artifact Management** - Optimized build artifact handling

### 🎯 **Developer Experience**
- **IntelliSense** - Enhanced VS Code support
- **Type Checking** - Real-time error detection
- **Refactoring Safety** - Type-guided code changes
- **Documentation** - Self-documenting code through types

---

## [1.0.0] - 2025-07-15

### 🎉 **Initial Release**
- **✅ CLI Application** - Interactive flashcard study interface
- **✅ REST API** - Complete API for word management
- **✅ CSV Support** - Read/write flashcard data
- **✅ Basic Testing** - Jest test suite
- **✅ Documentation** - Comprehensive README

### 📚 **Features**
- Interactive CLI with colored output
- REST API with Express.js
- CSV file management
- Random word selection
- Statistics generation
- CORS support for web integration

### 🔧 **Technical**
- Node.js 16+ support
- Express.js framework
- Jest testing framework
- Chalk for terminal colors
- CSV-parser for file handling

---

## 🔗 **Links**
- [Compare v1.0.0...v1.1.0](https://github.com/fredericodrumond/easy_flash_cards/compare/v1.0.0...v1.1.0)
- [Full Changelog](https://github.com/fredericodrumond/easy_flash_cards/blob/main/CHANGELOG.md) 