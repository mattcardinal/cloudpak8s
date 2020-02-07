(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{Aaed:function(e,n,t){"use strict";t.r(n),t.d(n,"_frontmatter",(function(){return s})),t.d(n,"default",(function(){return c}));t("91GP"),t("rGqo"),t("yt8O"),t("Btvt"),t("RW0V"),t("q1tI");var a=t("7ljp"),l=t("013z");t("qKvR");function o(){return(o=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e}).apply(this,arguments)}var s={},r={_frontmatter:s},i=l.a;function c(e){var n=e.components,t=function(e,n){if(null==e)return{};var t,a,l={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,["components"]);return Object(a.b)(i,o({},r,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("h2",null,"1. Preparing for Cloud Pak for Data Install"),Object(a.b)("p",null,"IBM Cloud Pak for Data Install requires a fully functional OpenShift 3.11 cluster and the following cluster requirements:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"3 Worker nodes with 16 vpc each with 64 GB RAM (48 VPC total). All worker nodes should be able to schedule jobs"),Object(a.b)("li",{parentName:"ul"},"800 GB of available persistent storage for CP4D only (example: glusterfs)"),Object(a.b)("li",{parentName:"ul"},"cluster admin role"),Object(a.b)("li",{parentName:"ul"},"Access to Docker/tiller and able to push/pull")),Object(a.b)("p",null,"** Openshift cluster provisioning using terraform is documented ",Object(a.b)("a",o({parentName:"p"},{href:"https://pages.github.ibm.com/CASE/cloudpak-onboard-residency/data/install-Openshift-On-Vmware"}),"here")),Object(a.b)("h2",null,"2. Installing Cloud Pak for Data from a openshift client machine (Linux/Mac/Windows machine or your laptop ?)"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Step 1: Download the Openshift Client tool on your client machine"),Object(a.b)("li",{parentName:"ul"},"Step 2: Configure the OC client to access the OCP cluster\n",Object(a.b)("img",o({parentName:"li"},{src:"https://github.ibm.com/CASE/cloudpak-onboard-residency/blob/gh-pages/assets/img/cp4d/oc-client-config.jpg",alt:"copy command"}))),Object(a.b)("li",{parentName:"ul"},"copy login command from OpenShift dashboard to your terminal shell\n")),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{}),"      $ oc login https://boa2102.demo.ibmcloudpack.com:8443 --token=PV717cA-9094hnI16tRsVbJZEX2El0ScJmUPUf2Hxxk\n")),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Step 3: Test the OCP using following commands to ensure, you are able to list the nodes and projects in ocp.")),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{}),"  $ oc get nodes\n  $ oc get projects\n")),Object(a.b)("h2",null,"3. Creating Install script"),Object(a.b)("p",null,"create a new ",Object(a.b)("b",null,"install-cp4data.sh")," installation script with the following content:"),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{className:"language-bash"}),'#!/bin/bash\n#******************************************************************************\n# Licensed Materials - Property of IBM\n# (c) Copyright IBM Corporation 2019. All Rights Reserved.\n#\n# Note to U.S. Government Users Restricted Rights:\n# Use, duplication or disclosure restricted by GSA ADP Schedule\n# Contract with IBM Corp.\n#******************************************************************************\n\nif [[ -z $1 ]]; then\n    echo "Usage: ./install-cp4data.sh &lt;&lt;namespace>>"\n    exit 1\nfi\n\nNAMESPACE=$1\nDOCKER_REGISTRY="cp.stg.icr.io/cp/cp4d"\nDOCKER_REGISTRY_USER="iamapikey"\nDOCKER_REGISTRY_PASS="&lt;&lt;inform_here_the_docker_password>>"\n\noc create ns ${NAMESPACE}\n\noc project ${NAMESPACE}\n\noc create sa -n ${NAMESPACE} default\noc create sa -n ${NAMESPACE} tiller\n\n# Add `deployer` serviceaccount to `system:deployer` role to allow the template kickstart\noc -n ${NAMESPACE} adm policy add-role-to-user -z deployer system:deployer\n\n# Create the secrets to pull images from the docker repository\noc create secret docker-registry icp4d-anyuid-docker-pull -n ${NAMESPACE} --docker-server=${DOCKER_REGISTRY} --docker-username=${DOCKER_REGISTRY_USER} --docker-password=${DOCKER_REGISTRY_PASS} --docker-email=cp4data@ibm.com\noc secrets -n ${NAMESPACE} link default icp4d-anyuid-docker-pull --for=pull\n\n\n# Set the Security Context -  One scc is created for every namespace\ncat &lt;&lt; EOF | oc apply -f - \nallowHostDirVolumePlugin: true\nallowHostIPC: true\nallowHostNetwork: false\nallowHostPID: false\nallowHostPorts: false\nallowPrivilegedContainer: false\nallowedCapabilities:\n- \'*\'\nallowedFlexVolumes: null\napiVersion: v1\ndefaultAddCapabilities: []\nfsGroup:\n  type: RunAsAny\ngroups:\n- cluster-admins\nkind: SecurityContextConstraints\nmetadata:\n  annotations:\n    kubernetes.io/description: zenuid provides all features of the restricted SCC but allows users to run with any UID and any GID.\n  name: ${NAMESPACE}-zenuid\npriority: 10\nreadOnlyRootFilesystem: false\nrequiredDropCapabilities: []\nrunAsUser:\n  type: RunAsAny\nseLinuxContext:\n  type: MustRunAs\nsupplementalGroups:\n  type: RunAsAny\nusers: \n- system:serviceaccount:${NAMESPACE}:default\n- system:serviceaccount:${NAMESPACE}:icpd-anyuid-sa\nvolumes:\n- configMap\n- downwardAPI\n- emptyDir\n- persistentVolumeClaim\n- projected\n- secret\n\nEOF\n\n# Give cluster-admin permission to the service accounts used on the installation\noc adm policy add-cluster-role-to-user cluster-admin "system:serviceaccount:${NAMESPACE}:tiller"\noc adm policy add-cluster-role-to-user cluster-admin "system:serviceaccount:${NAMESPACE}:default"\n\n\n# Set the template for the catalog\ncat &lt;&lt; EOF | oc apply -f - \n---\napiVersion: template.openshift.io/v1\nkind: Template\nmessage: |-\n  The following service(s) have been created in your project: ${NAMESPACE}.\n\n        Username: admin\n        Password: password\n        CP4Data URL: https://${CP4D_ROUTE}:${CP4D_PORT_NUMBER}/\n\n  For more information about, see https://docs-icpdata.mybluemix.net/home.\nmetadata:\n  name: cp4data\n  annotations:\n    description: |-\n      IBM® Cloud Pak for Data is a native cloud solution that enables you to put your data to work quickly and efficiently.\n    openshift.io/display-name: Cloud Pak for Data\n    openshift.io/documentation-url: https://docs-icpdata.mybluemix.net/home\n    openshift.io/long-description: IBM Cloud Pak for Data is composed of pre-configured microservices that run on a multi-node IBM Cloud Private cluster. The microservices enable you to connect to your data sources so that you can catalog and govern, explore and profile, transform, and analyze your data from a single web application..\n    openshift.io/provider-display-name: Red Hat, Inc.\n    openshift.io/support-url: https://access.redhat.com\n    tags: AI, Machine Learning, Data Management, IBM\nobjects:\n- apiVersion: v1\n  kind: DeploymentConfig\n  metadata:\n    name: cp4data-installer\n    annotations:\n      template.alpha.openshift.io/wait-for-ready: "true"\n  spec:\n    replicas: 1\n    selector:\n      name: cp4data-installer\n    strategy:\n      type: Recreate\n    template:\n      metadata:\n        labels:\n          name: cp4data-installer\n      spec:\n        containers:\n        - env:\n          - name: NAMESPACE\n            value: \\ ${ NAMESPACE}\n          - name: TILLER_NAMESPACE\n            value: \\ ${ NAMESPACE}\n          - name: INSTALL_TILLER\n            value: "1"\n          - name: TILLER_IMAGE\n            value: "${DOCKER_REGISTRY}/cp4d-tiller:v1"\n          - name: TILLER_TLS\n            value: "0"\n          - name: STORAGE_CLASS\n            value: \\ ${ STORAGE_CLASS}\n          - name: DOCKER_REGISTRY\n            value: ${DOCKER_REGISTRY}\n          - name: DOCKER_REGISTRY_USER \n            value: ${DOCKER_REGISTRY_USER}\n          - name: DOCKER_REGISTRY_PASS\n            value: \\ ${ DOCKER_REGISTRY_PASS}\n          - name: NGINX_PORT_NUMBER\n            value: \\ ${ NGINX_PORT_NUMBER}\n          - name: CONSOLE_ROUTE_PREFIX\n            value: \\ ${ CONSOLE_ROUTE_PREFIX}\n          name: cp4data-installer\n          image: "${DOCKER_REGISTRY}/cp4d-installer:v1"\n          imagePullPolicy: Always\n          resources:\n            limits:\n              memory: "200Mi"\n              cpu: 1\n          command: [ "/bin/sh", "-c" ]\n          args: [ "./deploy-cp4data.sh; sleep 3000000" ]\n        imagePullSecrets:\n        - name: icp4d-anyuid-docker-pull   \nparameters:\n- description: Namespace where to install Cloud Pak for Data.\n  displayName: Namespace\n  name: NAMESPACE\n  required: true\n  value: ${NAMESPACE}\n- description: Docker registry user with permission with pull images.\n  displayName: Docker Registry User\n  name: DOCKER_REGISTRY_USER\n  value: "iamapikey"\n  required: true\n- description: Docker registry password.\n  displayName: Docker Registry Password\n  name: DOCKER_REGISTRY_PASS\n  required: true\n  value: inform_here_the_docker_repo_password\n- description: Hostname for the external route.\n  displayName: Cloud Pak route hostname\n  name: CONSOLE_ROUTE_PREFIX\n  required: true\n  value: "cp4data-console"\n- description: Storage class name.\n  displayName: StorageClass\n  name: STORAGE_CLASS\n  value: "glusterfs-storage"\n  required: true\n \nEOF\n')),Object(a.b)("h2",null,"3. Running the command"),Object(a.b)("h2",null,"Update entitlement registry details in the script ","<","b>install-cp4data.sh","<","/b> before executing it."),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"DOCKER_REGISTRY=“cp.stg.icr.io/cp/cp4d”"),Object(a.b)("li",{parentName:"ul"},"DOCKER_REGISTRY_USER=“iamapikey”"),Object(a.b)("li",{parentName:"ul"},"DOCKER_REGISTRY_PASS=”","<","<","inform here the docker password>>”    ")),Object(a.b)("p",null,"*** ","<","b>Please contact Offering Management","<","/b>"),Object(a.b)("p",null,"Then run the above script to create ","<","b>“Cloud Pak for Data”","<","/b> install tile on your OCP Catalogue."),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{}),'# ./install-cp4data.sh &lt;new_namespace>\n\nExample:\n# ./install-cp4data.sh lax-ai\nnamespace/lax-ai created\nNow using project "lax-ai" on server "https://boa2102.demo.ibmcloudpack.com:8443".\nError from server (AlreadyExists): serviceaccounts "default" already exists\nserviceaccount/tiller created\nrole "system:deployer" added: "deployer"\nsecret/icp4d-anyuid-docker-pull created\nsecuritycontextconstraints.security.openshift.io/lax-ai-zenuid created\ncluster role "cluster-admin" added: "system:serviceaccount:lax-ai:tiller"\ncluster role "cluster-admin" added: "system:serviceaccount:lax-ai:default"\ntemplate.template.openshift.io/cp4data created\n#\n')),Object(a.b)("h2",null,"4 Install “Cloud Pak for Data” from  OpenShift Admin dashboard"),Object(a.b)("p",null,"Please ensure, what ","<","b>storage class","<","/b> is supported in your cluster using the following command"),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{}),"# oc get sc\nNAME                PROVISIONER               AGE\nglusterfs-storage   kubernetes.io/glusterfs   13d\n")),Object(a.b)("p",null,"in this case, ","<","b>glusterfs-storage","<","/b> is the available storage class."),Object(a.b)("p",null,"on OpenShift Admin Console,\n",Object(a.b)("img",o({parentName:"p"},{src:"https://github.ibm.com/CASE/cloudpak-onboard-residency/blob/gh-pages/assets/img/cp4d/selecting-cp4d-installer.jpg",alt:"tile"}))),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("ol",{parentName:"li"},Object(a.b)("li",{parentName:"ol"},"select “Application Console” "))),Object(a.b)("li",{parentName:"ul"},Object(a.b)("ol",o({parentName:"li"},{start:2}),Object(a.b)("li",{parentName:"ol"},"Search for “Cloud Pak for Data tile”"))),Object(a.b)("li",{parentName:"ul"},Object(a.b)("ol",o({parentName:"li"},{start:3}),Object(a.b)("li",{parentName:"ol"},"Click the tile to bring up a form to enter addtional details\n",Object(a.b)("img",o({parentName:"li"},{src:"https://github.ibm.com/CASE/cloudpak-onboard-residency/blob/gh-pages/assets/img/cp4d/storage-class.jpg",alt:"details"})),"\n- Namespace\n- Docker Registry User\n- Docker Registry Password\n- Cloud Pak route hostname\n- StorageClass"))),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"Select ","<","b>Create","<","/b> to start the install."),Object(a.b)("pre",{parentName:"li"},Object(a.b)("code",o({parentName:"pre"},{}),"This installer will setup a tiller and pull the Cloud Pak for Data helm charts from the entitlement registry and deploy them inside the OCP cluster under the namespace. \n")))),Object(a.b)("h2",null,"5 Monitoring the Install"),Object(a.b)("p",null,"You can monitor the install log by check the example ","<","b>“cp4data-installer-1-xl2d9”","<","/b> pod’s log. This takes above 45 minutes to install the Cloud Pak for Data platform and add-on modules like DDE and UGI."),Object(a.b)("p",null,"If you notice any error, please delete the install pod and let it re-run. Most of the cases, the error is caused by the timing delay."),Object(a.b)("p",null,"On successfull install, install pod log will show the URL of the CP4D dashboard.  "),Object(a.b)("h2",null,"Cloud Pak for Data Dashboard URL"),Object(a.b)("p",null,"You can also get the URL from OCP Admin dashboard under the “Application Console” of your namespace/project. Select the Routes to see the URL.\n",Object(a.b)("img",o({parentName:"p"},{src:"https://github.ibm.com/CASE/cloudpak-onboard-residency/blob/gh-pages/assets/img/cp4d/getting%20CP4D-URL.jpg",alt:"CP4D URL"}))),Object(a.b)("h2",null,"6 Document References"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",o({parentName:"li"},{href:"https://www.ibm.com/support/knowledgecenter/en/SSQNUZ_2.1.0/com.ibm.icpdata.doc/zen/install/openshift-softlayer.html"}),"https://www.ibm.com/support/knowledgecenter/en/SSQNUZ_2.1.0/com.ibm.icpdata.doc/zen/install/openshift-softlayer.html"))),Object(a.b)("h2",null,"6. Troubleshooting"),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},Object(a.b)("strong",{parentName:"li"},"ibm-daas-redis")," pod is pending for PV creation")),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{}),"$ oc get pod --all-namespaces | grep -i -v running\nNAMESPACE                           NAME                                                        READY     STATUS      RESTARTS   AGE\ncp4d-lax                            cloudant-permissions-hook-qwkpd                             0/1       Completed   0          1h\ncp4d-lax                            cp4d-lax-ibm-daas-daas-proxy-57b8478fdf-2gl66               0/2       Init:0/1    0          1h\ncp4d-lax                            cp4d-lax-ibm-daas-daas-proxy-57b8478fdf-btj2h               0/2       Init:0/1    0          1h\ncp4d-lax                            cp4d-lax-ibm-daas-redis-6d95b77585-wp6n4                    0/1       Pending     0          1h\ncp4d-lax                            dash-post-install-job-4lx5h                                 0/1       Completed   0          1h\ncp4d-lax                            dsx-influxdb-set-auth-ckw6h                                 0/1       Completed   3          1h\ncp4d-lax                            dsx-requisite-pre-install-job-mlxg2                         0/1       Completed   0          1h\ncp4d-lax                            preload-jupyterpy36-job-frnnj                               0/1       Completed   0          1h\ncp4d-lax                            preload-jupyterpy36-job-h2wsb                               0/1       Completed   0          1h\ncp4d-lax                            preload-jupyterpy36-job-q9wxg                               0/1       Completed   0          1h\ncp4d-lax                            setup-nginx-job-gkxc6                                       0/1       Completed   0          1h\ncp4d-lax                            zen-base-copy-files-pre-install-job-hh2s6                   0/1       Completed   0          1h\ncp4d-lax                            zen-metastoredb-init-9gcdx                                  0/1       Completed   0          1h\ncp4d-lax                            zen-metastoredbdb-init-wfktl                                0/1       Completed   0          1h\n")),Object(a.b)("p",null,"Solution:  Describe pod for getting more details. Example"),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{}),"# oc describe pod  cp4d-lax-ibm-daas-redis-6d95b77585-wp6n4 -n cp4d-lax\nName:               cp4d-lax-ibm-daas-redis-6d95b77585-wp6n4\nNamespace:          cp4d-lax\nPriority:           0\nPriorityClassName:  &lt;none>\nNode:               &lt;none>\nLabels:             app=cp4d-lax-ibm-daas-redis\n                    pod-template-hash=2851633141\nAnnotations:        openshift.io/scc=anyuid\n                    productID=ICP4D-IBMCognosDashboardEmbedded_01319_PROD_00000\n                    productName=IBM Cognos Dashboard Embedded\n                    productVersion=0.13.19\nStatus:             Pending\nIP:                 \nControlled By:      ReplicaSet/cp4d-lax-ibm-daas-redis-6d95b77585\nContainers:\n  cp4d-lax-ibm-daas-redis:\n    Image:      us.icr.io/release2_1_0_1_base/redis:1.0.3\n    Port:       6379/TCP\n    Host Port:  0/TCP\n    Requests:\n      cpu:      100m\n      memory:   256Mi\n    Liveness:   exec [redis-cli ping] delay=30s timeout=5s period=10s #success=1 #failure=3\n    Readiness:  exec [redis-cli ping] delay=5s timeout=1s period=10s #success=1 #failure=3\n    Environment:\n      ALLOW_EMPTY_PASSWORD:  yes\n    Mounts:\n      /bitnami from redis-data (rw)\n      /var/run/secrets/kubernetes.io/serviceaccount from default-token-n5x9p (ro)\nConditions:\n  Type           Status\n  PodScheduled   False \nVolumes:\n  redis-data:\n    Type:       PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)\n    ClaimName:  cp4d-lax-ibm-daas-redis\n    ReadOnly:   false\n  default-token-n5x9p:\n    Type:        Secret (a volume populated by a Secret)\n    SecretName:  default-token-n5x9p\n    Optional:    false\nQoS Class:       Burstable\nNode-Selectors:  beta.kubernetes.io/arch=amd64\n                 node-role.kubernetes.io/compute=true\nTolerations:     node.kubernetes.io/memory-pressure:NoSchedule\nEvents:\n  Type     Reason            Age                 From               Message\n  ----     ------            ----                ----               -------\n  Warning  FailedScheduling  4m (x3572 over 1h)  default-scheduler  pod has unbound PersistentVolumeClaims (repeated 6 times)\n\n\n# oc get pvc\nNAME                        STATUS    VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS        AGE\ncloudant-srv-mount          Bound     pvc-8378ed9b-d502-11e9-995d-06a6476a5489   10Gi       RWX            glusterfs-storage   1h\ncp4d-lax-ibm-daas-daas      Bound     pvc-94f81b75-d504-11e9-995d-06a6476a5489   20Gi       RWX            glusterfs-storage   1h\ncp4d-lax-ibm-daas-redis     Pending                                                                                            1h\ndatadir-zen-metastoredb-0   Bound     pvc-83a03288-d502-11e9-9b18-06e451a5477f   10Gi       RWO            glusterfs-storage   1h\ndatadir-zen-metastoredb-1   Bound     pvc-83aa60f1-d502-11e9-9b18-06e451a5477f   10Gi       RWO            glusterfs-storage   1h\ndatadir-zen-metastoredb-2   Bound     pvc-83b61599-d502-11e9-9b18-06e451a5477f   10Gi       RWO            glusterfs-storage   1h\ninfluxdb-pvc                Bound     pvc-8377d81a-d502-11e9-995d-06a6476a5489   10Gi       RWX            glusterfs-storage   1h\nredis-mount                 Bound     pvc-837a98f1-d502-11e9-995d-06a6476a5489   10Gi       RWX            glusterfs-storage   1h\nspark-metrics-pvc           Bound     pvc-837bd0f8-d502-11e9-995d-06a6476a5489   50Gi       RWX            glusterfs-storage   1h\nuser-home-pvc               Bound     pvc-6f061bc6-d502-11e9-995d-06a6476a5489   100Gi      RWX            glusterfs-storage   1h\nzen-ai-ibm-daas-redis       Bound     pvc-4060c3af-d510-11e9-995d-06a6476a5489   8Gi        RWO            glusterfs-storage   3m\n")),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{}),"# cat ibm-daas-redis-pv.yaml \napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  finalizers:\n  - kubernetes.io/pvc-protection\n  labels:\n    app: cp4d-lax-ibm-daas-redis\n    chart: redis-1.1.6\n    heritage: Tiller\n    release: cp4d-lax-ibm-daas\n  name: cp4d-lax-ibm-daas-redis\n  namespace: cp4d-lax\nspec:\n  accessModes:\n  - ReadWriteOnce\n  resources:\n    requests:\n      storage: 8Gi\n  storageClassName: glusterfs-storage\n\na. Delete the pending unbound PVC\n#oc delete pvc zen-ai-ibm-daas-redis \n\nb. Create PV/PVCs.\n#oc apply -f ibm-daas-redis-pv.yaml\n\n")))}c.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-content-data-install-cpd-on-openshift-on-vmware-md-2bbba9dddd7df5cad1a5.js.map