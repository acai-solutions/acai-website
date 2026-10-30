---
title: "ACAI Lab - IaC Provisioning"
date: 2021-01-10T11:22:16+06:00
image: "/images/blog/aws-iac-cicd/iac_provisioning.svg"
author: "Michael Ullrich"
summary: "The post is about AWS Landing Zone Provisioning the native way. The focus lies on provisioning AWS accounts of the ACAI AWS Foundation Lab, utilizing Terraform."
tags: ['aws', 'landingzone', 'terraform', 'provisio']
draft: false
---

This was an early version of [ACAI Provisio]({{< ref "/solutions/provisio.md" >}}).

The following blog post is about AWS Landing Zone Provisioning – the AWS native way.

The focus of the post lies on provisioning AWS accounts of the ACAI AWS Foundation Lab, utilizing Terraform which is the de facto standard for infrastructure as code (IaC).

We designed the IaC CI/CD pipelines to consist of an AWS CodeCommit Repository and an AWS CodePipeline. The CodePipeline performs Terraform Plan and Terraform Apply in two AWS CodeBuild steps. Optionally a manual approval step between plan and apply can be added.

{{< image src="/images/blog/aws-iac-cicd/pipeline.svg" class="img-fluid" alt="IaC Provisioning" loading="eager" zoomable="false" webp="false" >}}

It is good practice to have dedicated AWS accounts per solution operated in the cloud.

In our **ACAI AWS Foundation Lab** each AWS account has two IaC CI/CD pipelines - one for the Foundation Baseline (shared overall AWS accounts) and one for the account resources.

In the lab setup the IaC CI/CD pipelines are hosted in the Core IaC Provisioning account (Link to Core Provisioning). The Core IaC Provisioning account itself is also managed via Terraform.

### Advantages of this architecture

- no credentials to access target accounts - no key rotation required
- segregation of Foundation Baseline and access account resource CI/CD pipelines
- fully AWS native IaC CI/CD pipelines - no expensive license cost

{{< image src="/images/blog/aws-iac-cicd/iac_provisioning.svg" class="img-fluid" alt="IaC Provisioning" zoomable="false" webp="false" >}}

We are ACAI Consulting - specialized in AWS Multi Account Security and Governance.
If you have any questions, feel free to get in touch with us: [blog@acai.gmbh](mailto:blog@acai.gmbh)

## References

[1] [ACAI AWS Foundation Lab](https://acai.gmbh/blog/aws-foundation-lab/)

[2] [https://www.terraform.io/](https://www.terraform.io/)

[3] [AWS CodeCommit](https://aws.amazon.com/de/codecommit/)

[4] [AWS CodePipeline](https://aws.amazon.com/de/codepipeline/)

[5] [AWS CodeBuild](https://aws.amazon.com/de/codebuild/)

[6] [Swiss Post Case Study](https://aws.amazon.com/de/solutions/case-studies/swiss-post-case-study/)
