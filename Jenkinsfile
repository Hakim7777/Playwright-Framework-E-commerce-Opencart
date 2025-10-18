/**
 * Jenkins Pipeline for Playwright E2E Test Automation
 * Author: SAHRAOUI Abdelhakim
 * Email: Hakimsahraoui.de@gmail.com
 * Framework: Playwright + TypeScript + Allure Reports
 */

pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'  // Assurez-vous que Node.js est configuré dans Jenkins (Manage Jenkins → Tools)
    }
    
    environment {
        CI = 'true'
    }
    
    stages {
        stage('📥 Checkout Code') {
            steps {
                echo '🔄 Cloning repository from GitHub...'
                git branch: 'main',
                    url: 'https://github.com/Hakim7777/Playwright-Typescript-Ecommerce-Framework-Opencart.git'
            }
        }
        
        stage('📦 Install Dependencies') {
            steps {
                echo '📦 Installing npm dependencies...'
                bat 'npm ci'  // Plus rapide et fiable que npm install
            }
        }
        
        stage('🎭 Install Playwright Browsers') {
            steps {
                echo '🎭 Installing Playwright browsers...'
                bat 'npx playwright install chromium'
            }
        }
        
        stage('🧪 Run Sanity Tests') {
            steps {
                echo '🧪 Running Playwright sanity tests...'
                bat 'npm run test:sanity'
            }
        }
        
        stage('📊 Generate Allure Report') {
            steps {
                echo '📊 Generating Allure report...'
                bat 'npm run allure:generate'
            }
        }
    }
    
    post {
        always {
            echo '📊 Publishing test results and reports...'
            
            // Archive Playwright HTML Report
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: '🎭 Playwright HTML Report',
                reportTitles: 'Playwright Test Execution Report'
            ])
            
            // Publish Allure Report (requires Allure Jenkins Plugin)
            allure([
                includeProperties: false,
                jdk: '',
                properties: [],
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'allure-results']]
            ])
            
            // Archive test artifacts
            archiveArtifacts artifacts: 'allure-report/**/*', allowEmptyArchive: true, fingerprint: true
            archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**/*.png', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**/*.webm', allowEmptyArchive: true
        }
        
        success {
            echo '✅ Pipeline completed successfully! All tests passed! 🎉'
        }
        
        failure {
            echo '❌ Pipeline failed! Some tests did not pass.'
        }
        
        unstable {
            echo '⚠️ Pipeline unstable - some tests failed but build continued'
        }
    }
}
