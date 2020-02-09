---
title: Install IBM Business Automation Insights
weight: 700
---
- 
# make sure there is a space after the - so that the TOC is generated
{:toc}

### Log in to you OCP cluster
See the [Prerequisites]({{ pages.github.url }}/automation/pre-requisites) chapter for details on logging in to your OCP cluster.

## Install Kafka

### Add the Helm repository
- Execute:
```
helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
```

### Create the Kafka project
- Execute:
```
oc new-project kafka
```

- Make sure you are working from the `kafka` project, then grant the tiller server `edit` access to current project:
```
oc project kafka
oc adm policy add-role-to-user edit "system:serviceaccount:tiller:tiller"
```

- Add the Security Context Constraints (CSS) `anyuid` to the Service Account `default` of the project:
```
oc adm policy add-scc-to-user anyuid -z default
```
### Create PVs if necessary
If your cluster does not support dynamic persistence volume, download [kafka-pv.yaml](assets/automation/bai/kafka-pv.yaml) and execute:
```
oc apply -f kafka-pv.yaml
```

### Install the Helm chart

Download the [kafka-values.yaml](assets/automation/bai/kafka-values.yaml) file to your working directory and run the following command:
```
helm install incubator/kafka --name my-kafka --namespace kafka -f kafka-values.yaml
```
This will deploy [Apache Kafka](https://github.com/helm/charts/tree/master/incubator/kafka) and [Zookeeper](https://github.com/helm/charts/tree/master/incubator/zookeeper).

Keep `my-kafka` as a release name because the rest of the installation assumes it. 

### Set-up the Kafka bootstrap server

If access is from inside the OpenShift cluster environment, then the bootstrap server is `my-kafka-headless.kafka.svc.cluster.local:9092`.

If access is from an external system, you need to perform the following steps:

1 - Retrieve the OpenShift ingress address with the following command: 
![Kafka ingress](assets/automation//images/rhos-kafka1.png)

2 - Use this ingress address to set the bootstrap server to `{rhos-ingress-ip}:31090,{rhos-ingress-ip}:31091,{rhos-ingress-ip}:31092`.

3 - Add the line `{rhos-ingress-ip} kafka.cluster.local` to the `/etc/hosts` file.


## Install Business Automation Insights (BAI)

### Download the BAI PPA 
Download the following PPA from [IBM Passport Advantage](https://www.ibm.com/software/passportadvantage) to your working-directory:

- *IBM Cloud Pak for Automation v19.0.1 - Business Operation Insights for Certified Kubernetes Multiplatform English (CC222EN)*

The downloaded archive should be `ICP4A19.0.1-bai.tgz`.

### Create the BAI project
- Create a new OpenShift project for BAI:
```
oc new-project baiproject
```
- Make sure you are working from your newly created BAI project, then grant the tiller server `edit` access to current project:
```
oc project baiproject
oc adm policy add-role-to-user edit "system:serviceaccount:tiller:tiller"
```

### Create a ServiceAccount and update the SCCs

Check if `ibm-anyuid-scc` and `ibm-privileged-scc` exist in your cluster:
```
oc get scc ibm-anyuid-scc
oc get scc ibm-privileged-scc
```

If they don't exist, download [ibm-anyuid-scc.yaml](assets/automation/bai/ibm-anyuid-scc.yaml) and [ibm-privileged-scc.yaml](assets/automation/bai/ibm-privileged-scc.yaml) files to your working directory and execute the following commands:

```
oc apply -f ibm-anyuid-scc.yaml
oc apply -f ibm-privileged-scc.yaml

```

Download [bai-psp.yaml](assets/automation/bai/bai-psp.yaml) file to your working directory.
```
oc apply -f bai-psp.yaml

oc adm policy add-scc-to-user ibm-privileged-scc -z bai-prod-release-bai-psp-sa
oc adm policy add-scc-to-user ibm-anyuid-scc -z bai-prod-release-bai-psp-sa

oc adm policy add-scc-to-group ibm-anyuid-scc system:authenticated
oc adm policy add-scc-to-user ibm-privileged-scc system:authenticated
```

### Push the BAI images to the registry

If you are installing BAI on IBM Cloud managed OCP cluster:

- Login to the Docker registry:
```
docker login -u $(oc whoami) -p $(oc whoami -t) docker-registry.default.svc:5000
```
- Download the `loadimages.sh` script to your working directory:
```
wget https://raw.githubusercontent.com/icp4a/cert-kubernetes/19.0.1/scripts/loadimages.sh
chmod +x loadimages.sh
```
- Load the images:
```
./loadimages.sh -p ICP4A19.0.1-bai.tgz -r docker-registry.default.svc:5000/baiproject
```

If you are installing BAI on an on-prem OCP:

- Find the url of the cluster registry:
```
oc -n default get route
# search for route to docker-registry
sudo docker login -u $(oc whoami) -p $(oc whoami -t) &lt;route_to_docker_registry>
```

- Download the `loadimages.sh` script to your working directory:
```
wget https://raw.githubusercontent.com/icp4a/cert-kubernetes/19.0.1/scripts/loadimages.sh
chmod +x loadimages.sh
```
- Load the images:
```
sudo ./loadimages.sh -p ICP4A19.0.1-bai.tgz -r &lt;route_to_docker_registry>/baiproject
```

### Set up the persistent volumes

Run the following commands to create the required PV folders in NFS, where `/data/persistentvolumes/` is the mounted directory of your NFS server:

```
sudo mkdir -p /data/persistentvolumes/bai/ibm-bai-pv
sudo chown 9999:9999 /data/persistentvolumes/bai/ibm-bai-pv
sudo chmod 770 /data/persistentvolumes/bai/ibm-bai-pv

mkdir -p /data/persistentvolumes/bai/ibm-bai-ek-pv-0
mkdir -p /data/persistentvolumes/bai/ibm-bai-ek-pv-1
mkdir -p /data/persistentvolumes/bai/ibm-bai-ek-pv-2
mkdir -p /data/persistentvolumes/bai/ibm-bai-ek-pv-3
sudo chown 1000:1000 /data/persistentvolumes/bai/ibm-bai-ek-pv-0
sudo chown 1000:1000 /data/persistentvolumes/bai/ibm-bai-ek-pv-1
sudo chown 1000:1000 /data/persistentvolumes/bai/ibm-bai-ek-pv-2
sudo chown 1000:1000 /data/persistentvolumes/bai/ibm-bai-ek-pv-3
sudo chmod 770 /data/persistentvolumes/bai/ibm-bai-ek-pv-0
sudo chmod 770 /data/persistentvolumes/bai/ibm-bai-ek-pv-1
sudo chmod 770 /data/persistentvolumes/bai/ibm-bai-ek-pv-2
sudo chmod 770 /data/persistentvolumes/bai/ibm-bai-ek-pv-3

mkdir /data/persistentvolumes/bai/es-snapshots-pv
sudo chown 1000:1000 /data/persistentvolumes/bai/es-snapshots-pv
sudo chmod 770 /data/persistentvolumes/bai/es-snapshots-pv
```

Download the [`bai-pv.yaml`](assets/automation/bai/bai-pv.yaml) PV configuration file to your working directory. Edit the file and replace the IP address of the NFS server by the name or the IP address of your server. Modify the path of the directory if necessary. 

```	 
oc apply -f bai-pv.yaml
```

### Deploy BAI

- Download the [`values.yaml`](assets/automation/bai/values.yaml) file to your working directory. Make sure that the Kafka `bootstrapServers` name corresponds to the name from the *Set-up the Kafka bootstrap server* section. 

- To update the operator configuration, copy this [`my_ibm_cp4a_cr_3.yaml`](assets/automation/bai/my_ibm_cp4a_cr_3.yaml) template file in your working directory and update it as needed. You can highlight the BAI configuration sections that need your attention by doing a diff with the template file found in [`my_ibm_cp4a_cr_2.yaml`](assets/automation/bas/my_ibm_cp4a_cr_2.yaml)

- Apply the updated custom resource definition file:
```
oc apply -f my_ibm_icp4a_cr_3.yaml
```

You should see the following new pods deployed:
```
NAME                                              READY   STATUS      RESTARTS   AGE
cp4a-prod-bai-admin-d877c8b66-8xzs5               1/1     Running     0          15h
cp4a-prod-bai-bawadv-97flq                        0/1     Completed   0          15h
cp4a-prod-bai-bpmn-bvrtx                          0/1     Completed   0          15h
cp4a-prod-bai-content-nqgl2                       0/1     Completed   0          15h
cp4a-prod-bai-flink-jobmanager-5844df9685-2dkz5   1/1     Running     0          15h
cp4a-prod-bai-flink-taskmanager-0                 1/1     Running     3          15h
cp4a-prod-bai-flink-taskmanager-1                 1/1     Running     3          15h
cp4a-prod-bai-flink-taskmanager-2                 1/1     Running     3          15h
cp4a-prod-bai-flink-taskmanager-3                 1/1     Running     0          15h
cp4a-prod-bai-flink-taskmanager-4                 1/1     Running     3          15h
cp4a-prod-bai-flink-zk-0                          1/1     Running     0          15h
cp4a-prod-bai-icm-pc2vw                           0/1     Completed   0          15h
cp4a-prod-bai-odm-94dch                           0/1     Completed   0          15h
cp4a-prod-bai-setup-wphkf                         0/1     Completed   0          15h
cp4a-prod-ibm-dba-ek-client-547dfdbd94-5jdxl      1/1     Running     0          15h
cp4a-prod-ibm-dba-ek-data-0                       1/1     Running     0          15h
cp4a-prod-ibm-dba-ek-kibana-7cb766fcd7-5bpl8      1/1     Running     0          15h
cp4a-prod-ibm-dba-ek-master-0                     1/1     Running     0          15h
cp4a-prod-ibm-dba-ek-security-config-5hj2p        0/1     Completed   0          15h
```

### Expose the Kibana service

Download [`route.yaml`](assets/automation/bai/route.yaml) file to your working directory and run the following command:

```
oc apply -f route.yaml
```

### Accessing the Kibana dashboards

You can find the URL of Kibana in the Application Console of your cluster, in the `Services` tab of your BAI project. 

The URL should have the following form:
`https://bai-prod-release-ibm-dba-ek-kibana-baiproject.&lt;your-cluster-ID>.&lt;cloud-zone>.containers.appdomain.cloud`.

The credential are `admin` for user name and `passw0rd` for password.

## Uninstall

### Uninstall Kafka:

```
helm delete my-kafka  --purge
oc delete pvc datadir-my-kafka-0
oc delete pvc datadir-my-kafka-1
oc delete pvc datadir-my-kafka-2
```

If you created your PVs manually, execute:
```
oc delete -f kafka-pv.yaml
```

### Uninstall BAI
```
helm delete bai-prod-release --purge
oc delete pvc data-bai-prod-release-ibm-dba-ek-data-0
oc delete pvc data-bai-prod-release-ibm-dba-ek-data-1
oc delete pvc data-bai-prod-release-ibm-dba-ek-data-2
oc delete pvc data-bai-prod-release-ibm-dba-ek-data-3
oc delete pvc data-bai-prod-release-ibm-dba-ek-master-0
oc delete -f bai-pv.yaml
oc delete -f route.yaml
```

## Other useful references to documentation

- [BAI install on on Red Hat OpenShift on IBM Cloud](https://github.ibm.com/dba/cert-kubernetes/blob/19.0.1/BAI/platform/README_ROKS.md)
