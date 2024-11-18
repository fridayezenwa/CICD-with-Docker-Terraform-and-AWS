# CI/CD with Docker, Terraform and AWS

## Introduction

This project utilizes a GitHub Actions workflow to manage the deployment of infrastructure and applications in AWS. The infrastructure is provisioned using Terraform, and the application is packaged and deployed using Docker containers.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- An [AWS account](https://aws.amazon.com/)
- [Terraform](https://www.terraform.io/downloads.html) installed on your local machine (for local testing)
- [Docker](https://www.docker.com/products/docker-desktop) installed on your local machine (for local testing)
- A GitHub account with permissions to create repositories and actions

## CI/CD Workflow

The CI/CD workflow consists of two main jobs: `deploy-infra` and `deploy-app`.

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

- Ensure your environment variables are properly configured
- Your S3 bucket needs to be created in advance
- Make sure IAM roles are set up properly in AWS
- Check that the Terraform state bucket exists and you have the necessary permissions.
- Review the logs in GitHub Actions for detailed error messages.

## License

This project is licensed under the MIT License.

## EC2 Instance

This project includes the creation of an EC2 instance using Terraform. Due to Terraform's state management, the EC2 instance may not be automatically created when you clone the repository.

To create the instance, follow these steps:
1. Uncomment the EC2 block in the `main.tf` file.
2. Run `terraform init` to initialize Terraform.
3. Run `terraform apply` to apply the configuration and create the instance.

If you wish to manually manage the instance or modify its configuration, feel free to edit the `aws_instance` block as needed.
