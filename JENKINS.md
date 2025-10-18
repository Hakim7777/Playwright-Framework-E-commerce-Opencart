# 🚀 Jenkins Configuration Guide

## 📋 Prérequis

### 1. Plugins Jenkins requis :
- **NodeJS Plugin** (pour exécuter npm)
- **Allure Plugin** (pour les rapports Allure)
- **HTML Publisher Plugin** (pour les rapports Playwright)
- **Git Plugin** (pour cloner depuis GitHub)

### 2. Configuration Node.js dans Jenkins :
1. Allez dans **Manage Jenkins** → **Global Tool Configuration**
2. Sous **NodeJS**, cliquez sur **Add NodeJS**
3. Nom : `NodeJS`
4. Version : `22.x` ou plus récent
5. Cochez "Install automatically"
6. Cliquez sur **Save**

---

## 📂 Fichiers Jenkinsfile disponibles :

### 1. **Jenkinsfile** (Tests Sanity - Rapide)
- Exécute uniquement les tests @sanity
- Durée : ~2-3 minutes
- Usage : Validation rapide après commit

### 2. **Jenkinsfile.regression** (Tests Complets - Paramétrable)
- Exécute sanity/regression/all tests
- Paramètres : Choix du navigateur et suite de tests
- Durée : ~10-15 minutes
- Usage : Tests complets avant release

---

## 🔧 Configuration du Pipeline Jenkins :

### Étape 1 : Créer un nouveau Job
1. Dans Jenkins, cliquez sur **New Item**
2. Nom : `Playwright-OpenCart-Tests`
3. Type : **Pipeline**
4. Cliquez sur **OK**

### Étape 2 : Configurer le Pipeline
1. Sous **Pipeline**, sélectionnez **Pipeline script from SCM**
2. SCM : **Git**
3. Repository URL : 
   ```
   https://github.com/Hakim7777/Playwright-Typescript-Ecommerce-Framework-Opencart.git
   ```
4. Branch : `*/main`
5. Script Path : `Jenkinsfile` (ou `Jenkinsfile.regression`)
6. Cliquez sur **Save**

### Étape 3 : Lancer le Build
1. Cliquez sur **Build Now**
2. Attendez que Jenkins clone le repo et exécute les tests
3. Consultez les rapports :
   - **Playwright HTML Report** (dans le menu gauche)
   - **Allure Report** (dans le menu gauche)

---

## 📊 Rapports générés :

### 1. **Playwright HTML Report**
- Chemin : `playwright-report/index.html`
- Contient : Screenshots, videos, traces
- Accessible via : Menu gauche → "🎭 Playwright HTML Report"

### 2. **Allure Report**
- Chemin : `allure-report/`
- Contient : Graphiques, tendances, historique
- Accessible via : Menu gauche → "Allure Report"

### 3. **Test Artifacts**
- Screenshots : `test-results/**/*.png`
- Videos : `test-results/**/*.webm`
- Traces : `test-results/**/trace.zip`

---

## ⚙️ Variables d'environnement (Optionnel)

Si OpenCart est sur une autre machine/URL, modifiez le Jenkinsfile :

```groovy
environment {
    CI = 'true'
    OPENCART_URL = 'http://192.168.1.10/opencart/'  // IP de votre serveur OpenCart
}
```

Puis dans `playwright.config.ts` :
```typescript
baseURL: process.env.OPENCART_URL || 'http://localhost/opencart/'
```

---

## 🔄 Déclenchement automatique (Webhook GitHub)

### Configuration Webhook :
1. Dans votre repo GitHub → **Settings** → **Webhooks**
2. Payload URL : `http://JENKINS_URL/github-webhook/`
3. Content type : `application/json`
4. Events : **Just the push event**
5. Cliquez sur **Add webhook**

### Configuration Jenkins :
1. Dans votre Pipeline → **Configure**
2. Sous **Build Triggers**, cochez :
   - ✅ **GitHub hook trigger for GITScm polling**
3. Cliquez sur **Save**

Maintenant, chaque push sur GitHub déclenchera automatiquement les tests ! 🎉

---

## ✅ Vérification du bon fonctionnement :

```bash
# 1. Jenkins peut accéder à OpenCart ?
curl http://localhost/opencart/

# 2. Node.js installé ?
node --version

# 3. npm fonctionne ?
npm --version

# 4. Playwright installé ?
npx playwright --version
```

---

## 🆘 Troubleshooting :

### Problème : "node: command not found"
**Solution** : Configurez le plugin NodeJS dans Jenkins (voir Prérequis)

### Problème : "Allure report not found"
**Solution** : Installez le plugin Allure Jenkins

### Problème : Tests échouent avec ERR_CONNECTION_REFUSED
**Solution** : Vérifiez que OpenCart est accessible depuis la machine Jenkins

### Problème : "npm ci" échoue
**Solution** : Supprimez `node_modules` et relancez

---

## 📞 Support

Auteur : **SAHRAOUI Abdelhakim**  
Email : Hakimsahraoui.de@gmail.com  
Repository : https://github.com/Hakim7777/Playwright-Typescript-Ecommerce-Framework-Opencart
