pipeline {
    agent any
    tools {nodejs "nodejs-16.18.0"}

    environment { 
        APP_NAME = "instagram_front"
        //ENV_NAME = "${env.BRANCH_NAME}"
        //CURRENT_TIME = java.time.format.DateTimeFormatter.ofPattern("yyyyMMddHHmmss").format(java.time.ZonedDateTime.now(java.time.ZoneId.of("Asia/Seoul")))
    }

    stages {
        stage('Move') { 
            steps {
                script {
                    sh "mv * /var/app/frontend"
                    sh "cd /var/app/frontend"
                    sh "cd ~/var/app/frontend"
                    sh "pwd" //test
                    sh "ls"
                }
            }
        }
        
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
                    /*def BUILD_NAME = "${CURRENT_TIME}_stage"
                    def ENVIRONMENT = "${APP_NAME}-stg"
                    if (ENV_NAME == 'main') {
                        BUILD_NAME = "${CURRENT_TIME}_prod"
                        ENVIRONMENT = "${APP_NAME}-prod"
                    }
                    */
                    
                    sh "npm run start"
                }
            }
        }
        
    }
}