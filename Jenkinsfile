pipeline {
    agent any
    tools {nodejs "nodejs-16.18.0"}

    environment { 
        APP_NAME = "instagram_front"
    }

    stages {
        stage('Build') {
            steps {
                script {
                    sh 'printenv' 
                    sh "npm install"
                    sh "npm run build"
                }
            }
        }

        stage('Deploy') { 
            steps {
                script {
                    sh "pm2 kill"
                    sh "pm2 start npm --name instagram_clone_front -- start"
                }
            }
        }
        
    }
}