# 🚀 GitHub Actions Pipelines

Este documento explica todas as pipelines configuradas para o projeto Easy Flash Cards.

## 📋 Pipelines Disponíveis

### 🔄 Pipeline Principal: `ci.yml`
**Executa em:** Push/PR para `main` e `develop`

#### Jobs:
1. **📊 Code Quality & Types**
   - ✅ TypeScript type checking
   - ✅ Build validation
   - ✅ Upload de artefatos

2. **🧪 Tests (Matrix)**
   - ✅ Testes em Node.js 18, 20, 21
   - ✅ Coverage report
   - ✅ Upload para Codecov

3. **🔒 Security Scan**
   - ✅ npm audit
   - ✅ Vulnerability detection
   - ✅ Security reports

4. **🚀 Build & Performance**
   - ✅ Build validation
   - ✅ API testing
   - ✅ Performance metrics

5. **📦 Package & Release**
   - ✅ Release preparation (apenas main)
   - ✅ Build info generation
   - ✅ Release artifacts

6. **📋 Summary**
   - ✅ Pipeline status summary
   - ✅ Deployment readiness

### 🚀 Pipeline de Deploy: `deploy.yml`
**Executa em:** Releases publicados ou manual

#### Jobs:
1. **🏗️ Production Build**
   - ✅ Build otimizado para produção
   - ✅ Dockerfile automático
   - ✅ Scripts de startup

2. **🐳 Docker Build**
   - ✅ Build da imagem Docker
   - ✅ Push para GitHub Container Registry
   - ✅ Cache otimizado

3. **📋 Release Documentation**
   - ✅ Release notes automáticas
   - ✅ Deploy instructions
   - ✅ Technical details

### 🔒 Pipeline de Segurança: `codeql.yml`
**Executa em:** Push/PR e agendamento semanal

#### Features:
- ✅ Análise de código estática
- ✅ Detecção de vulnerabilidades
- ✅ Security reporting
- ✅ Extended security queries

### 🔧 Pipeline Legacy: `develop_test.yml`
**Executa em:** Feature branches ou manual

#### Uso:
- ✅ Testes rápidos para desenvolvimento
- ✅ Validação básica de tipos
- ✅ Feedback rápido em features

## 🔄 Dependabot: `dependabot.yml`

### Configuração:
- **📦 NPM:** Updates semanais (segunda-feira)
- **🐳 Docker:** Updates semanais (terça-feira)  
- **🔧 GitHub Actions:** Updates semanais (quarta-feira)

### Grupos:
- **Dev Dependencies:** @types/*, typescript, jest, etc.
- **Production Dependencies:** express, cors, chalk, etc.
- **Security Updates:** Todas as dependências

## 🎯 Estratégia de Branching

### 🌟 Branch `main`
- ✅ Pipeline completa (ci.yml)
- ✅ Security scan (codeql.yml)
- ✅ Package & release preparation
- ✅ Deploy automático em releases

### 🔧 Branch `develop`
- ✅ Pipeline completa (ci.yml)
- ✅ Security scan (codeql.yml)
- ❌ Sem deploy automático

### 🚀 Feature Branches (`feature/*`)
- ✅ Pipeline legacy (develop_test.yml)
- ✅ Testes básicos e type checking

### 🔥 Hotfix Branches (`hotfix/*`)
- ✅ Pipeline legacy (develop_test.yml)
- ✅ Validação rápida

## 📊 Badges e Status

Adicione estes badges ao README:

```markdown
[![CI/CD](https://github.com/fredericodrumond/easy_flash_cards/actions/workflows/ci.yml/badge.svg)](https://github.com/fredericodrumond/easy_flash_cards/actions/workflows/ci.yml)
[![Deploy](https://github.com/fredericodrumond/easy_flash_cards/actions/workflows/deploy.yml/badge.svg)](https://github.com/fredericodrumond/easy_flash_cards/actions/workflows/deploy.yml)
[![CodeQL](https://github.com/fredericodrumond/easy_flash_cards/actions/workflows/codeql.yml/badge.svg)](https://github.com/fredericodrumond/easy_flash_cards/actions/workflows/codeql.yml)
[![Coverage](https://codecov.io/gh/fredericodrumond/easy_flash_cards/branch/main/graph/badge.svg)](https://codecov.io/gh/fredericodrumond/easy_flash_cards)
```

## 🚀 Deploy Instructions

### Docker Deploy
```bash
# Pull da imagem mais recente
docker pull ghcr.io/fredericodrumond/easy_flash_cards:latest

# Executar container
docker run -p 3000:3000 ghcr.io/fredericodrumond/easy_flash_cards:latest
```

### Node.js Deploy
```bash
# Download dos artifacts da release
wget https://github.com/fredericodrumond/easy_flash_cards/releases/latest/download/release-package.tar.gz

# Extrair e executar
tar -xzf release-package.tar.gz
cd release-package
./start.sh
```

## 🛠️ Manutenção

### Atualizações Automáticas
- **Dependabot:** Cria PRs automaticamente
- **Automerge:** PRs de patch/minor são aprovados automaticamente
- **Security:** Updates de segurança têm prioridade alta

### Monitoramento
- **Coverage:** Relatórios automáticos no Codecov
- **Security:** Scans semanais com CodeQL
- **Performance:** Métricas de build e teste

---

## 📞 Suporte

Para problemas com as pipelines:
1. Verifique os logs no GitHub Actions
2. Consulte este documento
3. Abra uma issue com detalhes do erro 