---
title: deploy-queue-manager
weight: 800
---

- 
{:toc}

This page provides the guidance for installing MQ for both Red Hat OpenShift on-prem and on IBM Cloud.

### Create MQ instance in Cloud Pak for Integration

1. Create an instance of MQ queue manager by clicking on “Add new instance” in the MQ tile in Platform Navigator.  
   ![Add New Instance](5.mq-nav.png)
2. This will open a pop up window showing requirements for deploying MQ. Click **Continue**.   
3. This will open the MQ helm chart to deploy MQ to the cluster.  Click **Overview** to review the requirements to deploy MQ chart.  
5. Unless you require fine grained rights to be defined for your installation, the default rbac settings defined on install will be sufficient.
8.	MQ also requires Storage class or Persistent volume to be pre-defined if persistence is being used. It is possible to deploy MQ chart without using persistence. However, it is highly recommended to use persistent storage as any changes you make in the MQ UI will be lost if the pods were recreated.
9. If you are using the entitled registry, your image pull secret will already be created for you as `ibm-entitlement-key`.
9.	If you are not using entitled registry, obtain an image pull secret using the command below:

    To obtain the secret for pulling the image login to the OCP CLI and run:
    ```
    oc get secrets -n mq
    ```
    The pull secret starts with **deployer-dockercfg**

10.	After performing the above pre-requisites, click on **Configuration** tab to provide the values required to deploy MQ chart. 

11.	Provide the name for the chart, select **mq** as Target namespace and select **local-cluster** as Target-Cluster. Also check the ‘License’ box to accept license.
12. Expand the 'Quick Start' twisty to expose the Configuration Settings for TLS.  
    ![](6.mq-quickstart.png)
12.	Set the Cluster Hostname as the proxy node address for your installation.  Omit the `https://` in the url.
13. Next, click to expand ‘All parameters’ to configure the chart for deployment. 
13.	Untickthe box “Production usage” box.  Double check your image repository is correct.  For entitled registry it will look like `cp.icr.io/ibm-mqadvanced-server-integration`.  
14. Set the `Image Pull Secret` to `ibm-entitlement-key` for the entitled registry or the **deployer-dockercfg** value specific to your environment as indicated in the step above.
14.	Moving down, under the `IBM Cloud Pak for Integration` heading it will ask for the location of your platform navigator is installed at.  In most installations, this will be the `integration` namespace, but check to be sure.  
15.	Moving down, under the `TLS` -> `Configuration Settings for TLS`.  Tick the `Generate Certificate` box. The cluster hostname value should already be populated with the proxy node value defined earlier.
16. Under the `Persistence` heading.  If you choose to use persistent storage then you will need to tick both the `Enable persistence` and `Use dynamic provisioning` boxes.
17. Under the `Data PVC` heading.  Populate the `Storage Class name` with the requisite storageclass.  Use `oc get storageclasses` to get a list on your system.  If you are using ROKS this can be the `ibmc-bronze`.  
18. There is no need to repeat this for the other sections (Log PVC and QM PVC etc) as it will use the storage class defined in `Data PVC` for all sections.  If you want to use a separate storage class for these items, you can individually specify the storageclasses as required.
19. Moving down, under Security, ensure the check box for `Initialize volume as root` is ticked.  This is the default.
20. Last item to configure is to enable OD Tracing for the MQ instance.  At the bottom of the MQ Chart you will find the `Operation Dashboard Configuration`.
![](11.tracingchart.png)
21. Click the Tick Box for `Enable Operations Dashboard`
22. At the bottom, populate the `OD tracing instance namespace` with the name of the tracing namespace, which in this sample is `tracing`
23. Scroll to the bottom and then click install.

### Monitoring the Deployment
1. Once all the pods are up, it will resemble the following.  Use the `oc get pods` to view the pods in flight
![](12.mqpods.png)

### Register with Tracing Service
1. Near the end of the install of MQ, a job will be created that has the name `odtracing.registration`.  This job will not complete until the Registration is completed inside of the Tracing capability.
2. What will happen is that a request will be created inside of tracing that you need to act upon.  Navigate to the Platform Navigator and via the Hamburger menu select Tracing and then when the window pops out select the name of your tracing instance which should be called `tracing`
![](13.tracing-nav.png)
3. Within tracing, select the `Manage` icon from the menu.  Looks like a cog wheel.
![](14.tracing-from-menu.png)
4. Click on the `Registration Requests` icon.
5. You should see a new registration request for your MQ install.  Click the `approve` link
6. You will see a pop up window with some lines to copy to your clipboard.  Click the 2 boxes icon in the top right icon to copy the commands required.
![](15.process-request.png)
7. Ensuring you have an active `oc` session and in the `mq` project.  Paste the commands to the window and it will run then and finish the processing.
8. If you are slow in doing the steps above.  It is possible you might see the `odtracing.registration` job fail.  No worries.  Once you complete the pasting of the commands to create your secret, the job will re-create itself.
