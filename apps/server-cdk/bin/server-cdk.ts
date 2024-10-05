#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { ServerStack } from "../lib/server-cdk-stack";
import { z } from "zod";

const app = new cdk.App();

new ServerStack(app, "ServerCdkStack", {
  env: {
    account: z.string().parse(process.env.CDK_DEFAULT_ACCOUNT),
    region: "eu-central-1",
  },
});
