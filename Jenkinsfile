pipeline {
    agent any
    tools {nodejs "nodejs-16.18.0"}

    environment { 
        APP_NAME = "instagram_front"
        //ENV_NAME = "${env.BRANCH_NAME}"
        //CURRENT_TIME = java.time.format.DateTimeFormatter.ofPattern("yyyyMMddHHmmss").format(java.time.ZonedDateTime.now(java.time.ZoneId.of("Asia/Seoul")))
    }

    stages {
        stage('Build') {
            steps {
                script {
                    sh 'printenv' // env 정보 출력, TRIGGER_URL 등 environment에 없는 변수들도 여기에 나옴
                    sh "npm install"
                    sh "npm run build"
                }
            }
        }

        stage('Deploy') { 
            steps {
                script {
                    sh "sh start.sh"
                }
            }
        }
        
    }
}