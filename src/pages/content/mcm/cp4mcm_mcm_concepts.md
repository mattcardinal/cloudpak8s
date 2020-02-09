---
title: MCM - Concepts
weight: 310
---
- 
{:toc}


## Overview

MCM Manages applications by defining them as custom resource definitions in Kubernetes. By defining these resources we can install, delete and update resources on the managed MCM clusters. When these MCM resources are created the changes are applied on the target MCM cluster via the MCM Klusterlet.

In the next sections we will explore the different resources MCM provides.

## Channels

The channel resource defines the location of an resource to be deployed. These resources can be a Helm repository, Kubernetes namespace, Object store or Git repository.

The sample below describes a Channel the points to a HelmRepo.

```
kubectl create -f - &lt;&lt;EOF
apiVersion: v1
kind: Namespace
metadata: 
  name: google-deployables
---
apiVersion: app.ibm.com/v1alpha1
kind: Channel
metadata:
  name: google-incubator-repo
  namespace: google-deployables
spec:
    type: HelmRepo
    pathname: http://storage.googleapis.com/kubernetes-charts-incubator
EOF
```

Once the channel definition above has been applied you can get your channel.

```
oc get channels -n google-deployables
NAME                    TYPE       PATHNAME                                                    AGE
google-incubator-repo   HelmRepo   http://storage.googleapis.com/kubernetes-charts-incubator   3m41s
```

When the channel is created it will query the target HelmRepo and create MCM `deployables` for each of the Helm charts in the repo.

```
oc get deployables -n google-deployables
NAME                                                               TEMPLATE-KIND   TEMPLATE-APIVERSION    AGE     STATUS
google-incubator-repo-artifactory-5.2.1                            HelmRelease     app.ibm.com/v1alpha1   5m39s
google-incubator-repo-aws-alb-ingress-controller-0.1.12            HelmRelease     app.ibm.com/v1alpha1   5m38s
google-incubator-repo-azuremonitor-containers-2.5.0                HelmRelease     app.ibm.com/v1alpha1   5m43s
...
...
...
app.ibm.com/v1alpha1   5m43s
google-incubator-repo-tensorflow-inception-0.4.1                   HelmRelease     app.ibm.com/v1alpha1   5m45s
google-incubator-repo-vault-0.23.4                                 HelmRelease     app.ibm.com/v1alpha1   5m50s
google-incubator-repo-vaultingkube-0.1.2                           HelmRelease     app.ibm.com/v1alpha1   5m50s
google-incubator-repo-webpagetest-agent-0.2.0                      HelmRelease     app.ibm.com/v1alpha1   5m50s
google-incubator-repo-webpagetest-server-0.2.1                     HelmRelease     app.ibm.com/v1alpha1   5m38s
google-incubator-repo-xray-0.3.2                                   HelmRelease     app.ibm.com/v1alpha1   5m49s
```

You can see that all the Helm charts are now available as `deployables` and are available to be deployed using MCM. In this section a HelmRepo has been used as an example of a Channel. You can find additional information on Channels here: https://www.ibm.com/support/knowledgecenter/en/SSFC4F_1.2.0/mcm/applications/managing_channels.html


## Placement Rules
PlacementRules are an MCM resource that define where resources should be deployed. PlacementRules by themeselves do not do anything, but can be included as a reference in other resource types or embedded in other MCM resource types.

Below is an example:

```
kubectl create -f - &lt;&lt;EOF
apiVersion: v1
kind: Namespace
metadata: 
  name: etcd-project
---
apiVersion: app.ibm.com/v1alpha1
kind: PlacementRule
metadata:
  name: my-placementrule
  namespace: etcd-project
  generation: 1
  labels:
    purpose: myapp
spec:
  clusterReplicas: 1
  clusterLabels:
    matchLabels:
      cluster: myapp
EOF
```

The example PlacementRule is defining a rule called `my-placementrule` and will deploy the only on clusters that match the label `myapp`. This is a simple example, but PlacementRules can be used to determine number of replicas and more complex logic can be applied to control where MCM resources will be deployed.

More information on PlacementRules can be found here: https://www.ibm.com/support/knowledgecenter/en/SSFC4F_1.2.0/mcm/applications/managing_placement_rules.html


## Subscriptions
The Subscription resource is the resource that combines the `Channel` and the `PlacementRule` to determine which resources should be deployed and where they should be deployed. A subscription does this by referencing a specific Deployable resource defined by a Channel and will either embed a PlacementRule or reference an existing PlacementRule. The Subscription can also modify the defualt values that maybe defined in a Deployable by defining `overrides`.

Example Subscription:

```
kubectl create -f - &lt;&lt;EOF
apiVersion: app.ibm.com/v1alpha1
kind: Subscription
metadata:
  name: etcd
  namespace: etcd-project
  labels:
    purpose: myapp
spec:
  channel: google-deployables/google-incubator-repo
  name: etcd
  packageFilter:
    version: 0.7.3
  placement:
    placementRef:
      name: my-placementrule
      kind: PlacementRule
      group: app.ibm.com
  overrides:
    - clusterName: "/"
      clusterOverrides:
      - path: "metadata.namespace"
        value: myapp
EOF
```
In the example above we are creating a namespace called `etc-subscription` and we are creating a Subscription in that namespace called `etcd`. The subscription references the etcd version 0.7.3 Helm chart in the google-incbuator Channel created earier and references the PlacementRule `my-placementrule`. At the end of the subscription an override is defined to deploy the Helm chart in the namespace `myapp` instead of the default namespace.

Note: The PlacementRule must be in the same namespace as the Subscription.

After this is Subsciption is applied we can view our Subscription.
```
oc get deployables.app.ibm.com -A | grep Subscription | grep etcd
etcd-project           etcd-deployable                                                    Subscription    app.ibm.com/v1alpha1   3m59s   Propagated
```

Notice that this shows that we created a Subscription and the status shows `Propagated`. This shows us that we have successfully created the Subscription, but there are no clusters that meet the criteria as targets for out PlacementRule.

First let's get our available clusters
```
oc get clusters -A
NAMESPACE   NAME      MANAGED BY   ENDPOINTS                           STATUS   AGE
ctcp4ai     ctcp4ai   hub0         api.ctcp4ai.ocp.csplab.local:6443   Ready    15h
```

Next let's add the `myapp` label to the `ctcp4ai` cluster.

```
oc label cluster ctcp4ai -n ctcp4ai cluster=myapp
```

Now let's check our Subscription again 
```
oc get deployables.app.ibm.com -A | grep Subscription | grep etcd
ctcp4ai                etcd-deployable-fh798                                              Subscription    app.ibm.com/v1alpha1   3m58s   Deployed
etcd-project           etcd-deployable                                                    Subscription    app.ibm.com/v1alpha1   3m59s   Propagated
```

Now we see that there is an additional Subscription in the namespace of the target cluster that shows `Deployed`. The HelmChart should now be deployed on the target cluster.

#### From the target system

Once the Subsciption shows `Deployed` on the MCM Hub server you should be able to see the subscription on the target cluster:
```
oc get subscriptions.app.ibm.com --all-namespaces | grep etcd
myapp       etcd                    Subscribed   11m
```

In addition since this is a Helm chart subscription you should see a `helmrelease` object as well:
```
oc get helmreleases.app.ibm.com --all-namespaces | grep etcd
myapp       etcd-etcd-myapp                           14m
```


Finally we can see that the Helm chart was deployed to the `myapp` namespace.
```
oc get po -n myapp
NAME      READY     STATUS    RESTARTS   AGE
etcd-0    1/1       Running   0          8m17s
etcd-1    1/1       Running   0          7m59s
etcd-2    1/1       Running   0          7m42s
```

Additional documentation can be found to describe the Subscription resource here: https://www.ibm.com/support/knowledgecenter/en/SSFC4F_1.2.0/mcm/applications/managing_subscriptions.html


## Applications

The Application resource is used to reference other MCM resources that we want to define as an Application. Since an Application may be composed of multiple MCM resources we can use selectors to compine the different components.

If you login to the MCM Console and Navigate to Manage Applications you will not see our etcd subscription. Even though we have already deployed the components we will not be able to manage them as a whole until we create an Application resource.

See the example below:

```
kubectl create -f - &lt;&lt;EOF
apiVersion: app.k8s.io/v1beta1
kind: Application
metadata:
  name: etcd-application
  namespace: etcd-project
spec:
  selector:
    matchLabels:
      purpose: myapp
  componentKinds:
  - group: app.ibm.com
    kind: Subscription
EOF
```

MCM channel documentation

https://www.ibm.com/support/knowledgecenter/en/SSFC4F_1.2.0/mcm/applications/managing_channels.html
