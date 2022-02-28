#!/bin/bash

echo "Updating deployment role"
aws iam update-assume-role-policy --role-name ReuseCloudFormationDeploymentRole --policy-document file://ReuseCloudFormationDeploymentRole
