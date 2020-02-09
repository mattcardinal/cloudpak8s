---
title: MCM - Sample Bookinfo
weight: 320
---
- 
{:toc}

##	Subscription to a Helm Repository Channel

In this task, you define a **helm repository subscription channel** and **subscribe** to that **channel**. The channel is of type **HelmRepo**, meaning that the yaml you create will be deployed and stored in a Helm chart.
Various tasks associated are
*	Look at the bookinfo application
*	Deploy the channel
*	Define the helm repo subscription model
*	Deploy the subscription
*	Check the application

### Bookinfo Application

You will use bookinfo application to deploy as a helm chart. The application is available as helm chart at *https://github.com/hybrid-ops/subscription-examples* along with the required resource definitions. You will this github as helm repository.
Navigate to bookinfo folder, *https://github.com/hybrid-ops/subscription-examples/tree/master/bookinfo* for the required prerequsites. This folder has three files
* prereqs.yaml - creates bookinfo namespace and creates the required image policy for bookinfo container
* prereqs-ns.yaml - creates the namespaces bookinfo-entitilement and bookinfo-project for the channel and subscriptions
* ip.yaml - Creates the required image security policy for the the example bookinfo product page.

You can copy the files to your local workstation and run the commands

Once, you log in to the OpenShift command line of **MCM Hub**, run the commands
```
oc apply -f prereqs.yaml
oc apply -f prereqs-ns.yaml
oc apply -f ip.yaml
```

### Create the Channel

You will use the file, bookinfo-channel.yaml in *https://github.com/hybrid-ops/subscription-examples/tree/master/bookinfo-entitlement* to create the required the channel. You can download the file to run locally. This resource file defines the channel for helm repository **https://raw.githubusercontent.com/dymaczew/charts/master/repo/incubator/**

Log in to the MCM Hub and run the command
```
oc apply -f bookinfo-channel.yaml
```

Check if the channel is created:
```
oc project bookinfo-project
oc get channel
```

The output should look equivalent to

```
bookinfo-channel   HelmRepo   https://raw.githubusercontent.com/dymaczew/charts/master/repo/incubator/   122m
```

This also can be varified in the console. Click the hambuger icon -> Manage Applications. Then launch the **Resources** tab which shows the channel that is just created.

![Channel Image](assets/img/cp4mcm/mcm-channel.jpg)

### Create the Subscription

You will use the file, bookinfo-app.yaml in *https://github.com/hybrid-ops/subscription-examples/blob/master/bookinfo-project/bookinfo-app.yaml* to create the required subscription with a placement policy. If you examine the file, you will find  that the placement rule is set to **environment: Demo**. So, ensure that label is set on your target cluster where you want the application to deployed to.
Also, edit the file to modify the route according to your environment.

![Modify Route](assets/img/cp4mcm/mcm-modifyroute.jpg)

After the modification of the route, run the command to deploy the application

```
oc apply -f bookinfo-app.yaml
```

The application should be deployed. You can check if the subscription is propogated

```
oc get appsub --all-namespaces
```

The output will look similar to

```
bookinfo-project   bookinfo-subscription   Propagated   141m
```

You also can check the console. Click the hambuger icon -> Manage Applications -> Overview
![Applications Overview](assets/img/cp4mcm/mcm-applications.jpg)

Now, click the application bookinfo-app to view the various resources involved with the subscription.
![Application Details](assets/img/cp4mcm/mcm-appdetails.jpg)

Hover over the placement rule to see the placement rule of the application
![Placement Rule Visualization](assets/img/cp4mcm/mcm-appdetails1.jpg)

If you don't see the application propogated, you may have to check the placement rule and ensure the rule matches to at least one cluster in your environment.
