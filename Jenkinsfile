pipeline {
    agent any
    triggers {
pollSCM('*/5 * * * *') // Vérifier toutes les 5 minutes
}
    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub-credentials'
    }

    stages { 
        
        stage('Checkout') {
            steps {
                script {
                    // Checkout code from GitHub
                    checkout scm
                }
            }
        }
        stage('Build Frontend') { 
            steps {
                script { 
                    
                        powershell 'docker build -t kerkeniaziz/frontend:v3 .'
                    
                }
            }
        }

        stage('Push Docker Images to DockerHub') {
            steps {
                script {
                    // Login to DockerHub
                    docker.withRegistry('', DOCKERHUB_CREDENTIALS) {
                        // Push the frontend image
                         powershell 'docker push kerkeniaziz/frontend:v3'
                    }
                }
            }
        }
    }
}