# 📊 Guide d'Accès au Rapport Allure dans Jenkins

## 🎯 Vue d'ensemble

Après chaque build Jenkins, les rapports Allure sont automatiquement générés et accessibles directement depuis la page du build.

---

## ✅ Comment Accéder au Rapport Allure

### **Méthode 1: Via le Dashboard HTML (⭐ Recommandé)**

1. **Ouvrez votre job Jenkins** → Cliquez sur un **Build #** (ex: Build #5)
2. **Dans la page du build**, cliquez sur **"Artifacts"** (à droite)
3. **Cliquez sur** `build-report-link.html`
4. **Une page dashboard s'affiche** avec des boutons cliquables :
   - 🔗 **View Allure Report** → Affiche le rapport Allure complet
   - 🔗 **View Playwright Report** → Affiche le rapport Playwright

### **Méthode 2: Accès Direct aux Artifacts**

1. **Jenkins Job** → **Build #** → **Artifacts**
2. **Dossier `allure-report`** → **`index.html`** → Cliquez pour ouvrir
3. Le rapport Allure complet s'affiche

### **Méthode 3: Lien Direct (URL)**

```
http://VOTRE-JENKINS:8080/job/YOUR-JOB-NAME/BUILD-NUMBER/artifact/allure-report/index.html
```

Exemple:
```
http://localhost:8080/job/Hakim7777-Playwright-Typescript-Ecommerce-Framework-Opencart/5/artifact/allure-report/index.html
```

---

## 📁 Contenu des Artifacts

Après chaque build, Jenkins archive automatiquement :

| Artifact | Contenu | Accès |
|----------|---------|-------|
| **allure-report/** | Rapport Allure complet avec statistiques | `artifact/allure-report/index.html` |
| **playwright-report/** | Détails des tests avec traces vidéo | `artifact/playwright-report/index.html` |
| **test-results/** | Fichiers JSON raw de résultats | Archive pour analyse |
| **build-report-link.html** | Dashboard avec liens vers les rapports | `artifact/build-report-link.html` |

---

## 🎨 Dashboard Visuel

Le fichier `build-report-link.html` fournit une interface claire avec :

```
📊 Test Reports Dashboard
├── ✨ Allure Report
│   └── 🔗 View Allure Report
├── 🎭 Playwright Report
│   └── 🔗 View Playwright Report
```

---

## 📈 Rapport Allure - Contenu

Le rapport Allure inclut :

| Section | Description |
|---------|-------------|
| **Overview** | Statistiques globales (Pass/Fail/Skip) |
| **Suites** | Détail des tests par suite |
| **Tests** | Chaque test avec résultat et durée |
| **Graphs** | Graphiques de tendance |
| **Timeline** | Chronologie d'exécution |
| **Categories** | Classification des erreurs |

---

## 🔍 Exemple de Workflow Complet

### Build Exécution
```
Jenkins Job → Build with Parameters
↓
TEST_SUITE=sanity, BROWSER=chromium
↓
Pipeline exécute les tests
↓
```

### Rapport Accès
```
Jenkins UI
↓
Build #5 → Artifacts
↓
build-report-link.html (clic)
↓
Dashboard avec boutons
↓
View Allure Report (clic)
↓
Rapport Allure complet s'affiche ✅
```

---

## 🚀 Fonctionnalités Disponibles

| Fonctionnalité | Disponible ? |
|----------------|-------------|
| Rapport Allure généré automatiquement | ✅ |
| Accès via Jenkins UI Artifacts | ✅ |
| Dashboard HTML avec liens cliquables | ✅ |
| Téléchargement des artifacts | ✅ |
| Accès direct URL | ✅ |
| Historique des builds | ✅ |

---

## 💡 Tips & Astuces

### Comparer les Rapports Entre Builds
1. Ouvrez Build #5 → Allure Report
2. Dans un nouvel onglet, ouvrez Build #4 → Allure Report
3. Comparez les résultats side-by-side

### Partager le Rapport
Copiez l'URL directe du rapport Allure et partagez-la avec votre équipe :
```
http://jenkins-server:8080/job/YOUR-JOB/BUILD-NUMBER/artifact/allure-report/index.html
```

### Archivage Long-terme
Jenkins conserve tous les artifacts par défaut. Configurez une **politique de rétention** si nécessaire:
- Jenkins Job → Configure → Build Discarder
- Exemple: Garder les 30 derniers builds

---

## 🔧 Configuration Jenkins (Si Nécessaire)

### Configurer Rétention des Artifacts
```
Jenkins Dashboard
→ Manage Jenkins
→ Configure System
→ Artifacts Management
→ Définir policies selon vos besoins
```

### Vérifier les Permissions
S'assurer que votre utilisateur Jenkins a les permissions :
- **Read**: Lire les artifacts
- **Workspace**: Accéder au workspace
- **Artifact View**: Visualiser les artifacts

---

## ✨ Résumé

| Étape | Action |
|-------|--------|
| 1️⃣ | Exécuter un build paramétré |
| 2️⃣ | Cliquer sur le Build Number |
| 3️⃣ | Cliquer sur **Artifacts** |
| 4️⃣ | Ouvrir **build-report-link.html** |
| 5️⃣ | Cliquer sur **View Allure Report** |
| 6️⃣ | 📊 Visualiser les résultats ! |

---

## 📞 Support

Si les rapports ne s'affichent pas :

1. ✅ Vérifier que `npm run allure:generate` s'exécute sans erreur
2. ✅ Vérifier que le dossier `allure-report/` est archivé
3. ✅ Vérifier les permissions du workspace Jenkins
4. ✅ Vérifier les logs du build : `Generate Allure Report` stage

---

**🎉 Les rapports Allure sont maintenant accessibles directement depuis Jenkins !**
