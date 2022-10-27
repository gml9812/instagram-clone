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
                    sh "JENKINS_NODE_COOKIE=dontKillMePlease"
                    sh "pm2 startOrRestart run.sh"
                }
            }
        }
        
    }
}