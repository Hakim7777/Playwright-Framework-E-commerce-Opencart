# 🧪 Test Cases - Framework Playwright OpenCart

> **Projet**: Framework de Test Automation E2E  
> **Auteur**: **SAHRAOUI Abdelhakim**  
> **Email**: Hakimsahraoui.de@gmail.com  
> **Date**: Octobre 2025  
> **Total Tests**: 19  
> **Statut**: ✅ 100% Passing

---

## 📊 Vue d'Ensemble des Tests

| Catégorie | Nombre de Tests | Statut | Tags |
|-----------|-----------------|--------|------|
| **Account Management** | 3 | ✅ 100% | @master @sanity @regression |
| **Data-Driven Login** | 4 | ✅ 100% | @datadriven |
| **Product Management** | 2 | ✅ 100% | @master @regression |
| **Shopping Cart** | 4 | ✅ 100% | @master @regression @cart |
| **Home Page** | 5 | ✅ 100% | Tests fonctionnels |
| **End-to-End** | 1 | ✅ 100% | @end-to-end |
| **TOTAL** | **19** | **✅ 100%** | - |

---

## 🔐 1. Account Management Tests

### TC-001: User Registration Test
**Fichier**: `tests/AccountRegistration.spec.ts`  
**Tags**: `@master @sanity @regression`  
**Priorité**: 🔴 Critique  
**Auteur**: SAHRAOUI Abdelhakim

#### Objectif
Vérifier qu'un utilisateur peut créer un nouveau compte avec succès sur OpenCart.

#### Pré-requis
- Application OpenCart accessible
- Base de données fonctionnelle
- Faker.js configuré pour génération de données

#### Steps de Test
```gherkin
Given L'utilisateur est sur la page d'accueil OpenCart
When L'utilisateur clique sur "My Account"
And L'utilisateur clique sur "Register"
And L'utilisateur remplit le formulaire avec:
  | First Name     | [Généré par Faker]    |
  | Last Name      | [Généré par Faker]    |
  | Email          | [Généré par Faker]    |
  | Telephone      | [Généré par Faker]    |
  | Password       | [Généré aléatoirement]|
  | Confirm Password| [Même que Password]  |
And L'utilisateur accepte la politique de confidentialité
And L'utilisateur clique sur "Continue"
Then Le message de confirmation "Your Account Has Been Created!" est affiché
And L'utilisateur est redirigé vers "My Account"
```

#### Données de Test
```typescript
// Générées dynamiquement avec Faker.js
firstName: faker.person.firstName()
lastName: faker.person.lastName()
email: faker.internet.email()
telephone: faker.phone.number()
password: faker.internet.password()
```

#### Assertions
- ✅ Titre de la page contient "Your Store"
- ✅ Message de confirmation visible
- ✅ Message = "Your Account Has Been Created!"
- ✅ Redirection vers page "My Account"

#### Résultat Attendu
✅ Compte créé avec succès, message de confirmation affiché.

---

### TC-002: User Login Test
**Fichier**: `tests/Login.spec.ts`  
**Tags**: `@master @sanity @regression`  
**Priorité**: 🔴 Critique  
**Auteur**: SAHRAOUI Abdelhakim

#### Objectif
Vérifier qu'un utilisateur enregistré peut se connecter avec des identifiants valides.

#### Pré-requis
- Compte utilisateur existant
- Email et mot de passe valides

#### Steps de Test
```gherkin
Given L'utilisateur est sur la page d'accueil
When L'utilisateur clique sur "My Account"
And L'utilisateur clique sur "Login"
And L'utilisateur entre son email: "testuser@example.com"
And L'utilisateur entre son mot de passe: "Test@1234"
And L'utilisateur clique sur "Login"
Then L'utilisateur est redirigé vers la page "My Account"
And Le titre de la page est "My Account"
```

#### Données de Test
```typescript
email: "testuser@example.com"
password: "Test@1234"
```

#### Assertions
- ✅ Page "My Account" chargée
- ✅ Titre = "My Account"
- ✅ URL contient "account/account"

#### Résultat Attendu
✅ Connexion réussie, redirection vers "My Account".

---

### TC-003: User Logout Test
**Fichier**: `tests/Logout.spec.ts`  
**Tags**: `@master @regression`  
**Priorité**: 🟡 Moyenne  
**Auteur**: SAHRAOUI Abdelhakim

#### Objectif
Vérifier qu'un utilisateur connecté peut se déconnecter avec succès.

#### Pré-requis
- Utilisateur connecté

#### Steps de Test
```gherkin
Given L'utilisateur est connecté
When L'utilisateur clique sur "My Account" (menu dropdown)
And L'utilisateur clique sur "Logout"
Then L'utilisateur est déconnecté
And La page "Account Logout" est affichée
And Le message de confirmation de déconnexion est visible
```

#### Assertions
- ✅ Page "Account Logout" chargée
- ✅ Message de confirmation affiché
- ✅ Session utilisateur terminée

#### Résultat Attendu
✅ Déconnexion réussie, message de confirmation affiché.

---

## 📊 2. Data-Driven Login Tests

### TC-004: Invalid Login - JSON Data (Non-Existent Credentials)
**Fichier**: `tests/LoginDataDriven.spec.ts`  
**Tags**: `@datadriven`  
**Priorité**: 🟢 Normale  
**Auteur**: SAHRAOUI Abdelhakim

#### Objectif
Vérifier que le système rejette les identifiants inexistants (données JSON).

#### Source de Données
`testdata/loginData.json`

#### Steps de Test
```gherkin
Given L'utilisateur est sur la page de login
When L'utilisateur entre un email inexistant depuis JSON
And L'utilisateur entre un mot de passe inexistant depuis JSON
And L'utilisateur clique sur "Login"
Then Un message d'erreur est affiché
And L'utilisateur reste sur la page de login
```

#### Données de Test (JSON)
```json
{
  "email": "nonexistent@example.com",
  "password": "WrongPassword123"
}
```

#### Assertions
- ✅ Message d'erreur visible
- ✅ Connexion refusée
- ✅ Page de login toujours affichée

#### Résultat Attendu
✅ Connexion rejetée, message d'erreur affiché.

---

### TC-005: Invalid Login - JSON Data (Invalid Credentials)
**Fichier**: `tests/LoginDataDriven.spec.ts`  
**Tags**: `@datadriven`  
**Priorité**: 🟢 Normale  
**Auteur**: SAHRAOUI Abdelhakim

#### Objectif
Vérifier que le système rejette les identifiants invalides (données JSON).

#### Source de Données
`testdata/loginData.json`

#### Résultat Attendu
✅ Connexion rejetée, message d'erreur affiché.

---

### TC-006: Invalid Login - CSV Data (Non-Existent Credentials)
**Fichier**: `tests/LoginDataDriven.spec.ts`  
**Tags**: `@datadriven`  
**Priorité**: 🟢 Normale  
**Auteur**: SAHRAOUI Abdelhakim

#### Objectif
Vérifier que le système rejette les identifiants inexistants (données CSV).

#### Source de Données
`testdata/loginData.csv`

#### Steps de Test
```gherkin
Given L'utilisateur est sur la page de login
When L'utilisateur entre un email inexistant depuis CSV
And L'utilisateur entre un mot de passe inexistant depuis CSV
And L'utilisateur clique sur "Login"
Then Un message d'erreur est affiché
```

#### Données de Test (CSV)
```csv
email,password
invalid@test.com,WrongPass456
fake@example.com,BadPassword789
```

#### Résultat Attendu
✅ Connexion rejetée pour chaque ligne CSV, message d'erreur affiché.

---

### TC-007: Invalid Login - CSV Data (Invalid Credentials)
**Fichier**: `tests/LoginDataDriven.spec.ts`  
**Tags**: `@datadriven`  
**Priorité**: 🟢 Normale  
**Auteur**: SAHRAOUI Abdelhakim

#### Résultat Attendu
✅ Connexion rejetée, message d'erreur affiché.

---

## 🛍️ 3. Product Management Tests

### TC-008: Product Search Test
**Fichier**: `tests/SearchProduct.spec.ts`  
**Tags**: `@master @regression`  
**Priorité**: 🔴 Critique  
**Auteur**: SAHRAOUI Abdelhakim

#### Objectif
Vérifier qu'un utilisateur peut rechercher un produit par nom.

#### Steps de Test
```gherkin
Given L'utilisateur est sur la page d'accueil
When L'utilisateur entre "MacBook" dans la barre de recherche
And L'utilisateur clique sur le bouton "Search"
Then Les résultats de recherche sont affichés
And Au moins un produit contenant "MacBook" est visible
```

#### Données de Test
```typescript
searchTerm: "MacBook"
```

#### Assertions
- ✅ Page de résultats chargée
- ✅ Produit "MacBook" visible dans les résultats
- ✅ URL contient "search"

#### Résultat Attendu
✅ Résultats de recherche affichés avec produits correspondants.

---

### TC-009: Add Product to Cart Test
**Fichier**: `tests/AddToCart.spec.ts`  
**Tags**: `@master @regression`  
**Priorité**: 🔴 Critique  
**Auteur**: SAHRAOUI Abdelhakim

#### Objectif
Vérifier qu'un utilisateur peut ajouter un produit au panier.

#### Steps de Test
```gherkin
Given L'utilisateur est sur la page d'accueil
When L'utilisateur recherche "MacBook"
And L'utilisateur clique sur le produit "MacBook"
And L'utilisateur clique sur "Add to Cart"
Then Un message de confirmation "Success" est affiché
And Le produit est ajouté au panier
And Le compteur du panier est mis à jour
```

#### Données de Test
```typescript
product: "MacBook"
quantity: 1
```

#### Assertions
- ✅ Message de confirmation visible
- ✅ Message contient "Success"
- ✅ Panier mis à jour

#### Résultat Attendu
✅ Produit ajouté au panier, message de confirmation affiché.

---

## 🛒 4. Shopping Cart Tests

### TC-010: Add Multiple Products to Cart
**Fichier**: `tests/ShoppingCart.spec.ts`  
**Tags**: `@master @regression @cart`  
**Priorité**: 🔴 Critique  
**Auteur**: SAHRAOUI Abdelhakim

#### Objectif
Vérifier qu'un utilisateur peut ajouter plusieurs produits différents au panier.

#### Steps de Test
```gherkin
Given L'utilisateur est sur la page d'accueil
When L'utilisateur recherche "iPhone"
And L'utilisateur sélectionne "iPhone"
And L'utilisateur définit la quantité à "2"
And L'utilisateur clique sur "Add to Cart"
And L'utilisateur retourne à la page d'accueil
And L'utilisateur recherche "MacBook"
And L'utilisateur sélectionne "MacBook"
And L'utilisateur définit la quantité à "1"
And L'utilisateur clique sur "Add to Cart"
Then Le panier contient "iPhone" ET "MacBook"
And Le compteur du panier affiche "3 item(s)"
```

#### Données de Test
```typescript
products: [
  { name: "iPhone", quantity: 2 },
  { name: "MacBook", quantity: 1 }
]
```

#### Assertions
- ✅ "iPhone" visible dans le panier
- ✅ "MacBook" visible dans le panier
- ✅ Quantité totale = 3

#### Résultat Attendu
✅ Plusieurs produits ajoutés avec succès au panier.

---

### TC-011: Update Product Quantity in Cart
**Fichier**: `tests/ShoppingCart.spec.ts`  
**Tags**: `@master @regression @cart`  
**Priorité**: 🔴 Critique  
**Auteur**: SAHRAOUI Abdelhakim

#### Objectif
Vérifier qu'un utilisateur peut modifier la quantité d'un produit dans le panier.

#### Steps de Test
```gherkin
Given L'utilisateur a ajouté "iPhone" (quantité: 1) au panier
When L'utilisateur navigue vers le panier
And L'utilisateur change la quantité de "1" à "3"
And L'utilisateur clique sur "Update"
Then La quantité est mise à jour à "3"
And Le total du panier est recalculé
```

#### Données de Test
```typescript
product: "iPhone"
initialQuantity: 1
updatedQuantity: 3
```

#### Assertions
- ✅ Champ quantité affiche "3"
- ✅ Page rechargée avec nouvelle quantité
- ✅ Total mis à jour

#### Résultat Attendu
✅ Quantité mise à jour avec succès, total recalculé.

---

### TC-012: Remove Product from Cart
**Fichier**: `tests/ShoppingCart.spec.ts`  
**Tags**: `@master @regression @cart`  
**Priorité**: 🔴 Critique  
**Auteur**: SAHRAOUI Abdelhakim

#### Objectif
Vérifier qu'un utilisateur peut supprimer un produit du panier.

#### Steps de Test
```gherkin
Given L'utilisateur a ajouté "MacBook" au panier
When L'utilisateur navigue vers le panier
And L'utilisateur vérifie que "MacBook" est présent
And L'utilisateur clique sur le bouton "Remove" (icône X rouge)
Then Une requête AJAX est envoyée
And La page se recharge
And "MacBook" n'est plus visible dans le panier
OR Le message "Your shopping cart is empty!" est affiché
```

#### Données de Test
```typescript
product: "MacBook"
quantity: 1
```

#### Assertions
- ✅ Produit "MacBook" visible avant suppression
- ✅ Requête AJAX complétée (status 200)
- ✅ Produit supprimé OU message "empty cart"
- ✅ `productAfterRemoval === 0 || emptyCartMessage > 0`

#### Gestion AJAX
```typescript
// Attente de la réponse AJAX
await Promise.all([
  page.waitForResponse(response => 
    response.url().includes('route=checkout/cart') && 
    response.status() === 200
  ),
  removeButton.click()
]);

// Attente de la mise à jour du DOM
await page.waitForFunction(() => {
  const content = document.body.textContent || '';
  const hasEmptyMessage = content.toLowerCase().includes('your shopping cart is empty');
  const noMacBook = !content.includes('MacBook');
  return hasEmptyMessage || noMacBook;
}, { timeout: 10000 });
```

#### Résultat Attendu
✅ Produit supprimé avec succès du panier via requête AJAX.

---

### TC-013: Verify Cart Total Price Calculation
**Fichier**: `tests/ShoppingCart.spec.ts`  
**Tags**: `@master @regression @cart`  
**Priorité**: 🔴 Critique  
**Auteur**: SAHRAOUI Abdelhakim

#### Objectif
Vérifier que le total du panier est calculé correctement.

#### Steps de Test
```gherkin
Given L'utilisateur est sur la page d'accueil
When L'utilisateur recherche "MacBook"
And L'utilisateur note le prix du produit (ex: $602.00)
And L'utilisateur sélectionne "MacBook"
And L'utilisateur définit la quantité à "2"
And L'utilisateur ajoute au panier
And L'utilisateur navigue vers le panier
Then Le total du panier est "2 × $602.00 = $1,204.00"
And Le total est affiché correctement
```

#### Données de Test
```typescript
product: "MacBook"
quantity: 2
unitPrice: "$602.00"
expectedTotal: "$1,204.00"
```

#### Assertions
- ✅ Prix unitaire affiché
- ✅ Quantité = 2
- ✅ Total calculé = $1,204.00
- ✅ Total non-null

#### Résultat Attendu
✅ Total du panier calculé correctement (prix × quantité).

---

## 🏠 5. Home Page Tests

### TC-014: Load Home Page and Show Site Title
**Fichier**: `tests/home.spec.ts`  
**Priorité**: 🟢 Normale  
**Auteur**: SAHRAOUI Abdelhakim

#### Objectif
Vérifier que la page d'accueil charge correctement et affiche le titre.

#### Steps de Test
```gherkin
Given L'utilisateur accède à "http://localhost/opencart/"
When La page se charge complètement
Then Le titre de la page est "Your Store"
And La page est visible
```

#### Assertions
- ✅ `page.title()` = "Your Store"
- ✅ Page chargée (domcontentloaded)

#### Résultat Attendu
✅ Page d'accueil chargée, titre correct affiché.

---

### TC-015: Display Main Logo and Header Elements
**Fichier**: `tests/home.spec.ts`  
**Priorité**: 🟢 Normale  
**Auteur**: SAHRAOUI Abdelhakim

#### Objectif
Vérifier que le logo et les éléments du header sont visibles.

#### Steps de Test
```gherkin
Given L'utilisateur est sur la page d'accueil
Then Le logo "Your Store" est visible
And Le menu de navigation est visible
And La barre de recherche est visible
```

#### Assertions
- ✅ Logo visible
- ✅ Navigation visible
- ✅ Barre de recherche visible

#### Résultat Attendu
✅ Logo et éléments du header affichés correctement.

---

### TC-016: Perform Search and Show Results
**Fichier**: `tests/home.spec.ts`  
**Priorité**: 🟢 Normale  
**Auteur**: SAHRAOUI Abdelhakim

#### Objectif
Vérifier que la recherche depuis la home page fonctionne.

#### Steps de Test
```gherkin
Given L'utilisateur est sur la page d'accueil
When L'utilisateur entre "MacBook" dans la recherche
And L'utilisateur clique sur "Search"
Then Les résultats contiennent "MacBook"
```

#### Résultat Attendu
✅ Recherche fonctionnelle, résultats affichés.

---

### TC-017: Navigate to Category via Top Menu
**Fichier**: `tests/home.spec.ts`  
**Priorité**: 🟢 Normale  
**Auteur**: SAHRAOUI Abdelhakim

#### Objectif
Vérifier que la navigation par catégorie fonctionne.

#### Steps de Test
```gherkin
Given L'utilisateur est sur la page d'accueil
When L'utilisateur clique sur une catégorie du menu (ex: "Desktops")
Then La page de la catégorie se charge
And Les produits de la catégorie sont affichés
```

#### Résultat Attendu
✅ Navigation par catégorie fonctionnelle.

---

### TC-018: Cart Shows Empty State on Fresh Visit
**Fichier**: `tests/home.spec.ts`  
**Priorité**: 🟢 Normale  
**Auteur**: SAHRAOUI Abdelhakim

#### Objectif
Vérifier que le panier est vide lors de la première visite.

#### Steps de Test
```gherkin
Given L'utilisateur visite la page d'accueil pour la première fois
When L'utilisateur clique sur l'icône du panier
Then Le message "Your shopping cart is empty!" est affiché
OR Le compteur affiche "0 item(s)"
```

#### Assertions
- ✅ Panier vide au démarrage
- ✅ Message ou compteur à zéro

#### Résultat Attendu
✅ Panier vide lors de la première visite.

---

## 🔄 6. End-to-End Test

### TC-019: Execute End-to-End Test Flow
**Fichier**: `tests/EndToEndTest.spec.ts`  
**Tags**: `@end-to-end`  
**Priorité**: 🔴 Critique  
**Auteur**: SAHRAOUI Abdelhakim

#### Objectif
Vérifier le workflow complet d'un utilisateur : inscription → déconnexion → connexion → achat → panier.

#### Steps de Test
```gherkin
Given L'utilisateur est sur la page d'accueil OpenCart

# 1. REGISTRATION
When L'utilisateur crée un nouveau compte
Then L'inscription est réussie ✅

# 2. LOGOUT
When L'utilisateur se déconnecte
Then La déconnexion est réussie ✅

# 3. LOGIN
When L'utilisateur se reconnecte avec les mêmes credentials
Then La connexion est réussie ✅

# 4. ADD TO CART
When L'utilisateur recherche "MacBook"
And L'utilisateur ajoute "MacBook" au panier
Then Le produit est ajouté ✅

# 5. SHOPPING CART
When L'utilisateur navigue vers le panier
Then Le panier contient "MacBook" ✅
And Le total est correct ✅
```

#### Workflow Complet
```typescript
1. Registration  → Message: "Your Account Has Been Created!"
2. Logout        → Message: "Account Logout"
3. Login         → Page: "My Account"
4. Add to Cart   → Message: "Success"
5. View Cart     → Product: "MacBook" visible
```

#### Assertions Critiques
- ✅ Inscription réussie
- ✅ Déconnexion réussie
- ✅ Connexion réussie
- ✅ Produit ajouté
- ✅ Panier mis à jour

#### Résultat Attendu
✅ Workflow E2E complet réussi sans erreur.

---

## 📈 Résumé des Résultats

### Statistiques Globales
```yaml
Total Tests: 19
Tests Passing: 19 (100%)
Tests Failed: 0 (0%)
Tests Skipped: 0 (0%)
Durée Moyenne: ~1.6 minutes (Chromium)
Stabilité: 100%
Flaky Tests: 0
```

### Couverture par Priorité
| Priorité | Tests | Passing | % |
|----------|-------|---------|---|
| 🔴 Critique | 10 | 10 | 100% |
| 🟡 Moyenne | 1 | 1 | 100% |
| 🟢 Normale | 8 | 8 | 100% |

### Couverture par Tag
| Tag | Tests | Passing | % |
|-----|-------|---------|---|
| @master | 8 | 8 | 100% |
| @sanity | 2 | 2 | 100% |
| @regression | 9 | 9 | 100% |
| @cart | 4 | 4 | 100% |
| @datadriven | 4 | 4 | 100% |
| @end-to-end | 1 | 1 | 100% |

---

## 🔧 Corrections Techniques Appliquées
**Par SAHRAOUI Abdelhakim**

### Problèmes Résolus
1. ✅ **ProductPage.isConfirmationMessageVisible()** - Logique corrigée
2. ✅ **Strict Mode Violations** - `.first()` ajouté partout
3. ✅ **30+ waitForTimeout** - Remplacés par waits dynamiques
4. ✅ **Import Casing** - `../pages/` → `../Pages/`
5. ✅ **Remove Product AJAX** - `waitForResponse()` implémenté
6. ✅ **HomePage Login** - Sélecteur spécifique avec fallback
7. ✅ **ProductPage View Cart** - Sélecteur ciblé + wait

---

## 📞 Contact

**SAHRAOUI Abdelhakim**
- 📧 Email: Hakimsahraoui.de@gmail.com
- 🐙 GitHub: [@Hakim7777](https://github.com/Hakim7777)

---

**Date de dernière mise à jour**: Octobre 2025  
**Version du document**: 1.0.0  
**Framework**: Playwright 1.52.0 + TypeScript 5.7.2
