import * as path from 'path';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';

// The builder wraps nextJS in Compatibility layers for Lambda@Edge; handles the page
// manifest and creating the default-lambda and api-lambda. The final output is an assets
// folder which can be uploaded to s3 on every deploy.
const lambdaDir = path.join('../application');

export default class DefaultStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.Props) {
    super(scope, id, props);

    const lambdaHandler = new lambda.DockerImageFunction(this, 'LambdaHandler', {
      memorySize: 1024,
      timeout: cdk.Duration.seconds(120),
      code: lambda.DockerImageCode.fromImageAsset(lambdaDir),
    });

    const lambdaUrl = lambdaHandler.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    new cdk.CfnOutput(this, 'FunctionUrl', {
      value: lambdaUrl.url,
      description: 'FunctionUrl',
    });
  }
}
