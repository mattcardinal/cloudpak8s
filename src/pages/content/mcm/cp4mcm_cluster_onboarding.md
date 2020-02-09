---
title: MCM - Importing a Kubernetes Cluster
weight: 305
---
- 
{:toc}

## Onboarding a Kubernetes Cluster

**1.** To add a new cluster, go to the **MCM UI**.

**2.** Using the menu in the top-left corner, navigate to **Automate Infrastructure** > **Clusters** 

![Graphic](assets/img/cp4mcm/cluster_onboarding_1.png)

**3.** Select **Add Cluster**

![Graphic](assets/img/cp4mcm/cluster_onboarding_2.png)

**4.** Select **Import an existing cluster**

![Graphic](assets/img/cp4mcm/cluster_onboarding_4.png)

**5.** Enter the same name for `Cluster name` and `Namespace`. This restriction is a temporary limitation in the MCM UI.

![Graphic](assets/img/cp4mcm/cluster_onboarding_5.png)

Click "Generate Command" button to get the configuration command.

![Graphic](assets/img/cp4mcm/mcm_klusterlet_import_command.png)

Go to the managed cluster cli and run the command copied from the above. Your output should look something like this:

```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  6412    0  6412    0     0   2872      0 --:--:--  0:00:02 --:--:--  2872
customresourcedefinition.apiextensions.k8s.io/endpoints.multicloud.ibm.com configured
namespace/multicluster-endpoint configured
secret/klusterlet-bootstrap configured
secret/multicluster-endpoint-operator-pull-secret configured
serviceaccount/ibm-multicluster-endpoint-operator configured
clusterrolebinding.rbac.authorization.k8s.io/ibm-multicluster-endpoint-operator configured
deployment.apps/ibm-multicluster-endpoint-operator configured
endpoint.multicloud.ibm.com/endpoint created

```

*Note:* Run the command again if the error below occurs:

```
deployment.apps/ibm-multicluster-endpoint-operator created
error: unable to recognize "STDIN": no matches for kind "Endpoint" in version "multicloud.ibm.com/v1beta1"
```
