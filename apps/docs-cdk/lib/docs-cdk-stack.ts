import * as cdk from "aws-cdk-lib";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import {
  Distribution,
  OriginAccessIdentity,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import type { Construct } from "constructs";
import { join } from "node:path";

interface DocsProps extends cdk.StackProps {
  certArn: string;
}

export class DocsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, { certArn, ...props }: DocsProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, "docs-website-bucket", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const cloudfrontOAI = new OriginAccessIdentity(this, "OAI");

    bucket.grantRead(cloudfrontOAI);

    const cert = Certificate.fromCertificateArn(this, "cert-arn", certArn);

    const distribution = new Distribution(this, "docs-cloudfront-dist", {
      defaultBehavior: {
        origin: new S3Origin(bucket, {
          originAccessControlId: cloudfrontOAI.originAccessIdentityId,
        }),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: "index.html",

      domainNames: ["docs.vike-starter.v-thomas.com"],

      certificate: cert,
    });

    new cdk.CfnOutput(this, "DistributionDomainName", {
      value: distribution.domainName,
      description: "The domain name of the CloudFront distribution",
    });

    new BucketDeployment(this, "deploy-website", {
      sources: [Source.asset(join(__dirname, "../../docs/dist"))],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ["/*"],
    });
  }
}
