# 🎭 Framework Playwright - OpenCart Test Automation

[![Playwright Tests](https://img.shields.io/badge/tests-19%20passing-brightgreen)](https://github.com/Hakim7777/Framework-Playwright-OpenCart)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.52.0-orange)](https://playwright.dev/)

> **Auteur**: **SAHRAOUI Abdelhakim**  
> **Email**: Hakimsahraoui.de@gmail.com  
> **GitHub**: [@Hakim7777](https://github.com/Hakim7777)  
> **Date**: Octobre 2025

---

## 📋 Description du Projet

Framework de test automation end-to-end (E2E) développé avec **Playwright** et **TypeScript** pour l'application e-commerce **OpenCart**. Ce projet implémente le pattern **Page Object Model (POM)** pour une maintenance optimale et une réutilisabilité maximale du code.

### 🎯 Objectifs
- ✅ Tests automatisés de bout en bout pour OpenCart
- ✅ Couverture complète des fonctionnalités e-commerce
- ✅ Architecture maintenable avec Page Object Model
- ✅ Data-driven testing (JSON & CSV)
- ✅ Multi-browser testing (Chromium, Firefox, WebKit, Edge)
- ✅ Rapports Allure intégrés

---

## 🏗️ Architecture du Projet

```
Framework-Playwright-OpenCart/
│
├── 📁 Pages/                          # Page Object Model (POM)
│   ├── HomePage.ts                    # Page d'accueil
│   ├── RegistrationPage.ts            # Inscription utilisateur
│   ├── LoginPage.ts                   # Connexion
│   ├── MyAccountPage.ts               # Mon compte
│   ├── LogoutPage.ts                  # Déconnexion
│   ├── ProductPage.ts                 # Page produit
│   ├── ShoppingCartPage.ts            # Panier
│   ├── CheckoutPage.ts                # Paiement
│   └── SearchResultsPage.ts           # Résultats de recherche
│
├── 📁 tests/                          # Tests E2E
│   ├── AccountRegistration.spec.ts    # Test d'inscription
│   ├── Login.spec.ts                  # Test de connexion
│   ├── LoginDataDriven.spec.ts        # Tests data-driven
│   ├── Logout.spec.ts                 # Test de déconnexion
│   ├── AddToCart.spec.ts              # Ajout au panier
│   ├── ShoppingCart.spec.ts           # Gestion du panier
│   ├── SearchProduct.spec.ts          # Recherche de produit
│   ├── EndToEndTest.spec.ts           # Test E2E complet
│   └── home.spec.ts                   # Tests page d'accueil
│
├── 📁 testdata/                       # Données de test
│   ├── loginData.json                 # Données JSON
│   └── loginData.csv                  # Données CSV
│
├── 📁 Utils/                          # Utilitaires
│   └── randomDataGenerator.ts         # Génération de données aléatoires (Faker.js)
│
├── 📁 allure-results/                 # Résultats Allure
├── 📁 playwright-report/              # Rapports Playwright
├── 📁 test-results/                   # Résultats des tests
│
├── playwright.config.ts               # Configuration Playwright
├── test.config.ts                     # Configuration des tests
├── package.json                       # Dépendances du projet
└── README.md                          # Documentation (ce fichier)
```

---

## 🚀 Installation et Configuration

### Prérequis
- **Node.js**: v22.9.0 ou supérieur
- **npm**: 10.8.3 ou supérieur
- **OpenCart**: Installation locale (http://localhost/opencart/)
- **Git**: Pour le versioning

### Installation

```powershell
# Cloner le repository
git clone https://github.com/Hakim7777/Framework-Playwright-OpenCart.git
cd Framework-Playwright-OpenCart

# Installer les dépendances
npm install

# Installer les navigateurs Playwright
npx playwright install
```

---

## 🎬 Exécution des Tests

### Commandes de base

```powershell
# Exécuter tous les tests (tous les navigateurs)
npx playwright test

# Exécuter les tests sur Chromium uniquement
npx playwright test --project=chromium

# Exécuter les tests en mode headed (visible)
npx playwright test --headed

# Exécuter un fichier de test spécifique
npx playwright test tests/Login.spec.ts

# Exécuter les tests avec un tag spécifique
npx playwright test --grep @regression

# Mode debug
npx playwright test --debug
```

### Commandes avancées

```powershell
# Exécuter les tests et générer un rapport HTML
npx playwright test --reporter=html

# Afficher le rapport HTML
npx playwright show-report

# Exécuter les tests avec rapport Allure
npm run test:allure

# Générer et ouvrir le rapport Allure
npm run allure:report
```

---

## 📊 Couverture des Tests

### ✅ 19 Tests - 100% de Réussite

| Catégorie | Tests | Description |
|-----------|-------|-------------|
| **Account Management** | 3 tests | Inscription, Connexion, Déconnexion |
| **Data-Driven Login** | 4 tests | Tests avec JSON et CSV |
| **Product Management** | 2 tests | Recherche, Ajout au panier |
| **Shopping Cart** | 4 tests | Ajouter, Modifier, Supprimer, Vérifier total |
| **Home Page** | 5 tests | Navigation, Recherche, Header, Logo, État initial |
| **End-to-End** | 1 test | Workflow complet utilisateur |

### Tags disponibles
- `@master` - Tests critiques
- `@sanity` - Tests de smoke
- `@regression` - Tests de régression
- `@cart` - Tests du panier
- `@datadriven` - Tests data-driven
- `@end-to-end` - Tests E2E complets

---

## 🔧 Configuration

### Navigateurs supportés
- ✅ **Chromium** (Google Chrome)
- ✅ **Firefox**
- ✅ **WebKit** (Safari)
- ✅ **Microsoft Edge**

### Configuration Playwright (`playwright.config.ts`)
```typescript
testDir: './tests'
timeout: 30000
retries: 1
workers: 1
baseURL: 'http://localhost/opencart/'
viewport: { width: 1280, height: 720 }
```

---

## 📦 Dépendances Principales

| Package | Version | Usage |
|---------|---------|-------|
| `@playwright/test` | 1.52.0 | Framework de test |
| `typescript` | 5.7.2 | Langage de programmation |
| `@faker-js/faker` | 9.8.0 | Génération de données aléatoires |
| `allure-playwright` | 3.1.1 | Rapports Allure |

---

## 🎨 Fonctionnalités Principales

### 1. **Page Object Model (POM)**
- Architecture modulaire et maintenable
- Réutilisation du code maximale
- Séparation des préoccupations

### 2. **Data-Driven Testing**
- Tests paramétrés avec JSON
- Tests paramétrés avec CSV
- Génération de données aléatoires avec Faker.js

### 3. **Multi-Browser Testing**
- Chromium, Firefox, WebKit, Edge
- Tests parallèles ou séquentiels
- Configuration flexible

### 4. **Rapports et Logs**
- Rapports HTML natifs Playwright
- Intégration Allure Reports
- Screenshots et vidéos en cas d'échec
- Traces détaillées pour le debug

### 5. **Attentes Robustes**
- Remplacement de tous les `waitForTimeout`
- Utilisation de `waitForLoadState('networkidle')`
- Attentes explicites avec `waitFor()`
- Gestion des réponses AJAX

---

## 🐛 Corrections Majeures Appliquées

### ✅ Problèmes résolus par **SAHRAOUI Abdelhakim**

1. **ProductPage.isConfirmationMessageVisible()**
   - ❌ Avant: Retournait toujours `true`
   - ✅ Après: Attend et vérifie correctement le message

2. **Strict Mode Violations**
   - ❌ Avant: Multiples éléments matchés
   - ✅ Après: Utilisation de `.first()` systématique

3. **waitForTimeout Anti-patterns**
   - ❌ Avant: 30+ occurrences de `waitForTimeout`
   - ✅ Après: Remplacés par `waitForLoadState()` et `waitFor()`

4. **Import Casing**
   - ❌ Avant: `../pages/` (lowercase)
   - ✅ Après: `../Pages/` (capital P)

5. **Test Remove Product**
   - ❌ Avant: Test flaky avec timeout
   - ✅ Après: Attente AJAX avec `waitForResponse()`

6. **HomePage Login Link**
   - ❌ Avant: Strict mode violation
   - ✅ Après: Sélecteur spécifique avec fallback

7. **ProductPage View Cart**
   - ❌ Avant: Sélecteur ambigu
   - ✅ Après: Sélecteur ciblé avec attente

---

## 📈 Métriques de Qualité

```
✅ Tests Passing: 19/19 (100%)
⏭️ Tests Skipped: 0
❌ Tests Failed: 0
⏱️ Temps d'exécution: ~1.6 minutes (Chromium)
🔄 Taux de retry: 1 (configuré)
🎯 Stabilité: 100%
```

---

## 🤝 Contribution

Développé et maintenu par **SAHRAOUI Abdelhakim**.

Pour toute question ou suggestion :
- 📧 Email: Hakimsahraoui.de@gmail.com
- 🐙 GitHub: [@Hakim7777](https://github.com/Hakim7777)

---

## 📄 Licence

Ce projet est développé dans un cadre éducatif et professionnel.

---

## 🙏 Remerciements

- **Playwright Team** - Framework de test exceptionnel
- **OpenCart** - Plateforme e-commerce de test
- **Faker.js** - Génération de données de test
- **Allure Framework** - Rapports visuels impressionnants

---

## 📝 Notes de Version

### Version 1.0.0 (Octobre 2025)
- ✅ 19 tests E2E complets
- ✅ Architecture POM complète
- ✅ Data-driven testing (JSON/CSV)
- ✅ Multi-browser support
- ✅ Intégration Allure Reports
- ✅ 100% de tests passants
- ✅ Documentation complète

---

**Développé avec ❤️ par SAHRAOUI Abdelhakim**  
*Framework Playwright - OpenCart Test Automation*
