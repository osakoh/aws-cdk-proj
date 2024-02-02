import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";

//  L3 construct class for s3 bucket
class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration: number) {
    super(scope, id);

    new Bucket(this, "L3Bucket", {
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(expiration),
        },
      ],
    });
  }
}

export class CdkApp1Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // s3 bucket using L1 construct
    const bucketL1 = new CfnBucket(this, "L1Bucket", {
      lifecycleConfiguration: {
        rules: [
          {
            expirationInDays: 1,
            status: "Enabled",
          },
        ],
      },
    });

    // s3 bucket using L2 construct
    const bucketL2 = new Bucket(this, "L2Bucket", {
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(2),
        },
      ],
    });

    // s3 bucket using L3 construct
    new L3Bucket(this, "L3Bucket", 3);
  }
}
