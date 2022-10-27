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
                    sh "netstat -nap | grep 5000"
                    sh "lsof -i TCP:5000"
                    sh "fuser -k -n tcp 5000"
                }
            }
        }

        stage('Deploy') { 
            steps {
                script {
                    sh "export BUILD_ID=dontKillMePlease"
                    //sh "pm2 start npm --name instagram_clone_front -- start"
                    sh "pm2 start startApp.sh"
                }
            }
        }
        
    }
}