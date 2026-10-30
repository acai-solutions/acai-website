---
title: "ACAI Lab"
date: 2020-10-09T11:22:16+06:00
image: "/images/blog/acai-lab/overview.svg"
author: "Michael Ullrich"
summary: "The following blog post provides an overview of the ACAI reference architecture for an AWS Landing Zone."
tags: ['aws', 'landingzone', 'lab']
draft: false
---

## This AWS Lab is decomissioned - please check out the [ACAI AWS Lab 2024]({{< ref "/blog/acai-lab2024" >}})

The following blog post provides an overview of the ACAI reference architecture for an AWS Landing Zone.

Three types of accounts can be distinguished: Foundation Core Accounts, Shared Service Accounts and Business Solution Accounts.

{{< image src="/images/blog/acai-lab/overview.svg" class="img-fluid" alt="Overview" loading="eager" zoomable="false" webp="false" >}}

A zoom-in shows more explicitly the Foundation Core Accounts – the links provided in the table below allow you to directly access and navigate through the accounts via the AWS Management Console:

{{< image src="/images/blog/acai-lab/foundation.svg" class="img-fluid" alt="Foundation" loading="eager" zoomable="false" webp="false" >}}

<div class="table-scroll-div">

  | Account Type              | Description                                                                                               | Link to Lab-Account (AWS Management Console)                                                                                                  | Lab-Account-ID |
  |---------------------------|-----------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|----------------|
  | AWS Organizations Master  | AWS Organizations Master, OU Hierarchy, SCPs, Consolidated Billing                                        | –                                                                                                                                              | 297780133428   |
  | Core Vending              | Responsible for joining new AWS accounts to the AWS Foundation                                            | pending                                                                                                                                        | pending        |
  | Core IaC Provisioning     | Responsible for hosting the terraform Infrastructure as Code CI/CD pipelines for all accounts of the AWS Foundation | [Link to Core Provisioning](/sorry)                                                          | 851519347965   |
  | Core VPC & Networking     | Responsible for design of shared vpc´s, management of AWS Transit Gateway TGW, vpc/vpn attachments, AWS Direct Connect | [Link to Core Networking](/sorry)                                                               | 134653435903   |
  | Core Logging              | S3 Buckets for AWS Foundation wide AWS CloudTrail, AWS Config, VPC Flow Logs                              | [Link to Core Logging](/sorry)                                                                      | 735600569007   |
  | Core Auditing             | Master for AWS Security Hub, Amazon GuardDuty and AWS Detective (optional)                                | [Link to AWS SecurityHub](/sorry)<br>[Link to Amazon GuardDuty](/sorry) | 263761644432   |
  | Core Monitoring           | Aggregating AWS Foundation logs                                                                           | [Link to Monitoring Dashboard](/sorry) | 321744974957   |
  | Other Shared Services     | Further shared services like EKS, PKI, Kafka, Sandbox-Accounts…                                           | –                                                                                                                                              | –              |
  | Business Prod             | Sample of a baselined business account                                                                    | [Link to Business Prod](/sorry)                                                                    | 212262933260   |
  | Business NonProd          | Sample of a baselined business account                                                                    | [Link to Business Non-Prod](/sorry)                                                             | 001683013005   |

</div>

We are ACAI Consulting – specialized in AWS Multi Account Security and Governance.
If you have any questions, feel free to get in touch with us: [blog@acai.gmbh](mailto:blog@acai.gmbh)

## References

[1] [aws-landing-zone/](https://aws.amazon.com/de/solutions/implementations/aws-landing-zone/)

[2] [migration-aws-environment](https://aws.amazon.com/de/solutions/implementations/aws-landing-zone/)

[3] [Swiss Post Case Study](https://aws.amazon.com/de/solutions/case-studies/swiss-post-case-study/)
