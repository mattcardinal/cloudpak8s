(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{gf5X:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return i})),n.d(t,"default",(function(){return c}));n("91GP"),n("rGqo"),n("yt8O"),n("Btvt"),n("RW0V"),n("q1tI");var a=n("7ljp"),o=n("013z");n("qKvR");function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var i={},r={_frontmatter:i},s=o.a;function c(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,a,o={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,["components"]);return Object(a.b)(s,l({},r,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",l({parentName:"li"},{href:"#introduction"}),"Introduction")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",l({parentName:"li"},{href:"#prepare-for-installation"}),"Prepare For Installation")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",l({parentName:"li"},{href:"#run-the-integration-cloud-pak-install"}),"Run the Integration Cloud Pak install")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",l({parentName:"li"},{href:"#deploy-capabilities"}),"Deploy Capabilities")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",l({parentName:"li"},{href:"#example-files"}),"Example files"),Object(a.b)("ul",{parentName:"li"},Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",l({parentName:"li"},{href:"#configyaml"}),"config.yaml"))))),Object(a.b)("h2",null,"Introduction"),Object(a.b)("p",null,"This page describes all the steps on how to deploy the Integration Cloud Pak to a VMWARE onprem environment using the IBM Entitled registry. The steps below includes instructions to:\n1. Prepare the bastion node for installation\n2. Run the Integration Cloud Pak installer to deploy to an existing OpenShift cluster"),Object(a.b)("h2",null,"Prepare For Installation"),Object(a.b)("p",null,"In many production scenarios the master nodes may not be accessed via ssh, we have to choose bastion node to proceed with the installation. "),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Installer Node requirements:"),"  "),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Sufficient resources of ",Object(a.b)("inlineCode",{parentName:"li"},"4cpu 16GB ram ~120 GB Diskspace")),Object(a.b)("li",{parentName:"ul"},"OpenShift CLI, which can be installed following the instruction ",Object(a.b)("a",l({parentName:"li"},{href:"https://cloud.ibm.com/docs/openshift?topic=openshift-openshift-cli"}),"here on IBM Cloud"),"."),Object(a.b)("li",{parentName:"ul"},"Install Docker (v2.2 is compliant and works with Open Shift)"),Object(a.b)("li",{parentName:"ul"},"Install Kubernetes CLI kubectl ")),Object(a.b)("p",null,"Once the CLIs are installed, check if you can login to openshift environment:"),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},"Get login token from openshift console"),Object(a.b)("li",{parentName:"ol"},"Run the ",Object(a.b)("inlineCode",{parentName:"li"},"oc login")," command from a terminal shell."),Object(a.b)("li",{parentName:"ol"},"You should see the cluster logged in message along with list of projects.")),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Installing on Master or Infra node:"),Object(a.b)("br",{parentName:"p"}),"\n","The value of the master, proxy, and management parameters is an array and can have multiple nodes. Due to a limitation from OpenShift, if you want to deploy IBM Cloud Private on any OpenShift master or infrastructure node, you must label the node as an OpenShift compute node with the following command:  "),Object(a.b)("pre",null,Object(a.b)("code",l({parentName:"pre"},{className:"language-md"}),"oc label node &lt;master node host name/infrastructure node host name> node-role.kubernetes.io/compute=true\n")),Object(a.b)("h2",null,"Run the Integration Cloud Pak install"),Object(a.b)("p",null,"Integration Cloud Pak provides a single installer that installs ICP as well loads all the helm charts for integration capabilities. In this example CP4I will be installed on the master node."),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},"Download Integration Cloud Pak installer on the installer node. See ",Object(a.b)("a",l({parentName:"li"},{href:"../pre-reqs"}),"Pre-requisites")," for guidance.\n"),Object(a.b)("li",{parentName:"ol"},"Open a command line window on the boot node, and extract the contents of the Cloud Pak. It is a general recommendation to create a directory in /opt and extract into that directory:  ")),Object(a.b)("pre",null,Object(a.b)("code",l({parentName:"pre"},{className:"language-md"}),"tar xf ibm-cp-int-2019.4.1-online.tar.gz --directory /opt/cp4i\n")),Object(a.b)("p",null,"Once untarred, you can navigate to the directory where the packages was untarred to and type ",Object(a.b)("inlineCode",{parentName:"p"},"tree"),".  It will look like the below"),Object(a.b)("img",{src:"1.untar-cp4i.png",alt:null}),Object(a.b)("ol",{start:3},Object(a.b)("li",{parentName:"ol"},"Load the images onto your local docker registry:")),Object(a.b)("pre",null,Object(a.b)("code",l({parentName:"pre"},{className:"language-md"}),"sudo docker load -i installer_files/cluster/images/icp-inception-3.2.2.tgz\n")),Object(a.b)("ol",{start:4},Object(a.b)("li",{parentName:"ol"},"Change to the ",Object(a.b)("inlineCode",{parentName:"li"},"installer_files/cluster/")," directory. Place the cluster configuration files (kubeconfig) in the ",Object(a.b)("inlineCode",{parentName:"li"},"installer_files/cluster/")," directory. You can also use the following command after using oc login as admin.  Make sure your file only has one cluster context defined with in it, and that context is the location of your target cluster.")),Object(a.b)("pre",null,Object(a.b)("code",l({parentName:"pre"},{className:"language-md"}),"oc config view > kubeconfig\n")),Object(a.b)("ol",{start:4},Object(a.b)("li",{parentName:"ol"},"Note down the IP addresses of OpenShift worker nodes. To get the IP addresses of the worker nodes, run:")),Object(a.b)("pre",null,Object(a.b)("code",l({parentName:"pre"},{className:"language-md"}),"oc get nodes -o wide\n")),Object(a.b)("ol",{start:5},Object(a.b)("li",{parentName:"ol"},"Navigate to your cluster directory ",Object(a.b)("inlineCode",{parentName:"li"},"/opt/cp4i/installer/cluster"),".  "),Object(a.b)("li",{parentName:"ol"},"Edit the config.yaml with the information you have collected above. See the example at the end of the page for guidance.")),Object(a.b)("p",null,"Here are the fields to update with your respective values based on your environment:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"under cluster_nodes heading -> set the hostnames for ",Object(a.b)("inlineCode",{parentName:"li"},"Master"),", ",Object(a.b)("inlineCode",{parentName:"li"},"Proxy")," and ",Object(a.b)("inlineCode",{parentName:"li"},"Management"),".  For non-prdoduction type system, setting and proxy to the same host is fine.  use the short name for your nodes (e.g. compute1, compute2 etc)"),Object(a.b)("li",{parentName:"ul"},"under storage_class -> choose your default storage class here - use ",Object(a.b)("inlineCode",{parentName:"li"},"oc get sc")," to get a list of available storageclasses."),Object(a.b)("li",{parentName:"ul"},"docker_user -> ",Object(a.b)("inlineCode",{parentName:"li"},"ekey")),Object(a.b)("li",{parentName:"ul"},"docker_password -> set this to your entitlement key")),Object(a.b)("p",null,"instructions to get your entitlement key can be found ",Object(a.b)("a",l({parentName:"p"},{href:"https://github.ibm.com/CloudPakOpenContent/cloudpak-entitlement"}),"here")," "),Object(a.b)("ol",{start:9},Object(a.b)("li",{parentName:"ol"},"Run the installer with:",Object(a.b)("pre",{parentName:"li"},Object(a.b)("code",l({parentName:"pre"},{}),"sudo docker run -t --net=host -e LICENSE=accept -v $(pwd):/installer/cluster:z -v /var/run:/var/run:z -v /etc/docker:/etc/docker:z --security-opt label:disable ibmcom/icp-inception-amd64:3.2.2 addon -vvv | tee install.log\n"))),Object(a.b)("li",{parentName:"ol"},"If the namespaces for the different capabilities did not create you can create them manually using the scripts in ",Object(a.b)("inlineCode",{parentName:"li"},"installer_files/cluster/resources")," e.g. ace.yaml, apic.yaml.  Simply run each script using this syntax")),Object(a.b)("pre",null,Object(a.b)("code",l({parentName:"pre"},{className:"language-md"}),"oc create -f &lt;scriptname>.yaml\n")),Object(a.b)("ol",{start:9},Object(a.b)("li",{parentName:"ol"},"Once the process is complete, you will need to create your ",Object(a.b)("inlineCode",{parentName:"li"},"ibm_entitlement_key")," secrets in all of the main component namespaces.  You can accomplish this by running the ",Object(a.b)("inlineCode",{parentName:"li"},"create_secrets.sh")," script. Before doing so, export these two variables")),Object(a.b)("pre",null,Object(a.b)("code",l({parentName:"pre"},{className:"language-md"}),"export DOCKER_REGISTRY_USER=ekey\nexport DOCKER_REGISTRY_PASS=&lt;your entitlement key>\n")),Object(a.b)("ol",{start:10},Object(a.b)("li",{parentName:"ol"},"It will be helpful to understand what your proxy node address is, as it will be referenced several time when deploying the individual capabilities.  Run this command and take note of its output.")),Object(a.b)("pre",null,Object(a.b)("code",l({parentName:"pre"},{className:"language-md"}),'oc get configmap -n kube-public ibmcloud-cluster-info -o=jsonpath="{.data.proxy_address}"`\n')),Object(a.b)("h2",null,"Deploy Capabilities"),Object(a.b)("p",null,"It is recommended that you install the tracing capability first"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",l({parentName:"li"},{href:"../deploy-tracing"}),"Tracing")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",l({parentName:"li"},{href:"../deploy-integration"}),"App Connect")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",l({parentName:"li"},{href:"../deploy-api-mgmt"}),"API Connect")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",l({parentName:"li"},{href:"../deploy-queue-manager"}),"MQ")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",l({parentName:"li"},{href:"../deploy-eventstreams"}),"Event Streams")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",l({parentName:"li"},{href:"../deploy-fast-file-transfer"}),"Aspera")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",l({parentName:"li"},{href:"../deploy-secure-gateway"}),"DataPower")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",l({parentName:"li"},{href:"../deploy-asset-repo"}),"Asset Repository"))),Object(a.b)("h2",null,"Example files"),Object(a.b)("p",null,"This section contains examples of files you will be using throughout the installation. Refer to them for guidance on how to populate your own version of the files."),Object(a.b)("h3",null,"config.yaml"),Object(a.b)("pre",null,Object(a.b)("code",l({parentName:"pre"},{}),"# Nodes selected to run common services components.\n#\n# The value of the master, proxy, and management parameters is an array,\n# by providing multiple nodes the common services will be configured in\n# a high availability configuration.\n#\n# It is recommended to install the components onto one or more openshift\n# worker nodes. The master, proxy, and management components can all share\n# the same node or set of nodes.\ncluster_nodes:\n  master:\n    - compute1\n  proxy:\n    - compute1\n  management:\n    - compute2\n# This storage class is used to store persistent data for the common services\n# components\nstorage_class: csi-cephfs\n## You can set a different storage class for storing log data.\n## By default it will use the value of storage_class.\n# elasticsearch_storage_class:\n# These settings enable the installer to install common services from the IBM\n# Entitled Registry. You will need to supply your entitlement key as described\n# at https://github.com/ibm/charts\nprivate_registry_enabled: true\nimage_repo: cp.icr.io/cp/icp-foundation\ndocker_username: ekey\ndocker_password: &lt;your_entitlement_key>\ndefault_admin_password: admin\npassword_rules:\n  - '(.*)'\nmanagement_services:\n  # Common services\n  iam-policy-controller: enabled\n  metering: enabled\n  licensing: disabled\n  monitoring: enabled\n  nginx-ingress: enabled\n  common-web-ui: enabled\n  catalog-ui: enabled\n  mcm-kui: enabled\n  logging: enabled\n  audit-logging: disabled\n  system-healthcheck-service: disabled\n  multitenancy-enforcement: disabled\n  configmap-watcher: disabled\n# This section installs the IBM Cloud Pak for Integration Platform Navigator.\n# The navigator will be available after installation at:\n# https://ibm-icp4i-prod-integration.&lt;openshift apps domain>/\narchive_addons:\n  icp4i:\n    namespace: integration\n    repo: local-charts\n    path: icp4icontent/IBM-Cloud-Pak-for-Integration-3.0.0.tgz\n    charts:\n      - name: ibm-icp4i-prod\n        values: {}\n")))}c.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-content-integration-onprem-offline-md-8a0d61b3fa56f19e115d.js.map