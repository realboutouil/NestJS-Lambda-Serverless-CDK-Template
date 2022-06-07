#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import DefaultStack from './stack';
import * as process from 'process';

const app = new cdk.App();
const environment = 'development';

const stackName = `nestjs-lambda-aws-cdk-template-${environment}`;
cdk.Tags.of(app).add('application', stackName);
cdk.Tags.of(app).add('environment', environment);

new DefaultStack(app, stackName, {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
