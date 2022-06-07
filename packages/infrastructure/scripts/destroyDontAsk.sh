#!/usr/bin/env bash

set -euo pipefail

# Deploy the cdk stack
echo "--- 🚀 Destroying CDK stack..."
cdk \
  destroy --all --force
