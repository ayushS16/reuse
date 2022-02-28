#!/bin/bash

function transform_swagger {
    account=`aws sts get-caller-identity --output text --query 'Account'`
    if [ $? -ne 0 ]; then
        echo "Could not get AWS account number."
    else
        file=swagger1.yaml
        cp -f $1 $file
    fi
}

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 SiteName StageName" >&2
  exit 1
fi

sitename=${1}
stagename=${2}
artifacts_bucket=${sitename}-reuse-sam-artifacts
samtemplate_bucket=${sitename}-reuse-sam-template

#Create the artifacts bucket (this will store zipped lambda functions)
aws s3api head-bucket --bucket ${artifacts_bucket} 2>/dev/null 
if [ $? -ne 0 ]; then
    echo "Artifacts bucket does not exist, creating bucket: ${artifacts_bucket}"
    aws s3 mb s3://${artifacts_bucket}
    if [ $? -ne 0 ]; then
        echo "Could not create bucket ${artifacts_bucket}. Deployment aborted"
        exit 1
    fi
fi

#Upload Swagger file to S3. It defines the model schema for API Gateway
if [ -z ${swagger+x} ]; then
  echo "Uploading swagger file to swagger bucket"
  transform_swagger ../swagger.yaml
  aws s3 mv swagger1.yaml s3://${artifacts_bucket}/Reuse-swagger.yaml --acl public-read

  if [ $? -ne 0 ]; then
    echo "Could not upload swagger file to S3 bucket ${artifacts_bucket}."
  fi
fi

#Packaging SAM parameter template
aws cloudformation package --template-file ../sam-parameters-template.yaml --s3-bucket ${artifacts_bucket} --output-template-file autogenerated-param-cf.yaml

#Deploy
role=`aws iam get-role --role-name ReuseCloudFormationDeploymentRole`
roleArn=$(echo $role | sed 's/.*"Arn": "\([^"]*\).*/\1/g')
aws cloudformation deploy --template-file autogenerated-param-cf.yaml --parameter-overrides  SiteName=${sitename} --stack-name ${sitename}-ReuseParametersStack --capabilities CAPABILITY_NAMED_IAM --role-arn ${roleArn}

#Packaging SAM template
aws cloudformation package --template-file ../sam-template.yaml --s3-bucket ${artifacts_bucket} --output-template-file autogenerated-cf.yaml

#Create the samtemplate bucket bucket (this will store sam-template)
aws s3api head-bucket --bucket ${samtemplate_bucket} 2>/dev/null 
if [ $? -ne 0 ]; then
    echo "Artifacts bucket does not exist, creating bucket: ${samtemplate_bucket}"
    aws s3 mb s3://${samtemplate_bucket}
    if [ $? -ne 0 ]; then
        echo "Could not create bucket ${samtemplate_bucket}. Deployment aborted"
        exit 1
    fi
fi

#Deploy
role=`aws iam get-role --role-name ReuseCloudFormationDeploymentRole`
roleArn=$(echo $role | sed 's/.*"Arn": "\([^"]*\).*/\1/g')
aws cloudformation deploy --template-file autogenerated-cf.yaml --s3-bucket ${samtemplate_bucket} --parameter-overrides  SiteName=${sitename} StageName=${stagename} LoggingLevel=debug --stack-name ${sitename}-ReuseStack --capabilities CAPABILITY_NAMED_IAM --role-arn ${roleArn}
