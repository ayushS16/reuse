#!/bin/bash

echo "Updating dev policy"
aws iam put-group-policy --group-name ReuseDevelopers --policy-name ReuseDeveloperPolicy --policy-document file://ReuseDeveloperPolicy
