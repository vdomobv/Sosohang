pipeline {
    agent any

    environment {
        imageName1 = 'leeminkyu1212/c109-backend'
        imageName2 = 'leeminkyu1212/c109-frontend-web'
        registryCredential = 'minkyu-docker'
        dockerImage = ''

        releaseServerAccount = 'ubuntu'
        releaseServerUri = 'j9c109.p.ssafy.io'
        releasePort1 = '8081'
        releasePort2 = '3000'
    }

    stages {

        stage('Git Clone') {
            steps {
                git branch: 'develop',
                    credentialsId: 'test',
                    url: 'https://lab.ssafy.com/s09-fintech-finance-sub2/S09P22C109'
            }
        }
        stage('Jar Build') {
            steps {
                dir('back-end-app') {
                    sh 'cp /var/jenkins_home/.backenv ./.env'
                    sh 'chmod 777 ./.env'
                    sh 'chmod +x ./gradlew'
                    sh './gradlew clean bootJar'
                // sh './gradlew build'
                }
                //  dir('front-end-web') {
                //     sh 'npm i'
                //     sh 'npm run build'
                //     sh ''
                // // sh './gradlew build'
                // }
            }
        }
        stage('Build & DockerHub Push') {
            steps {
                dir('back-end-app') {
                    script {
                        docker.withRegistry('', registryCredential) {
                            sh 'docker buildx create --use --name mybuilder'
                            sh "docker buildx build --platform linux/amd64,linux/arm64 -t $imageName1:$BUILD_NUMBER --push ."
                            sh "docker buildx build --platform linux/amd64,linux/arm64 -t $imageName1:latest --push ."
                        }
                    }
                }
                dir('front-end-web') {
                    script {
                        docker.withRegistry('', registryCredential) {
                            sh 'docker buildx create --use --name mybuilder'
                            sh "docker buildx build --platform linux/amd64,linux/arm64 -t $imageName2:$BUILD_NUMBER --push ."
                            sh "docker buildx build --platform linux/amd64,linux/arm64 -t $imageName2:latest --push ."
                        }
                    }
                }
            }
        }

    
        stage('Before Service Stop') {
            steps {
                sshagent(credentials: ['ubuntu-c109']) {
                    sh '''
                    if test "`ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker ps -aq --filter ancestor=$imageName1:latest"`"; then
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker stop $(docker ps -aq --filter ancestor=$imageName1:latest)"
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker rm -f $(docker ps -aq --filter ancestor=$imageName1:latest)"
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker rmi $imageName1:latest"
                    fi
                    if test "`ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker ps -aq --filter ancestor=$imageName2:latest"`"; then
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker stop $(docker ps -aq --filter ancestor=$imageName2:latest)"
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker rm -f $(docker ps -aq --filter ancestor=$imageName2:latest)"
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker rmi $imageName2:latest"
                    fi
                    '''
                }
            }
        }
        stage('DockerHub Pull') {
            steps {
                sshagent(credentials: ['ubuntu-c109']) {
                    sh "ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri 'sudo docker pull $imageName1:latest'"
                }
                sshagent(credentials: ['ubuntu-c109']) {
                    sh "ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri 'sudo docker pull $imageName2:latest'"
                }
            }
        }
        stage('Service Start') {
            steps {
                sshagent(credentials: ['ubuntu-c109']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "sudo docker run -i -e TZ=Asia/Seoul -e "SPRING_PROFILES_ACTIVE=prod" -v /home/ubuntu/backup1:/backup1 --name sosohang -p $releasePort2:$releasePort2 -d $imageName1:latest"
                    '''
                    sh '''
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "sudo docker run -i -e TZ=Asia/Seoul -v /home/ubuntu/backup2:/backup2 --name sosohang-frontend -p $releasePort2:$releasePort2 -d $imageName2:latest"
                    '''
                }
            }
        }
        stage('Service Check') {
            steps {
                sshagent(credentials: ['ubuntu-c109']) {
                    sh '''
                        #!/bin/bash
                        sleep 60
                        for retry_count in \$(seq 20)
                        do
                          if curl -sf "http://j9c109.p.ssafy.io:8081/api/v1/test" > /dev/null
                          then
                            curl -d '{"text": "성공"}' -H "Content-Type: application/json" -X POST https://meeting.ssafy.com/hooks/e8bq89kszjg5ikatzmuqt9dazc
                            break
                          fi

                          if [ $retry_count -eq 20 ]
                          then
                            curl -d '{"text": "실패"}' -H "Content-Type: application/json" -X POST https://meeting.ssafy.com/hooks/e8bq89kszjg5ikatzmuqt9dazc
                            exit 1
                          fi

                          echo "The server is not alive yet. Retry health check in 5 seconds..."
                          sleep 5
                        done
                    '''
                }
            }
        }
    }   

}