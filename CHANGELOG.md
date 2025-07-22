# 📋 Changelog

Todas as mudanças notáveis do projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2025-07-22

### 🔒 **SECURITY FIXES**

#### 🛡️ **Vulnerabilidades Corrigidas**
- **✅ path-to-regexp** - Corrigida vulnerabilidade ReDoS de alta severidade
- **✅ @babel/helpers** - Corrigida complexidade ineficiente de RegExp
- **✅ brace-expansion** - Corrigida vulnerabilidade ReDoS
- **✅ express dependencies** - Atualizadas dependências transitivas

#### 🧪 **Pipeline Improvements**
- **✅ Coverage pipeline** - Corrigido travamento no coverage
- **✅ Jest configuration** - Timeout aumentado e workers limitados
- **✅ Open handles fix** - Servidor não inicia automaticamente em testes
- **✅ Security scan** - Auto-fix para vulnerabilidades high/critical

### 🔧 **Fixed**
- **Jest timeout** - Aumentado de 10s para 30s para coverage
- **Open handles** - Servidor Express não trava mais os testes
- **Coverage collection** - Removida redundância na configuração
- **Security pipeline** - Auto-correção de vulnerabilidades

### 🏗️ **Infrastructure**
- **Automated security fixes** - Pipeline aplica correções automaticamente
- **Coverage optimization** - Workers limitados para melhor performance
- **Test reliability** - Cleanup robusto sem handles abertos

---

## [1.1.0] - 2025-07-22

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