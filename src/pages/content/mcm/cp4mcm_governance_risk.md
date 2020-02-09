---
title: MCM - Governance and Risk
weight: 340

---

{:toc}


## Introduction

Here how we can define and review policy definitions and see the compliance state of managed clusters.

### Create Simple Policy

Let's create a new policy

Open MCM Web Console https://icp-console.apps.res-cp4mcm.ocp.csplab.local/multicloud/policies/create

Navigate to Menu -> Govern risk.  Policies This view displays the policies that have been created and the dashboard of policy compliance for each cluster.

   ![Image](assets/img/cp4mcm/PolicyCreate.png)

Click on Create policy button.

   ![Image](assets/img/cp4mcm/cp4mcm_2.png)

Fill the values as specified in the table below:

|      Field Name      | Value                                                        |
| :------------------: | :----------------------------------------------------------- |
|         Name         | policy-namespace                                             |
|      Namespace       | Choose: Namespace-must have namespace ‘prod’ Note: You will modify the name prod to k8demo. Selecting this will provide a template to have custom namespace policy definition |
|    Specifications    | Choose: “Namespace”                                          |
|   Cluster Binding    | Choose name: “local-cluster”                                 |
|      Standards       | Choose: "FISMA"                                              |
|      Categories      | Choose: "SystemAndInformationIntegrity"                      |
|       Controls       | Choose: "Mutation Advisor"                                   |
| Enforce if Supported | Leave as is                                                  |
|    Disable Policy    | Leave as is                                                  |

In the **yaml file section**, on the right, change **prod** to **k8demo**.

Changing the namespace will change the Policy Specifications to Custom Specifications as below. Notice that the policy is set to “**inform**” rather than “**enforce**”.

   ![Image](assets/img/cp4mcm/clip_image001.png)

   ![Image](assets/img/cp4mcm/clip_image002.png)

Use the button Create to create your new policy.

If you are no redirected automatically navigate **to Menu** -> **Govern risk** to return to the Dashboard.

In few seconds, the policy controller will check if the namespace **k8demo** is present and provides information regarding the current compliance of the policies.

Remember, you didn’t **enforce** this policy. Instead we specified **inform.** As such, the Governance and risk view displays a policy violation in our cluster, as illustrated below.

   ![Image](assets/img/cp4mcm/clip_image004.png)

Use the Cluster Violation link ![Image](assets/img/cp4mcm/clip_image005.png) to find which cluster is violating the policy.

The **local-cluster** cluster is in violation of the policy which requires a namespace called “k8demo” to exist.

The local-cluster cluster is our cluster, and the same cluster that verified “k8sdemo” namespace does not exist. Hence it shows that there is no namespace k8demo in the cluster.

![Image](assets/img/cp4mcm/clip_image006.png)

Verify the k8demo namespace still does not exist.

~~~ shell
oc get projects
~~~

There should NOT be a namespace named k8demo listed, which indicates the policy did not ENFORCE it to be created.

Change the “policy-namespce” policy to be enforced

When a policy is in “**enforce**” mode, the namespace will automatically be created, if it does not exist, thereby enforcing the cluster into compliance.

a.  In the **policies** view, select **POLICY VIOLATIONS**

![Image](assets/img/cp4mcm/clip_image008.png)

b.  Then, select the policy named “policy-namespace” and go to **YAML** view

c.   Click on the ![Image](assets/img/cp4mcm/clip_image009.png) button to go into edit mode.

d.  Change the value of “**remediationAction: inform**” to “**remediationAction: enforce**”

e.  Click the ![Image](assets/img/cp4mcm/clip_image010.png) to submit the change

![Image](assets/img/cp4mcm/clip_image011.png)

Select the **policy-namespace** link. A few seconds later, the policy violation will be gone away.

![Image](assets/img/cp4mcm/clip_image012.png)

You also can validate the same from the **Violations** view.

Run the command below command and ensure that the k8demo namespace has been created in the cluster.

~~~ shell
oc get project  | grep k8demo
~~~

!![Image](assets/img/cp4mcm/clip_image014.png)

Try deleting the namespace and check how is being created automatically again.

~~~ shell
oc delete project  k8demo
~~~

### Namespace Policy

This policy will check the Cluster Selector, and verify if a namespace named “policy-namespace-k8demo” exists, if the Enforce if supported field is true, the namespace will be automatically created on the selected cluster, if false then the violation/compliance of the policy will be reported on the dashboard.

The policy controller will check if the namespace k8demo is present and provides information regarding the current compliance of the policies.

Create policy by setting the following values:

| Field Name           | Value                                                        |
| :------------------- | :----------------------------------------------------------- |
| Name                 | policy-namespace                                             |
| Namespace            | Choose: Namespace-must have namespace ‘prod’ Note: You will modify the name prod to k8demo. Selecting this will provide a template to have custom namespace policy definition |
| Specifications       | Choose: “Namespace”                                          |
| Cluster Binding      | Choose name: “local-cluster”                                 |
| Standards            | Choose: "NIST-CSF"                                           |
| Categories           | Choose: "SystemAndInformationIntegrity"                      |
| Controls             | Choose: "Mutation Advisor"                                   |
| Enforce if Supported | Leave as is                                                  |
| Disable Policy       | Leave as is                                                  |


![Image](assets/img/cp4mcm/prodnamespace.png)

Here is the YAML that this generates.

![Image](assets/img/cp4mcm/prodnamespaceyaml.png)

As we have set this policy to 'enforce' this will create a 'prod' namespace on our targeted clusters.

  ~~~ shell
  oc get namespace | grep -i prod
  ~~~

Create some more policies and then explore the console that is used to give a high level view of the cluster compliance with your defined Policies.

Start with a high level view of the cluster policy compliance.

![Image](assets/img/cp4mcm/PolicySummary.png)

Then by `category` look at which clusters are found to be not compliant with named policies.

![Image](assets/img/cp4mcm/ClusterSummary2.png)


![Image](assets/img/cp4mcm/PolicyCollection.png)

Finally, look at all of the policy compliance associated with you collection of `PCI` compliance policies.

![Image](assets/img/cp4mcm/SISummary.png)


### Network Policy

The Network Policy is used to control (block) network traffic from other pods.

Configure the new network policy according to the table below

| Field Name           | Value                                                        |
| :------------------- | :----------------------------------------------------------- |
| Name                 | Policy-network-policy                                        |
| Namespace            | Choose: Namespace-must have namespace ‘prod’ Note: You will modify the name prod to k8demo. Selecting this will provide a template to have custom namespace policy definition |
| Specifications       | Choose: “NetworkPolicy”                                      |
| Cluster Binding      | Choose name: “local-cluster”                                 |
| Standards            | Choose: "NIST-CSF"                                           |
| Categories           | Choose: "SystemAndInformationIntegrity"                      |
| Controls             | Choose: "Mutation Advisor"                                   |
| Enforce if Supported | Leave as is                                                  |
| Disable Policy       | Leave as is                                                  |


![Image](assets/img/cp4mcm/cp4mcm_clipimage00078.png)
~~~ yaml
apiVersion: policy.mcm.ibm.com/v1alpha1
kind: Policy
metadata:
  name: policy-networkpolicy
  namespace: residency2020
  annotations:
    policy.mcm.ibm.com/standards: NIST-CSF
    policy.mcm.ibm.com/categories: PR.AC Identity Management Authentication and Access Control
    policy.mcm.ibm.com/controls: PR.AC-5 Network Integrity
spec:
  complianceType: musthave
  remediationAction: inform
  disabled: false
  namespaces:
    exclude: ["kube-*"]
    include: ["default"]
  object-templates:
    - complianceType: musthave
      objectDefinition:
        kind: NetworkPolicy # deny network request
        apiVersion: networking.k8s.io/v1
        metadata:
          name: deny-from-other-namespaces
        spec:
          podSelector:
            matchLabels:
          ingress:
          - from:
            - podSelector: {} # accept ingress from all pods within this namespace only
---
apiVersion: mcm.ibm.com/v1alpha1
kind: PlacementBinding
metadata:
  name: binding-policy-networkpolicy
  namespace: residency2020
placementRef:
  name: placement-policy-networkpolicy
  kind: PlacementPolicy
  apiGroup: mcm.ibm.com
subjects:
- name: policy-networkpolicy
  kind: Policy
  apiGroup: policy.mcm.ibm.com
---
apiVersion: mcm.ibm.com/v1alpha1
kind: PlacementPolicy
metadata:
  name: placement-policy-networkpolicy
  namespace: residency2020
spec:
  clusterLabels:
    matchExpressions:
~~~

You can validate the network policy that is created on the selected namespace.

 Using the CLI, run the following command to get the network policies for the namespace

~~~ shell
oc get networkpolicies -n &lt;namespace>
~~~

This kind of  policy can be used to allow or deny the communication between pods living on different 		namespaces.

### 	 Pod must exist in a given namespace Policy

This kind of policy validates if a pod is present in a given namespace.

Configure the new policy, requiring pod be present, according to the table below

| Field Name           | Value                                                        |
| :------------------- | :----------------------------------------------------------- |
| Name                 | policy-namespace                                             |
| Namespace            | Choose: Namespace-must have namespace ‘prod’ Note: You will modify the name prod to k8demo. Selecting this will provide a template to have custom namespace policy definition |
| Specifications       | Choose: “Pod-nginx” must exist                               |
| Cluster Binding      | Choose name: “local-cluster”                                 |
| Standards            | Choose: "NIST-CSF"                                           |
| Categories           | Choose: "SystemAndInformationIntegrity"                      |
| Controls             | Choose: "Mutation Advisor"                                   |
| Enforce if Supported | Leave as is                                                  |
| Disable Policy       | Leave as is                                                  |

Notice you can change the name of the pod and the image on the yaml section to create any kind of pod, make sure of write a valid value on the image parameter.

 Also you can change in the namespaces section, the namespaces you want your policy takes effect.

![Image](assets/img/cp4mcm/clip_image00122.png)
~~~ yaml
apiVersion: policy.mcm.ibm.com/v1alpha1
kind: Policy
metadata:
  name: policy-pod
  namespace: residency2020
  annotations:
    policy.mcm.ibm.com/standards: NIST-CSF
    policy.mcm.ibm.com/categories: PR.AC Identity Management Authentication and Access Control, DE.CM Security Continuous Monitoring, PR.IP Information Protection Processes and Procedures, PR.PT Protective Technology
    policy.mcm.ibm.com/controls: PR.AC-5 Network Integrity, DE.CM-7 Monitoring for unauthorized activity, PR.IP-1 Baseline configuration, PR.PT-3 Least Functionality
spec:
  complianceType: musthave
  remediationAction: inform
  disabled: false
  namespaces:
    exclude: ["kube-*"]
    include: ["residency2020"]
  object-templates:
    - complianceType: musthave
      objectDefinition:
        apiVersion: v1
        kind: Pod # nginx pod must exist
        metadata:
          name: nginx-pod
        spec:
          containers:
          - image: nginx:1.7.9
            name: nginx
            ports:
            - containerPort: 80
---
apiVersion: mcm.ibm.com/v1alpha1
kind: PlacementBinding
metadata:
  name: binding-policy-pod
  namespace: residency2020
placementRef:
  name: placement-policy-pod
  kind: PlacementPolicy
  apiGroup: mcm.ibm.com
subjects:
- name: policy-pod
  kind: Policy
  apiGroup: policy.mcm.ibm.com
---
apiVersion: mcm.ibm.com/v1alpha1
kind: PlacementPolicy
metadata:
  name: placement-policy-pod
  namespace: residency2020
spec:
  clusterLabels:
    matchExpressions:
~~~

### Limits memory range for a namespace Policy

Configure the new policy, enforcing quota limits, according to the table below

| Field Name           | Value                                                        |
| :------------------- | :----------------------------------------------------------- |
| Name                 | policy-namespace                                             |
| Namespace            | Choose: Namespace-must have namespace ‘prod’ Note: You will modify the name prod to k8demo. Selecting this will provide a template to have custom namespace policy definition |
| Specifications       | Choose: “Limitrange-limit memory usage”                      |
| Cluster Binding      | Choose name: “local-cluster”                                 |
| Standards            | Choose: "NIST-CSF"                                           |
| Categories           | Choose: "SystemAndInformationIntegrity"                      |
| Controls             | Choose: "Mutation Advisor"                                   |
| Enforce if Supported | Leave as is                                                  |
| Disable Policy       | Leave as is                                                  |

 To validate the quota is created on the selected namespace

![Image](assets/img/cp4mcm/clip_image0034.png)

~~~ shell
oc get networkpolicies -n &lt;namespace>
~~~
~~~ shell
oc -n &lt;namespace> get limits
~~~
~~~ shell
oc -n &lt;namespace> get limits –o yaml
~~~

~~~ yaml
apiVersion: policy.mcm.ibm.com/v1alpha1
kind: Policy
metadata:
  name: policy-limitrange
  namespace: residency2020
  annotations:
    policy.mcm.ibm.com/standards: NIST-CSF
    policy.mcm.ibm.com/categories: PR.AC Identity Management Authentication and Access Control, DE.CM Security Continuous Monitoring, PR.IP Information Protection Processes and Procedures, PR.PT Protective Technology
    policy.mcm.ibm.com/controls: PR.AC-5 Network Integrity, DE.CM-7 Monitoring for unauthorized activity, PR.IP-1 Baseline configuration, PR.PT-3 Least Functionality
spec:
  complianceType: musthave
  remediationAction: inform
  disabled: false
  namespaces:
    exclude: ["kube-*"]
    include: ["residency2020"]
  object-templates:
    - complianceType: musthave
      objectDefinition:
        apiVersion: v1
        kind: LimitRange # limit memory usage
        metadata:
          name: mem-limit-range
        spec:
          limits:
          - default:
              memory: 512Mi
            defaultRequest:
              memory: 256Mi
            type: Container
---
apiVersion: mcm.ibm.com/v1alpha1
kind: PlacementBinding
metadata:
  name: binding-policy-limitrange
  namespace: residency2020
placementRef:
  name: placement-policy-limitrange
  kind: PlacementPolicy
  apiGroup: mcm.ibm.com
subjects:
- name: policy-limitrange
  kind: Policy
  apiGroup: policy.mcm.ibm.com
---
apiVersion: mcm.ibm.com/v1alpha1
kind: PlacementPolicy
metadata:
  name: placement-policy-limitrange
  namespace: residency2020
spec:
  clusterLabels:
    matchExpressions:
~~~

### Mutation Policy

A mutation policy contains the specifications of which pods to monitor and what action to take if a mutation is detected, for example if this policy is created and configured for an specific namespace, and you change something (such as edit or delete a file) in a running pod of that namespace, a violation will be notified, if the policy is enforced, the pod will be restarted.



| Field Name           | Value                                                        |
| :------------------- | :----------------------------------------------------------- |
| Name                 | policy-namespace                                             |
| Namespace            | Choose: Namespace-must have namespace ‘prod’ Note: You will modify the name prod to k8demo. Selecting this will provide a template to have custom namespace policy definition |
| Specifications       | Choose: “Mutation Policy”                                    |
| Cluster Binding      | Choose name: “local-cluster”                                 |
| Standards            | Choose: "NIST-CSF"                                           |
| Categories           | Choose: "SystemAndInformationIntegrity"                      |
| Controls             | Choose: "Mutation Advisor"                                   |
| Enforce if Supported | Leave as is                                                  |
| Disable Policy       | Leave as is                                                  |


![Image](assets/img/cp4mcm/cp4mcm_clipimage0008.png)

~~~ yaml
apiVersion: policy.mcm.ibm.com/v1alpha1
kind: Policy
metadata:
  name: policy-mutationpolicy
  namespace: residency2020
  annotations:
    policy.mcm.ibm.com/standards: NIST-CSF
    policy.mcm.ibm.com/categories: PR.AC Identity Management Authentication and Access Control, DE.CM Security Continuous Monitoring
    policy.mcm.ibm.com/controls: PR.AC-5 Network Integrity, DE.CM-7 Monitoring for unauthorized activity
spec:
  complianceType: musthave
  remediationAction: inform
  disabled: false
  namespaces:
    exclude: ["kube-*"]
    include: ["default"]
  policy-templates:
    - objectDefinition:
        apiVersion: policies.ibm.com/v1alpha1
        kind: MutationPolicy # no mutation allowed
        metadata:
          name: policy-mutationpolicy-example
        spec:
          namespaceSelector:
            include: ["default","kube-*"]
            exclude: ["kube-system"]
          remediationAction: inform # enforce or inform
          severity: medium
          conditions:
            ownership: ["ReplicaSet", "Deployment", "DeamonSet", "ReplicationController", "none"]
---
apiVersion: mcm.ibm.com/v1alpha1
kind: PlacementBinding
metadata:
  name: binding-policy-mutationpolicy
  namespace: residency2020
placementRef:
  name: placement-policy-mutationpolicy
  kind: PlacementPolicy
  apiGroup: mcm.ibm.com
subjects:
- name: policy-mutationpolicy
  kind: Policy
  apiGroup: policy.mcm.ibm.com
---
apiVersion: mcm.ibm.com/v1alpha1
kind: PlacementPolicy
metadata:
  name: placement-policy-mutationpolicy
  namespace: residency2020
spec:
  clusterLabels:
    matchExpressions:
~~~
