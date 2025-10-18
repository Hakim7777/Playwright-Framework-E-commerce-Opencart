# Jenkins Parameterized Build & Allure Report Setup

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Step 1: Configure Node.js PATH](#step-1-configure-nodejs-path)
3. [Step 2: Install Required Jenkins Plugins](#step-2-install-required-jenkins-plugins)
4. [Step 3: Configure Job Parameters](#step-3-configure-job-parameters)
5. [Step 4: Test the Pipeline](#step-4-test-the-pipeline)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:
- ✅ Jenkins installed and running on Windows
- ✅ Node.js 22.x installed on the Jenkins agent machine
- ✅ Repository cloned with Jenkinsfile present
- ✅ npm dependencies installed locally

---

## Step 1: Configure Node.js PATH

### On Windows Jenkins Agent:

**Option 1: Via Environment Variables (Recommended)**

1. Press `Win + R` → Type `sysdm.cpl` → Press Enter
2. Go to **Advanced** tab → Click **Environment Variables**
3. Under **System variables**, click **New**
4. **Variable name:** `PATH`
5. **Variable value:** Add the Node.js path (append to existing PATH)
   ```
   C:\Program Files\nodejs;
   ```
6. Click **OK** → **OK** → **OK**
7. **Restart Jenkins** service:
   ```powershell
   # In PowerShell as Administrator
   Restart-Service Jenkins
   ```

**Option 2: Via Jenkins Configuration**

1. Go to **Manage Jenkins** → **Configure System**
2. Look for **Global properties** section
3. Check **Environment variables**
4. Click **Add** button
5. **Name:** `PATH`
6. **Value:** `C:\Program Files\nodejs;$PATH`
7. Click **Save**

**Verify Node.js is accessible:**
```powershell
node --version
npm --version
```

---

## Step 2: Install Required Jenkins Plugins

### Navigate to Plugin Manager:

1. Open Jenkins UI in browser (usually `http://localhost:8080`)
2. Go to **Manage Jenkins** (left menu)
3. Click **Manage Plugins**
4. Click **Available plugins** tab

### Install these plugins:

| Plugin Name | Publisher ID | Purpose |
|-------------|--------------|---------|
| **Allure** | `ru.yandex.qatools.allure.jenkins` | Publish Allure reports in Jenkins UI |
| **HTML Publisher** | `htmlpublisher` | Publish Playwright HTML reports |
| **Pipeline** | `workflow-aggregator` | Pipeline job type |
| **Git** | `git` | Git integration |

### Installation Steps:

1. **Search for "Allure"** in the search box
2. Check the box next to **"Allure Jenkins Plugin"**
3. Check the box next to **"HTML Publisher"**
4. Scroll down and click **Install without restart**
5. Wait for installation to complete
6. Check **Restart Jenkins when installation is complete and no jobs are running**
7. **Alternatively**, you can restart manually:
   ```powershell
   Restart-Service Jenkins
   ```

### Verify Installation:

After Jenkins restarts:
1. Go to **Manage Jenkins** → **Manage Plugins** → **Installed plugins**
2. Search for "Allure" and "HTML" - they should appear in the list

---

## Step 3: Configure Job Parameters

### For the Pipeline Job:

1. Go to your Jenkins job (e.g., `Playwright-Tests`)
2. Click **Configure** button (left menu)
3. **Check "This project is parameterized"**
4. Click **Add Parameter** dropdown

### Add Parameter 1: TEST_SUITE

1. Select **Choice Parameter** from dropdown
2. **Name:** `TEST_SUITE`
3. **Choices:** (each on new line)
   ```
   sanity
   regression
   all
   ```
4. **Description:** `Select which test suite to run`

### Add Parameter 2: BROWSER

1. Click **Add Parameter** again
2. Select **Choice Parameter** from dropdown
3. **Name:** `BROWSER`
4. **Choices:** (each on new line)
   ```
   chromium
   firefox
   webkit
   msedge
   all
   ```
5. **Description:** `Select browser for testing`

### Pipeline Configuration:

1. Make sure **Pipeline script from SCM** is selected
2. **SCM:** Git
3. **Repository URL:** Your GitHub repo URL
4. **Branch:** `*/main` (or your default branch)
5. **Script Path:** `Jenkinsfile`
6. Click **Save**

---

## Step 4: Test the Pipeline

### Run Build with Parameters:

1. Click **Build with Parameters** button (appears now that parameters are configured)
2. Select your choices:
   - **TEST_SUITE:** Select "sanity", "regression", or "all"
   - **BROWSER:** Select "chromium", "firefox", "webkit", "msedge", or "all"
3. Click **Build** button

### Monitor Execution:

1. Go to **Build History** (left menu)
2. Click the latest build number
3. Click **Console Output** to see real-time logs
4. Wait for completion

### View Reports:

After build completes, you should see:

**Option A: If HTML Publisher plugin is installed:**
- A link called **"Playwright Report - sanity"** (or your selected suite)
- Click to view interactive HTML report

**Option B: If Allure plugin is installed:**
- A link called **"Allure Report"**
- Click to view interactive Allure report with graphs and statistics

**Option C: Artifacts section:**
- Download `playwright-report.zip` or `allure-report.zip`

---

## Troubleshooting

### Issue 1: "node: command not found" or "node is not recognized"

**Cause:** Node.js not in PATH

**Solution:**
```powershell
# Check if Node.js is installed
node --version

# If not found, install Node.js
# Download from https://nodejs.org/ (LTS version recommended)

# After installation, add to PATH:
$env:Path -split ';' | Select-String 'nodejs'

# If not present, add manually to System PATH and restart Jenkins
```

### Issue 2: "publishHTML not found" error

**Cause:** HTML Publisher plugin not installed

**Solution:**
1. Go to **Manage Jenkins** → **Manage Plugins**
2. Search for "HTML Publisher"
3. Install and restart Jenkins
4. Re-run the build

### Issue 3: "Allure results not found"

**Cause:** Allure plugin not installed OR tests didn't generate allure-results

**Solution:**
1. Verify tests ran successfully: Check Console Output for test execution
2. Verify plugin installed: **Manage Jenkins** → **Manage Plugins** → Search "Allure"
3. Verify npm script works locally:
   ```powershell
   npm run allure:generate
   ```

### Issue 4: "Parameter not appearing" in Build with Parameters

**Cause:** Job configuration not saved properly

**Solution:**
1. Click **Configure**
2. Verify "This project is parameterized" is **checked**
3. Verify parameters are listed
4. Click **Save**
5. Click **Build with Parameters** (should now appear)

### Issue 5: Tests failing with specific error

**For each error, check:**

```powershell
# 1. Verify Node.js
node --version

# 2. Verify npm
npm --version

# 3. Verify Playwright installed
npx playwright --version

# 4. Verify browsers installed
npx playwright install --with-deps

# 5. Run tests locally to verify they work
npm run test:sanity
```

---

## Advanced Configuration

### Custom Allure Report Path

If your `allure-results` folder is in a different location, edit Jenkinsfile:

```groovy
script {
    if (fileExists('custom/path/to/allure-results')) {
        allure([
            includeProperties: false,
            jdk: '',
            properties: [],
            reportBuildPolicy: 'ALWAYS',
            results: [[path: 'custom/path/to/allure-results']]
        ])
    }
}
```

### Email Notifications (Optional)

1. **Manage Jenkins** → **Configure System**
2. Scroll to **E-mail Notification**
3. Configure SMTP settings
4. In your job, add post-build action:

```groovy
post {
    always {
        emailext (
            subject: "Build ${BUILD_NUMBER}: ${BUILD_STATUS}",
            body: "Test Report: ${BUILD_URL}",
            to: 'your-email@example.com'
        )
    }
}
```

### Slack Integration (Optional)

1. Install **Slack Notification** plugin
2. Configure in **Manage Jenkins** → **Configure System**
3. Add to Jenkinsfile post section:

```groovy
post {
    always {
        slackSend(
            color: currentBuild.result == 'SUCCESS' ? 'good' : 'danger',
            message: "Build ${BUILD_NUMBER} - ${params.TEST_SUITE} on ${params.BROWSER}: ${currentBuild.result}",
            webhookUrl: 'YOUR_SLACK_WEBHOOK_URL'
        )
    }
}
```

---

## Quick Reference

### Build with Parameters Command

```powershell
# Via Jenkins CLI
java -jar jenkins-cli.jar -s http://localhost:8080/ build Playwright-Tests -p TEST_SUITE=sanity -p BROWSER=chromium

# Or manually
# 1. Go to Jenkins UI
# 2. Click job name
# 3. Click "Build with Parameters"
# 4. Select TEST_SUITE and BROWSER
# 5. Click "Build"
```

### View All Reports

```
http://localhost:8080/job/Playwright-Tests/allure/
http://localhost:8080/job/Playwright-Tests/ws/playwright-report/index.html
```

### Clean Up Old Builds

```powershell
# Delete builds older than 30 days (in Jenkins job config)
# Post-build Actions → Manage build discard policy
# Keep last 20 builds or 30 days
```

---

## Summary

You now have:
- ✅ Parameterized Jenkins builds with TEST_SUITE and BROWSER selection
- ✅ Allure report integration with visual dashboard
- ✅ Playwright HTML report publishing
- ✅ Automated test execution for sanity, regression, or all tests
- ✅ Multi-browser testing support

**Next Steps:**
1. Run a build with parameters to verify everything works
2. Check both Allure and Playwright reports
3. Configure notifications (optional)
4. Set up build triggers (webhooks) for automatic execution

---

**Questions?** Check the troubleshooting section or verify Node.js and plugins are properly installed.
