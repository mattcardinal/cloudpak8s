(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{jCvT:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return l})),a.d(t,"default",(function(){return c}));a("91GP"),a("rGqo"),a("yt8O"),a("Btvt"),a("RW0V"),a("q1tI");var n=a("7ljp"),r=a("013z");a("qKvR");function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var l={},i={_frontmatter:l},b=r.a;function c(e){var t=e.components,a=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,["components"]);return Object(n.b)(b,o({},i,a,{components:t,mdxType:"MDXLayout"}),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"})),Object(n.b)("h1",null,"make sure there is a space after the - so that the TOC is generated"),Object(n.b)("p",null,"{:toc}"),Object(n.b)("h3",null,"Log in to you OCP cluster"),Object(n.b)("p",null,"See the ","[Prerequisites]","({{ pages.github.url }}/automation/pre-requisites) chapter for details on logging in to your OCP cluster."),Object(n.b)("h2",null,"Install Kafka"),Object(n.b)("h3",null,"Add the Helm repository"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Execute:")),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator\n")),Object(n.b)("h3",null,"Create the Kafka project"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Execute:")),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"oc new-project kafka\n")),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Make sure you are working from the ",Object(n.b)("inlineCode",{parentName:"li"},"kafka")," project, then grant the tiller server ",Object(n.b)("inlineCode",{parentName:"li"},"edit")," access to current project:")),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),'oc project kafka\noc adm policy add-role-to-user edit "system:serviceaccount:tiller:tiller"\n')),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Add the Security Context Constraints (CSS) ",Object(n.b)("inlineCode",{parentName:"li"},"anyuid")," to the Service Account ",Object(n.b)("inlineCode",{parentName:"li"},"default")," of the project:")),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"oc adm policy add-scc-to-user anyuid -z default\n")),Object(n.b)("h3",null,"Create PVs if necessary"),Object(n.b)("p",null,"If your cluster does not support dynamic persistence volume, download ",Object(n.b)("a",o({parentName:"p"},{href:"assets/automation/bai/kafka-pv.yaml"}),"kafka-pv.yaml")," and execute:"),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"oc apply -f kafka-pv.yaml\n")),Object(n.b)("h3",null,"Install the Helm chart"),Object(n.b)("p",null,"Download the ",Object(n.b)("a",o({parentName:"p"},{href:"assets/automation/bai/kafka-values.yaml"}),"kafka-values.yaml")," file to your working directory and run the following command:"),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"helm install incubator/kafka --name my-kafka --namespace kafka -f kafka-values.yaml\n")),Object(n.b)("p",null,"This will deploy ",Object(n.b)("a",o({parentName:"p"},{href:"https://github.com/helm/charts/tree/master/incubator/kafka"}),"Apache Kafka")," and ",Object(n.b)("a",o({parentName:"p"},{href:"https://github.com/helm/charts/tree/master/incubator/zookeeper"}),"Zookeeper"),"."),Object(n.b)("p",null,"Keep ",Object(n.b)("inlineCode",{parentName:"p"},"my-kafka")," as a release name because the rest of the installation assumes it. "),Object(n.b)("h3",null,"Set-up the Kafka bootstrap server"),Object(n.b)("p",null,"If access is from inside the OpenShift cluster environment, then the bootstrap server is ",Object(n.b)("inlineCode",{parentName:"p"},"my-kafka-headless.kafka.svc.cluster.local:9092"),"."),Object(n.b)("p",null,"If access is from an external system, you need to perform the following steps:"),Object(n.b)("p",null,"1 - Retrieve the OpenShift ingress address with the following command:\n",Object(n.b)("img",o({parentName:"p"},{src:"assets/automation//images/rhos-kafka1.png",alt:"Kafka ingress"}))),Object(n.b)("p",null,"2 - Use this ingress address to set the bootstrap server to ",Object(n.b)("inlineCode",{parentName:"p"},"{rhos-ingress-ip}:31090,{rhos-ingress-ip}:31091,{rhos-ingress-ip}:31092"),"."),Object(n.b)("p",null,"3 - Add the line ",Object(n.b)("inlineCode",{parentName:"p"},"{rhos-ingress-ip} kafka.cluster.local")," to the ",Object(n.b)("inlineCode",{parentName:"p"},"/etc/hosts")," file."),Object(n.b)("h2",null,"Install Business Automation Insights (BAI)"),Object(n.b)("h3",null,"Download the BAI PPA"),Object(n.b)("p",null,"Download the following PPA from ",Object(n.b)("a",o({parentName:"p"},{href:"https://www.ibm.com/software/passportadvantage"}),"IBM Passport Advantage")," to your working-directory:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("em",{parentName:"li"},"IBM Cloud Pak for Automation v19.0.1 - Business Operation Insights for Certified Kubernetes Multiplatform English (CC222EN)"))),Object(n.b)("p",null,"The downloaded archive should be ",Object(n.b)("inlineCode",{parentName:"p"},"ICP4A19.0.1-bai.tgz"),"."),Object(n.b)("h3",null,"Create the BAI project"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Create a new OpenShift project for BAI:")),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"oc new-project baiproject\n")),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Make sure you are working from your newly created BAI project, then grant the tiller server ",Object(n.b)("inlineCode",{parentName:"li"},"edit")," access to current project:")),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),'oc project baiproject\noc adm policy add-role-to-user edit "system:serviceaccount:tiller:tiller"\n')),Object(n.b)("h3",null,"Create a ServiceAccount and update the SCCs"),Object(n.b)("p",null,"Check if ",Object(n.b)("inlineCode",{parentName:"p"},"ibm-anyuid-scc")," and ",Object(n.b)("inlineCode",{parentName:"p"},"ibm-privileged-scc")," exist in your cluster:"),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"oc get scc ibm-anyuid-scc\noc get scc ibm-privileged-scc\n")),Object(n.b)("p",null,"If they don’t exist, download ",Object(n.b)("a",o({parentName:"p"},{href:"assets/automation/bai/ibm-anyuid-scc.yaml"}),"ibm-anyuid-scc.yaml")," and ",Object(n.b)("a",o({parentName:"p"},{href:"assets/automation/bai/ibm-privileged-scc.yaml"}),"ibm-privileged-scc.yaml")," files to your working directory and execute the following commands:"),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"oc apply -f ibm-anyuid-scc.yaml\noc apply -f ibm-privileged-scc.yaml\n\n")),Object(n.b)("p",null,"Download ",Object(n.b)("a",o({parentName:"p"},{href:"assets/automation/bai/bai-psp.yaml"}),"bai-psp.yaml")," file to your working directory."),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"oc apply -f bai-psp.yaml\n\noc adm policy add-scc-to-user ibm-privileged-scc -z bai-prod-release-bai-psp-sa\noc adm policy add-scc-to-user ibm-anyuid-scc -z bai-prod-release-bai-psp-sa\n\noc adm policy add-scc-to-group ibm-anyuid-scc system:authenticated\noc adm policy add-scc-to-user ibm-privileged-scc system:authenticated\n")),Object(n.b)("h3",null,"Push the BAI images to the registry"),Object(n.b)("p",null,"If you are installing BAI on IBM Cloud managed OCP cluster:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Login to the Docker registry:")),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"docker login -u $(oc whoami) -p $(oc whoami -t) docker-registry.default.svc:5000\n")),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Download the ",Object(n.b)("inlineCode",{parentName:"li"},"loadimages.sh")," script to your working directory:")),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"wget https://raw.githubusercontent.com/icp4a/cert-kubernetes/19.0.1/scripts/loadimages.sh\nchmod +x loadimages.sh\n")),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Load the images:")),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"./loadimages.sh -p ICP4A19.0.1-bai.tgz -r docker-registry.default.svc:5000/baiproject\n")),Object(n.b)("p",null,"If you are installing BAI on an on-prem OCP:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Find the url of the cluster registry:")),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"oc -n default get route\n# search for route to docker-registry\nsudo docker login -u $(oc whoami) -p $(oc whoami -t) &lt;route_to_docker_registry>\n")),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Download the ",Object(n.b)("inlineCode",{parentName:"li"},"loadimages.sh")," script to your working directory:")),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"wget https://raw.githubusercontent.com/icp4a/cert-kubernetes/19.0.1/scripts/loadimages.sh\nchmod +x loadimages.sh\n")),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Load the images:")),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"sudo ./loadimages.sh -p ICP4A19.0.1-bai.tgz -r &lt;route_to_docker_registry>/baiproject\n")),Object(n.b)("h3",null,"Set up the persistent volumes"),Object(n.b)("p",null,"Run the following commands to create the required PV folders in NFS, where ",Object(n.b)("inlineCode",{parentName:"p"},"/data/persistentvolumes/")," is the mounted directory of your NFS server:"),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"sudo mkdir -p /data/persistentvolumes/bai/ibm-bai-pv\nsudo chown 9999:9999 /data/persistentvolumes/bai/ibm-bai-pv\nsudo chmod 770 /data/persistentvolumes/bai/ibm-bai-pv\n\nmkdir -p /data/persistentvolumes/bai/ibm-bai-ek-pv-0\nmkdir -p /data/persistentvolumes/bai/ibm-bai-ek-pv-1\nmkdir -p /data/persistentvolumes/bai/ibm-bai-ek-pv-2\nmkdir -p /data/persistentvolumes/bai/ibm-bai-ek-pv-3\nsudo chown 1000:1000 /data/persistentvolumes/bai/ibm-bai-ek-pv-0\nsudo chown 1000:1000 /data/persistentvolumes/bai/ibm-bai-ek-pv-1\nsudo chown 1000:1000 /data/persistentvolumes/bai/ibm-bai-ek-pv-2\nsudo chown 1000:1000 /data/persistentvolumes/bai/ibm-bai-ek-pv-3\nsudo chmod 770 /data/persistentvolumes/bai/ibm-bai-ek-pv-0\nsudo chmod 770 /data/persistentvolumes/bai/ibm-bai-ek-pv-1\nsudo chmod 770 /data/persistentvolumes/bai/ibm-bai-ek-pv-2\nsudo chmod 770 /data/persistentvolumes/bai/ibm-bai-ek-pv-3\n\nmkdir /data/persistentvolumes/bai/es-snapshots-pv\nsudo chown 1000:1000 /data/persistentvolumes/bai/es-snapshots-pv\nsudo chmod 770 /data/persistentvolumes/bai/es-snapshots-pv\n")),Object(n.b)("p",null,"Download the ",Object(n.b)("a",o({parentName:"p"},{href:"assets/automation/bai/bai-pv.yaml"}),Object(n.b)("inlineCode",{parentName:"a"},"bai-pv.yaml"))," PV configuration file to your working directory. Edit the file and replace the IP address of the NFS server by the name or the IP address of your server. Modify the path of the directory if necessary. "),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"oc apply -f bai-pv.yaml\n")),Object(n.b)("h3",null,"Deploy BAI"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("p",{parentName:"li"},"Download the ",Object(n.b)("a",o({parentName:"p"},{href:"assets/automation/bai/values.yaml"}),Object(n.b)("inlineCode",{parentName:"a"},"values.yaml"))," file to your working directory. Make sure that the Kafka ",Object(n.b)("inlineCode",{parentName:"p"},"bootstrapServers")," name corresponds to the name from the ",Object(n.b)("em",{parentName:"p"},"Set-up the Kafka bootstrap server")," section. ")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("p",{parentName:"li"},"To update the operator configuration, copy this ",Object(n.b)("a",o({parentName:"p"},{href:"assets/automation/bai/my_ibm_cp4a_cr_3.yaml"}),Object(n.b)("inlineCode",{parentName:"a"},"my_ibm_cp4a_cr_3.yaml"))," template file in your working directory and update it as needed. You can highlight the BAI configuration sections that need your attention by doing a diff with the template file found in ",Object(n.b)("a",o({parentName:"p"},{href:"assets/automation/bas/my_ibm_cp4a_cr_2.yaml"}),Object(n.b)("inlineCode",{parentName:"a"},"my_ibm_cp4a_cr_2.yaml")))),Object(n.b)("li",{parentName:"ul"},Object(n.b)("p",{parentName:"li"},"Apply the updated custom resource definition file:"))),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"oc apply -f my_ibm_icp4a_cr_3.yaml\n")),Object(n.b)("p",null,"You should see the following new pods deployed:"),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"NAME                                              READY   STATUS      RESTARTS   AGE\ncp4a-prod-bai-admin-d877c8b66-8xzs5               1/1     Running     0          15h\ncp4a-prod-bai-bawadv-97flq                        0/1     Completed   0          15h\ncp4a-prod-bai-bpmn-bvrtx                          0/1     Completed   0          15h\ncp4a-prod-bai-content-nqgl2                       0/1     Completed   0          15h\ncp4a-prod-bai-flink-jobmanager-5844df9685-2dkz5   1/1     Running     0          15h\ncp4a-prod-bai-flink-taskmanager-0                 1/1     Running     3          15h\ncp4a-prod-bai-flink-taskmanager-1                 1/1     Running     3          15h\ncp4a-prod-bai-flink-taskmanager-2                 1/1     Running     3          15h\ncp4a-prod-bai-flink-taskmanager-3                 1/1     Running     0          15h\ncp4a-prod-bai-flink-taskmanager-4                 1/1     Running     3          15h\ncp4a-prod-bai-flink-zk-0                          1/1     Running     0          15h\ncp4a-prod-bai-icm-pc2vw                           0/1     Completed   0          15h\ncp4a-prod-bai-odm-94dch                           0/1     Completed   0          15h\ncp4a-prod-bai-setup-wphkf                         0/1     Completed   0          15h\ncp4a-prod-ibm-dba-ek-client-547dfdbd94-5jdxl      1/1     Running     0          15h\ncp4a-prod-ibm-dba-ek-data-0                       1/1     Running     0          15h\ncp4a-prod-ibm-dba-ek-kibana-7cb766fcd7-5bpl8      1/1     Running     0          15h\ncp4a-prod-ibm-dba-ek-master-0                     1/1     Running     0          15h\ncp4a-prod-ibm-dba-ek-security-config-5hj2p        0/1     Completed   0          15h\n")),Object(n.b)("h3",null,"Expose the Kibana service"),Object(n.b)("p",null,"Download ",Object(n.b)("a",o({parentName:"p"},{href:"assets/automation/bai/route.yaml"}),Object(n.b)("inlineCode",{parentName:"a"},"route.yaml"))," file to your working directory and run the following command:"),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"oc apply -f route.yaml\n")),Object(n.b)("h3",null,"Accessing the Kibana dashboards"),Object(n.b)("p",null,"You can find the URL of Kibana in the Application Console of your cluster, in the ",Object(n.b)("inlineCode",{parentName:"p"},"Services")," tab of your BAI project. "),Object(n.b)("p",null,"The URL should have the following form:\n",Object(n.b)("inlineCode",{parentName:"p"},"https://bai-prod-release-ibm-dba-ek-kibana-baiproject.&lt;your-cluster-ID>.&lt;cloud-zone>.containers.appdomain.cloud"),"."),Object(n.b)("p",null,"The credential are ",Object(n.b)("inlineCode",{parentName:"p"},"admin")," for user name and ",Object(n.b)("inlineCode",{parentName:"p"},"passw0rd")," for password."),Object(n.b)("h2",null,"Uninstall"),Object(n.b)("h3",null,"Uninstall Kafka:"),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"helm delete my-kafka  --purge\noc delete pvc datadir-my-kafka-0\noc delete pvc datadir-my-kafka-1\noc delete pvc datadir-my-kafka-2\n")),Object(n.b)("p",null,"If you created your PVs manually, execute:"),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"oc delete -f kafka-pv.yaml\n")),Object(n.b)("h3",null,"Uninstall BAI"),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"helm delete bai-prod-release --purge\noc delete pvc data-bai-prod-release-ibm-dba-ek-data-0\noc delete pvc data-bai-prod-release-ibm-dba-ek-data-1\noc delete pvc data-bai-prod-release-ibm-dba-ek-data-2\noc delete pvc data-bai-prod-release-ibm-dba-ek-data-3\noc delete pvc data-bai-prod-release-ibm-dba-ek-master-0\noc delete -f bai-pv.yaml\noc delete -f route.yaml\n")),Object(n.b)("h2",null,"Other useful references to documentation"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",o({parentName:"li"},{href:"https://github.ibm.com/dba/cert-kubernetes/blob/19.0.1/BAI/platform/README_ROKS.md"}),"BAI install on on Red Hat OpenShift on IBM Cloud"))))}c.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-content-automation-install-bai-md-6b98dcee9fd8221d3b48.js.map