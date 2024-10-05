import * as cdk from "aws-cdk-lib";
import {
  Code,
  Function as Lambda,
  FunctionUrlAuthType,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import type { Construct } from "constructs";
import { join } from "node:path";
import {
  AllowedMethods,
  CachePolicy,
  Distribution,
  OriginAccessIdentity,
} from "aws-cdk-lib/aws-cloudfront";
import { Bucket } from "aws-cdk-lib/aws-s3";
import {
  FunctionUrlOrigin,
  S3Origin,
} from "aws-cdk-lib/aws-cloudfront-origins";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";

interface DocsProps extends cdk.StackProps {
  certArn: string;
}

export class WebStack extends cdk.Stack {
  constructor(scope: Construct, id: string, { certArn, ...props }: DocsProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, "assets-bucket", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const lambda = new Lambda(this, "lambda-runtime", {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromAsset(join(__dirname, "../../web/dist/lambda")),
      handler: "runtime.handler",
      timeout: cdk.Duration.seconds(10),
      environment: {
        NODE_ENV: "production",
      },
    });

    bucket.grantRead(lambda);

    const lambdaUrl = lambda.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
    });

    const cloudfrontOAI = new OriginAccessIdentity(this, "OAI");

    bucket.grantRead(cloudfrontOAI);

    const cert = Certificate.fromCertificateArn(this, "cert-arn", certArn);

    const distru = new Distribution(this, "distro", {
      defaultBehavior: {
        origin: new FunctionUrlOrigin(lambdaUrl, {}),

        allowedMethods: AllowedMethods.ALLOW_ALL,
        cachePolicy: CachePolicy.CACHING_DISABLED,
      },

      certificate: cert,
      domainNames: ["vike-starter.v-thomas.com"],
      additionalBehaviors: {
        "/assets/*": {
          origin: new S3Origin(bucket, {
            originAccessIdentity: cloudfrontOAI,
          }),
          allowedMethods: AllowedMethods.ALLOW_GET_HEAD,
          cachePolicy: CachePolicy.CACHING_OPTIMIZED,
        },
      },
    });
    new BucketDeployment(this, "bucket-deployment", {
      sources: [Source.asset(join(__dirname, "../../web/dist/client/assets"))],
      destinationBucket: bucket,
      distribution: distru,
      destinationKeyPrefix: "assets",
    });
  }
}
