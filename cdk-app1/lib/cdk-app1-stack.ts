import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket } from "aws-cdk-lib/aws-s3";

export class CdkApp1Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    // s3 bucket using L2 construct
    const bucketL2 = new Bucket(this, 'L2Bucket', {
      lifecycleRules: [{
        expiration: cdk.Duration.days(2)
      }]
    });
  }
}
