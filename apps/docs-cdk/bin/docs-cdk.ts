#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { DocsStack } from "../lib/docs-cdk-stack";
import { z } from "zod";

const app = new cdk.App();

const certArn = z.string().parse(process.env.CERT_ARN);

new DocsStack(app, "ClientCdkStack", {
  env: {
    account: z.string().parse(process.env.CDK_DEFAULT_ACCOUNT),
    region: "eu-central-1",
  },

  certArn,
});
