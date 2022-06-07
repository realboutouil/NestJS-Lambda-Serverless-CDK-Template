import * as cdk from 'aws-cdk-lib';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';

interface GetHostedZoneProps {
  scope: cdk.Stack;
  domainName: string;
}

interface CreateARecordForDistributionProps {
  scope: cdk.Stack;
  hostedZone: route53.IHostedZone;
  subDomainName: string;
  distribution: cloudfront.IDistribution;
}

export const getHostedZone = (props: GetHostedZoneProps): route53.IHostedZone => {
  const { scope, domainName } = props;
  return route53.HostedZone.fromLookup(scope, 'hostedZone', {
    domainName,
  });
};

export const createARecordForDistribution = (props: CreateARecordForDistributionProps): route53.ARecord => {
  const { scope, hostedZone, subDomainName, distribution } = props;
  return new route53.ARecord(scope, 'aRecord', {
    target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
    zone: hostedZone,
    recordName: subDomainName,
  });
};
