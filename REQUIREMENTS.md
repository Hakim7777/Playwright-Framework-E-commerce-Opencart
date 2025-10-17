# 📋 Requirements - Framework Playwright OpenCart

> **Projet**: Framework de Test Automation E2E  
> **Auteur**: **SAHRAOUI Abdelhakim**  
> **Email**: Hakimsahraoui.de@gmail.com  
> **Date**: Octobre 2025

---

## 🎯 Exigences Fonctionnelles

### 1. Gestion des Comptes Utilisateur
- ✅ **RF-001**: L'utilisateur doit pouvoir créer un nouveau compte
- ✅ **RF-002**: L'utilisateur doit pouvoir se connecter avec des identifiants valides
- ✅ **RF-003**: Le système doit rejeter les identifiants invalides
- ✅ **RF-004**: L'utilisateur doit pouvoir se déconnecter
- ✅ **RF-005**: Les données utilisateur doivent être générées aléatoirement (Faker.js)

### 2. Gestion du Catalogue Produits
- ✅ **RF-006**: L'utilisateur doit pouvoir rechercher un produit par nom
- ✅ **RF-007**: Les résultats de recherche doivent afficher les produits correspondants
- ✅ **RF-008**: L'utilisateur doit pouvoir consulter les détails d'un produit
- ✅ **RF-009**: Le prix du produit doit être affiché correctement

### 3. Gestion du Panier
- ✅ **RF-010**: L'utilisateur doit pouvoir ajouter un produit au panier
- ✅ **RF-011**: L'utilisateur doit pouvoir ajouter plusieurs produits différents
- ✅ **RF-012**: L'utilisateur doit pouvoir modifier la quantité d'un produit
- ✅ **RF-013**: L'utilisateur doit pouvoir supprimer un produit du panier
- ✅ **RF-014**: Le total du panier doit être calculé correctement
- ✅ **RF-015**: Le panier doit persister entre les pages

### 4. Navigation et Interface
- ✅ **RF-016**: La page d'accueil doit charger correctement
- ✅ **RF-017**: Le logo doit être visible
- ✅ **RF-018**: Le menu de navigation doit être fonctionnel
- ✅ **RF-019**: La recherche rapide doit être accessible depuis toutes les pages
- ✅ **RF-020**: Le panier vide doit afficher un message approprié

---

## 🔧 Exigences Techniques

### 1. Technologies Requises

| Technologie | Version Minimale | Version Testée | Obligatoire |
|-------------|------------------|----------------|-------------|
| **Node.js** | 18.x | 22.9.0 | ✅ Oui |
| **npm** | 9.x | 10.8.3 | ✅ Oui |
| **TypeScript** | 5.x | 5.7.2 | ✅ Oui |
| **Playwright** | 1.40.x | 1.52.0 | ✅ Oui |
| **Faker.js** | 9.x | 9.8.0 | ✅ Oui |
| **Git** | 2.x | 2.49.0 | ✅ Oui |

### 2. Navigateurs Supportés

| Navigateur | Version | Statut |
|------------|---------|--------|
| **Chromium** | Latest | ✅ Testé |
| **Firefox** | Latest | ✅ Testé |
| **WebKit** | Latest | ✅ Testé |
| **MS Edge** | Latest | ✅ Testé |

### 3. Système d'Exploitation

| OS | Version | Statut |
|----|---------|--------|
| **Windows** | 10/11 | ✅ Développé sur Windows |
| **macOS** | 12+ | ⚠️ Compatible (non testé) |
| **Linux** | Ubuntu 20.04+ | ⚠️ Compatible (non testé) |

### 4. Application Sous Test (AUT)

```yaml
Application: OpenCart
Version: 3.x
URL Locale: http://localhost/opencart/
Type: E-commerce
Environnement: WAMP/XAMPP (localhost)
Base de données: MySQL
```

---

## 🏗️ Exigences d'Architecture

### 1. Pattern de Conception
- ✅ **Page Object Model (POM)** obligatoire
- ✅ Séparation des préoccupations (tests / pages / utils)
- ✅ Réutilisabilité du code maximale
- ✅ Maintenabilité et évolutivité

### 2. Structure des Fichiers
```
Pages/          # Classes Page Object
tests/          # Fichiers de tests
testdata/       # Données de test (JSON, CSV)
Utils/          # Utilitaires (Faker, helpers)
allure-results/ # Résultats Allure
playwright-report/ # Rapports HTML
```

### 3. Conventions de Nommage
- **Pages**: `PascalCase` (ex: `HomePage.ts`)
- **Tests**: `camelCase.spec.ts` (ex: `login.spec.ts`)
- **Méthodes**: `camelCase` (ex: `clickLogin()`)
- **Locators**: `camelCase` avec préfixe (ex: `btnSubmit`, `txtEmail`)

---

## 📊 Exigences de Qualité

### 1. Couverture de Tests
- ✅ **Minimum 90%** des fonctionnalités critiques
- ✅ Tests E2E complets (end-to-end)
- ✅ Tests de régression automatisés
- ✅ Tests data-driven (JSON + CSV)
- ✅ **Statut actuel**: 19 tests - 100% passing ✅

### 2. Performance des Tests
- ✅ Temps d'exécution total < 3 minutes (Chromium)
- ✅ Aucun `waitForTimeout` (remplacé par attentes dynamiques)
- ✅ Retry automatique en cas d'échec (1 retry configuré)
- ✅ Parallélisation possible (workers configurables)

### 3. Stabilité et Fiabilité
- ✅ Taux de réussite minimum: **95%**
- ✅ **Statut actuel**: 100% passing ✅
- ✅ Aucun test flaky
- ✅ Gestion robuste des attentes AJAX
- ✅ Gestion des erreurs de strict mode

### 4. Reporting
- ✅ Rapports HTML natifs Playwright
- ✅ Intégration Allure Reports
- ✅ Screenshots en cas d'échec
- ✅ Vidéos des tests en échec
- ✅ Traces détaillées pour debug

---

## 🔐 Exigences de Sécurité

### 1. Gestion des Données Sensibles
- ✅ Pas de credentials hardcodés
- ✅ Utilisation de données de test générées (Faker.js)
- ✅ Fichiers `.env` pour configurations sensibles (si nécessaire)
- ✅ `.gitignore` configuré correctement

### 2. Bonnes Pratiques
- ✅ Pas de données de production utilisées
- ✅ Environnement de test isolé (localhost)
- ✅ Nettoyage des données après tests (si applicable)

---

## 📦 Exigences d'Installation

### 1. Prérequis Système
```powershell
# Vérifier Node.js
node --version  # Doit afficher v22.9.0 ou supérieur

# Vérifier npm
npm --version   # Doit afficher 10.8.3 ou supérieur

# Vérifier Git
git --version   # Doit afficher 2.x ou supérieur
```

### 2. Installation du Projet
```powershell
# Cloner le repository
git clone https://github.com/Hakim7777/Framework-Playwright-OpenCart.git

# Installer les dépendances
npm install

# Installer les navigateurs Playwright
npx playwright install
```

### 3. Configuration OpenCart
- WAMP ou XAMPP installé et démarré
- OpenCart installé dans `htdocs/opencart/`
- Base de données MySQL configurée
- URL accessible: `http://localhost/opencart/`

---

## 🧪 Exigences de Test

### 1. Types de Tests Requis
- ✅ **Tests Sanity** (@sanity) - Tests de fumée
- ✅ **Tests Master** (@master) - Tests critiques
- ✅ **Tests Regression** (@regression) - Tests de régression
- ✅ **Tests Data-Driven** (@datadriven) - Tests paramétrés
- ✅ **Tests E2E** (@end-to-end) - Tests bout en bout
- ✅ **Tests Cart** (@cart) - Tests panier spécifiques

### 2. Assertions Obligatoires
- ✅ Vérification des éléments visibles (`isVisible()`)
- ✅ Vérification des textes (`toContain()`, `toBe()`)
- ✅ Vérification des URL (`toContain()`, `toBe()`)
- ✅ Vérification des états (`toBeGreaterThan()`, `toBeTruthy()`)
- ✅ Attentes explicites avec timeout

### 3. Gestion des Waits
- ❌ **INTERDIT**: `waitForTimeout()` (hard wait)
- ✅ **OBLIGATOIRE**: `waitForLoadState('networkidle')`
- ✅ **OBLIGATOIRE**: `waitFor({ state: 'visible' })`
- ✅ **OBLIGATOIRE**: `waitForResponse()` pour AJAX
- ✅ **OBLIGATOIRE**: `waitForFunction()` pour conditions complexes

---

## 📈 Exigences de Reporting

### 1. Rapports Obligatoires
- ✅ Rapport HTML Playwright (natif)
- ✅ Rapport Allure (avec graphiques)
- ✅ Screenshots des échecs
- ✅ Vidéos des échecs
- ✅ Traces Playwright pour debug

### 2. Métriques à Suivre
```yaml
Tests Totaux: 19
Tests Passing: 19 (100%)
Tests Failed: 0 (0%)
Tests Skipped: 0 (0%)
Durée Totale: ~1.6 minutes (Chromium)
Stabilité: 100%
Coverage: 100% des fonctionnalités critiques
```

---

## 🔄 Exigences de CI/CD (Futur)

### 1. Intégration Continue
- ⏳ GitHub Actions workflow
- ⏳ Tests automatiques sur chaque push
- ⏳ Tests automatiques sur chaque Pull Request
- ⏳ Notifications en cas d'échec

### 2. Déploiement Continu
- ⏳ Publication des rapports Allure
- ⏳ Badge de statut des tests
- ⏳ Historique des tests

---

## ✅ Exigences Satisfaites

### Résumé des Accomplissements
**Développé par SAHRAOUI Abdelhakim**

✅ **Architecture**
- Page Object Model implémenté
- Structure modulaire et maintenable
- Séparation claire des responsabilités

✅ **Tests**
- 19 tests E2E complets (100% passing)
- Data-driven testing (JSON + CSV)
- Multi-browser support
- Tags et catégorisation

✅ **Qualité**
- Aucun test flaky
- Attentes robustes (pas de waitForTimeout)
- Gestion des erreurs strict mode
- Screenshots et vidéos des échecs

✅ **Documentation**
- README.md complet
- REQUIREMENTS.md détaillé
- TEST_CASES.md à venir
- Commentaires dans le code

✅ **Outils**
- Playwright 1.52.0
- TypeScript 5.7.2
- Faker.js 9.8.0
- Allure Reports 3.2.2

---

## 📞 Contact

**SAHRAOUI Abdelhakim**
- 📧 Email: Hakimsahraoui.de@gmail.com
- 🐙 GitHub: [@Hakim7777](https://github.com/Hakim7777)

---

**Date de dernière mise à jour**: Octobre 2025  
**Version du document**: 1.0.0
