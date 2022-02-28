#!/bin/bash

echo "Updating deployment policy"
aws iam put-role-policy --role-name ReuseCloudFormationDeploymentRole --policy-name ReuseDeploymentPolicy --policy-document file://ReuseDeploymentPolicy
