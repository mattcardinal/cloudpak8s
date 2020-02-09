---
title: deploy-secure-gateway
weight: 600
---

- [Introduction](#introduction)
- [Prepare Installation](#prepare-installation)
- [Begin Installation](#begin-installation)
- [Validate Installation](#validate-installation)

### Introduction
This page contains guidance on how to configure the Datapower Gateway release for both on-prem and ROKS.  Note - you do not need to install this chart unless you are using datapower as a standalone capability.  When you install API Connect, it installs its own version of this chart as part of the APIC Cluster.

### Prepare Installation

1. **Change project to eventstreams**
   ```
   oc project datapower
   ```

### Begin Installation  
1. Go to CP4I Platform Home. Click **Create instance** inside the **DataPower** tile.  

1. A window will pop up with a description of the requirements for installing. Click **Continue** to the helm chart deployment configuration.     
2. Click **Overview** to view the chart information and pre-reqs that were covered in [Prepare Installation](#prepare-installation).
3. Click **Configure**
4. Enter the Helm release name. In our example, **datapower**
5. Enter Target Namespace - **datapower**
6. Select a Cluster - **local-cluster**.
7. Check the license agreement. 
8. Under Parameters click **All Parameters** to expand. 
   1. Ingress - icp-proxy address defined during icp / common-services installation - icp-proxy.\&lt;openshift-router-domain>  
   2. Image Pull Secret - Set to `ibm-entitlement-key` if using entitled registry or if offline use the `deployer-dockercfg-XX` secret in your datapower namespace.  Use `oc get secrets` to get the exact value for your environment.
9.  Scroll down to External access settings - enter the proxy address - **icp-proxy.\&lt;openshift-router-domain>.**
10. Note:  If you want to enable access to the WebUI and XML/Rest Interfaces for your datapower instance, you will need to change those manually.  Otherwise, they will default to disabled.
10. Scroll to the bottom. Click **Install**.

### Validate Installation  
1. check pods using the command line
   ```
   oc get pods -n datapower
   NAME                                      READY     STATUS    RESTARTS   AGE
   dp-1-ibm-datapower-icp4i-fb888677-mvd9q   1/1       Running   0          3m
   ```
 
