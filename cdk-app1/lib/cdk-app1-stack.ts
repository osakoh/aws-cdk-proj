import { CfnOutput, Stack, Duration, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";

//  L3 construct class for s3 bucket
class L3Bucket extends Construct {
  private readonly bucket: Bucket;

  constructor(scope: Construct, id: string, expiration: number) {
    super(scope, id);

    this.bucket = new Bucket(this, "L3Bucket", {
      lifecycleRules: [
        {
          expiration: Duration.days(expiration),
        },
      ],
    });
  }

  // getter method to expose the bucket(L3) name
  public get bucketNameL3(): string {
    return this.bucket.bucketName;
  }
}

export class CdkApp1Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
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

    // Output for L1 bucket
    new CfnOutput(this, "L1BucketName", {
      value: bucketL1.ref, // the `ref` property for L1 (CfnBucket) bucket name
      description: "L1: Bucket name created using L1 construct",
    });

    // s3 bucket using L2 construct
    const bucketL2 = new Bucket(this, "L2Bucket", {
      lifecycleRules: [
        {
          expiration: Duration.days(2),
        },
      ],
    });

    // Output for L2 bucket
    new CfnOutput(this, "L2BucketName", {
      value: bucketL2.bucketName,
      description: "L2: Bucket name created using L2 construct",
    });

    // s3 bucket using L3 construct
    const bucketL3 = new L3Bucket(this, "L3Bucket", 3);

    // Output for L3 bucket using the exposed bucket name
    new CfnOutput(this, "L3BucketName", {
      value: bucketL3.bucketNameL3,
      description: "L3: Bucket name created using L3 construct",
    });
  }
}
