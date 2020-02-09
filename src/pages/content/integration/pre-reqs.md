---
title: Pre-requisites
weight: 200
---

-

{:toc}

## Files to download

You will need the following files to perform the cloudpak installation:

1. `ibm-cp-int-2019.4.1-offline.tar.gz` You can get this from XL Downloads or Passport Advantage. As of February 2020, this can be found as `IBM Cloud Pak For Integration 2019.4.1 On Openshift For Linux English (CC4R5EN )` in Passport Advantage.
2. `ibm-cloud-private-rhos-3.2.1.tar.gz` The latest ICP package. This can also be download from Passport Advantage. Please note that `ibm-cp-int-2019.4.1-offline.tar.gz` comes packaged with `ibm-cloud-private-rhos-3.2.0.1906.tar.gz`. That means that if you want to install with **3.2.1 or above** as opposed to the **current default 1906** you must replace the ICP package.

## CLI configuration

You must install all the correct Command Line Interfaces. Those are:

1. IBM Cloud CLI, which can be installed using:

    ``` md
    curl -sL https://ibm.biz/idt-installer | bash
    ```

2. OpenShift CLI, which can be installed following the instruction [here on IBM Cloud](https://cloud.ibm.com/docs/openshift?topic=openshift-openshift-cli).
3. Kubernetes CLI, which can be installed [here on the Kubernetes page](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

## Minimum System Requirements

Refer to [Knowledge Center pre-requisites](https://www.ibm.com/support/knowledgecenter/SSGT7J_19.4/install/sysreqs.html) for details on what is required before starting an install.  

&lt;!-- &lt;style>
table {
  padding: 0; }
  table tr {
    border-top: 1px solid #cccccc;
    background-color: white;
    margin: 0;
    padding: 0; }
    table tr:nth-child(2n) {
      background-color: #f8f8f8; }
    table tr th {
      font-weight: bold;
      border: 1px solid #cccccc;
      text-align: left;
      margin: 0;
      padding: 6px 13px; }
    table tr td {
      border: 1px solid #cccccc;
      text-align: left;
      margin: 0;
      padding: 6px 13px; }
    table tr th :first-child, table tr td :first-child {
      margin-top: 0; }
    table tr th :last-child, table tr td :last-child {
      margin-bottom: 0; }
&lt;/style> -->
&lt;style>
.tablelines table, .tablelines td, .tablelines th {
        border: 1px solid black;
        }
&lt;/style>
| Integration capability | CPU | Memory | Disk space |  
|---------|---------|---------|---------|  
| Asset Repository | 4.25 cores | 8.5 Gb | 2 Gb |  
| **API Lifecycle and Management**:  This capability is provided by deploying IBM API Connect. For specific requirements regarding this capability, see the IBM API Connect system requirements | 12 cores | 48 Gb | 550 Gb |  
| **Queue Manager**: This capability is provided by deploying IBM MQ. For specific requirements regarding this capability, see the IBM MQ system requirements | 1 core | 1 Gb | 2 Gb |  
| **Event Messaging**: This capability is provided by deploying IBM Event Streams. For specific requirements regarding this capability, see the IBM Event Streams system requirements | 17.1 cores | 29 Gb | 1.5 Gb |  
| **Application Integration**: This capability is provided by deploying IBM App Connect. For specific requirements regarding this capability, see the IBM App Connect system requirements | 1 core | 4 Gb | 2.3 Gb |  
| **High Speed File Transfer**: This capability is provided by deploying IBM Aspera. For specific requirements regarding this capability, see the IBM Aspera system requirements | 4 cores | 4 Gb |  

## Configuration used for the Residency

- For this residency 11 workers nodes each with 8 cores and 32 GB of memory were requested for the managed OCP instance
- For on-prem vmware environment had a similar configuration with 11 worker nodes and 2 storage nodes
