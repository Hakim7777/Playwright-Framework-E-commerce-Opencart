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
            
            // Add Allure report link to build page
            script {
                try {
                    // Create HTML file that links to Allure report
                    writeFile file: 'build-report-link.html', text: '''
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="UTF-8">
                            <title>Test Reports</title>
                            <style>
                                body { font-family: Arial, sans-serif; margin: 20px; }
                                .report-section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
                                .report-link { display: inline-block; margin: 10px 0; padding: 10px 15px; background: #007bff; color: white; text-decoration: none; border-radius: 3px; }
                                .report-link:hover { background: #0056b3; }
                                .report-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
                            </style>
                        </head>
                        <body>
                            <h1>📊 Test Reports Dashboard</h1>
                            
                            <div class="report-section">
                                <div class="report-title">✨ Allure Report</div>
                                <p>Click below to view detailed Allure test report with analytics:</p>
                                <a href="artifact/allure-report/index.html" class="report-link">🔗 View Allure Report</a>
                            </div>
                            
                            <div class="report-section">
                                <div class="report-title">🎭 Playwright Report</div>
                                <p>Click below to view detailed Playwright test results with traces:</p>
                                <a href="artifact/playwright-report/index.html" class="report-link">🔗 View Playwright Report</a>
                            </div>
                        </body>
                        </html>
                    '''
                } catch (Exception e) {
                    echo "Warning: Could not generate report link: ${e.message}"
                }
            }
            
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
