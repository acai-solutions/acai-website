---
title: "AWS Prescriptive Guidance - an Implementation"
date: 2024-03-22T12:00:00+06:00
image: "/images/blog/aws-pg-cicd/list_view.png"
author: "Michael Ullrich"
summary : "AWS has released its official Prescriptive Guidance on AWS Cloud Security Maturity. This post outlines a real-life architecture based on Terraform."
tags: ['aws', 'landingzone', 'security', 'acf', 'provisio', 'semper']
draft: false
---

## Intro

AWS has unveiled its official Prescriptive Guidance for AWS Cloud Security Maturity [1]. This resource is aimed at assisting Chief Security Officers (CSOs) and Architects in crafting their cloud security strategies and evaluating their progress against a maturity model.

This blog post provides a suggestion on how to distribute the AWS Services over suggested AWS Foundation Core Accounts and how to manage the AWS Resources with Terraform [2] provisioned through granular CI/CD Pipelines.

## Reference Implementation

The following diagram illustrates an Infrastructure as Code (IaC) Continuous Integration and Deployment (CI/CD) pipeline to maintain the Foundation Core assets AWS Organization.

The diagram contains repositories (for pipelines, features and specifications), AWS accounts and their AWS services and highlights the interconnectivity between repos and CI/CD pipelines.
Most of the feature repositories are part of the ACAI Cloud Foundation (ACF).

{{< image src="/images/blog/aws-pg-cicd/aws_pg_cicd_overview.svg" class="img-fluid" alt="CICD Pipeline Overview" zoomable="true" webp="false" >}}

All Foundation Core pipelines leverage the following ACF repos for sharing static and dynamic information:

<div class="table-scroll-div">

| Repository                                    | Description                                                                                                                                                                |
|-----------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| customer-acf-settings                         | A hierarchical HCL-map organized according to the Foundation Capability domains, which include governance, security, and connectivity, along with their specific features. |
| [acf-core-configuration][acf-core-config-url] | Storing and distribution of dynamic information (e.g. KMS-Key ID).                                                                                                         |

</div>

The following table outlines the Foundation Core pipelines :

<div class="table-scroll-div">

| Pipeline               | Used ACF Module(s)    | Description                                                     | Target Accounts                                         | AWS Services in scope                                                                                                               |
| ---------------------- | --------------------- | --------------------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Org-Mgmt               | [acf-org-ou-mgmt][acf-org-ou-mgmt-url], [acf-org-delegation][acf-org-delegation-url] | OU-Hierarchy, service delegation, tagging policies              | AWS Org Management                                      | AWS Organizations, AWS Control Tower (optional)                                                                                     |
| Core-Account-Lifecycle | acf-account-lifecycle | Account vending, tagging, OU placement, decomissioning          | AWS Org Management                                      | AWS Organizations                                                                                                                   |
| Core-SCP               | [acf-scp][acf-scp-url]| Specification and assignment of Service Control Policies        | AWS Org Management                                      | AWS Organizations                                                                                                                   |
| Core-Org-CloudTrail    | [acf-org-cloudtrail][acf-org-cloudtrail-url] | Configuration of the Organization CloudTrail                    | AWS Org Management or delegated admin, Core Log Archive | AWS CloudTrail, Amazon CloudWatch, Amazon S3, AWS KMS                                                                               |
| Core-SSO               | [acd-idc][acd-idc-url] | Definition of Permission Sets and management of the assignments | AWS Org Management or delegated admin                   | AWS IAM Identity Center                                                                                                             |
| Core-Security          | acf-firewall-manager  | Heart of Security Operations                                    | Core Security                                           | AWS Security Hub, Amazon GuardDuty, Amazon Detective, AWS Config, AWS Firewall Manager, AWS Lambda                                  |
| Core-Security-SEMPER   | [acai-semper][acai-semper-url] | ACAI solution for security finding lifecycle management         | Core Security, Core Log Archive                         | AWS Lambda, Amazon S3, AWS KMS                                                                                                      |
| Core-Logging           | acf-logging           | Blackhole for audit-logs                                        | Core Log Archive                                        | Amazon S3, AWS KMS, Amazon SNS                                                                                                      |
| Core-Image-Factory     | acf-image-factory     | Lifecycle management for golden images                          | Core Image Factory                                      | Lambda, EC2 Image Builder, ECR, Amazon Inspector                                                                                    |
| Core-Private-CA        | acf-private-ca        | Private CA                                                      | Core Private CA                                         | AWS Private CA                                                                                                                      |
| Core-Backup            | acf-backup            | Backup vault and policies                                       | Core Central Backup                                     | AWS Backup                                                                                                                          |
| Core-Networking        | acf-networking        | All networking related aspects                                  | Core Networking                                         | Amazon VPC, AWS Certificate Manager, AWS Resource Access Manager, Amazon Route 53, Amazon Cloudfront, AWS WAS, AWS Network Firewall |
| Core-Baselining        | [acai-provisio][acai-provisio-url] | Individually baseline all accounts of the AWS Organization      | Core Baselining                                         | AWS Step Functions, AWS CodeBuild                                                                                              |

</div>

ACAI Consulting is specialized in AWS Multi Account Security and Governance.
If you have any questions, feel free to get in touch with us: [blog@acai.gmbh](mailto:blog@acai.gmbh)

## References

[1] [Prescriptive Guidance on AWS Cloud Security Maturity](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-accelerating-security-maturity/choosing-a-security-model.html)

[2] [https://www.terraform.io/](https://www.terraform.io/)

<!-- MARKDOWN LINKS & IMAGES -->
[acf-org-ou-mgmt-url]: https://github.com/acai-solutions/terraform-aws-acf-org-ou-mgmt
[acf-org-delegation-url]: https://github.com/acai-solutions/terraform-aws-acf-org-delegation
[acf-scp-url]: https://github.com/acai-solutions/terraform-aws-acf-scp
[acf-org-cloudtrail-url]: https://github.com/acai-solutions/terraform-aws-acf-org-cloudtrail
[acd-idc-url]: https://github.com/acai-solutions/terraform-aws-acf-idc
[acf-core-config-url]: https://github.com/acai-solutions/terraform-aws-acf-core-configuration
[acai-semper-url]: https://acai.gmbh/solutions/semper/
[acai-provisio-url]: https://acai.gmbh/solutions/provisio/
