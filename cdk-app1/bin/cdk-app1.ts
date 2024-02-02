#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkApp1Stack } from '../lib/cdk-app1-stack';

const app = new cdk.App();
new CdkApp1Stack(app, 'CdkApp1Stack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});