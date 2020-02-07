(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{Qvq8:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return i})),n.d(t,"default",(function(){return c}));n("91GP"),n("rGqo"),n("yt8O"),n("Btvt"),n("RW0V"),n("q1tI");var a=n("7ljp"),l=n("013z");n("qKvR");function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var i={},s={_frontmatter:i},r=l.a;function c(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,a,l={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,["components"]);return Object(a.b)(r,o({},s,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h2",null,Object(a.b)("strong",{parentName:"h2"},"Overview")),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Note:")," Add-ons for Cloud Pak for Data in the Red Hat OpenShift on IBM Cloud is ",Object(a.b)("strong",{parentName:"p"},"NOT")," officially supported at this time.  Some add-ons, like data virtualization, may install successfully, but will have an issue during provisioning.  There are technical issues with this and other add-ons, like Db2 Warehouse, where “SELinux” can not be in “enforcing” mode.  However, Red Hat OpenShift itself requires “SELinux” to be in “enforcing” mode.  Since this is a managed environment, access to change this setting is not available.\nThere are plans for add-ons to support this environment in the future.  The following describes a way to install the “Watson Machine Learning” add-on which appears to work successfully.  But it should be noted again that this is ",Object(a.b)("strong",{parentName:"p"},"NOT")," officially supported."),Object(a.b)("h2",null,"Set Up the OpenShift Client CLI Tools and Access the Cluster"),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},"If you haven’t done so already, install the OpenShift client CLI tools using the directions at ",Object(a.b)("a",o({parentName:"li"},{href:"https://cloud.ibm.com/docs/openshift?topic=openshift-openshift-cli"}),"here"),"."),Object(a.b)("li",{parentName:"ol"},"Login to the OpenShift console.  In the upper right hand side of the page, click on your user name and select “Copy Login Command”.\n",Object(a.b)("img",o({parentName:"li"},{src:"https://pages.github.ibm.com/CASE/cloudpak-onboard-residency/assets/img/cp4d/qijunlogin.jpg",alt:"LoginScreen"}))),Object(a.b)("li",{parentName:"ol"},"Paste the command in a shell and a response will be returned with a list of projects and the current project selected.")),Object(a.b)("h2",null,"Set Up the CP4D “deploy.sh” for Add-On Installation"),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},"Retrieve the CP4D installer and only extract its contents using the “—extract-only” switch.  For example,\n",Object(a.b)("em",{parentName:"li"},"”./installer.x86_64.520 —extract-only”")),Object(a.b)("li",{parentName:"ol"},"The “deploy.sh” script that will be used later to install an add-on will be located at “/ibm/InstallPackage/components/“.")),Object(a.b)("h2",null,"Install helm and tiller"),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},"Use the following script to set up helm and tiller\n",Object(a.b)("a",o({parentName:"li"},{href:"https://pages.github.ibm.com/CASE/cloudpak-onboard-residency/assets/img/helm_install.sh"})," helm_install.sh")),Object(a.b)("li",{parentName:"ol"},"Verify the installation using\n",Object(a.b)("em",{parentName:"li"},"“helm version —tls”"),".  The output should resemble something like this:")),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{}),'helm version --tls\nClient: &version.Version{SemVer:"v2.9.1", GitCommit:"20adb27c7c5868466912eebdf6664e7390ebe710", GitTreeState:"clean"}\nServer: &version.Version{SemVer:"v2.9.1", GitCommit:"20adb27c7c5868466912eebdf6664e7390ebe710", GitTreeState:"clean"}\n')),Object(a.b)("h2",null,"Set Up a Registry"),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},"Go to ",Object(a.b)("a",o({parentName:"li"},{href:"https://cloud.ibm.com"}),"IBM Cloud")," and select “Kubernetes” then “Registry”.  Follow the directions “Registry Quick Start” to create a registry.  Take note of the namespace you created."),Object(a.b)("li",{parentName:"ol"},"At the top of the web page, select “Manage” then “Access (IAM)“. On the left side panel, select “IBM Cloud API keys” and then click the button “Create an IBM Cloud API key”.  Make sure to save your key. ",Object(a.b)("img",o({parentName:"li"},{src:"https://pages.github.ibm.com/CASE/cloudpak-onboard-residency/assets/img/cp4d/manageiam.jpg",alt:"LoginScreen"}))),Object(a.b)("li",{parentName:"ol"},"Back in the shell, enter the following to login into the registry.\n",Object(a.b)("em",{parentName:"li"},"“docker login us.icr.io/","[your-registry-namespace]"," -u iamapikey -p ","[your-iam-key]","”"))),Object(a.b)("h2",null,"Get the Add-On to be Installed"),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},"For this example, the “Watson Machine Learning” add-on tar will be used.  Download the add-on code and place it somewhere like “/ibm/modules”")),Object(a.b)("h2",null,"Install the Add-On"),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},Object(a.b)("em",{parentName:"li"},"”./deploy.sh -o -d /ibm/modules/watson_machine_learning.tar”"))),Object(a.b)("h2",null,"Installation Progress"),Object(a.b)("p",null,"The following shows the output you will see upon a successful “Watson Machine Learning” add-on installation."),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{}),"The following environment variables will be used during the installation:\n-----------------------------------------------------------------------------\nnamespace:                       zen\nclusterDockerImagePrefix:        us.icr.io/cp4d2101\nexternalDockerImagePrefix:       us.icr.io/cp4d2101\nuseDynamicProvisioning:          true\nstorageClassName:                ibmc-file-gold\n-----------------------------------------------------------------------------\nIf these values are not correct, type N to go back and change it.\nPlease type (Y) to proceed or (N) to exit the installation: y\nDocker version found: 1.13.1\nDocker config file found: /root/.docker/config.json\nKubernetes version found: Server Version: v1.11.0+d4cacc0\nKubernetes config file found: /root/.kube/config\nkubectl is working\nOpenshift binary found: oc v3.11.141\nLoading images\n/ibm/InstallPackage/modules/wml//images\nLoaded Images [==============================================================================] 6m41s (17/17) done\nPushed Images [==============================================================================] 26m54s (17/17) done\nDeploying the chart as name wml\nRunning command: /ibm/InstallPackage/components/dpctl --config /ibm/InstallPackage/components/install.yaml helm rewriteChart -i /ibm/InstallPackage/modules/wml//charts/*.tgz -o /ibm/InstallPackage/modules/wml//charts/updated_wml.tgz\nRunning command: /ibm/InstallPackage/components/dpctl --config /ibm/InstallPackage/components/install.yaml helm installChart -f /ibm/InstallPackage/components/global.yaml   -r zen-wml -n zen -c /ibm/InstallPackage/modules/wml//charts/updated_wml.tgz \nStarting the installation ...\nPackage  Release zen-wml installed.\nRunning command: /ibm/InstallPackage/components/dpctl --config /ibm/InstallPackage/components/install.yaml helm waitChartReady -r zen-wml -t 60\nPods:         [==============================================================================] 7m3s (13/13) done\nPVCs:         [==============================================================================] 1m35s (2/2) done\nDeployments:  [==============================================================================] 5m52s (5/5) done\nStatefulSets: [==============================================================================] 7m2s (2/2) done\nThe deploy script finished successfully\n")))}c.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-content-data-install-add-on-md-6a79843ecfd20440d36c.js.map