import * as cdk from "aws-cdk-lib";
import { Code, Function as Lambda, Runtime } from "aws-cdk-lib/aws-lambda";
import type { Construct } from "constructs";
import { join } from "node:path";
import * as api from "aws-cdk-lib/aws-apigatewayv2";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";

export class ServerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFunction = new Lambda(this, "BunFunction", {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromAsset(join(__dirname, "../../server/dist")),
      handler: "lambda.handler",
      environment: {
        NODE_ENV: "production",
      },
    });

    const cert = new Certificate(this, "api-cert", {
      domainName: "api.vike-starter.v-thomas.com",
      validation: CertificateValidation.fromDns(),
    });

    const domain = new api.DomainName(this, "domain-name", {
      domainName: "api.vike-starter.v-thomas.com",
      certificate: cert,
    });

    const lambdaIntegration = new HttpLambdaIntegration(
      "lambda-main",
      lambdaFunction,
      { timeout: cdk.Duration.seconds(10) },
    );

    new api.HttpApi(this, "Nice", {
      defaultIntegration: lambdaIntegration,
      defaultDomainMapping: {
        domainName: domain,
      },
      disableExecuteApiEndpoint: true,
    });
  }
}
