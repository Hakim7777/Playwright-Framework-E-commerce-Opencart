/**
 * Jenkins Pipeline for Playwright E2E Test Automation
 * Author: SAHRAOUI Abdelhakim
 * Email: Hakimsahraoui.de@gmail.com
 * Framework: Playwright + TypeScript + Allure Reports
 * 
 * Prerequisites:
 * - Node.js must be installed on the Jenkins agent
 * - Add Node.js bin directory to Windows PATH environment variable
 */

pipeline {
    agent any
    
    environment {
        CI = 'true'
        PATH = "C:\\Program Files\\nodejs;${PATH}"  // Adjust based on your Node.js installation
    }
    
    stages {
        stage('📥 Checkout Code') {
            steps {
                echo '� Cloning repository from GitHub...'
                checkout scm
            }
        }
        
        stage('✅ Verify Environment') {
            steps {
                echo '� Verifying Node.js and npm...'
                bat '''
                    echo Node.js version:
                    node --version
                    echo.
                    echo npm version:
                    npm --version
                '''
            }
        }
        
        stage('📦 Install Dependencies') {
            steps {
                echo '📦 Installing npm dependencies...'
                bat 'npm ci'
            }
        }
        
        stage('🎭 Install Playwright Browsers') {
            steps {
                echo '🎭 Installing Playwright Chromium browser...'
                bat 'npx playwright install chromium'
            }
        }
        
        stage('🧪 Run Sanity Tests') {
            steps {
                echo '🧪 Running Playwright sanity tests...'
                script {
                    try {
                        bat 'npm run test:sanity'
                    } catch (Exception e) {
                        echo '⚠️ Some tests failed, but continuing to generate reports...'
                    }
                }
            }
        }
        
        stage('📊 Generate Reports') {
            steps {
                echo '📊 Generating Allure report...'
                script {
                    try {
                        bat 'npm run allure:generate'
                    } catch (Exception e) {
                        echo '⚠️ Allure generation skipped'
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo '📊 Archiving test artifacts...'
            
            // Archive all test artifacts without requiring plugins
            archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'allure-report/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
            
            echo '✅ Build artifacts archived successfully!'
        }
        
        success {
            echo '✅ Pipeline completed successfully!'
        }
        
        failure {
            echo '❌ Pipeline failed! Check logs above.'
        }
    }
}
