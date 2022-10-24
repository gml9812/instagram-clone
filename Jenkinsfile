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

        stage('Zip') { 
            steps {
                script {
                    sh "zip -r instagram_front.zip .next node_modules package.json next.config.js" 
                    sh "ls"
                    sh "mv instagram_front.zip /var/app/frontend/"
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
                    
                    echo 'deploy'
                }
            }
        }
        
    }
}
