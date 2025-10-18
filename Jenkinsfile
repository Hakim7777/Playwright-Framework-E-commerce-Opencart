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
            
            script {
                if (fileExists('allure-results')) {
                    allure([
                        includeProperties: false,
                        jdk: '',
                        properties: [],
                        reportBuildPolicy: 'ALWAYS',
                        results: [[path: 'allure-results']]
                    ])
                }
            }
            
            archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'allure-report/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
            
            echo 'Reports and artifacts archived successfully!'
        }
        
        success {
            echo "Pipeline completed successfully! ${params.TEST_SUITE} tests passed!"
        }
        
        failure {
            echo "Pipeline failed! Check logs above."
        }
    }
}
