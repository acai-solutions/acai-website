---
title: "AWS Landing Zone – Security & Governance Blueprint"
date: 2020-06-02T12:00:00+06:00
image: "/images/blog/aws-lz-sec-blueprint/SecurityBlueprintOverview.svg"
author: "Michael Ullrich"
summary : "AWS Landing Zone – Security & Governance Blueprint"
tags: ['aws', 'security', 'securityhub']
draft: false
---

## Overview

Please refer to this post ([link](https://acai.gmbh/blog/aws-lz-sec-blueprint/)) where we provide an overview of the AWS landing zone concept.

In this post we want to put special focus on how to ensure security & governance in all the accounts of your landing zone.

The security standards we recommend for hardening your AWS accounts can be found in the following post: [link](https://acai.gmbh/blog/security-standards-recommended-for-aws/)

The requirements of the security controls

can be met by the adequate application of security building blocks over the following three layers:

{{< image src="/images/blog/aws-lz-sec-blueprint/Layers.svg" class="img-fluid" alt="Layers" loading="eager" zoomable="false" webp="false" >}}

**Business Account Implementation:** For sure development teams have a large stake in making their accounts secure. But through a solid design of the underlying layers (Landing Zone Account Baseline & Architecture) you can make their life easier.

**Landing Zone Account Baseline:** The account baseline is injected into all accounts (core- & business domain) and ensures unified deployment of security building blocks into all the accounts of the landing zone. There can be multiple account baselines – the security building blocks should be the same for all account baselines.

**Landing Zone Architecture:** Choosing the right core account features is half of the way to solid cloud security.

Mapping the requisite layers to the landing zone accounts leads to the following illustration:

{{< image src="/images/blog/aws-lz-sec-blueprint/SecurityBlueprintOverview.svg" class="img-fluid" alt="Security Blueprint Overview" zoomable="false" webp="false" >}}

At a minimum, we highly recommend applying Infrastructure as Code (IaC) principles to the landing zone core accounts and the account baseline(s). HashiCorp Terraform is a great choice for this.

## Zoom In

The following image shows the features and services of the core account classes and the account baseline:

{{< image src="/images/blog/aws-lz-sec-blueprint/SecurityBlueprintDetail.svg" class="img-fluid" alt="Security Blueprint Detail" zoomable="false" webp="false" >}}

**AWS Organizations Master Account:** In this account you maintain your AWS Organization, including the hierarchy of organization units (OUs) and secure control policies (SCPs). SCPs can be attached to OUs to provide security guard rails to all accounts assigned to the OU (or its descendents). Please note, that guard rails overrule the root user permissions in the member accounts.

**Core Logging Account:** This is where your out-of-band tamper proof audit logs are stored in S3 buckets. At a minimum we recommend pointing the following sources of all member accounts to these buckets: AWS CloudTrail, AWS Config.

**Core Auditing Account:** This is your single point of navigation for your security operations team. Here the master instances of the following security services are: AWS Config, AWS Security Hub, Amazon GuardDuty, Amazon Detective.

**Account Baseline:** The account baseline ensures that the member-accounts have AWS CloudTrail and AWS Config enabled and configured to store to the core logging account. Furthermore, the auto-registration of the member-accounts to the security master instances in the core auditing account is ensured and  password policy is configured through the account baseline.

Note:  please take greatest care with the root users of the core accounts. Considerations can be found here: [link](https://acai.gmbh/blog/aws-root-user/)

We are ACAI Consulting – specialized in AWS Multi Account Security and Governance.
If you have any questions, feel free to get in touch with us: [blog@acai.gmbh](mailto:blog@acai.gmbh)
