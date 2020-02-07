(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{pDTm:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return b})),a.d(t,"default",(function(){return c}));a("91GP"),a("rGqo"),a("yt8O"),a("Btvt"),a("RW0V"),a("q1tI");var n=a("7ljp"),r=a("013z");a("qKvR");function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var b={},i={_frontmatter:b},p=r.a;function c(e){var t=e.components,a=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,["components"]);return Object(n.b)(p,o({},i,a,{components:t,mdxType:"MDXLayout"}),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"})),Object(n.b)("h1",null,"make sure there is a space after the - so that the TOC is generated"),Object(n.b)("p",null,"{:toc}"),Object(n.b)("h3",null,"Create the Playback Engine database"),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"su - db2inst1\ndb2 create database aaedb automatic storage yes using codeset UTF-8 territory US pagesize 32768\ndb2 connect to aaedb\n\n## The following grant is used for databases without enhanced security.\n## aaedbuser is the username that App Engine uses to connect to the database\ndb2 grant dbadm on database to user aaedbuser\n\ndb2 connect reset\nexit\n")),Object(n.b)("h3",null,"Create the BAS database"),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"su - db2inst1\ndb2 create database basdb automatic storage yes using codeset UTF-8 territory US pagesize 32768\ndb2 connect to basdb\n\n## A user temporary tablespace is required to support stored procedures in BPM.\n$ db2 CREATE USER TEMPORARY TABLESPACE USRTMPSPC1\n$ db2 UPDATE DB CFG FOR basdb USING LOGFILSIZ 16384 DEFERRED\n$ db2 UPDATE DB CFG FOR basdb USING LOGSECOND 64 IMMEDIATE\n$ db2 grant dbadm on database to user basuser\n$ db2 connect reset\n$ exit\n")),Object(n.b)("h3",null,"Create the BAS secrets"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("p",{parentName:"li"},"Copy this ",Object(n.b)("a",o({parentName:"p"},{href:"assets/automation/bas/rr-secret.yaml"}),Object(n.b)("inlineCode",{parentName:"a"},"rr-secret.yaml"))," template file in your working directory and update it as needed.")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("p",{parentName:"li"},"Copy this ",Object(n.b)("a",o({parentName:"p"},{href:"assets/automation/bas/playback-ae-server.yaml"}),Object(n.b)("inlineCode",{parentName:"a"},"playback-ae-server.yaml"))," template file in your working directory and update it as needed.")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("p",{parentName:"li"},"Copy this ",Object(n.b)("a",o({parentName:"p"},{href:"assets/automation/bas/bas-secret.yaml"}),Object(n.b)("inlineCode",{parentName:"a"},"bas-secret.yaml"))," template file in your working directory and update it as needed. Make sure that you use a different ",Object(n.b)("inlineCode",{parentName:"p"},"oidcClientId")," for Business Automation Studio from the one you use for the App Engine playback server. There is only one UMS server and it needs to know which component to connect to.")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("p",{parentName:"li"},"Create the secrets:"))),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"oc create -f rr-secret.yaml\noc create -f playback-ae-server.yaml\noc create -f bas-secret.yaml\n")),Object(n.b)("h3",null,"Deploy BAS"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("p",{parentName:"li"},"To update the operator configuration, copy this ",Object(n.b)("a",o({parentName:"p"},{href:"assets/automation/bas/my_ibm_cp4a_cr_2.yaml"}),Object(n.b)("inlineCode",{parentName:"a"},"my_ibm_cp4a_cr_2.yaml"))," template file in your working directory and update it as needed. You can highlight the BAS configuration sections that need your attention by doing a diff with the template file found in ",Object(n.b)("a",o({parentName:"p"},{href:"assets/automation/ums/my_ibm_cp4a_cr_1.yaml"}),Object(n.b)("inlineCode",{parentName:"a"},"my_ibm_cp4a_cr_1.yaml")))),Object(n.b)("li",{parentName:"ul"},Object(n.b)("p",{parentName:"li"},"Apply the updated custom resource definition file:"))),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"oc apply -f my_ibm_icp4a_cr_2.yaml\n")),Object(n.b)("p",null,"You should see the following new pods deployed:"),Object(n.b)("pre",null,Object(n.b)("code",o({parentName:"pre"},{}),"NAME                                              READY   STATUS        RESTARTS   AGE\ncp4a-prod-bastudio-authoring-jms-0                1/1     Running       0          17h\ncp4a-prod-bastudio-bootstrap-cpwwq                0/1     Completed     0          17h\ncp4a-prod-bastudio-deployment-667477d695-97f4q    1/1     Running       0          17h\ncp4a-prod-bastudio-ltpa-drgp2                     0/1     Completed     0          17h\ncp4a-prod-bastudio-oidc-2f54b                     0/1     Completed     0          17h\ncp4a-prod-dba-rr-83f45a5d0c                       1/1     Running       0          87m\ncp4a-prod-dba-rr-b29d156915                       1/1     Running       0          87m\ncp4a-prod-dba-rr-ef1b17dabf                       1/1     Running       0          87m\ncp4a-prod-pbk-ae-db-job-vzct7                     0/1     Completed     0          17h\ncp4a-prod-pbk-ae-deployment-c8d5458fb-9zltp       1/1     Terminating   0          17h\ncp4a-prod-pbk-ae-deployment-c8d5458fb-m8cqq       1/1     Running       0          10h\ncp4a-prod-pbk-ae-oidc-job-wq8sg                   0/1     Completed     0          17h\ncp4a-prod-rr-setup-pod                            0/1     Completed     0          87m\n")),Object(n.b)("h3",null,"Test that BAS is up"),Object(n.b)("p",null,"Connect to ",Object(n.b)("inlineCode",{parentName:"p"},"https://&lt;bas-route>/BAStudio")," with the administrator login you have defined in the ",Object(n.b)("inlineCode",{parentName:"p"},"bas-secret.yaml")," file. You should also be able to login with the credentials for any user defined in the LDAP directory."),Object(n.b)("p",null,"The ",Object(n.b)("inlineCode",{parentName:"p"},"&lt;bas-route>")," is the hostname that you have provided under the ",Object(n.b)("inlineCode",{parentName:"p"},"bastudio_configuration")," in the ",Object(n.b)("inlineCode",{parentName:"p"},"my_ibm_cp4a_cr_2.yaml")," configuration file."))}c.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-content-automation-install-bas-md-c23f646ffb67c5f7f412.js.map