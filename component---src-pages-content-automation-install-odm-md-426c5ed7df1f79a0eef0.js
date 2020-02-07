(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{QhUu:function(e,t,r){"use strict";r.r(t),r.d(t,"_frontmatter",(function(){return l})),r.d(t,"default",(function(){return b}));r("91GP"),r("rGqo"),r("yt8O"),r("Btvt"),r("RW0V"),r("q1tI");var a=r("7ljp"),o=r("013z");r("qKvR");function n(){return(n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e}).apply(this,arguments)}var l={},c={_frontmatter:l},i=o.a;function b(e){var t=e.components,r=function(e,t){if(null==e)return{};var r,a,o={},n=Object.keys(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,["components"]);return Object(a.b)(i,n({},c,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"})),Object(a.b)("h1",null,"make sure there is a space after the - so that the TOC is generated"),Object(a.b)("p",null,"{:toc}"),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"(19.0.3 UPDATE NEEDED)")),Object(a.b)("h3",null,"Required services"),Object(a.b)("p",null,"Before installing Operational Decision Manager (ODM), you should have the following pre-requisites in place:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Have privileged access to your DB2 database server. "),Object(a.b)("li",{parentName:"ul"},"Optionally, have access to your LDAP directory server.")),Object(a.b)("p",null,"See the ","[Shared services]","({{ pages.github.url }}/automation/shared-services) chapter for details on DB2 or LDAP installation, if needed."),Object(a.b)("h3",null,"Download the ODM PPA"),Object(a.b)("p",null,"Download the following PPA from ",Object(a.b)("a",n({parentName:"p"},{href:"https://www.ibm.com/software/passportadvantage"}),"IBM Passport Advantage")," to your working-directory:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("em",{parentName:"li"},"IBM Cloud Pak for Automation v19.0.1 - Operational Decision Manager for Certified Kubernetes Multiplatform Multilingual (CC223ML)"))),Object(a.b)("p",null,"The downloaded archive should be named ",Object(a.b)("inlineCode",{parentName:"p"},"ICP4A19.0.1-odm.tgz"),"."),Object(a.b)("h3",null,"Log in to you OCP cluster"),Object(a.b)("p",null,"See the ","[Prerequisites]","({{ pages.github.url }}/automation/pre-requisites) chapter for details on logging in to your OCP cluster."),Object(a.b)("h3",null,"Create the ODM project"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Create a new OpenShift project for ODM with your desired name, e.g. ",Object(a.b)("inlineCode",{parentName:"li"},"odmproject"),":")),Object(a.b)("pre",null,Object(a.b)("code",n({parentName:"pre"},{}),"oc new-project odmproject\n")),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Make sure you are working from your newly created ODM project, then grant the tiller server ",Object(a.b)("inlineCode",{parentName:"li"},"edit")," access to current project:")),Object(a.b)("pre",null,Object(a.b)("code",n({parentName:"pre"},{}),'oc project odmproject\noc adm policy add-role-to-user edit "system:serviceaccount:tiller:tiller"\n')),Object(a.b)("h3",null,"Update the SCC"),Object(a.b)("pre",null,Object(a.b)("code",n({parentName:"pre"},{}),"oc adm policy add-scc-to-user privileged -z default\n")),Object(a.b)("h3",null,"Push the ODM images to the registry"),Object(a.b)("p",null,"If you are installing ODM for the managed cloud, and you are logged in as root, do the following:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Login to the Docker registry:")),Object(a.b)("pre",null,Object(a.b)("code",n({parentName:"pre"},{}),"docker login -u $(oc whoami) -p $(oc whoami -t) docker-registry.default.svc:5000\n")),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Download the ",Object(a.b)("inlineCode",{parentName:"li"},"loadimages.sh")," script to your working directory:")),Object(a.b)("pre",null,Object(a.b)("code",n({parentName:"pre"},{}),"wget https://raw.githubusercontent.com/icp4a/cert-kubernetes/19.0.1/scripts/loadimages.sh\nchmod +x loadimages.sh\n")),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Load the images:")),Object(a.b)("pre",null,Object(a.b)("code",n({parentName:"pre"},{}),"./loadimages.sh -p ICP4A19.0.1-odm.tgz -r docker-registry.default.svc:5000/odmproject\n")),Object(a.b)("p",null,"To complete above steps, make sure that the port forwarding is properly addressed, see the ","[Pre-requisites]","({{ pages.github.url }}/automation/pre-requisites) chapter for details on the docker registry port forwarding. Otherwise, you might not be able to login to the docker registry, or face timeout during the image push."),Object(a.b)("p",null,"If you are installing ODM for on-prem OCP, and not logged in root, do the following:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Login to the Docker registry:")),Object(a.b)("pre",null,Object(a.b)("code",n({parentName:"pre"},{}),"oc -n default get route\n# search for route to docker-registry\nsudo docker login -u $(oc whoami) -p $(oc whoami -t) &lt;route_to_docker_registry>\n")),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Download the ",Object(a.b)("inlineCode",{parentName:"li"},"loadimages.sh")," script to your working directory:")),Object(a.b)("pre",null,Object(a.b)("code",n({parentName:"pre"},{}),"wget https://raw.githubusercontent.com/icp4a/cert-kubernetes/19.0.1/scripts/loadimages.sh\nchmod +x loadimages.sh\n")),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Load the images:")),Object(a.b)("pre",null,Object(a.b)("code",n({parentName:"pre"},{}),"sudo ./loadimages.sh -p ICP4A19.0.1-odm.tgz -r &lt;route_to_docker_registry>/odmproject\n")),Object(a.b)("h3",null,"Create the ODM database"),Object(a.b)("p",null,"The below step is assumed that external DB2 database is used, if internal database or other types of external databases are used, please refer to the related product documentation."),Object(a.b)("p",null,"Log in to the server machine running your DB2 instance, and run the following commands:"),Object(a.b)("pre",null,Object(a.b)("code",n({parentName:"pre"},{}),"su - db2inst1\ndb2 create database odmdb automatic storage yes  using codeset UTF-8 territory US pagesize 32768;\ndb2 connect to odmdb\ndb2 list applications\n")),Object(a.b)("h3",null,"Create secrets"),Object(a.b)("h4",null,"Create an LDAP secret"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"Download the ",Object(a.b)("a",n({parentName:"p"},{href:"assets/automation/odm/ldap-configurations.xml"}),Object(a.b)("inlineCode",{parentName:"a"},"ldap-configurations.xml"))," and ",Object(a.b)("a",n({parentName:"p"},{href:"assets/automation/odm/webSecurity.xml"}),Object(a.b)("inlineCode",{parentName:"a"},"webSecurity.xml"))," files to your working directory.")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"Update the ",Object(a.b)("inlineCode",{parentName:"p"},"ldap-configurations.xml")," and ",Object(a.b)("inlineCode",{parentName:"p"},"webSecurity.xml")," file to replace the ldap host with the public IP address of your LDAP server.")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"If needed, you might also update the access info within ",Object(a.b)("inlineCode",{parentName:"p"},"webSecurity.xml")," file, e.g. to add additional user or group. For the details on how to configure the access info, please refer to the related ",Object(a.b)("a",n({parentName:"p"},{href:"https://www.ibm.com/support/knowledgecenter/en/SSYHZ8_19.0.x/com.ibm.dba.install/k8s_topics/tsk_config_user_access.html"}),"ODM knowledge center section"),".")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"Run the following command:"))),Object(a.b)("pre",null,Object(a.b)("code",n({parentName:"pre"},{}),"oc create secret generic odm-prod-release-odm-ldap --from-file=ldap-configurations.xml --from-file=webSecurity.xml --type=Opaque\n")),Object(a.b)("h4",null,"Create a BAI Event secret"),Object(a.b)("p",null,"If you plan to use BAI, download the ",Object(a.b)("a",n({parentName:"p"},{href:"assets/automation/odm/plugin-configuration.properties"}),Object(a.b)("inlineCode",{parentName:"a"},"plugin-configuration.properties"))," file to your working directory and make sure that your BAI Kafka server name is same as the one in ",Object(a.b)("inlineCode",{parentName:"p"},"plugin-configuration.properties"),", then run the following command:"),Object(a.b)("pre",null,Object(a.b)("code",n({parentName:"pre"},{}),"oc create secret generic odm-prod-release-odm-bai-event --from-file=plugin-configuration.properties\n")),Object(a.b)("h3",null,"Install the ODM components"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"Download the ",Object(a.b)("a",n({parentName:"p"},{href:"assets/automation/odm/values.yaml"}),"values.yaml")," file to your working directory and update the DB configuration parameters under ",Object(a.b)("inlineCode",{parentName:"p"},"externalDatabase")," to match your configuration, in particular the IP address for the ",Object(a.b)("inlineCode",{parentName:"p"},"serverName")," and the ",Object(a.b)("inlineCode",{parentName:"p"},"password")," for the DB admin account.")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"Download the Helm chart to your working directory:"))),Object(a.b)("pre",null,Object(a.b)("code",n({parentName:"pre"},{}),"wget https://github.com/icp4a/cert-kubernetes/raw/19.0.1/ODM/helm-charts/ibm-odm-prod-2.2.0.tgz\n")),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Install the Helm chart:")),Object(a.b)("pre",null,Object(a.b)("code",n({parentName:"pre"},{}),"helm install ibm-odm-prod-2.2.0.tgz --name odm-prod-release --namespace odmproject -f values.yaml\n")),Object(a.b)("h3",null,"Expose the ODM services"),Object(a.b)("p",null,"Download the ",Object(a.b)("a",n({parentName:"p"},{href:"assets/automation/odm/route.yaml"}),"route.yaml")," file to your working directory and run the command:"),Object(a.b)("pre",null,Object(a.b)("code",n({parentName:"pre"},{}),"oc create -f route.yaml\n")),Object(a.b)("p",null,"To retrieve the ODM services URLs, open the ",Object(a.b)("inlineCode",{parentName:"p"},"services")," section on the OCP cluster console, select the desired ODM service, such as ",Object(a.b)("inlineCode",{parentName:"p"},"odm-decisioncenter")," and go to the detail page to find the URL. The link will look like:"),Object(a.b)("pre",null,Object(a.b)("code",n({parentName:"pre"},{}),"https://odm-prod-release-odm-decisioncenter-odmproject.cp4a-ocp-6550a99fb8cff23207ccecc2183787a9-0001.us-south.containers.appdomain.cloud/decisioncenter\n")),Object(a.b)("h3",null,"Uninstall"),Object(a.b)("p",null,"If needed, run the following steps to uninstall ODM:"),Object(a.b)("pre",null,Object(a.b)("code",n({parentName:"pre"},{}),"helm delete odm-prod-release --purge\noc delete secret odm-prod-release-odm-ldap\noc delete secret odm-prod-release-odm-bai-event\noc delete -f route.yaml\n")),Object(a.b)("p",null,"Please note that if this Uninstall is permanent, you might want to clean the related DB2 tables that have been created. For this, please refer to the related ",Object(a.b)("a",n({parentName:"p"},{href:"/cloudpak8s/30990240ba7bffa2777eed8ccc60ea16/shared-services.md"}),"Shared services")," section for details."))}b.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-content-automation-install-odm-md-426c5ed7df1f79a0eef0.js.map