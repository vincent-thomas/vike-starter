#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { WebStack } from "../lib/web-cdk-stack";
import { z } from "zod";

const app = new cdk.App();

const cert = z.string().parse(process.env.CERT_ARN);

new WebStack(app, "WebCdkStack", {
  env: {
    account: z.string().parse(process.env.CDK_DEFAULT_ACCOUNT),
    region: "eu-central-1",
  },

  certArn: cert,
});
