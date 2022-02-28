#!/bin/bash

echo "Creating deployement role"
aws iam create-role --role-name ReuseCloudFormationDeploymentRole --assume-role-policy-document file://ReuseCloudFormationDeploymentRole
echo "Creating dev group"
aws iam create-group --group-name ReuseDevelopers
echo "Adding deployment policy to deployment role"
aws iam put-role-policy --role-name ReuseCloudFormationDeploymentRole --policy-name ReuseDeploymentPolicy --policy-document file://ReuseDeploymentPolicy
echo "Adding dev policy to dev group"
aws iam put-group-policy --group-name ReuseDevelopers --policy-name ReuseDeveloperPolicy --policy-document file://ReuseDeveloperPolicy
