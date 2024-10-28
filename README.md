# CI/CD with Terraform and AWS

This repository demonstrates a CI/CD pipeline using GitHub Actions, Terraform, and AWS services. The pipeline automates the deployment of infrastructure and applications, leveraging Docker containers for application deployment.

## Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Getting Started](#getting-started)
4. [CI/CD Workflow](#cicd-workflow)
5. [Environment Variables](#environment-variables)
6. [Troubleshooting](#troubleshooting)
7. [Contributing](#contributing)
8. [License](#license)

## Introduction

This project utilizes a GitHub Actions workflow to manage the deployment of infrastructure and applications in AWS. The infrastructure is provisioned using Terraform, and the application is packaged and deployed using Docker containers.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- An [AWS account](https://aws.amazon.com/)
- [Terraform](https://www.terraform.io/downloads.html) installed on your local machine (for local testing)
- [Docker](https://www.docker.com/products/docker-desktop) installed on your local machine (for local testing)
- A GitHub account with permissions to create repositories and actions

## Getting Started

To get a local copy up and running follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name
    ```

2. Set up your AWS credentials and create a `.env` file (or configure secrets in GitHub):
    ```plaintext
    AWS_ACCESS_KEY_ID=your_access_key
    AWS_SECRET_ACCESS_KEY=your_secret_key
    TF_STATE_BUCKET_NAME=your_tf_state_bucket
    AWS_REGION=us-east-1
    ```

3. Install Terraform and Docker if you haven't already.

4. Deploy the infrastructure locally (optional):
    ```bash
    cd terraform
    terraform init
    terraform apply
    ```

## CI/CD Workflow

The CI/CD workflow is defined in the `.github/workflows/ci-cd.yml` file. It consists of two main jobs: `deploy-infra` and `deploy-app`.

### 1. Deploy Infrastructure

This job provisions the necessary AWS resources using Terraform.

- **Checkout code**: Clones the repository.
- **Setup Terraform**: Configures Terraform.
- **Terraform Init**: Initializes Terraform with the specified backend.
- **Terraform Plan**: Creates an execution plan for Terraform.
- **Terraform Apply**: Applies the planned changes to create resources.
- **Set Output**: Captures the public IP of the created instance for later use.

### 2. Deploy Application

This job deploys the application to the EC2 instance.

- **Checkout code**: Clones the repository.
- **Set IP Environment Variable**: Sets the public IP of the instance as an environment variable.
- **Login to AWS ECR**: Authenticates to the Amazon Elastic Container Registry.
- **Build and Push Docker Image**: Builds the Docker image and pushes it to ECR.
- **Debug Server IP**: Outputs the server IP to the logs for debugging purposes.
- **Deploy Docker Image to EC2**: Connects to the EC2 instance via SSH and runs the Docker container.

## Environment Variables

The following environment variables are utilized in the workflow:

- `AWS_ACCESS_KEY_ID`: Your AWS access key ID.
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key.
- `TF_STATE_BUCKET_NAME`: The name of the S3 bucket for storing Terraform state files.
- `PRIVATE_SSH_KEY`: The private SSH key for accessing your EC2 instance.
- `PUBLIC_SSH_KEY`: The public SSH key used for key pair creation in AWS.
- `AWS_REGION`: The AWS region where resources will be provisioned.
- `SERVER_PUBLIC_IP`: The public IP address of the EC2 instance.

## Troubleshooting

If you encounter issues with the deployment:

- Ensure your AWS credentials are correct.
- Verify that the specified region is valid.
- Check that the Terraform state bucket exists and you have the necessary permissions.
- Review the logs in GitHub Actions for detailed error messages.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
