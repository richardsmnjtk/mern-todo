podTemplate(

yaml: '''
apiVersion: v1
kind: Pod
metadata:
  name: kaniko
spec:
  containers:
  - name: kaniko
    image: gcr.io/kaniko-project/executor:debug
    imagePullPolicy: "IfNotPresent"
    command:
    - cat
    tty: true
    volumeMounts:
    - mountPath: "/kaniko/.docker"
      name: "volume-1"
      readOnly: false
  - image: "jenkins/inbound-agent:4.10-3"
    name: "jnlp"
    resources:
      limits: {}
      requests:
        memory: "256Mi"
        cpu: "100m"
  - name: deploy
    image: ariretiarno/bp-cilsy-14:deploy
    imagePullPolicy: "IfNotPresent"
    command:
    - cat
    tty: true
    volumeMounts:
    - mountPath: "/root/.aws"
      name: "volume-0"
      readOnly: false
  restartPolicy: "Never"
  volumes:
  - secret:
      secretName: "aws-config"
    name: "volume-0"
  - configMap:
      name: "docker-config"
    name: "volume-1"
''' ) {
    node(POD_LABEL) {
        stage('Checkout'){
            def scmVars = checkout([
                $class: 'GitSCM',
                branches: scm.branches,
                extensions: scm.extensions + [
                    [
                        $class: 'AuthorInChangelog'
                    ],
                    [
                        $class: 'ChangelogToBranch',
                        options: [
                            compareRemote: 'origin',
                            compareTarget: 'main'
                        ]
                    ]
                ],
                userRemoteConfigs: scm.userRemoteConfigs
            ])
        }
        stage ('Build') {
            container('kaniko') {
                script {
                    if (env.BRANCH_NAME == 'staging'){
                        sh """
                        /kaniko/executor --context frontend/ --destination ariretiarno/bp-cilsy-14:frontend-${BUILD_NUMBER}
                        /kaniko/executor --context backend/ --destination ariretiarno/bp-cilsy-14:backend-${BUILD_NUMBER}
                        """
                    }
                }
            }
        }

        stage ('Deploy') {
            container('deploy') {
                script {
                    sh """
                    export KOPS_STATE_STORE=s3://kube.retiarno.my.id && export KOPS_CLUSTER_NAME=kube.retiarno.my.id
                    kops export kubecfg --admin
                    sed -i -e 's/BUILDID/${BUILD_NUMBER}/g' frontend/frontend.yaml
                    sed -i -e 's/BUILDID/${BUILD_NUMBER}/g' backend/backend.yaml
                    kubectl apply -f frontend/frontend.yaml
                    kubectl apply -f backend/backend.yaml
                    """
                }
            }
        }
    }
}