---
title: Introduction
weight: 100
---

## Solution overview 

Digital business automation (DBA) allows an organization to improve its operations by streamlining the way people participate in business processes and workflows, automate repeatable decisions, and provide business users with the ability to edit and change the business logic involved in these business processes. DBA projects also aim to make documents easy to store and retrieve, digitize document content, such as with optical character recognition (OCR), and automate data entries with software robots, also referred to as robotic process automation.

The IBM Cloud Pak for Automation offers a software platform to develop, deploy, run and manage your digital business automation projects, using the capabilities shown in the following digram: 

![overview](assets/automation/images/cp4a.jpg)

The goal of the following chapters is to detail the install process for the components of the cloud pak (specifically version 19.0.3) that are containerized and run in an OpenShift cluster.
These components are:

- [IBM User Management Services]({{ pages.github.url }}/automation/install-ums)
- [IBM Business Automation Studio]({{ pages.github.url }}/automation/install-bas)
- [IBM Business Automation Insights]({{ pages.github.url }}/automation/install-bai)
- [IBM Business Automation Navigator]({{ pages.github.url }}/automation/install-ban)
- [IBM FileNet Content Manager]({{ pages.github.url }}/automation/install-ecm)
- [IBM Automation Workstream Services]({{ pages.github.url }}/automation/install-aws)
- [IBM Business Automation Content Analyzer]({{ pages.github.url }}/automation/install-aca)
- [IBM Operational Decision Manager]({{ pages.github.url }}/automation/install-odm)
- [IBM Automation Digital Worker]({{ pages.github.url }}/automation/install-adw)

The install process is performed through an Operator, which configuration is described [here]({{ pages.github.url }}/automation/install-operator)

Note that these install instructions have been tested on an OpenShift 4.2 cluster, using images from the Entitlement Registry for the IBM Cloud Pak for Automation on [IBM Cloud](https://cloud.ibm.com/catalog/content/ibm-cp-automation-f8084c28-d609-4a7a-bfb7-569e79cb9e72-global).

For more information, visit:
- The [IBM Cloud Pak for Automation documentation](https://www.ibm.com/support/knowledgecenter/en/SSYHZ8_19.0.x/welcome/kc_welcome_dba_distrib.html) in the IBM Knowledge Center.
- The [Digital business automation reference architecture](https://www.ibm.com/cloud/garage/architectures/dba/reference-architecture) in the IBM Architecture Center.
- The [Denim Compute DBA reference implementation](https://github.com/ibm-cloud-architecture/denim-compute) in GitHub.
