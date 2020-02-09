---
title: deploy-tracing
weight: 600
---

- [Introduction](#introduction)
- [Prepare Installation](#prepare-installation)
- [Begin Installation](#begin-installation)
- [Validate installation](#validate-installation)

### Introduction
This page contains guidance on how to configure the Tracing capability on the Cloud Pak for Integration.

### Prepare Installation

1. **Create Namespace/Project**
   You can do this in the OCP User Interface or via the Command Line using the following syntax:   
   ``` md
   oc new-project tracing \
    --description="tracing" --display-name="tracing"
   ```
2. **Set the Appropriate permissions:**  
``` md
oc adm policy add-scc-to-group anyuid system:serviceaccounts:tracing
```
  
### Begin Installation
1. Go to CP4I Platform Home. Click **Create instance** inside the **Tracing** tile.    
![](2.tracing_nav.png)
1. A window will pop up with a description of the requirements for installing. Click **Continue** to the helm chart deployment configuration.
  2. Click **Overview** to view the chart information and pre-reqs that were covered in [Prepare Installation](#prepare-installation).
3. Click **Configure**
4. Enter the Helm release name. In our example, **tracing**
5. Enter Target Namespace - **tracing**
6. Select a Cluster - **local-cluster**.
7. Check the license agreement.
8. Under Parameters -> Quick start
   1. Integration Platform Navigator Hostname -> This is the hostname of your platform navigator.  Copy and paste without the https://
   2. Global: Images Registry Secret -> This is your pull secret you created in the previous set of instructions.  for ROKS installations, this will be created automatically
   3. Ingress: Hostname -> This is the hostname of your proxy node for your install.
   4. Configuration DB: Storage Class Name -> Storage Class for your block storage (e.g. ceph, ibmc-block-bronze)
   5. Operations Dashboard Store: Storage Class Name -> Storage Class for your block storage (e.g. ceph, ibmc-block-bronze)
9.  Click `Install`
10. If you are using entitled registry, the entire install process could take up to 25-30 minutes to run depending on how long it takes to pull the images down.


### Validate installation    

1. View all pods running using `oc get pods`.  Output should resemble below

![](3.tracing-pods.png)
   
### Configure Tracing for the CP4I capabilities

At the time of writing, the CP4I tracing capability includes the ability to trace MQ, App Connect Enterprise and API Connect.  MQ and API Connect only need to be configured once upon install of that capability.  For App Connect, you will enable tracing for each individual .bar file you deploy.  Note that if you deploy .bar files into the same namespace, you will only need to enable tracing for that namespace the first time you deploy to it.  To learn how to enable tracing for each capability see the documentation 

-  [App Connect](../deploy-integration)
-  [API Connect](../deploy-api-mgmt)
-  [MQ](../deploy-queue-manager)
