(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{yQoe:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return b}));a("91GP"),a("rGqo"),a("yt8O"),a("Btvt"),a("RW0V"),a("q1tI");var n=a("7ljp"),r=a("013z");a("qKvR");function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var i={},l=r.a;function b(e){var t=e.components,a=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,["components"]);return Object(n.b)(l,o({},i,a,{components:t,mdxType:"MDXLayout"}),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"})),Object(n.b)("h1",null,"make sure there is a space after the - so that the TOC is generated"),Object(n.b)("p",null,"{:toc}"),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"(19.0.3 UPDATE NEEDED)")),Object(n.b)("h3",null,"Required services"),Object(n.b)("p",null,"Before installing the IBM Business Automation Content Analyzer (BACA), you should have the following pre-requisites in place:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Have privileged access to your DB2 database server. "),Object(n.b)("li",{parentName:"ul"},"Optionally, have access to your LDAP directory server.")),Object(n.b)("p",null,"See the ","[Shared services]","({{ pages.github.url }}/automation/shared-services) chapter for details on DB2 or LDAP installation, if needed."),Object(n.b)("h3",null,"Log in to you OCP cluster"),Object(n.b)("p",null,"See the ","[Prerequisites]","({{ pages.github.url }}/automation/pre-requisites) chapter for details on logging in to your OCP cluster."),Object(n.b)("h3",null,"Download the BACA PPA"),Object(n.b)("p",null,"Download the following archive from ",Object(n.b)("a",o({parentName:"p"},{href:"https://www.ibm.com/software/passportadvantage"}),"IBM Passport Advantage")," to your working directory:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("em",{parentName:"li"},"IBM Cloud Pak for Automation v19.0.1 - Business Automation Content Analyzer for Certified Kubernetes Multiplatform Multilingual (CC224ML)"),".")),Object(n.b)("p",null,"The downloaded archive should be named ",Object(n.b)("inlineCode",{parentName:"p"},"ICP4A19.0.1-baca.tgz"),"."),Object(n.b)("h3",null,"Create the BACA project"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Create a new OpenShift project for BACA with your desired name, e.g. ",Object(n.b)("inlineCode",{parentName:"li"},"baca"),":")),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"oc new-project baca\n")),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Make sure you are working from your newly created BACA project, then grant the tiller server edit access to current project:")),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),'oc project baca\noc adm policy add-role-to-user edit "system:serviceaccount:tiller:tiller"\n')),Object(n.b)("h3",null,"Push the BACA images to the registry"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Get the route to the docker service as described in the ","[Pre-requisites]","({{ pages.github.url }}/automation/pre-requisites.md) chapter, then login to your Docker registry:")),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"docker login -u $(oc whoami) -p $(oc whoami -t) &lt;route-to-docker-service>\n")),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Download the ",Object(n.b)("inlineCode",{parentName:"li"},"loadimages.sh")," script from the ",Object(n.b)("inlineCode",{parentName:"li"},"icp4a")," GitHub repo to your working directory:")),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"wget https://raw.githubusercontent.com/icp4a/cert-kubernetes/19.0.1/scripts/loadimages.sh\nchmod +x loadimages.sh\n")),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Load the BACA images (use ",Object(n.b)("inlineCode",{parentName:"li"},"sudo")," for on-prem cluster):")),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"./loadimages.sh -p ICP4A19.0.1-baca.tgz -r &lt;route-to-docker-service>\n")),Object(n.b)("p",null,"Note that BACA 19.0.1 consists of 17 images, so loading the images may take some time. "),Object(n.b)("h3",null,"Create the BACA databases"),Object(n.b)("p",null,"The steps in this section should be performed on the server machine running your DB2 instance, under a DB2 privileged user login such as ",Object(n.b)("inlineCode",{parentName:"p"},"db2inst1"),"."),Object(n.b)("h4",null,"Download the database creation scripts"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("p",{parentName:"li"},"Log in to the server machine running your DB2 instance.")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("p",{parentName:"li"},"From your working directory on this machine, run the following commands to download the BACA database creation scripts so they can be executed by a DB2 privileged user (e.g. ",Object(n.b)("inlineCode",{parentName:"p"},"db2inst1"),"):"))),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"mkdir BACA_CREATE_DB\nchmod a+w BACA_CREATE_DB\ncd BACA_CREATE_DB\nsu db2inst1\ngit clone https://github.com/icp4a/cert-kubernetes.git\ncd cert-kubernetes/BACA/configuration/DB2\n")),Object(n.b)("h4",null,"Create the Base database"),Object(n.b)("p",null,"While logged in as ",Object(n.b)("inlineCode",{parentName:"p"},"db2inst1"),", run the following command to create the BACA Base database:"),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"./CreateBaseDB.sh\n")),Object(n.b)("p",null,"The script will ask you to enter the following details:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Name of the BACA Base database: use e.g. ",Object(n.b)("inlineCode",{parentName:"li"},"CABASEDB"),"."),Object(n.b)("li",{parentName:"ul"},"Name of the database user: use e.g. ",Object(n.b)("inlineCode",{parentName:"li"},"bacaadmin"),"."),Object(n.b)("li",{parentName:"ul"},"Password for the user: use e.g. ",Object(n.b)("inlineCode",{parentName:"li"},"bacaadmin")," each time when prompted. If it is an existing user, the prompt is skipped.")),Object(n.b)("p",null,"Enter ",Object(n.b)("inlineCode",{parentName:"p"},"Y")," when you are asked ",Object(n.b)("inlineCode",{parentName:"p"},"Would you like to continue (Y/N)"),"."),Object(n.b)("h4",null,"Create the Tenant database"),Object(n.b)("p",null,"An initial user is created when creating the tenant database. If you are using LDAP for authentication, the name of this initial user must match the name of a user entry in LDAP (see ",Object(n.b)("a",o({parentName:"p"},{href:"https://www.ibm.com/support/knowledgecenter/SSYHZ8_19.0.x/com.ibm.dba.install/k8s_topics/tsk_prepare_bacak8s_usergroups.html"}),"this section")," of the IBM Knowledge Center for more information)."),Object(n.b)("p",null,"In the rest of this chapter, we choose to use LDAP and assume that a user named ",Object(n.b)("inlineCode",{parentName:"p"},"bacauser")," has been created in your LDAP directory. If LDAP is not used for authentication, the set-up of this user is not required. "),Object(n.b)("p",null,"While logged in as ",Object(n.b)("inlineCode",{parentName:"p"},"db2inst1"),", run the following command to create the BACA Tenant database (see ",Object(n.b)("a",o({parentName:"p"},{href:"https://www.ibm.com/support/knowledgecenter/SSYHZ8_19.0.x/com.ibm.dba.install/k8s_topics/tsk_prepare_bacak8s_db.html"}),"this section")," of the IBM Knowledge Center for more details):"),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"./AddTenant.sh\n")),Object(n.b)("p",null,"The script will ask you to enter the following details:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Tenant ID: use e.g. ",Object(n.b)("inlineCode",{parentName:"li"},"cp4a")),Object(n.b)("li",{parentName:"ul"},"Tenant type: use e.g. ",Object(n.b)("inlineCode",{parentName:"li"},"0")),Object(n.b)("li",{parentName:"ul"},"BACA tenant database: use e.g. ",Object(n.b)("inlineCode",{parentName:"li"},"TENANTDB")),Object(n.b)("li",{parentName:"ul"},"Host name or IP address of the database server: use your DB2 server IP"),Object(n.b)("li",{parentName:"ul"},"Port of the database server: ",Object(n.b)("inlineCode",{parentName:"li"},"50000")),Object(n.b)("li",{parentName:"ul"},"Do you want this script to create a database user: ",Object(n.b)("inlineCode",{parentName:"li"},"y")),Object(n.b)("li",{parentName:"ul"},"Name of database user: use e.g. ",Object(n.b)("inlineCode",{parentName:"li"},"bacauser")),Object(n.b)("li",{parentName:"ul"},"Password for the user: use e.g. ",Object(n.b)("inlineCode",{parentName:"li"},"bacauser"),", each time when prompted"),Object(n.b)("li",{parentName:"ul"},"Tenant ontology name: Press Enter to accept the default"),Object(n.b)("li",{parentName:"ul"},"Name of the Base BACA database: use e.g. ",Object(n.b)("inlineCode",{parentName:"li"},"CABASEDB")," (the name you provided when running the ",Object(n.b)("inlineCode",{parentName:"li"},"CreateBaseDB.sh")," script)."),Object(n.b)("li",{parentName:"ul"},"Name of the database user for the Base database: use e.g. ",Object(n.b)("inlineCode",{parentName:"li"},"bacaadmin")," (the name you provided when running the ",Object(n.b)("inlineCode",{parentName:"li"},"CreateBaseDB.sh")," script)"),Object(n.b)("li",{parentName:"ul"},"Company name: use e.g. ",Object(n.b)("inlineCode",{parentName:"li"},"IBM")),Object(n.b)("li",{parentName:"ul"},"First name: use e.g. ",Object(n.b)("inlineCode",{parentName:"li"},"baca")),Object(n.b)("li",{parentName:"ul"},"Last name: use e.g. ",Object(n.b)("inlineCode",{parentName:"li"},"user")),Object(n.b)("li",{parentName:"ul"},"Valid email address: your email address"),Object(n.b)("li",{parentName:"ul"},"Login name: use e.g. ",Object(n.b)("inlineCode",{parentName:"li"},"bacauser"))),Object(n.b)("p",null,"Enter ",Object(n.b)("inlineCode",{parentName:"p"},"Y")," when you are asked ",Object(n.b)("inlineCode",{parentName:"p"},"Would you like to continue (Y/N)"),"."),Object(n.b)("h4",null,"Clean up"),Object(n.b)("p",null,"Once the above scripts have been run successfully, you can delete the ",Object(n.b)("inlineCode",{parentName:"p"},"BACA_CREATE_DB")," directory."),Object(n.b)("h3",null,"Set up the persistent volumes"),Object(n.b)("p",null,"Follow instructions at ",Object(n.b)("a",o({parentName:"p"},{href:"https://www.ibm.com/support/knowledgecenter/SSYHZ8_19.0.x/com.ibm.dba.install/k8s_topics/tsk_prepare_bacak8s_storage.html"}),"Configuring storage for the Business Automation Content Analyzer environment")," to create persistent volumes (PVs) and persistent volume claims (PVCs) and the associated directories."),Object(n.b)("p",null,"You can use the ",Object(n.b)("a",o({parentName:"p"},{href:"assets/automation/baca/baca-pv.yaml"}),Object(n.b)("inlineCode",{parentName:"a"},"baca-pv.yaml"))," sample configuration file to create the PVs and PVCs for NFS. First, edit the file and update the ",Object(n.b)("inlineCode",{parentName:"p"},"namespace"),", NFS ",Object(n.b)("inlineCode",{parentName:"p"},"path")," and NFS ",Object(n.b)("inlineCode",{parentName:"p"},"server")," variable to match your environment, then run the command:"),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"oc apply -f baca-pv.yaml -n baca\n")),Object(n.b)("h3",null,"Create secrets"),Object(n.b)("p",null,"In the working directory of your boot node, clone the ",Object(n.b)("inlineCode",{parentName:"p"},"icp4a/cert-kubernetes")," GitHub repo, then change to the BACA configuration scripts directory:"),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"git clone https://github.com/icp4a/cert-kubernetes.git\ncd cert-kubernetes/BACA/configuration\n")),Object(n.b)("h4",null,"Configure common variables"),Object(n.b)("p",null,"The ",Object(n.b)("inlineCode",{parentName:"p"},"init_deployments.sh")," script requires you to populate parameters in ",Object(n.b)("inlineCode",{parentName:"p"},"common.sh")," file.\nInformation on defining the parameters value can be found in ",Object(n.b)("a",o({parentName:"p"},{href:"https://www.ibm.com/support/knowledgecenter/SSYHZ8_19.0.x/com.ibm.dba.ref/topics/ref_baca_common_params.html"}),"this section")," of the IBM Knowledge Center."),Object(n.b)("p",null,"You can use this ",Object(n.b)("a",o({parentName:"p"},{href:"assets/automation/baca/common.sh"}),Object(n.b)("inlineCode",{parentName:"a"},"common.sh"))," sample as a template. Note that:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"The ",Object(n.b)("inlineCode",{parentName:"li"},"BASE_DB_PWD")," and ",Object(n.b)("inlineCode",{parentName:"li"},"LDAP_PASSWORD")," passwords need to be encrypted with Base64."),Object(n.b)("li",{parentName:"ul"},"The value of ",Object(n.b)("inlineCode",{parentName:"li"},"PVCCHOICE")," is ",Object(n.b)("inlineCode",{parentName:"li"},"2")," since we already created the PVs and PVCs in an earlier step."),Object(n.b)("li",{parentName:"ul"},"The value of ",Object(n.b)("inlineCode",{parentName:"li"},"HELM_INIT_BEFORE")," is ",Object(n.b)("inlineCode",{parentName:"li"},"y")," since Helm has already been installed earlier."),Object(n.b)("li",{parentName:"ul"},"The ",Object(n.b)("inlineCode",{parentName:"li"},"CA_WORKERS"),", ",Object(n.b)("inlineCode",{parentName:"li"},"MONGO_WORKERS")," and ",Object(n.b)("inlineCode",{parentName:"li"},"MONGO_ADMIN_WORKERS")," variable should use the node names, not their IP addresses."),Object(n.b)("li",{parentName:"ul"},"The ",Object(n.b)("inlineCode",{parentName:"li"},"BXDOMAINNAME")," variable should be set to the public IP address of one of the nodes.")),Object(n.b)("h4",null,"If you use managed OCP…"),Object(n.b)("p",null,"The ",Object(n.b)("inlineCode",{parentName:"p"},"init_deployments.sh")," script uses ",Object(n.b)("inlineCode",{parentName:"p"},"loginToCluster")," function in ",Object(n.b)("inlineCode",{parentName:"p"},"bashfunctions.sh")," to log into OpenShift cluster. This function assumes that Kubernetes API server is exposed on port ",Object(n.b)("inlineCode",{parentName:"p"},"8443")," and also requires user id and password to log into the cluster."),Object(n.b)("p",null,"If you are using a Managed OpenShift cluster on IBM Cloud, this assumption is not valid, so you will have to modify the function to use login command copied from the OpenShift web console (available from the drop-down in the upper right corner of the OpenShift web console)."),Object(n.b)("h4",null,"Run secrets creation"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Make sure your current project is ",Object(n.b)("inlineCode",{parentName:"li"},"baca")," and run the following command:")),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"./init_deployments.sh\n")),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Validate the objects created by running the following command:")),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"oc get secrets\n")),Object(n.b)("p",null,"You should see 9 secrets were created (7 if not using LDAP or ingress):"),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"NAME                       TYPE                                  DATA      AGE\nbaca-basedb                Opaque                                1         57s\nbaca-ingress-secret        kubernetes.io/tls                     2         1m\nbaca-ldap                  Opaque                                1         57s\nbaca-minio                 Opaque                                2         46s\nbaca-mongo                 Opaque                                3         58s\nbaca-mongo-admin           Opaque                                3         59s\nbaca-rabbitmq              Opaque                                4         46s\nbaca-redis                 Opaque                                1         45s\nbaca-secretsbaca           Opaque                                14        59s\n")),Object(n.b)("h3",null,"Install the BACA components"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Install the ",Object(n.b)("inlineCode",{parentName:"li"},"bc")," application if it is not available, as it is needed to execute the ",Object(n.b)("inlineCode",{parentName:"li"},"generateMemoryValues.sh")," script:")),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"yum install bc\n``\n\n- Run the `generateMemoryValues.sh` script using the `limited` or `distributed`. For smaller system (5 worker-nodes or less) where the Mongo database pods will be on the same worker node as other pods, use `limited` option. See [this section](https://www.ibm.com/support/knowledgecenter/SSYHZ8_19.0.x/com.ibm.dba.install/topics/tsk_preparing_baca_deploy_limitram.html) of the IBM Knowledge Center for more information.\n")),Object(n.b)("p",null,"./generateMemoryValues.sh limited"),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"\n- From your working directory, run the following commands:\n")),Object(n.b)("p",null,"cd cert-kubernetes/BACA/helm-charts\ntar xvf ibm-dba-baca-prod-1.0.0.tgz\ncd ibm-dba-baca-prod"),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"\n- Edit the `values.yaml` file to populate the configuration parameters (see [this page](https://www.ibm.com/support/knowledgecenter/SSYHZ8_19.0.x/com.ibm.dba.ref/topics/ref_baca_globaloptions_params.html) of the IBM Knowledge Center and [this document](https://github.com/icp4a/cert-kubernetes/blob/19.0.1/BACA/docs/values_yaml_parameters.md) for more information).\n\n- To deploy BACA, run the following command from the `ibm-dba-baca-prod directory:\n")),Object(n.b)("p",null,"helm install . —name celerybaca -f values.yaml  —namespace baca —tiller-namespace tiller"),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"\nDue to the configuration of the readiness probes, after the pods start, it may take up to 10 or more minutes before the pods enter a ready state (see [this document](https://github.com/icp4a/cert-kubernetes/blob/19.0.1/BACA/helm-charts/README.md) for more information).\n\n### Post-install tasks\nOnce all the pods are running, complete the post deployments steps listed in [this document](https://github.com/icp4a/cert-kubernetes/blob/19.0.1/BACA/docs/post-deployment.md).\n\n\nexport const _frontmatter = {}\n")))}b.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-content-automation-install-aca-md-48666e443e471462e851.js.map