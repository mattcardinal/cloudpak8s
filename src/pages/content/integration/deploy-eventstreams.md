---
title: deploy-eventstreams
weight: 600
---

- [Introduction](#introduction)
- [Prepare Installation](#prepare-installation)
- [Begin Installation](#begin-installation)
- [Validate Installation](#validate-installation)

### Introduction
This page contains guidance on how to configure the Event Streams release for both on-prem and ROKS.

### Prepare Installation

1. **Change project to eventstreams**
   ```
   oc project eventstreams
   ```
2. **Resources Required:**  

    If you enable message indexing (which is enabled by default), then you must have the vm.max_map_count property set to at least 262144 on all IBM Cloud Private nodes in your cluster (not only the master node). Please note this property may have already been updated by other workloads to be higher than the minimum required. Run the following commands on each node:

    ```
    sudo sysctl -w vm.max_map_count=262144

    echo "vm.max_map_count=262144" | tee -a /etc/sysctl.conf
    ```

You also may want to consider manually setting security if you run into issues related to permissions.  This applies to non-production/poc type environments where you need to get things up and running quickly.  Here are the commands:

```
oc adm policy add-scc-to-group anyuid system:serviceaccounts:eventstreams
oc adm policy add-scc-to-group ibm-anyuid-scc system:serviceaccounts:eventstreams
```
This assumes you are installing to the eventstreams namespace/project.  If you are using a different location, adjust the last parameter to match your environment.

### Begin Installation  
1. Go to CP4I Platform Home. Click **Create instance** inside the **Event Streams** tile.  
1. A window will pop up with a description of the requirements for installing. Click **Continue** to the helm chart deployment configuration.    
2. Click **Overview** to view the chart information and pre-reqs that were covered in [Prepare Installation](#prepare-installation).
3. Click **Configure**
4. Enter the Helm release name. In our example, **es-1**
5. Enter Target Namespace - **eventstreams**
6. Select a Cluster - **local-cluster**.
7. Check the license agreement.  
8. Under Parameter click **Quick Start** to expand.
9. Here you will need to set the `Certificate Secret Name`.  Set this to a simple value like `eventstreamssecret`. 
10. Image Pull Secret - Set to `ibm-entitlement-key` if using entitled registry or if offline use the `deployer-dockercfg-XX` secret in your ace namespace.  Use `oc get secrets` to get the exact value for your environment.
11. Under `External Access Settings` find the `External hostname/IP address` and set that to the icp-proxy address defined during icp / common-services installation - icp-proxy.\&lt;openshift-router-domain>  
8. Under Parameters click **All Parameters** to expand. 
9. Under `Global install settings` ensure the `Generate Certificate for Security` checked.
10. There are other settings you might consider adding, like persistent storage.  It is not required for install but if you wish to add it, the chart will allow for it.
10. If you do not wish to add persistent storage, you are done.  Scroll to the bottom. Click **Install**.

### Validate Installation  
1. View all pods in a running state and jobs completed
   ![](7.es-pods.png)

