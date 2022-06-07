import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';

export interface CreateCertificateProps {
  scope: cdk.Stack;
  hostedZone: route53.IHostedZone;
  url: string;
}

export const createCertificate = (props: CreateCertificateProps): acm.ICertificate => {
  const { scope, hostedZone, url } = props;
  return new acm.DnsValidatedCertificate(scope, 'certificate', {
    domainName: url,
    hostedZone,
    region: 'us-east-1',
    cleanupRoute53Records: true,
  });
};
