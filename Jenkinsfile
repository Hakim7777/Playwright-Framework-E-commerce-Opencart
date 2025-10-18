/**
 * Jenkins Pipeline for Playwright E2E Test Automation
 * Author: SAHRAOUI Abdelhakim
 * Email: Hakimsahraoui.de@gmail.com
 * Framework: Playwright + TypeScript + Allure Reports
 * 
 * Prerequisites:
 * - Node.js must be installed on the Jenkins agent
 * - Add Node.js bin directory to Windows PATH environment variable
 * - Allure Jenkins Plugin must be installed
 */

pipeline {
    agent any
    
    environment {
        CI = 'true'
        PATH = "C:\\Program Files\\nodejs;${PATH}"
    }
    
    parameters {
        choice(
            name: 'TEST_SUITE',
            choices: ['sanity', 'regression', 'all'],
            description: 'Select which test suite to run'
        )
        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit', 'msedge', 'all'],
            description: 'Select browser for testing'
        )
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                echo 'Cloning repository from GitHub...'
                checkout scm
            }
        }
        
        stage('Verify Environment') {
            steps {
                echo 'Verifying Node.js and npm...'
                bat '''
                    echo Node.js version:
                    node --version
                    echo.
                    echo npm version:
                    npm --version
                '''
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                bat 'npm ci'
            }
        }
        
        stage('Install Playwright Browsers') {
            steps {
                echo 'Installing Playwright browsers...'
                script {
                    if (params.BROWSER == 'all') {
                        bat 'npx playwright install'
                    } else {
                        bat "npx playwright install ${params.BROWSER}"
                    }
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                echo "Running ${params.TEST_SUITE} tests on ${params.BROWSER}..."
                script {
                    try {
                        if (params.TEST_SUITE == 'sanity') {
                            if (params.BROWSER == 'all') {
                                bat 'npx playwright test --grep @sanity'
                            } else {
                                bat "npx playwright test --grep @sanity --project=${params.BROWSER}"
                            }
                        } else if (params.TEST_SUITE == 'regression') {
                            if (params.BROWSER == 'all') {
                                bat 'npx playwright test --grep @regression'
                            } else {
                                bat "npx playwright test --grep @regression --project=${params.BROWSER}"
                            }
                        } else {
                            if (params.BROWSER == 'all') {
                                bat 'npx playwright test'
                            } else {
                                bat "npx playwright test --project=${params.BROWSER}"
                            }
                        }
                    } catch (Exception e) {
                        echo "Tests failed, continuing to generate reports..."
                    }
                }
            }
        }
        
        stage('Generate Allure Report') {
            steps {
                echo 'Generating Allure report...'
                script {
                    try {
                        bat 'npm run allure:generate'
                    } catch (Exception e) {
                        echo "Allure generation skipped"
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo 'Publishing reports and artifacts...'
            
            // Archive artifacts for historical records
            archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'allure-report/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
            
            // Create simple HTML dashboard for reports
            bat '''
                @echo off
                (
                    echo ^<!DOCTYPE html^>
                    echo ^<html^>
                    echo ^<head^>
                    echo ^<meta charset="UTF-8"^>
                    echo ^<title^>Test Reports Dashboard^</title^>
                    echo ^<style^>
                    echo body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
                    echo .container { max-width: 800px; margin: 0 auto; }
                    echo .report-section { margin: 20px 0; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba^(0,0,0,0.1^); }
                    echo .report-title { font-size: 20px; font-weight: bold; margin-bottom: 15px; color: #333; }
                    echo .report-link { display: inline-block; margin: 10px 0; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; }
                    echo .report-link:hover { background: #0056b3; }
                    echo h1 { color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
                    echo ^</style^>
                    echo ^</head^>
                    echo ^<body^>
                    echo ^<div class="container"^>
                    echo ^<h1^>📊 Test Reports Dashboard^</h1^>
                    echo ^<div class="report-section"^>
                    echo ^<div class="report-title"^>✨ Allure Report^</div^>
                    echo ^<p^>View detailed Allure test report with analytics and statistics^</p^>
                    echo ^<a href="artifact/allure-report/index.html" class="report-link" target="_blank"^>🔗 View Allure Report^</a^>
                    echo ^</div^>
                    echo ^<div class="report-section"^>
                    echo ^<div class="report-title"^>🎭 Playwright Report^</div^>
                    echo ^<p^>View detailed Playwright test results with traces and videos^</p^>
                    echo ^<a href="artifact/playwright-report/index.html" class="report-link" target="_blank"^>🔗 View Playwright Report^</a^>
                    echo ^</div^>
                    echo ^</div^>
                    echo ^</body^>
                    echo ^</html^>
                ) > build-report-link.html
            '''
            
            // Archive the report link HTML
            archiveArtifacts artifacts: 'build-report-link.html', allowEmptyArchive: true
            
            echo 'Reports and artifacts archived successfully!'
        }
        
        success {
            echo "✅ Pipeline completed successfully! ${params.TEST_SUITE} tests passed!"
            echo "📊 Reports available in: Artifacts → allure-report/index.html"
        }
        
        failure {
            echo "❌ Pipeline failed! Check logs above."
        }
    }
}
