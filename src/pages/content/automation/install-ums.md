---
title: Install IBM User Management Service
weight: 500
---
- 
# make sure there is a space after the - so that the TOC is generated
{:toc}

### Prepare the UMS database

```
su - db2inst1
db2 create database umsdb automatic storage yes using codeset UTF-8 territory US pagesize 32768;
db2 connect to umsdb
db2 list applications
exit
```

### Create the UMS and database secrets

- Copy this [`ums-secret.yaml`](assets/automation/ums/ums-secret.yaml) template file in your working directory and update it as needed. In particular, update the user and password for the DB2 database. You may want to also change UMS admin user name and password.

- Create the secrets:
```
oc create -f ums-secret.yaml
```

### Deploy UMS

- To update the operator configuration, copy this [`my_ibm_cp4a_cr_1.yaml`](assets/automation/ums/my_ibm_cp4a_cr_1.yaml) template file in your working directory and update it as needed. You can highlight the UMS configuration sections that need your attention by doing a diff with the base template file found in [`my_ibm_cp4a_cr_0.yaml`](assets/automation/operator/my_ibm_cp4a_cr_0.yaml)

- Apply the updated custom resource definition file:
```
oc apply -f my_ibm_icp4a_cr_1.yaml
```

You should see the following new pods deployed:

```
NAME                                        READY     STATUS      RESTARTS   AGE
cp4a-prod-ums-deployment-6f77649cb6-6rm7l   1/1       Running     0          5h
cp4a-prod-ums-deployment-6f77649cb6-97mlq   1/1       Running     0          5h
cp4a-prod-ums-ltpa-creation-job-g8sbj       0/1       Completed   0          2d
```

### Test that UMS is up

Connect to `https://&lt;ums-route>/ums` with the administrator login you have defined in the `ums-secret.yaml` file. You should also be able to login with the credentials for any user defined in the LDAP directory.

The `&lt;ums-route>` is the hostname that you have provided under the `ums_configuration` in the `my_ibm_cp4a_cr_1.yaml` configuration file.
