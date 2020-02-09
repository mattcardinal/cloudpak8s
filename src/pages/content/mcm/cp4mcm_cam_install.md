---
title: "CAM - Installation Guide"
weight: 500
---
- 
{:toc}

## Overview

### Prerequisites
* **OCP 4.0+**
* **Install CLI Tools**
  - Helm CLI
  - Kubernetes CLI
  - IBM Cloud Pak CLI
  ```
  curl -kLo cloudctl https://icp-console.apps.res-cp4mcm.ocp.csplab.local/api/cli/cloudctl-darwin-amd64
  ```
  For CLI install help, check out the Knowledge Center guides &lt;a href="https://www.ibm.com/support/knowledgecenter/en/SSFC4F_1.2.0/cli/cli_guide_mcm.html">here&lt;/a>.


* [Install MCM](mcm-4/cp4mcm_mcm_install/)
* **Install Service Catalog** (Required for OCP 4.0+. See install &lt;a href="https://docs.openshift.com/container-platform/4.2/applications/service_brokers/installing-service-catalog.html">here&lt;/a>)

## Online Installation

## Offline Installation
**1.** **Download the install file** from Passport Advantage (PPA):

|         File Name         | Part Number |
| :-----------------------: | :------ |
| icp-cam-x86_64-4.1.tar.gz | CC4E1EN | 

**2.** **Create SSC policy**

```
oc adm policy add-scc-to-user ibm-anyuid-hostpath-scc system:serviceaccount:services:default
```

*Note:* Persistent volumes will be needed if you don't have dynamic storage. Visit &lt;a href="https://www.ibm.com/support/knowledgecenter/SS2L37_4.1.0.0/cam_create_pv.html">here&lt;/a> for more information.

**3.** **Generate** a deployment **ServiceID API Key** using the following commands:
```
export serviceIDName='service-deploy'
export serviceApiKeyName='service-deploy-api-key'
cloudctl login -a &lt;ibm_cloud_pak_mcm_console_url> --skip-ssl-validation -u &lt;ibm_cloud_pak_mcm_admin_id> -p &lt;ibm_cloud_pak_mcm_admin_password> -n services
cloudctl iam service-id-create ${serviceIDName} -d 'Service ID for service-deploy'
cloudctl iam service-policy-create ${serviceIDName} -r Administrator,ClusterAdministrator --service-name 'idmgmt'
cloudctl iam service-policy-create ${serviceIDName} -r Administrator,ClusterAdministrator --service-name 'identity'
cloudctl iam service-api-key-create ${serviceApiKeyName} ${serviceIDName} -d 'Api key for service-deploy'
```
The output with the API Key should look something like this: 
```
Name          service-deploy-api-key   
Description   Api key for service-deploy   
Bound To      crn:v1:icp:private:iam-identity:mycluster:n/services::serviceid:ServiceId-163c213a-37f5-4f8b-8a3c-2fd7b3887a4f   
Created At    2020-01-22T14:46+0000   
API Key       &lt;API KEY HERE>
```
Save the API Key for use during install configuration in Step 5b.

**4.** **Load the PPA Archive** (using cloudctl)

**SSH into OpenShift** cluster install box and run the following commands with admin access:

```
HOST=$(oc get route default-route -n openshift-image-registry --template='{{ .spec.host }}')
cloudctl login -a &lt;ibm_cloud_pak_mcm_Console_Url> --skip-ssl-validation -u &lt;ibm_cloud_pak_mcm_admin_ID> -p &lt;ibm_cloud_pak_mcm_password> -n services
docker login -u &lt;oc admin> -p $(oc whoami -t) $HOST
cloudctl catalog load-archive --archive icp-cam-[x86-64 | ppc]-4.1.tar.gz --registry $HOST/services
```
**5. Install CAM**

**5a. Sync CAM Helm Charts**

1. Login to MCM UI
2. Sync helm repositories
3. Go to **Administer** > **Helm repository**
4. Click **Sync All** in the upper-right corner

**5b. Configure and Install CAM**

1. In upper right-hand corner, click the **Catalog** icon
2. Search for `ibm-cam` and click the chart from the `local-helm` repository  
3. Click **Configure** in the bottom-right, or click the **Configuration** tab
4. Enter the following install parameters:
   * In the **Configuration** section:
     - **Release name** - Enter `cam` in release name.
     - **Target namespace** - From the drop down list, select `services`.
   * Select **I have read and agreed to license agreements** to accept the license agreements.
   * In the **Parameters** > **All Parameters** section:
     - **Worker node architecture** - select amd64
     - Under **Global** configuration values:
       - **Docker image pull secret**
         - For offline installation, set to *default*
       - **Product Identifier** - Enter `IBMCloudAutomationManager_5737E67_4100_EE_000`
       - **IAM Service API Key** - Enter the IAM service API Key you created earlier
       - Optionally, select **Optimize the installation for offline** to optimize the installation for offline. For example, skip internet access to import public starter templates from github.com on the public internet during the installation.
       - Optionally, select **Enable audit** to enable the audit for actions in Cloud Automation Manager. It requires the management logging service to be installed. For installing the Cloud Automation Manager on IBM Multicloud Manager 3.2.1, select `Enable legacy audit`. For installing the Cloud Automation Manager on IBM Multicloud Manager 3.2.x or higher, select `ICP32`. For audit related installation parameters, see [Installation parameters](https://www.ibm.com/support/knowledgecenter/SS2L37_4.1.0.0/cam_installation_parameters.html?view=kc).
       - Optionally, select **Enable FIPS for CAM** to enable FIPS.
     - Under **IBM Cloud Private** > **Port**, enter port value 443, or choose your own port
     - Under **Image**, set Repository value to `image-registry.openshift-image-registry.svc:5000/services/`
       - Note: This image registry may vary depending on your cluster (??-JG)
     - If using Dynamic Storage, Check **Enable Dynamic Provisioning** and set your Storage Class Name. Repeat for each volume.

**5. Confirm Installation**

Monitor your install with 
```
watch oc get pods
```

   You should see something like this:
{%
  include figure.html
  src="/assets/img/cp4mcm/cam_install_pods.png"
  alt="CAM Install Pods"
  caption="CAM Install Pods"
%}

Once complete, access CAM in a browser using the url
```
oc get routes
```
## Additional Resources
* &lt;a href="https://www.ibm.com/support/knowledgecenter/SS2L37_4.1.0.0/cam_prereq.html">Knowledge Center - CAM Prerequisites&lt;/a>
* &lt;a href="https://www.ibm.com/support/knowledgecenter/SS2L37_4.1.0.0/cam_install_offline_icpos.html">Knowledge Center - CAM Offline Installation Guide&lt;/a>
