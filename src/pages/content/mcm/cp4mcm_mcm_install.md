---
title: "MCM - Installation Guide"
weight: 300
---
- 
{:toc}

## Overview

In this section we will walk throught the installation of the MCM component of the Cloud Pak for Multicloud Management. This document is specifically written for installations on Red Hat OpenShift 4.2 running on an x86 architecture. The purpose of this document is to be agnostic. In other words.... MCM reqiures OpenShift 4.2 to be installed we don't care if it is on-prem on in the cloud or bare-metal or virtual machines. In the sections below we will discuss the Online vs Offline install, both of which are very similar with differences in the location of the MCM installation images.

### Prerequisites

This document does not describe how to install or configure the underlying OpenShift platform. So prior to installing make sure you have a working OpenShift cluster with the required capacity.

- Check the requirements doc to make sure you have size your cluster appropriately and you have capacity
- For offline installs make sure you have downloaded the Cloud Pak for Multicloud Management Passport Advantage Archive (PPA) file (see requirements) and copied it to the installation server
- For online installs make sure you have an entitlement key to access the IBM Entitled Docker Registry
- The installation is performed from the Command line (CLI) so you will need the reqiured CLI tools to interface with the cluster. Instructions on setting up the required CLI tools here: https://www.ibm.com/support/knowledgecenter/en/SSFC4F_1.2.0/cli/cli_guide_mcm.html
- Offline installation will require the docker client install on the installation server

### Configuring your installation

This section will attempt to describe the options available for the MCM Installation.

Below is the config.yaml extracted from the inception image:
```
# Licensed Materials - Property of IBM
# IBM Cloud private
# @ Copyright IBM Corp. 2019 All Rights Reserved
# US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.

---

# A list of OpenShift nodes
cluster_nodes:
  master:
    - &lt;your-openshift-dedicated-node-to-deploy-master-components>
  proxy:
    - &lt;your-openshift-dedicated-node-to-deploy-proxy-components>
  management:
    - &lt;your-openshift-dedicated-node-to-deploy-management-components>

# Storage Class
storage_class: &lt;storage class available in OpenShift>

## You can set different storage class for logging.
## By default it will use the value of storage_class.
# elasticsearch_storage_class:

## If you are installing on ROKS environment please update following settings
## roks_enabled: set this to true
## roks_url: Openshift public service endpoint URL
## roks_user_prefix: User prefix used for users enabled on ROKS, Default value is 'IAM#'.
## You can get users information from command 'oc get users'.
## ROKS settings
roks_enabled: false
roks_url: &lt;roks_url>
roks_user_prefix: "IAM#"

# default_admin_password:
# password_rules:
#   - '^([a-zA-Z0-9\-]{32,})$'

## You can disable following services if they are not needed
management_services:
  # Common services
  iam-policy-controller: enabled
  metering: enabled
  licensing: disabled
  monitoring: enabled
  nginx-ingress: enabled
  common-web-ui: enabled
  catalog-ui: enabled
  mcm-kui: enabled
  logging: disabled
  audit-logging: disabled
  system-healthcheck-service: disabled
  multitenancy-enforcement: disabled

  # mcm services
  multicluster-hub: enabled
  search: enabled
  key-management: enabled
  notary: disabled
  cis-controller: disabled
  vulnerability-advisor: disabled
  mutation-advisor: disabled
  sts: disabled
  secret-encryption-policy-controller: disabled
  image-security-enforcement: disabled


```

Here we will describe each of the relevant sections in the context of this doc.

- **cluster_nodes** - This section describes which nodes in your cluster the MCM components are allowed to run. The MCM Foundation components are split into three sections master, proxy and management. It is recommended that the master and proxy components run on the same nodes and that the management components run on dedicated nodes. The number of nodes you specify in each section determines the number of nodes that the work can be split across and will determine the level availability you can achieve. If you speficy one node in each of the sections and that node goes down you will lose your ability to use MCM. If you have capacity it is a good idea to have multiple nodes in each section.

It is import to note that the master nodes in the config.yaml does not mean you should add your OpenShift Master nodes in that section. It is **NOT** recommended to run any of the MCM components on your OpenShift Master nodes.

- **storage_class** - The storage class is the dynamic storage class that the installer will use when creating persistant volumes. This storage class should be a `block ` storage provider. Generally faster disk is preferred. 

- **default_admin_password** - The default_admin_password is the password that will be assigned the default admin user to authenticate to the MCM application. It is recommended that the password be set to a password that meets your organizations password requirements. Use the stanza below as an example:

```
default_admin_password: &lt;your password>
password_rules:
- '(.*)'
```

- **management_services** - In the mangement_service section you can enable or disable some the MCM Foundation components that are available. The default values are generally sufficient for an MCM install. If you require the additional service you can enable them, but note that they may require additional capacity and customization not covered in this document. Note that the MCM services are enabled at the end of this section.

- **Additional considerations** - If you want to deploy MCM in an highly available configuration you will want to add some additional sections to increase the number of replicas and enable persistance for each of the MCM Components. See the sample stanza below:

```
multicluster-hub:
  global:
    replicas: 3
  etcd:
    haMode: true
    persistence: true
    storageclassName: &lt;your storage class>
  core:
    apiserver:
      etcd:
        haMode: true
```

## Offline Installation

**1.** Login to the OpenShift Install server.

**2.** Authenticate to the OpenShift server where you would like to install MCM (these can be copied from the OpenShift Console UI)

```
oc login --token=&lt;your_token> --server=&lt;INSERT_SERVER_URL_HERE>
```

**3.** Navigate to the folder containing the line PPA archive package and extract and load the PPA Archive ( this may take ~10-20)

```
tar xf ibm-cp4mcm-core-1.2-x86_64.tar.gz -O | sudo docker load
```

**4.** Create a working directory 

```
sudo mkdir /opt/mcm; cd /opt/mcm
```

**5.** Extract the installation configuration files. We will modify these to customize our installation.

```
sudo docker run --rm -v $(pwd):/data:z -e LICENSE=accept --security-opt label:disable cp.icr.io/cp/icp-foundation/mcm-inception:3.2.3 cp -r cluster /data
```

**6.** Create your kubeconfig file for the installer to use

```
oc config view > cluster/kubeconfig
```

**7.** Next we will need to update the **cluster_node** sections with our clusters. You will need to add the nodes from your cluster. Use the exact node names from the `oc get nodes` command.

**8.** Add the storage class for your cluster in the **storage_class** field. The storage class must be a block storage provider. Use the exact node names from the `oc get sc` command.

**9.** Update the **default_admin_password** field with a suitable password

**10.** Define the **management_services**  appropriate to your install

**11.** Start the isntallation (this can run for ~30-45min)

```
docker run -t --net=host -e LICENSE=accept -v $(pwd):/installer/cluster:z -v /var/run:/var/run:z -v /etc/docker:/etc/docker:z --security-opt label:disable ibmcom/mcm-inception-amd64:3.2.3 install-with-openshift
```

**12.** Connect to the MCM hub console using the `icp-console` route defined in OCP. Use the `oc get routes -A` command to get the domain. You can access the MCM Console via a browser with the icp-console domain and the credenetials you specified in the config.yaml.

## Online Installation

Use b3c.8x32.encrypted flavor nodes anything smaller and it will time out.

**1.** Get your CP4MCM product entitlement. (Basic instructions and the script can be found here: https://github.ibm.com/CloudPakOpenContent/cloudpak-entitlement)
   ```
   ./pak-entitlement.sh show-key "IBM Cloud Pak for Multicloud Management"
   &lt;your entitlement key>
   ```
**2.** Login to the public docker repo using your entitlment key
   ```
docker login cp.icr.io --username ekey --password &lt;your entitlement key>
   ```
**3.** Login to your OpenShift environment by copying your login credentials from the Openshift UI.

**4.** Create secret for the installer to use for authentication during install.
   ```
oc create secret docker-registry entitled-registry --docker-server=cp.icr.io --docker-username=ekey --docker-password=&lt;your entitlement key> --docker-email=john.webb@us.ibm.com
   ```
**5.** Pull the mcm inception image
   ```
sudo docker pull cp.icr.io/cp/icp-foundation/mcm-inception:3.2.3
   ```
**6.** Make a directory for the installation files.
   ```
mkdir ibm-multicloud-manager-1.2 ; cd ibm-multicloud-manager-1.2
   ```
**7.** Extract installation files from the inception image
   ```
sudo docker run --rm -v $(pwd):/data:z -e LICENSE=accept --security-opt label:disable cp.icr.io/cp/icp-foundation/mcm-inception:3.2.3 cp -r cluster /data
   ```
**8.** Create your kubeconfig file for the isntaller to use.
   ```
oc config view > cluster/kubeconfig
   ```
**9.** Change to the cluster directory.
   ```
cd cluster
   ```
**10.** Customize config.yaml. Below is a sample used to install the CP4MCM.
```
# Licensed Materials - Property of IBM
# IBM Cloud private
# @ Copyright IBM Corp. 2019 All Rights Reserved
# US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
# A list of OpenShift nodes
cluster_nodes:
  master:
    - 10.177.125.156
    - 10.177.125.159
    - 10.177.125.167
  proxy:
    - 10.177.125.156
    - 10.177.125.159
    - 10.177.125.167
  management:
    - 10.177.125.156
    - 10.177.125.159
    - 10.177.125.167
# Storage Class
storage_class: ibmc-block-gold
## You can set different storage class for logging.
## By default it will use the value of storage_class.
# elasticsearch_storage_class:
image_repo: cp.icr.io/cp/icp-foundation
private_registry_enabled: true
docker_username: ekey
docker_password: &lt;your entitlement key>
## If you are installing on ROKS environment please update following settings
## roks_enabled: set this to true
## roks_url: Openshift public service endpoint URL
## roks_user_prefix: User prefix used for users enabled on ROKS, Default value is 'IAM#'.
## You can get users information from command 'oc get users'.
## ROKS settings
roks_enabled: true
roks_url: &lt;your ROKS public endpoint>
roks_user_prefix: "IAM#"
default_admin_password: XukobCa4ivZjQKjOs5gRjVIibsTkP6Re
# password_rules:
#   - '^([a-zA-Z0-9\-]{32,})$'
## You can disable following services if they are not needed
management_services:
  # Common services
  iam-policy-controller: enabled
  metering: enabled
  licensing: disabled
  monitoring: enabled
  nginx-ingress: enabled
  common-web-ui: enabled
  catalog-ui: enabled
  mcm-kui: enabled
  logging: disabled
  audit-logging: disabled
  system-healthcheck-service: disabled
  multitenancy-enforcement: disabled
  # mcm services
  multicluster-hub: enabled
  search: enabled
  key-management: enabled
  notary: disabled
  cis-controller: disabled
  vulnerability-advisor: disabled
  mutation-advisor: disabled
  sts: disabled
  secret-encryption-policy-controller: disabled
  image-security-enforcement: disabled
```
**11.** Start the installatation process.
   ```
 sudo docker run -t --net=host -e LICENSE=accept -v $(pwd):/installer/cluster:z -v /var/run:/var/run:z -v /etc/docker:/etc/docker:z --security-opt label:disable cp.icr.io/cp/icp-foundation/mcm-inception:3.2.3 install-with-openshift
   ```
## Uninstall
Run the following command to uninstall the CP
```
sudo docker run -t --net=host -e LICENSE=accept -v $(pwd):/installer/cluster:z -v /var/run:/var/run:z -v /etc/docker:/etc/docker:z --security-opt label:disable cp.icr.io/cp/icp-foundation/mcm-inception:3.2.3 uninstall-openshift
```

## Additional Resources
* &lt;a href="https://www.ibm.com/support/knowledgecenter/en/SSFC4F_1.2.0/install/overview.html">Knowledge Center - MCM 1.2 Installation Guide&lt;/a>
