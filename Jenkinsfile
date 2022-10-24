pipeline {
    agent any
    tools {nodejs "nodejs-16.18.0"}

    environment { // key-value 스타일로 파이프라인 내부에서 사용할 변수들 선언 가능
        APP_NAME = "instagram_front"
        //ENV_NAME = "${env.BRANCH_NAME}"
        //CURRENT_TIME = java.time.format.DateTimeFormatter.ofPattern("yyyyMMddHHmmss").format(java.time.ZonedDateTime.now(java.time.ZoneId.of("Asia/Seoul")))
    }

    stages { // 각 stage에 할 동작들, stage는 정해진 것이 아니라 우리가 임의로 나눌 수 있다. 
        stage('Build') {
            steps {
                script {
                    sh 'printenv' // env 정보 출력, TRIGGER_URL 등 environment에 없는 변수들도 여기에 나옴
                    // sh "curl --request PATCH \"${TRIGGER_URL}/start?repository=${APP_NAME}&tag=${BUILD_TAG}&commit=${GIT_COMMIT}&url=${BUILD_URL}\"" // ggumim-build-helper 사용
                    sh "npm install"
                    sh "npm run build"
                }
            }
        }

        /*
        stage('Zip') { // node_modules 및 빌드 결과물(.next 파일) 등을 .zip으로 압축해 소스 번들 만든다.
            steps {
                script {
                    sh "mv .ebextensions/package.json package.json"
                    if (ENV_NAME == 'main')
                        sh "mv Procfile.prod Procfile"
                    else
                        sh "mv Procfile.stage Procfile"
                    sh "zip -r ggumim-pc-next.zip .ebextensions .next .platform public package.json next.config.js Procfile .env.production .env.stage .env.development node_modules" // env 
                }
            }
        }
        
        stage('Upload') { // s3에 소스 번들 파일 업로드
            steps {
                sh "aws s3 cp ${WORKSPACE}/${APP_NAME}.zip s3://deploy-app.ggumim.co.kr/${APP_NAME}/${env.BUILD_TAG}.zip --region ap-northeast-2"
            }
        }

        stage('Deploy') { // 배포
            steps {
                script {
                    def BUILD_NAME = "${CURRENT_TIME}_stage"
                    def ENVIRONMENT = "${APP_NAME}-stg"
                    if (ENV_NAME == 'main') {
                        BUILD_NAME = "${CURRENT_TIME}_prod"
                        ENVIRONMENT = "${APP_NAME}-prod"
                    }
                    // s3에 업로드한 소스 번들 사용해서 새로운 어플리케이션 버전을 만든다. 
                    sh "aws elasticbeanstalk create-application-version --region ap-northeast-2 --application-name ${APP_NAME} --version-label ${BUILD_NAME} --source-bundle S3Bucket=\"deploy-app.ggumim.co.kr\",S3Key=\"${APP_NAME}/${env.BUILD_TAG}.zip\""
                    // 원하는 environment가 해당 어플리케이션 버전을 사용하도록 한다. 
                    sh "aws elasticbeanstalk update-environment --region ap-northeast-2 --environment-name ${ENVIRONMENT} --version-label ${BUILD_NAME}"
                    sh "aws elasticbeanstalk wait environment-updated --region ap-northeast-2 --application-name ${APP_NAME} --environment-names ${ENVIRONMENT} --version-label ${BUILD_NAME}"
                }
            }
        }
        */
    }

    /*
    post { // 특정 stage 이전 또는 이후에 실행되는 condition block
        unsuccessful { // stage 실패 시 실행
            sh "curl --request PATCH \"${TRIGGER_URL}/fail?repository=${APP_NAME}&tag=${BUILD_TAG}&commit=${GIT_COMMIT}&url=${BUILD_URL}\"" // ggumim-build-helper 사용
        }
        success { // stage 성공 시 실행
            sh "curl --request PATCH \"${TRIGGER_URL}/success?repository=${APP_NAME}&tag=${BUILD_TAG}&commit=${GIT_COMMIT}&url=${BUILD_URL}\"" // ggumim-build-helper 사용
        }
    } */
}
