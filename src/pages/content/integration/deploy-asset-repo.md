---
title: deploy-asset-repo
weight: 600
---

- [Introduction](#introduction)
- [Prepare Installation](#prepare-installation)
- [Begin Installation](#begin-installation)
- [Validate installation](#validate-installation)

### Introduction
This page contains guidance on how to configure the Asset Repository release for both on-prem and ROKS.

### Prepare Installation

1. You have a few choices on where you can deploy the Asset Repository.  You can either deploy it to the `integration` namespace or wherever your platform navigator is installed, or in some cases (like ROKS) where a separate namespace will be created for the asset repository.
2. The Asset Repository Requires the use of persistent storage, like gluster-fs and/or ceph.  Note that there are some parts of the Asset Repo that work better with block storage (like Cloudant).  These will be called out in the installation instructions below.
3. To use the remote syncing capability into github, a publically facing github account is required.  More info on this can be found [here](https://www.ibm.com/support/knowledgecenter/SSGT7J_19.4/asset_repo.html).
4. Note that the default replica set size for the install for all of the asset repo components is 3.  For POC/Dev type systems, you can scale these back to one replica to save resources.  However note this is *NOT* recommended for production systems.


### Begin Installation
1. Go to CP4I Platform Home. Click **Create Instance** inside the **Asset Repo** tile.    
1. A window will pop up with a description of the requirements for installing. Click **Continue** to the helm chart deployment configuration.
2. Click **Overview** to view the chart information and pre-reqs.
3. Click **Configure**
4. Enter the Helm release name. In our example, **asset-repo**
5. Enter Target Namespace.  As indicated above, this can be in the `integration` namespace or another namespace setup for you.
6. Select a Cluster - **local-cluster**.
7. Tick the license agreement box.
8. Under Parameters -> Quick start
   1. Hostname of the ingress proxy to be configured - This will be your proxy node for you install. 
9.  Click All Parameters twisty
10. Image Pull Secret -> Set to `ibm-entitlement-key` if using entitled registry or if offline use the `deployer-dockercfg-XX` secret in your ace namespace.  Use `oc get secrets` to get the exact value for your environment.
10. Untick the `Production usage` checkbox.
12. Double check that the `Platform Navigator Namespace` is set properly for your environment.
13. For `Cloudant metadata store storage class` set that value to your block storageclass.  Non-block will work fine here too, but block will definitely be faster.
14. As you go through the chart, you can scale down the replicas for `Cloudant`, `Catalog API`, `DC main`, `Portal Catalog`, `Asset Storage`, `Portal Common` and `Catalog Remotes` from 3 to 1.
15. Be sure to also set the `Asset storage Storage Class` and `Catalog remotes Storage Class` to your non-block storage.
16. Scroll down and then Click **Install** to fire off the chart installation


### Validate installation    

1. Here is a representation of all pods running
![](16.asset-repo-pods.png)
