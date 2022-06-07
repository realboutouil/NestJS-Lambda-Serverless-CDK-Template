#!/usr/bin/env bash

set -euo pipefail

# Deploy the cdk stack
echo "--- 🚀 Deploying CDK stack..."
cdk \
  --require-approval never \
  deploy
