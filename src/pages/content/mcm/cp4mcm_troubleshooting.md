---
title: "Troubleshooting"
weight: 700
---
- 
{:toc}

## CAM Installation

### 509: certificate signed by unknown authority

- If doing an offline install, make sure to use OCP host install box
- Confirm your **Image Repository URL** is set correctly under **Install Configurations**

### ErrImagePull fail build

Check to make sure docker registry secret was created and accessible.

### Uninstall CAM

1. Go to MCM UI
2. `helm init`
3. `helm delete cam --purge --debug`
4. Delete the provisioned pvcs with `oc delete pvc &lt;cam_pvc_name>`
   
{%
  include figure.html
  src="/assets/img/cp4mcm/cam_troubleshoot.png"
  alt="CAM PVC Policy"
  caption="CAM PVC Policy"
%}


Alternatively,
Run `oc get all` to get the CAM job name, then run `oc delete JOB_NAME`
