FROM public.ecr.aws/lambda/nodejs:14 AS base

FROM base AS builder

WORKDIR ${LAMBDA_TASK_ROOT}

# Copy the package.json file to download dependencies
COPY package*.json ./

# Install NPM dependencies for build
RUN npm install

# Copy the rest of the working directory contents into the container
COPY . ./

# Build the application.
RUN npm run build

FROM base AS layers

WORKDIR ${LAMBDA_TASK_ROOT}

# Copy the package.json file to download dependencies
COPY package*.json ./

# Install NPM dependencies for function
RUN npm install --production

FROM base AS runner

WORKDIR ${LAMBDA_TASK_ROOT}

COPY --from=builder ${LAMBDA_TASK_ROOT}/dist .
COPY --from=layers ${LAMBDA_TASK_ROOT}/node_modules ${LAMBDA_TASK_ROOT}/node_modules

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "lambda.handler" ]